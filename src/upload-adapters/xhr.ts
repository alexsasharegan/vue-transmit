import { VTransmitFile } from "../classes/VTransmitFile";
import { VTransmitUploadContext } from "../classes/VTransmitUploadContext";
import { DriverInterface, UploadResult } from "../core/interfaces";
import {
	VTransmitEvents,
	UploadStatuses,
	ErrType,
	is_function,
} from "../core/utils";

export type ParamName = string | ((file: VTransmitFile) => string);
export type StaticOrDynamic<T> = T | ((files: VTransmitFile[]) => T);

function resolveStaticOrDynamic<T>(
	x: StaticOrDynamic<T>,
	files: VTransmitFile[]
): T {
	if (is_function(x)) {
		return x(files);
	}

	return x;
}

export enum ParamNameStyle {
	Empty,
	Indexed,
	Brackets,
}

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
export type XHRDriverOptions<T = any> = {
	/**
	 * A string representing the URL to send the request to
	 * or a function called with an array of files for the upload
	 * that returns a string url.
	 */
	url: StaticOrDynamic<string>;
	/**
	 * The HTTP method to use, such as "GET", "POST", "PUT", "DELETE", etc.
	 * Ignored for non-HTTP(S) URLs.
	 *
	 * ```
	 * // default => "post"
	 * ```
	 */
	method?: StaticOrDynamic<string>;
	/**
	 * The XMLHttpRequest.withCredentials property is a Boolean that indicates
	 * whether or not cross-site Access-Control requests should be made using
	 * credentials such as cookies, authorization headers or TLS client
	 * certificates. Setting withCredentials has no effect on same-site requests.
	 */
	withCredentials?: StaticOrDynamic<boolean>;
	/**
	 * The XMLHttpRequest.timeout property is an unsigned long representing the
	 * number of milliseconds a request can take before automatically being
	 * terminated. The default value is 0, which means there is no timeout.
	 * Timeout shouldn't be used for synchronous XMLHttpRequests requests used in
	 * a document environment or it will throw an InvalidAccessError exception.
	 * When a timeout happens, a timeout event is fired.
	 */
	timeout?: StaticOrDynamic<number>;
	/**
	 * The name of the file param that gets transferred.
	 */
	paramName?: ParamName;
	/**
	 * The param name syntax for multiple uploads.
	 *
	 * **Options:**
	 * - `0 (Empty)` _(Default)_ Adds nothing to the paramName: `file`
	 * - `1 (Indexed)` Adds the array index of the file: `file[0]`
	 * - `2 (Brackets)` Adds the array-like brackets without index: `file[]`
	 */
	multipleParamNameStyle?: ParamNameStyle;
	/**
	 * An object of additional parameters to transfer to the server.
	 * This is the same as adding hidden input fields in the form element.
	 */
	params?: StaticOrDynamic<Dictionary<string>>;
	headers?: StaticOrDynamic<Dictionary<string>>;
	/**
	 * The XMLHttpRequest.responseType property is an enumerated value that
	 * returns the type of response. It also lets the author change the response
	 * type. If an empty string is set as the value of responseType, the default
	 * value text will be used.
	 *
	 * Setting the value of responseType to "document" is ignored if done in a
	 * Worker environment. When setting responseType to a particular value,
	 * the author should make sure that the server is actually sending a response
	 * compatible to that format. If the server returns data that is not
	 * compatible to the responseType that was set, the value of response will be
	 * null. Also, setting responseType for synchronous requests will throw an
	 * InvalidAccessError exception.
	 */
	responseType?: StaticOrDynamic<XMLHttpRequestResponseType>;
	/**
	 * responseParseFunc is a function that given an XMLHttpRequest
	 * returns a response object. Allows for custom response parsing.
	 */
	responseParseFunc?: (xhr: XMLHttpRequest) => T;
	errUploadError?: (xhr: XMLHttpRequest) => string;
	errUploadTimeout?: (xhr: XMLHttpRequest) => string;
	renameFile?: (name: string) => string;
};

export type XHRUploadGroup = {
	id: number;
	files: VTransmitFile[];
	xhr: XMLHttpRequest;
};

let group_id = 0;

export class XHRDriver<T = any> implements DriverInterface {
	public context: VTransmitUploadContext;
	public url: StaticOrDynamic<string>;
	public method: StaticOrDynamic<string>;
	public withCredentials: StaticOrDynamic<boolean>;
	public timeout: StaticOrDynamic<number>;
	public paramName: ParamName;
	public multipleParamNameStyle: ParamNameStyle;
	public params: StaticOrDynamic<Dictionary<string>>;
	public headers: StaticOrDynamic<Dictionary<string>>;
	public responseType: StaticOrDynamic<XMLHttpRequestResponseType>;
	public errUploadError: (xhr: XMLHttpRequest) => string;
	public errUploadTimeout: (xhr: XMLHttpRequest) => string;
	public renameFile: (name: string) => string;
	public responseParseFunc?: (xhr: XMLHttpRequest) => T;

	private uploadGroups: { [key: number]: XHRUploadGroup } = Object.create(
		null
	);

	constructor(context: VTransmitUploadContext, options: XHRDriverOptions<T>) {
		let {
			url,
			method = "post",
			withCredentials = false,
			timeout = 0,
			paramName = "file",
			multipleParamNameStyle = ParamNameStyle.Empty,
			params = Object.create(null),
			headers = {
				Accept: "application/json",
				"Cache-Control": "no-cache",
				"X-Requested-With": "XMLHttpRequest",
			},
			responseType = "json",
			responseParseFunc,
			errUploadError = (xhr: XMLHttpRequest) =>
				`Error during upload: ${xhr.statusText} [${xhr.status}]`,
			errUploadTimeout = (_xhr: XMLHttpRequest) =>
				`Error during upload: the server timed out.`,
			renameFile = (name: string) => name,
		} = options;

		if (!url) {
			throw new TypeError(
				`${
					this.constructor.name
				} requires a 'url' parameter. Supply a string or a function returning a string.`
			);
		}

		this.context = context;
		this.url = url;
		this.method = method;
		this.withCredentials = withCredentials;
		this.timeout = timeout;
		this.paramName = paramName;
		this.multipleParamNameStyle = multipleParamNameStyle;
		this.params = params;
		this.headers = headers;
		this.responseType = responseType;
		this.responseParseFunc = responseParseFunc;
		this.errUploadError = errUploadError;
		this.errUploadTimeout = errUploadTimeout;
		this.renameFile = renameFile;
	}

	uploadFiles(files: VTransmitFile[]): Promise<UploadResult<T>> {
		return new Promise(resolve => {
			if (!this.url) {
				return resolve({
					ok: false,
					err: {
						type: ErrType.Any,
						message: `Missing upload URL.`,
						data: this.url,
					},
				});
			}

			const xhr = new XMLHttpRequest();
			const updateProgress = this.handleUploadProgress(files);
			const id = group_id++;
			const params = resolveStaticOrDynamic(this.params, files);
			const headers = resolveStaticOrDynamic(this.headers, files);

			this.uploadGroups[id] = { id, xhr, files };

			for (const file of files) {
				file.driverData.groupID = id;
				file.startProgress();
			}

			xhr.open(
				resolveStaticOrDynamic(this.method, files),
				resolveStaticOrDynamic(this.url, files),
				true
			);
			// Setting the timeout after open because of IE11 issue:
			// @link https://gitlab.com/meno/dropzone/issues/8
			xhr.timeout = resolveStaticOrDynamic(this.timeout, files);
			xhr.withCredentials = resolveStaticOrDynamic(
				this.withCredentials,
				files
			);
			xhr.responseType = resolveStaticOrDynamic(this.responseType, files);

			xhr.addEventListener("error", () => {
				this.rmGroup(id);
				resolve({
					ok: false,
					err: {
						type: ErrType.Any,
						message: this.errUploadError(xhr),
						data: xhr,
					},
				});
			});
			xhr.upload.addEventListener("progress", updateProgress);
			xhr.addEventListener("timeout", () => {
				this.rmGroup(id);
				resolve({
					ok: false,
					err: {
						type: ErrType.Timeout,
						message: this.errUploadTimeout(xhr),
						data: xhr,
					},
				});
			});
			xhr.addEventListener("load", () => {
				if (
					files[0].status === UploadStatuses.Canceled ||
					xhr.readyState !== XMLHttpRequest.DONE
				) {
					return;
				}

				// The XHR is complete, so remove the group
				this.rmGroup(id);

				let response: T;
				if (this.responseParseFunc) {
					response = this.responseParseFunc(xhr);
				} else {
					response = xhr.response;

					if (!xhr.responseType) {
						let contentType = xhr.getResponseHeader("content-type");
						if (
							contentType &&
							contentType.indexOf("application/json") > -1
						) {
							try {
								response = JSON.parse(xhr.responseText);
							} catch (err) {
								return resolve({
									ok: false,
									err: {
										message: "Invalid JSON response from server.",
										type: ErrType.Any,
										data: err,
									},
								});
							}
						}
					}
				}

				// Called on load (complete) to complete progress tracking logic.
				updateProgress();
				if (xhr.status < 200 || xhr.status >= 300) {
					return resolve({
						ok: false,
						err: {
							type: ErrType.Any,
							message: this.errUploadError(xhr),
							data: xhr,
						},
					});
				}

				return resolve({
					ok: true,
					data: response,
				});
			});

			for (const headerName of Object.keys(headers)) {
				if (headers[headerName]) {
					xhr.setRequestHeader(headerName, headers[headerName]);
				}
			}

			const formData = new FormData();
			for (const key of Object.keys(params)) {
				formData.append(key, params[key]);
			}

			for (const file of files) {
				this.context.emit(VTransmitEvents.Sending, file, xhr, formData);
			}

			if (this.context.props.uploadMultiple) {
				this.context.emit(
					VTransmitEvents.SendingMultiple,
					files,
					xhr,
					formData
				);
			}

			for (let i = 0, len = files.length; i < len; i++) {
				formData.append(
					this.getParamName(files[i], i),
					files[i].nativeFile,
					this.renameFile(files[i].name)
				);
			}

			xhr.send(formData);
		});
	}

	handleUploadProgress(files: VTransmitFile[]): (e?: ProgressEvent) => void {
		const vm = this.context.vtransmit;

		return function onProgressFn(e?: ProgressEvent): void {
			if (!e) {
				let allFilesFinished = true;

				for (const file of files) {
					if (
						file.upload.progress !== 100 ||
						file.upload.bytesSent !== file.upload.total
					) {
						allFilesFinished = false;
					}
					file.upload.progress = 100;
					file.upload.bytesSent = file.upload.total;
					file.endProgress();
				}

				if (allFilesFinished) {
					return;
				}
			}

			for (const file of files) {
				if (e) {
					file.handleProgress(e);
				}
				vm.$emit(
					VTransmitEvents.UploadProgress,
					file,
					file.upload.progress,
					file.upload.bytesSent
				);
			}
		};
	}

	getParamName(file: VTransmitFile, index: string | number): string {
		let paramName: string;
		if (is_function(this.paramName)) {
			paramName = this.paramName(file);
		} else {
			paramName = this.paramName;
		}

		if (!this.context.props.uploadMultiple) {
			return paramName;
		}

		switch (this.multipleParamNameStyle) {
			case ParamNameStyle.Indexed:
				paramName += `[${index}]`;
				break;
			case ParamNameStyle.Brackets:
				paramName += `[]`;
				break;
			case ParamNameStyle.Empty:
			default:
				break;
		}

		return paramName;
	}

	cancelUpload(file: VTransmitFile): VTransmitFile[] {
		let group = this.uploadGroups[file.driverData.groupID];
		if (!group) {
			return [];
		}

		group.xhr.abort();
		this.rmGroup(file.driverData.groupID);

		return [...group.files];
	}

	rmGroup(id: number) {
		delete this.uploadGroups[id];
	}
}
