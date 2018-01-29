import { VTransmitFile } from "../classes/VTransmitFile"
import { VTransmitUploadContext } from "../classes/VTransmitUploadContext"
import {
	UploaderInterface,
	UploadResolve,
	UploadReject,
} from "../core/interfaces"
import {
	VTransmitEvents as Events,
	UploadStatuses as Statuses,
} from "../core/utils"

/**
 * Responsibilities:
 * - send and manage upload via transport
 * - on progress: emit progress stats
 * - on error: emit to vue-transmit & update file status
 * - on timeout: emit to vue-transmit & update file status
 * - on error: emit to vue-transmit & update file status
 * - on success: emit to vue-transmit & update file status
 * - once complete: emit to vue-transmit & update file status
 */

export type XHRUploadOptions = {
	/**
	 * A string representing the URL to send the request to.
	 */
	url: string
	/**
	 * The HTTP method to use, such as "GET", "POST", "PUT", "DELETE", etc. Ignored for non-HTTP(S) URLs.
	 */
	method?: string
	/**
	 * The XMLHttpRequest.withCredentials property is a Boolean that indicates whether or not
	 * cross-site Access-Control requests should be made using credentials such as
	 * cookies, authorization headers or TLS client certificates.
	 * Setting withCredentials has no effect on same-site requests.
	 */
	withCredentials?: boolean
	/**
	 * The XMLHttpRequest.timeout property is an unsigned long representing
	 * the number of milliseconds a request can take before automatically being terminated.
	 * The default value is 0, which means there is no timeout.
	 * Timeout shouldn't be used for synchronous XMLHttpRequests requests used in a document environment
	 * or it will throw an InvalidAccessError exception. When a timeout happens, a timeout event is fired.
	 */
	timeout?: number
	/**
	 * The name of the file param that gets transferred.
	 */
	paramName?: string
	/**
	 * An object of additional parameters to transfer to the server.
	 * This is the same as adding hidden input fields in the form element.
	 */
	params?: { [key: string]: any }
	headers?: { [key: string]: any }
	/**
	 * The XMLHttpRequest.responseType property is an enumerated value that returns the type of response.
	 * It also lets the author change the response type.
	 * If an empty string is set as the value of responseType, the default value text will be used.
	 *
	 * Setting the value of responseType to "document" is ignored if done in a  Worker environment.
	 * When setting responseType to a particular value,
	 * the author should make sure that the server is actually sending a response compatible to that format.
	 * If the server returns data that is not compatible to the responseType that was set,
	 * the value of response will be null.
	 * Also, setting responseType for synchronous requests will throw an InvalidAccessError exception.
	 */
	responseType?: XMLHttpRequestResponseType
	/**
	 * responseParseFunc is a function that given an XMLHttpRequest
	 * returns a response object. Allows for custom response parsing.
	 */
	responseParseFunc?: (xhr: XMLHttpRequest) => UploadResolve
	errUploadError?: (xhr: XMLHttpRequest) => string
	errUploadTimeout?: (xhr: XMLHttpRequest) => string
	renameFile?: (name: string) => string
}

export type UploadGroup = {
	id: number
	files: VTransmitFile[]
	xhr: XMLHttpRequest
}

let GroupID = 0

export class XHRUploadAdapter implements UploaderInterface {
	public url: string
	public method: string = "post"
	public withCredentials: boolean = false
	public timeout: number = 0
	public paramName: string = "file"
	public params: { [key: string]: any } = Object.create(null)
	public headers: { [key: string]: any } = {
		Accept: "application/json",
		"Cache-Control": "no-cache",
		"X-Requested-With": "XMLHttpRequest",
	}
	public responseType: XMLHttpRequestResponseType = ""
	public errUploadError: (xhr: XMLHttpRequest) => string = xhr =>
		`Error during upload: ${xhr.statusText} [${xhr.status}]`
	public errUploadTimeout: (xhr: XMLHttpRequest) => string = _xhr =>
		`Error during upload: the server timed out.`
	public renameFile: (name: string) => string = name => name
	public responseParseFunc?: (xhr: XMLHttpRequest) => UploadResolve
	private uploadGroups: { [key: number]: UploadGroup } = Object.create(null)

	constructor(
		public context: VTransmitUploadContext,
		options: XHRUploadOptions
	) {
		Object.assign(this, options)
	}

	uploadFiles(files: VTransmitFile[]): Promise<UploadResolve> {
		return new Promise((resolve, reject: (reason: UploadReject) => void) => {
			if (!this.url) {
				throw new Error(`[Vue-Transmit] Missing upload URL.`)
			}

			const xhr = new XMLHttpRequest()
			const updateProgress = this.handleUploadProgress(files)
			const id = GroupID++

			this.uploadGroups[id] = { id, xhr, files }

			for (const file of files) {
				file.adapterData.groupID = id
				file.startProgress()
			}

			xhr.open(this.method, this.url, true)
			// Setting the timeout after open because of IE11 issue: https://gitlab.com/meno/dropzone/issues/8
			xhr.timeout = this.timeout
			xhr.withCredentials = Boolean(this.withCredentials)
			xhr.responseType = this.responseType

			xhr.addEventListener("error", () => {
				this.rmGroup(id)
				reject({
					event: Events.Error,
					message: this.errUploadError(xhr),
					xhr,
				})
			})
			xhr.upload.addEventListener("progress", updateProgress)
			xhr.addEventListener("timeout", () => {
				this.rmGroup(id)
				reject({
					event: Events.Timeout,
					message: this.errUploadTimeout(xhr),
					xhr,
				})
			})
			xhr.addEventListener("load", _ => {
				if (
					files[0].status === Statuses.Canceled ||
					xhr.readyState !== XMLHttpRequest.DONE
				) {
					return
				}

				// The XHR is complete, so remove the group
				this.rmGroup(id)

				let response = {}
				if (this.responseParseFunc) {
					response = this.responseParseFunc(xhr)
				} else {
					Object.assign(response, xhr.response)

					if (!xhr.responseType) {
						let contentType = xhr.getResponseHeader("content-type")
						if (contentType && contentType.indexOf("application/json") > -1) {
							try {
								response = JSON.parse(xhr.responseText)
							} catch (err) {
								return reject({
									message: "Invalid JSON response from server.",
									event: Events.Error,
									error: err,
								})
							}
						}
					}
				}

				// Called at load (when complete) will enable all the progress done logic.
				updateProgress()
				if (xhr.status < 200 || xhr.status >= 300) {
					return reject({
						event: Events.Error,
						message: `The server responded with code ${xhr.status} (${
							xhr.statusText
						}).`,
						xhr,
					})
				}

				return resolve(response)
			})

			// Use null proto obj for the following 'for in' loop without hasOwnProperty check
			const headers = Object.assign(Object.create(null), this.headers)
			for (const headerName in headers) {
				if (headers[headerName]) {
					xhr.setRequestHeader(headerName, headers[headerName])
				}
			}

			const formData = new FormData()
			for (const key in this.params) {
				formData.append(key, this.params[key])
			}

			for (const file of files) {
				this.context.emit(Events.Sending, file, xhr, formData)
			}
			if (this.context.props.uploadMultiple) {
				this.context.emit(Events.SendingMultiple, files, xhr, formData)
			}

			for (let i = 0; i < files.length; i++) {
				formData.append(
					this.getParamName(i),
					files[i].nativeFile,
					this.renameFile(files[i].name)
				)
			}

			xhr.send(formData)
		})
	}

	handleUploadProgress(files): (e?: ProgressEvent) => void {
		const vm = this.context.vtransmit
		return function onProgressFn(e?: ProgressEvent): void {
			if (!(e instanceof ProgressEvent)) {
				let allFilesFinished = true
				for (const file of files) {
					if (
						file.upload.progress !== 100 ||
						file.upload.bytesSent !== file.upload.total
					) {
						allFilesFinished = false
					}
					file.upload.progress = 100
					file.upload.bytesSent = file.upload.total
					file.endProgress()
				}
				if (allFilesFinished) {
					return
				}
			}

			for (const file of files) {
				file.handleProgress(e)
				vm.$emit(
					Events.UploadProgress,
					file,
					file.upload.progress,
					file.upload.bytesSent
				)
			}
		}
	}

	getParamName(index): string {
		return (
			this.paramName + (this.context.props.uploadMultiple ? `[${index}]` : "")
		)
	}

	cancelUpload(file: VTransmitFile): VTransmitFile[] {
		let group = this.uploadGroups[file.adapterData.groupID]
		if (!group) {
			return []
		}

		group.xhr.abort()
		this.rmGroup(file.adapterData.groupID)

		return [...group.files]
	}

	rmGroup(id: number) {
		this.uploadGroups[id] = undefined
	}
}
