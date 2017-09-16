import noop from "lodash-es/noop"
import identity from "lodash-es/identity"

export default {
  tag: {
    type: String,
    default: "div"
  },
  uploadAreaClasses: {
    type: [Array, Object, String],
    default: null
  },
  dragClass: {
    type: String,
    default: null
  },
  url: {
    type: String,
    required: true
  },
  method: {
    type: String,
    default: "post"
  },
  withCredentials: {
    type: Boolean,
    default: false
  },
  // timeout in milliseconds
  timeout: {
    type: Number,
    default: 0
  },
  maxConcurrentUploads: {
    type: Number,
    default: 2
  },
  // Whether to send multiple files in one request.
  uploadMultiple: {
    type: Boolean,
    default: false
  },
  // in MB
  maxFileSize: {
    type: Number,
    default: 256
  },
  // The name of the file param that gets transferred.
  paramName: {
    type: String,
    default: "file"
  },
  createImageThumbnails: {
    type: Boolean,
    default: true
  },
  // in MB. When the filename exceeds this limit, the thumbnail will not be generated.
  maxThumbnailFileSize: {
    type: Number,
    default: 10
  },
  thumbnailWidth: {
    type: Number,
    default: 120
  },
  thumbnailHeight: {
    type: Number,
    default: 120
  },
  /**
   * The base that is used to calculate the file size. You can change this to
   * 1024 if you would rather display kibibytes, mebibytes, etc...
   * 1024 is technically incorrect,
   * because `1024 bytes` are `1 kibibyte` not `1 kilobyte`.
   * You can change this to `1024` if you don't care about validity.
   */
  fileSizeBase: {
    type: Number,
    default: 1000
  },
  /**
   * Can be used to limit the maximum number of files that will be handled
   * by this Dropzone
   */
  maxFiles: {
    type: Number,
    default: null
  },
  /**
   * Can be an object of additional parameters to transfer to the server.
   * This is the same as adding hidden input fields in the form element.
   */
  params: {
    type: Object,
    default: () => new Object()
  },
  headers: {
    type: Object,
    default: () => new Object()
  },
  // If true, the dropzone will present a file selector when clicked.
  clickable: {
    type: Boolean,
    default: true
  },
  // Whether hidden files in directories should be ignored.
  ignoreHiddenFiles: {
    type: Boolean,
    default: true
  },
  /**
   * You can set accepted mime types here.
   *
   * The default implementation of the `accept()` function will check this
   * property, and if the Dropzone is clickable this will be used as
   * `accept` attribute.
   *
   * This is a comma separated list of mime types or extensions. E.g.:
   * - audio/*,video/*,image/png,.pdf
   *
   * See https://developer.mozilla.org/en-US/docs/HTML/Element/input#attr-accept
   * for a reference.
   */
  acceptedFileTypes: {
    type: Array,
    default: () => []
  },
  /**
   * If false, files will be added to the queue but the queue will not be
   * processed automatically.
   * This can be useful if you need some additional user input before sending
   * files (or if you want want all files sent at once).
   * If you're ready to send the file simply call myDropzone.processQueue()
   */
  autoProcessQueue: {
    type: Boolean,
    default: true
  },
  /**
   * If false, files added to the dropzone will not be queued by default.
   * You'll have to call `enqueueFile(file)` manually.
   */
  autoQueue: {
    type: Boolean,
    default: true
  },
  /**
   * If null, no capture type will be specified
   * If camera, mobile devices will skip the file selection and choose camera
   * If microphone, mobile devices will skip the file selection and choose the microphone
   * If camcorder, mobile devices will skip the file selection and choose the camera in video mode
   * On apple devices multiple must be set to false.  AcceptedFiles may need to
   * be set to an appropriate mime type (e.g. "image/*", "audio/*", or "video/*").
   */
  capture: {
    type: String,
    default: null
  },
  /**
   * Before the file is appended to the formData, the function _renameFilename is performed for file.name, file
   * which executes the function defined in renameFilename
   */
  renameFile: {
    type: Function,
    default: identity
  },
  // If the file size is too big.
  dictFileTooBig: {
    type: String,
    default: "File is too big ({{ fileSize }}MiB). Max file size: {{ maxFileSize }}MiB."
  },
  // If the file doesn't match the file type.
  dictInvalidFileType: {
    type: String,
    default: "You can't upload files of this type."
  },
  // If the server response was invalid.
  dictResponseError: {
    type: String,
    default: "Server responded with {{ statusCode }} code."
  },
  /**
   * Displayed when the maxFiles have been exceeded
   * You can use {{maxFiles}} here, which will be replaced by the option.
   */
  dictMaxFilesExceeded: {
    type: String,
    default: "You can not upload any more files."
  },
  /**
   * If `done()` is called without argument the file is accepted
   * If you call it with an error message, the file is rejected
   * (This allows for asynchronous validation).
   */
  accept: {
    type: Function,
    default: (file, done) => done()
  },
  resize: {
    type: Function,
    default({ width, height }) {
      let info = {
        srcX: 0,
        srcY: 0,
        srcWidth: width,
        srcHeight: height
      }

      const srcRatio = width / height

      info.optWidth = this.thumbnailWidth
      info.optHeight = this.thumbnailHeight

      if (info.optWidth == null && info.optHeight == null) {
        info.optWidth = info.srcWidth
        info.optHeight = info.srcHeight
      } else if (info.optWidth == null) {
        info.optWidth = srcRatio * info.optHeight
      } else if (info.optHeight == null) {
        info.optHeight = 1 / srcRatio * info.optWidth
      }

      const trgRatio = info.optWidth / info.optHeight

      if (height < info.optHeight || width < info.optWidth) {
        info.trgHeight = info.srcHeight
        info.trgWidth = info.srcWidth
      } else {
        if (srcRatio > trgRatio) {
          info.srcHeight = height
          info.srcWidth = info.srcHeight * trgRatio
        } else {
          info.srcWidth = width
          info.srcHeight = info.srcWidth / trgRatio
        }
      }

      info.srcX = (width - info.srcWidth) / 2
      info.srcY = (height - info.srcHeight) / 2

      return info
    }
  }
}
