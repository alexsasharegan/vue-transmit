import { VTransmitFile } from "../classes/VTransmitFile"
import { VTransmitUploadContext } from "../classes/VTransmitUploadContext"
import { UploaderInterface, UploadReject, UploadResolve } from "../core/interfaces"

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
		"X-Requested-With": "XMLHttpRequest"
	}
	public responseType: XMLHttpRequestResponseType = ""
	public errUploadError: (xhr: XMLHttpRequest) => string = xhr =>
		`Error during upload: ${xhr.statusText} [${xhr.status}]`
	public errUploadTimeout: (xhr: XMLHttpRequest) => string = _xhr => `Error during upload: the server timed out.`
	public renameFile: (name: string) => string = name => name
	private uploadGroups: UploadGroup[] = []

	constructor(public context: VTransmitUploadContext, options: XHRUploadOptions) {
		Object.assign(this, options)
	}

	uploadFiles(files: VTransmitFile[]): Promise<UploadReject> {
		if (!this.url) {
			throw new Error(`[Vue-Transmit] Missing upload URL.`)
		}

		const xhr = new XMLHttpRequest()
		let resolve, reject
		let p: Promise<UploadResolve> = new Promise((res, rej) => {
			resolve = res
			reject = rej
		})
		let groupID = ++GroupID
		this.uploadGroups.push({ id: groupID, xhr, files })

		for (const file of files) {
			file.adapterData.groupID = groupID
			file.startProgress()
		}

		xhr.open(this.method, this.url, true)
		// Setting the timeout after open because of IE11 issue: https://gitlab.com/meno/dropzone/issues/8
		xhr.timeout = this.timeout
		xhr.withCredentials = Boolean(this.withCredentials)
		xhr.responseType = this.responseType

		const updateProgress = this.handleUploadProgress(files)

		xhr.addEventListener("error", () => {
			this.rmGroup(groupID)
			reject({
				type: this.context.Events.Error,
				message: `The server responded with code ${xhr.status} (${xhr.statusText}).`,
				xhr
			})
		})
		xhr.upload.addEventListener("progress", updateProgress)
		xhr.addEventListener("timeout", () => {
			this.rmGroup(groupID)
			reject({
				type: this.context.Events.Timeout,
				message: `The upload encountered a timeout error.`,
				xhr
			})
		})
		xhr.addEventListener("load", e => {
			if (files[0].status === this.context.Statuses.Canceled || xhr.readyState !== XMLHttpRequest.DONE) {
				return
			}
			let response = xhr.response
			this.rmGroup(groupID)

			if (!xhr.responseType) {
				let contentType = xhr.getResponseHeader("content-type")
				response = xhr.responseText

				if (contentType && contentType.indexOf("application/json") > -1) {
					try {
						response = JSON.parse(response)
					} catch (err) {
						response = "Invalid JSON response from server."
					}
				}
			}

			// Called at load (when complete) will enable all the progress done logic.
			updateProgress()
			if (xhr.status < 200 || xhr.status >= 300) {
				return reject({
					type: this.context.Events.Error,
					message: `The server responded with code ${xhr.status} (${xhr.statusText}).`,
					xhr
				})
			}

			return resolve(files, response, e)
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
			this.context.emit(this.context.Events.Sending, file, xhr, formData)
		}
		if (this.context.props.uploadMultiple) {
			this.context.emit(this.context.Events.SendingMultiple, files, xhr, formData)
		}

		for (let i = 0; i < files.length; i++) {
			formData.append(this.getParamName(i), files[i].nativeFile, this.renameFile(files[i].name))
		}

		xhr.send(formData)

		return p
	}

	handleUploadProgress(files): (e?: ProgressEvent) => void {
		const vm = this.context.vtransmit
		return function onProgressFn(e?: ProgressEvent): void {
			if (e instanceof ProgressEvent) {
				for (const file of files) {
					file.handleProgress(e)
				}
			} else {
				let allFilesFinished = true
				for (const file of files) {
					if (file.upload.progress !== 100 || file.upload.bytesSent !== file.upload.total) {
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
				vm.$emit(VTEvents.UploadProgress, file, file.upload.progress, file.upload.bytesSent)
			}
		}
	}

	getParamName(index): string {
		return this.paramName + (this.context.props.uploadMultiple ? `[${index}]` : "")
	}

	cancelUpload(file: VTransmitFile): VTransmitFile[] {
		let group = this.uploadGroups.find(g => g.id === file.adapterData.groupID)
		if (!group) {
			return []
		}

		group.xhr.abort()
		this.rmGroup(file.adapterData.groupID)
		return group.files
	}

	getFilesWithXhr(xhr: XMLHttpRequest): VTransmitFile[] {
		return this.files.filter(file => file.xhr === xhr)
	}

	rmGroup(id: number) {
		let idx = this.uploadGroups.findIndex(g => g.id === id)
		if (idx > -1) {
			this.uploadGroups.splice(idx, 1)
		}
	}
}
