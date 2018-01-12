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

export class XHRUploadAdapter implements UploaderInterface {
	constructor(public context: VTransmitUploadContext, public options: { [key: string]: any }) {}

	uploadFiles(files: VTransmitFile[]): Promise<UploadReject> {
		let {
			method,
			url,
			timeout,
			withCredentials,
			responseType,
			defaultHeaders,
			headers: customHeaders,
			params,
			uploadMultiple
		} = this.options
		// } = this.context.props
		let resolve, reject
		let p = new Promise(($resolve, $reject) => {
			resolve = $resolve
			reject = $reject
		})
		const xhr = new XMLHttpRequest()

		for (const file of files) {
			file.xhr = xhr
			file.startProgress()
		}

		xhr.open(method, url, true)
		// Setting the timeout after open because of IE11 issue: https://gitlab.com/meno/dropzone/issues/8
		xhr.timeout = timeout
		xhr.withCredentials = Boolean(withCredentials)
		xhr.responseType = responseType

		const updateProgress = this.handleUploadProgress(files)

		xhr.addEventListener("error", () =>
			reject({
				type: this.context.Events.Error,
				message: `The server responded with code ${xhr.status} (${xhr.statusText}).`,
				xhr
			})
		)
		xhr.upload.addEventListener("progress", updateProgress)
		xhr.addEventListener("timeout", () =>
			reject({
				type: this.context.Events.Timeout,
				message: `The upload encountered a timeout error.`
			})
		)
		xhr.addEventListener("load", e => {
			if (files[0].status === this.context.Statuses.Canceled || xhr.readyState !== XMLHttpRequest.DONE) {
				return
			}
			let response = xhr.response

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
				handleError()
				return reject()
			}

			return resolve(files, response, e)
		})

		// Use null proto obj for the following 'for in' loop without hasOwnProperty check
		const headers = Object.assign(Object.create(null), defaultHeaders, customHeaders)
		for (const headerName in headers) {
			if (headers[headerName]) {
				xhr.setRequestHeader(headerName, headers[headerName])
			}
		}

		const formData = new FormData()
		for (const key in params) {
			formData.append(key, params[key])
		}

		for (const file of files) {
			this.context.emit(this.context.Events.Sending, file, xhr, formData)
		}
		if (uploadMultiple) {
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
		return this.options.paramName + (this.options.uploadMultiple ? `[${index}]` : "")
	}

	uploadFinished(files: VTransmitFile[], response: string | object | any[], e: Event): void {
		for (const file of files) {
			file.status = UploadStatuses.Success
			file.endProgress()
			this.$emit(VTEvents.Success, file, response, e)
			this.$emit(VTEvents.Complete, file)
		}

		if (this.uploadMultiple) {
			this.$emit(VTEvents.SuccessMultiple, files, response, e)
			this.$emit(VTEvents.CompleteMultiple, files)
		}

		if (this.options.autoProcessQueue) {
			this.processQueue()
		}
	}

	cancelUpload(file: VTransmitFile): void {
		if (file.status === UploadStatuses.Uploading) {
			const groupedFiles = this.getFilesWithXhr(file.xhr)
			file.xhr.abort()
			for (const f of groupedFiles) {
				f.status = UploadStatuses.Canceled
				this.$emit(VTEvents.Canceled, f)
			}
			if (this.uploadMultiple) {
				this.$emit(VTEvents.CanceledMultiple, groupedFiles)
			}
		} else if (file.status === UploadStatuses.Added || file.status === UploadStatuses.Queued) {
			file.status = UploadStatuses.Canceled
			this.$emit(VTEvents.Canceled, file)
			if (this.uploadMultiple) {
				this.$emit(VTEvents.CanceledMultiple, [file])
			}
		}

		if (this.autoProcessQueue) {
			this.processQueue()
		}
	}

	getFilesWithXhr(xhr: XMLHttpRequest): VTransmitFile[] {
		return this.files.filter(file => file.xhr === xhr)
	}
}
