import { VTransmitFile } from "../classes/VTransmitFile";
import { VTransmitUploadContext } from "../classes/VTransmitUploadContext";
import { UploaderInterface, UploadResult } from "../core/interfaces";
import {
  VTransmitEvents as Events,
  UploadStatuses as Statuses,
  ErrType,
  is_function,
} from "../core/utils";

export type StaticOrDynamic<T> = T | ((files: VTransmitFile[]) => T);

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
export type XHRUploadOptions<T = any> = {
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
  paramName?: StaticOrDynamic<string>;
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

export type UploadGroup = {
  id: number;
  files: VTransmitFile[];
  xhr: XMLHttpRequest;
};

let group_id = 0;

export class XHRUploadAdapter<T = any> implements UploaderInterface {
  public context: VTransmitUploadContext;
  public url: StaticOrDynamic<string>;
  public method: StaticOrDynamic<string>;
  public withCredentials: StaticOrDynamic<boolean>;
  public timeout: StaticOrDynamic<number>;
  public paramName: StaticOrDynamic<string>;
  public params: StaticOrDynamic<Dictionary<string>>;
  public headers: StaticOrDynamic<Dictionary<string>>;
  public responseType: StaticOrDynamic<XMLHttpRequestResponseType>;
  public errUploadError: (xhr: XMLHttpRequest) => string;
  public errUploadTimeout: (xhr: XMLHttpRequest) => string;
  public renameFile: (name: string) => string;
  public responseParseFunc?: (xhr: XMLHttpRequest) => T;

  private uploadGroups: { [key: number]: UploadGroup } = Object.create(null);

  constructor(context: VTransmitUploadContext, options: XHRUploadOptions<T>) {
    let {
      url,
      method = "post",
      withCredentials = false,
      timeout = 0,
      paramName = "file",
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
        `The VueTransmit XHRUploadAdapter requires a 'url' parameter. Supply a string or a function returning a string.`
      );
    }

    this.context = context;
    this.url = url;
    this.method = method;
    this.withCredentials = withCredentials;
    this.timeout = timeout;
    this.paramName = paramName;
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
      const url = is_function(this.url) ? this.url(files) : this.url;
      const method = is_function(this.method)
        ? this.method(files)
        : this.method;
      const timeout = is_function(this.timeout)
        ? this.timeout(files)
        : this.timeout;
      const withCredentials = is_function(this.withCredentials)
        ? this.withCredentials(files)
        : this.withCredentials;
      const responseType = is_function(this.responseType)
        ? this.responseType(files)
        : this.responseType;
      const params = is_function(this.params)
        ? this.params(files)
        : this.params;
      const headers = is_function(this.headers)
        ? this.headers(files)
        : this.headers;

      this.uploadGroups[id] = { id, xhr, files };

      for (const file of files) {
        file.adapterData.groupID = id;
        file.startProgress();
      }

      xhr.open(method, url, true);
      // Setting the timeout after open because of IE11 issue:
      // @link https://gitlab.com/meno/dropzone/issues/8
      xhr.timeout = timeout;
      xhr.withCredentials = withCredentials;
      xhr.responseType = responseType;

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
          files[0].status === Statuses.Canceled ||
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
            if (contentType && contentType.indexOf("application/json") > -1) {
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

        // Called at load (when complete) will enable all the progress done logic.
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
        this.context.emit(Events.Sending, file, xhr, formData);
      }

      if (this.context.props.uploadMultiple) {
        this.context.emit(Events.SendingMultiple, files, xhr, formData);
      }

      for (let i = 0, len = files.length; i < len; i++) {
        formData.append(
          this.getParamName(i),
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
          Events.UploadProgress,
          file,
          file.upload.progress,
          file.upload.bytesSent
        );
      }
    };
  }

  getParamName(index: string | number): string {
    let suffix = "";
    if (this.context.props.uploadMultiple) {
      suffix = `[${index}]`;
    }
    return this.paramName + suffix;
  }

  cancelUpload(file: VTransmitFile): VTransmitFile[] {
    let group = this.uploadGroups[file.adapterData.groupID];
    if (!group) {
      return [];
    }

    group.xhr.abort();
    this.rmGroup(file.adapterData.groupID);

    return [...group.files];
  }

  rmGroup(id: number) {
    delete this.uploadGroups[id];
  }
}
