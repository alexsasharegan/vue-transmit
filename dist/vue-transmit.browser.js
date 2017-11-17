window["VueTransmit"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

(function() { module.exports = window["Vue"]; }());

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.uniqueId = uniqueId;
exports.copyOwnAndInheritedProps = copyOwnAndInheritedProps;
exports.round = round;
exports.fromBytesToKbit = fromBytesToKbit;
exports.fromBytesToMbit = fromBytesToMbit;
exports.toKbps = toKbps;
exports.toMbps = toMbps;
exports.hbsReplacer = hbsReplacer;
exports.objFactory = objFactory;
exports.scaleH = scaleH;
exports.scaleW = scaleW;
exports.scaleDims = scaleDims;
exports.resizeImg = resizeImg;
exports.webkitIsFile = webkitIsFile;
exports.webkitIsDir = webkitIsDir;
var assign = exports.assign = Object.assign;
var defineProperty = exports.defineProperty = Object.defineProperty;
var idCounter = 0;
function uniqueId(prefix) {
    var id = ++idCounter;
    return prefix + id;
}
function copyOwnAndInheritedProps(obj) {
    var newData = {};
    for (var prop in obj) {
        if (typeof obj[prop] !== "function") {
            newData[prop] = obj[prop];
        }
    }
    return newData;
}
function round(number) {
    var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    var roundStyle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "round";

    var roundingFactor = Math.pow(10, decimals);
    return Math[roundStyle](number * roundingFactor) / roundingFactor;
}
function fromBytesToKbit(bytes) {
    return bytes / 125;
}
function fromBytesToMbit(bytes) {
    return bytes / 125000;
}
function toKbps(bytes, seconds) {
    return fromBytesToKbit(bytes) / seconds;
}
function toMbps(bytes, seconds) {
    return fromBytesToMbit(bytes) / seconds;
}
var hbsRegex = exports.hbsRegex = /{{\s*?([a-zA-Z]+)\s*?}}/g;
function hbsReplacer() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return function hbsReplacerFn(match, capture) {
        return context[capture] !== undefined ? context[capture] : match;
    };
}
function objFactory() {
    return {};
}
var READY_STATES = exports.READY_STATES = undefined;
(function (READY_STATES) {
    READY_STATES[READY_STATES["UNSENT"] = 0] = "UNSENT";
    READY_STATES[READY_STATES["OPENED"] = 1] = "OPENED";
    READY_STATES[READY_STATES["HEADERS_RECEIVED"] = 2] = "HEADERS_RECEIVED";
    READY_STATES[READY_STATES["LOADING"] = 3] = "LOADING";
    READY_STATES[READY_STATES["DONE"] = 4] = "DONE";
})(READY_STATES || (exports.READY_STATES = READY_STATES = {}));
function scaleH(ratio, width) {
    return width / ratio;
}
function scaleW(ratio, height) {
    return height * ratio;
}
function scaleDims(ratio, width, height) {
    return typeof width === "number" ? [width, scaleH(ratio, width)] : [scaleW(ratio, height), height];
}
function resizeImg(file, dims) {
    // Extract the object's primitive values so we don't mutate the input
    var sRatio = file.width / file.height;
    var dRatio = dims.width / dims.height;
    var imgCoords = {
        sx: 0,
        sy: 0,
        sWidth: file.width,
        sHeight: file.height,
        dx: 0,
        dy: 0,
        dWidth: dims.width,
        dHeight: dims.height
    };
    var w = void 0,
        h = void 0;
    if (dRatio > sRatio) {
        ;

        var _scaleDims = scaleDims(dRatio, file.width);

        var _scaleDims2 = _slicedToArray(_scaleDims, 2);

        w = _scaleDims2[0];
        h = _scaleDims2[1];
    } else {
        ;

        var _scaleDims3 = scaleDims(dRatio, undefined, file.height);

        var _scaleDims4 = _slicedToArray(_scaleDims3, 2);

        w = _scaleDims4[0];
        h = _scaleDims4[1];
    }
    if (w < file.width) {
        imgCoords.sx = (file.width - w) / 2;
        imgCoords.sWidth = w;
    }
    if (h < file.height) {
        imgCoords.sy = (file.height - h) / 2;
        imgCoords.sHeight = h;
    }
    return imgCoords;
}
function webkitIsFile(entry) {
    return entry.isFile;
}
function webkitIsDir(entry) {
    return entry.isDirectory;
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__src__);


/* harmony default export */ __webpack_exports__["default"] = ({
  install(Vue, _options) {
    for (const component in __WEBPACK_IMPORTED_MODULE_0__src__) {
      if (Object.prototype.hasOwnProperty.call(__WEBPACK_IMPORTED_MODULE_0__src__, component)) {
        Vue.component(component, __WEBPACK_IMPORTED_MODULE_0__src__[component])
      }
    }
  },
  name: "vue-transmit"
});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VueTransmit = undefined;

var _VueTransmit = __webpack_require__(4);

var _VueTransmit2 = _interopRequireDefault(_VueTransmit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.VueTransmit = _VueTransmit2.default;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-ts-loader!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/VueTransmit.vue
var VueTransmit = __webpack_require__(7);
var VueTransmit_default = /*#__PURE__*/__webpack_require__.n(VueTransmit);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-040ef0f0","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/VueTransmit.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.tag,{tag:"component"},[_c('div',_vm._g(_vm._b({staticClass:"v-transmit__upload-area",class:[_vm.isDraggingClass, _vm.uploadAreaClasses],attrs:{"draggable":"true"},on:{"click":_vm.handleClickUploaderAction,"dragstart":_vm.handleDragStart,"dragend":_vm.handleDragEnd,"dragenter":function($event){$event.preventDefault();$event.stopPropagation();_vm.handleDragEnter($event)},"dragover":function($event){$event.preventDefault();$event.stopPropagation();_vm.handleDragOver($event)},"dragleave":_vm.handleDragLeave,"drop":function($event){$event.preventDefault();$event.stopPropagation();_vm.handleDrop($event)}}},'div',_vm.uploadAreaAttrs,false),_vm.uploadAreaListeners),[_vm._t("default")],2),_vm._v(" "),_vm._t("files",null,null,_vm.fileSlotBindings),_vm._v(" "),_c('input',{ref:"hiddenFileInput",class:[_vm.maxFilesReachedClass],style:(_vm.fileInputStyles),attrs:{"type":"file","multiple":_vm.multiple,"accept":_vm.filesToAccept,"capture":_vm.capture},on:{"change":_vm.onFileInputChange}})],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var components_VueTransmit = (esExports);
// CONCATENATED MODULE: ./src/components/VueTransmit.vue
function injectStyle (ssrContext) {
  __webpack_require__(5)
}
var normalizeComponent = __webpack_require__(6)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  VueTransmit_default.a,
  components_VueTransmit,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_components_VueTransmit = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _vue = __webpack_require__(0);

var _vue2 = _interopRequireDefault(_vue);

var _vuePropertyDecorator = __webpack_require__(8);

var _noop = __webpack_require__(13);

var _noop2 = _interopRequireDefault(_noop);

var _identity = __webpack_require__(14);

var _identity2 = _interopRequireDefault(_identity);

var _utils = __webpack_require__(1);

var _VTransmitFile = __webpack_require__(15);

var _VTransmitFile2 = _interopRequireDefault(_VTransmitFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var STATUSES = {
    ADDED: "added",
    QUEUED: "queued",
    ACCEPTED: "queued",
    UPLOADING: "uploading",
    PROCESSING: "uploading",
    CANCELED: "canceled",
    ERROR: "error",
    TIMEOUT: "timeout",
    SUCCESS: "success"
};
var VueTransmit = function (_Vue) {
    _inherits(VueTransmit, _Vue);

    function VueTransmit() {
        _classCallCheck(this, VueTransmit);

        var _this = _possibleConstructorReturn(this, (VueTransmit.__proto__ || Object.getPrototypeOf(VueTransmit)).apply(this, arguments));

        _this.dragging = false;
        // Used to keep the createThumbnail calls processing async one-at-a-time
        _this.processingThumbnail = false;
        _this.thumbnailQueue = [];
        _this.files = [];
        _this.defaultHeaders = {
            Accept: "application/json",
            "Cache-Control": "no-cache",
            "X-Requested-With": "XMLHttpRequest"
        };
        _this.fileInputStyles = {
            visibility: "hidden !important",
            position: "absolute !important",
            top: "0 !important",
            left: "0 !important",
            height: "0px !important",
            width: "0px !important"
        };
        return _this;
    }

    _createClass(VueTransmit, [{
        key: "onAcceptedFilesChange",
        value: function onAcceptedFilesChange(acceptedFiles) {
            if (this.maxFiles == null) {
                return;
            }
            if (acceptedFiles.length >= this.maxFiles) {
                this.$emit("max-files-reached", this.files);
            }
        }
    }, {
        key: "getFilesWithStatus",
        value: function getFilesWithStatus() {
            for (var _len = arguments.length, statuses = Array(_len), _key = 0; _key < _len; _key++) {
                statuses[_key] = arguments[_key];
            }

            return this.files.filter(function (f) {
                return statuses.indexOf(f.status) > -1;
            });
        }
    }, {
        key: "onFileInputChange",
        value: function onFileInputChange() {
            this.$emit("added-files", Array.from(this.inputEl.files).map(this.addFile));
        }
    }, {
        key: "addFile",
        value: function addFile(file) {
            var _this2 = this;

            var vTransmitFile = _VTransmitFile2.default.fromNativeFile(file);
            vTransmitFile.status = STATUSES.ADDED;
            this.files.push(vTransmitFile);
            this.$emit("added-file", vTransmitFile);
            this.enqueueThumbnail(vTransmitFile);
            this.acceptFile(vTransmitFile, function (error) {
                if (error) {
                    vTransmitFile.accepted = false;
                    _this2.errorProcessing([vTransmitFile], error);
                    _this2.$emit("rejected-file", vTransmitFile);
                } else {
                    vTransmitFile.accepted = true;
                    _this2.$emit("accepted-file", vTransmitFile);
                    if (_this2.autoQueue) {
                        _this2.enqueueFile(vTransmitFile);
                    }
                }
                _this2.$emit("accept-complete", vTransmitFile);
            });
            return vTransmitFile;
        }
    }, {
        key: "removeFile",
        value: function removeFile(file) {
            if (file.status === STATUSES.UPLOADING) {
                this.cancelUpload(file);
            }
            var idxToRm = this.files.findIndex(function (f) {
                return f.id === file.id;
            });
            if (~idxToRm) {
                this.$emit("removed-file", this.files.splice(idxToRm, 1)[0]);
                if (this.files.length === 0) {
                    this.$emit("reset");
                }
            }
        }
    }, {
        key: "removeAllFiles",
        value: function removeAllFiles() {
            var cancelInProgressUploads = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var file = _step.value;

                    if (file.status !== STATUSES.UPLOADING || cancelInProgressUploads) {
                        this.removeFile(file);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: "triggerBrowseFiles",
        value: function triggerBrowseFiles() {
            this.inputEl.click();
        }
    }, {
        key: "handleClickUploaderAction",
        value: function handleClickUploaderAction() {
            if (this.clickable) {
                this.triggerBrowseFiles();
            }
        }
    }, {
        key: "enqueueFile",
        value: function enqueueFile(file) {
            if (file.status === STATUSES.ADDED && file.accepted === true) {
                file.status = STATUSES.QUEUED;
                if (this.autoProcessQueue) {
                    setTimeout(this.processQueue, 0);
                }
            } else {
                throw new Error("This file can't be queued because it has already been processed or was rejected.");
            }
        }
    }, {
        key: "enqueueThumbnail",
        value: function enqueueThumbnail(file) {
            if (this.createImageThumbnails && file.type.match(/image.*/) && file.size <= this.maxThumbnailFileSize * 1024 * 1024) {
                this.thumbnailQueue.push(file);
                setTimeout(this.processThumbnailQueue, 0);
            }
        }
    }, {
        key: "processThumbnailQueue",
        value: function processThumbnailQueue() {
            var _this3 = this;

            // Employ a chain of self-calling, self-queuing createThumbnail calls
            // so execution can stay as non-blocking as possible.
            if (this.processingThumbnail || this.thumbnailQueue.length === 0) {
                return;
            }
            this.processingThumbnail = true;
            this.createThumbnail(this.thumbnailQueue.shift(), function () {
                _this3.processingThumbnail = false;
                _this3.processThumbnailQueue();
            });
        }
    }, {
        key: "createThumbnail",
        value: function createThumbnail(file) {
            var _this4 = this;

            var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _noop2.default;

            var reader = new FileReader();
            reader.addEventListener("load", function () {
                if (file.type === "image/svg+xml") {
                    file.dataUrl = reader.result;
                    _this4.$emit("thumbnail", file, reader.result);
                    callback();
                }
                _this4.createThumbnailFromUrl(file, reader.result, callback);
            }, false);
            // FileReader requires a native File|Blob object
            reader.readAsDataURL(file.nativeFile);
        }
    }, {
        key: "createThumbnailFromUrl",
        value: function createThumbnailFromUrl(file, imageUrl, callback) {
            var _this5 = this;

            var imgEl = document.createElement("img");
            imgEl.addEventListener("load", function () {
                file.width = imgEl.width;
                file.height = imgEl.height;
                var resizeInfo = _this5.resize(file, {
                    width: _this5.thumbnailWidth,
                    height: _this5.thumbnailHeight
                });
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                canvas.width = resizeInfo.dWidth;
                canvas.height = resizeInfo.dHeight;
                ctx.drawImage(imgEl, resizeInfo.sx, resizeInfo.sy, resizeInfo.sWidth, resizeInfo.sHeight, resizeInfo.dx, resizeInfo.dy, resizeInfo.dWidth, resizeInfo.dHeight);
                var thumbnail = canvas.toDataURL("image/png");
                file.dataUrl = thumbnail;
                _this5.$emit("thumbnail", file, thumbnail);
                if (callback) {
                    return callback();
                }
            }, false);
            if (callback) {
                imgEl.addEventListener("error", callback, false);
            }
            imgEl.src = imageUrl;
        }
    }, {
        key: "processQueue",
        value: function processQueue() {
            var processingLength = this.uploadingFiles.length;
            if (processingLength >= this.maxConcurrentUploads || this.queuedFiles.length === 0) {
                return;
            }
            var queuedFiles = [].concat(_toConsumableArray(this.queuedFiles));
            if (this.uploadMultiple) {
                return this.processFiles(queuedFiles.slice(0, this.maxConcurrentUploads - processingLength));
            } else {
                for (var i = processingLength; i < this.maxConcurrentUploads; i++) {
                    if (queuedFiles.length) {
                        this.processFile(queuedFiles.shift());
                    }
                }
            }
        }
    }, {
        key: "processFile",
        value: function processFile(file) {
            this.processFiles([file]);
        }
    }, {
        key: "processFiles",
        value: function processFiles(files) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = files[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var file = _step2.value;

                    file.processing = true;
                    file.status = STATUSES.UPLOADING;
                    this.$emit("processing", file);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            if (this.uploadMultiple) {
                this.$emit("processing-multiple", files);
            }
            return this.uploadFiles(files);
        }
    }, {
        key: "getFilesWithXhr",
        value: function getFilesWithXhr(xhr) {
            return this.files.filter(function (file) {
                return file.xhr === xhr;
            });
        }
    }, {
        key: "cancelUpload",
        value: function cancelUpload(file) {
            if (file.status === STATUSES.UPLOADING) {
                var groupedFiles = this.getFilesWithXhr(file.xhr);
                file.xhr.abort();
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = groupedFiles[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var f = _step3.value;

                        f.status = STATUSES.CANCELED;
                        this.$emit("canceled", f);
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }

                if (this.uploadMultiple) {
                    this.$emit("canceled-multiple", groupedFiles);
                }
            } else if (file.status === STATUSES.ADDED || file.status === STATUSES.QUEUED) {
                file.status = STATUSES.CANCELED;
                this.$emit("canceled", file);
                if (this.uploadMultiple) {
                    this.$emit("canceled-multiple", [file]);
                }
            }
            if (this.autoProcessQueue) {
                this.processQueue();
            }
        }
    }, {
        key: "uploadFile",
        value: function uploadFile(file) {
            this.uploadFiles([file]);
        }
    }, {
        key: "uploadFiles",
        value: function uploadFiles(files) {
            var _this6 = this;

            var response = null;
            var xhr = new XMLHttpRequest();
            xhr.timeout = this.timeout;
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = files[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var file = _step4.value;

                    file.xhr = xhr;
                    file.startProgress();
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            xhr.open(this.method, this.url, true);
            xhr.withCredentials = Boolean(this.withCredentials);
            var handleError = this.handleUploadError(files, xhr);
            var updateProgress = this.handleUploadProgress(files);
            xhr.addEventListener("error", handleError);
            xhr.upload.addEventListener("progress", updateProgress);
            xhr.addEventListener("timeout", this.handleTimeout(files, xhr));
            xhr.addEventListener("load", function (e) {
                if (files[0].status === STATUSES.CANCELED || xhr.readyState !== _utils.READY_STATES.DONE) {
                    return;
                }
                response = xhr.responseText;
                if (xhr.responseType !== "arraybuffer" && xhr.responseType !== "blob") {
                    if (xhr.getResponseHeader("content-type") && ~xhr.getResponseHeader("content-type").indexOf("application/json")) {
                        try {
                            response = JSON.parse(response);
                        } catch (err) {
                            response = "Invalid JSON response from server.";
                        }
                    }
                }
                // Called at load (when complete) will enable all the progress done logic.
                updateProgress();
                if (xhr.status < 200 || xhr.status >= 300) {
                    return handleError();
                } else {
                    return _this6.uploadFinished(files, response, e);
                }
            });
            // Use null proto obj for the following 'for in' loop
            var headers = Object.assign(Object.create(null), this.defaultHeaders, this.headers);
            for (var headerName in headers) {
                if (headers[headerName]) {
                    xhr.setRequestHeader(headerName, headers[headerName]);
                }
            }
            var formData = new FormData();
            for (var key in this.params) {
                formData.append(key, this.params[key]);
            }
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = files[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var _file = _step5.value;

                    this.$emit("sending", _file, xhr, formData);
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }

            if (this.uploadMultiple) {
                this.$emit("sending-multiple", files, xhr, formData);
            }
            for (var i = 0; i < files.length; i++) {
                formData.append(this.getParamName(i), files[i].nativeFile, this.renameFile(files[i].name));
            }
            return xhr.send(formData);
        }
    }, {
        key: "handleUploadError",
        value: function handleUploadError(files, xhr) {
            var vm = this;
            return function onUploadErrorFn() {
                if (files[0].status !== STATUSES.CANCELED) {
                    var message = vm.dictResponseError.replace(_utils.hbsRegex, (0, _utils.hbsReplacer)({ statusCode: xhr.status }));
                    vm.errorProcessing(files, message, xhr);
                }
            };
        }
    }, {
        key: "handleTimeout",
        value: function handleTimeout(files, xhr) {
            var vm = this;
            return function onTimeoutFn(e) {
                var _iteratorNormalCompletion6 = true;
                var _didIteratorError6 = false;
                var _iteratorError6 = undefined;

                try {
                    for (var _iterator6 = files[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                        var file = _step6.value;

                        file.status = STATUSES.TIMEOUT;
                        file.endProgress();
                        vm.$emit("timeout", file, e, xhr);
                    }
                } catch (err) {
                    _didIteratorError6 = true;
                    _iteratorError6 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion6 && _iterator6.return) {
                            _iterator6.return();
                        }
                    } finally {
                        if (_didIteratorError6) {
                            throw _iteratorError6;
                        }
                    }
                }

                vm.$emit("timeout-multiple", files, e, xhr);
                if (this.autoProcessQueue) {
                    this.processQueue();
                }
            };
        }
    }, {
        key: "handleUploadProgress",
        value: function handleUploadProgress(files) {
            var vm = this;
            return function onProgressFn(e) {
                if (e instanceof ProgressEvent) {
                    var _iteratorNormalCompletion7 = true;
                    var _didIteratorError7 = false;
                    var _iteratorError7 = undefined;

                    try {
                        for (var _iterator7 = files[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                            var file = _step7.value;

                            file.handleProgress(e);
                        }
                    } catch (err) {
                        _didIteratorError7 = true;
                        _iteratorError7 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion7 && _iterator7.return) {
                                _iterator7.return();
                            }
                        } finally {
                            if (_didIteratorError7) {
                                throw _iteratorError7;
                            }
                        }
                    }
                } else {
                    var allFilesFinished = true;
                    var _iteratorNormalCompletion8 = true;
                    var _didIteratorError8 = false;
                    var _iteratorError8 = undefined;

                    try {
                        for (var _iterator8 = files[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                            var _file2 = _step8.value;

                            if (_file2.upload.progress !== 100 || _file2.upload.bytesSent !== _file2.upload.total) {
                                allFilesFinished = false;
                            }
                            _file2.upload.progress = 100;
                            _file2.upload.bytesSent = _file2.upload.total;
                            _file2.endProgress();
                        }
                    } catch (err) {
                        _didIteratorError8 = true;
                        _iteratorError8 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion8 && _iterator8.return) {
                                _iterator8.return();
                            }
                        } finally {
                            if (_didIteratorError8) {
                                throw _iteratorError8;
                            }
                        }
                    }

                    if (allFilesFinished) {
                        return;
                    }
                }
                var _iteratorNormalCompletion9 = true;
                var _didIteratorError9 = false;
                var _iteratorError9 = undefined;

                try {
                    for (var _iterator9 = files[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                        var _file3 = _step9.value;

                        vm.$emit("upload-progress", _file3, _file3.upload.progress, _file3.upload.bytesSent);
                    }
                } catch (err) {
                    _didIteratorError9 = true;
                    _iteratorError9 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion9 && _iterator9.return) {
                            _iterator9.return();
                        }
                    } finally {
                        if (_didIteratorError9) {
                            throw _iteratorError9;
                        }
                    }
                }
            };
        }
    }, {
        key: "updateTotalUploadProgress",
        value: function updateTotalUploadProgress() {
            var progress = this.activeFiles.reduce(function (memo, file) {
                memo.totalBytesSent += file.upload.bytesSent;
                memo.totalBytes += file.upload.total;
                return memo;
            }, { totalBytesSent: 0, totalBytes: 0, totalProgress: 100 });
            if (this.activeFiles.length) {
                progress.totalProgress = 100 * progress.totalBytesSent / progress.totalBytes;
            }
            this.$emit("total-upload-progress", progress);
        }
    }, {
        key: "getParamName",
        value: function getParamName(index) {
            return this.paramName + (this.uploadMultiple ? "[" + index + "]" : "");
        }
    }, {
        key: "uploadFinished",
        value: function uploadFinished(files, response, e) {
            var _iteratorNormalCompletion10 = true;
            var _didIteratorError10 = false;
            var _iteratorError10 = undefined;

            try {
                for (var _iterator10 = files[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                    var file = _step10.value;

                    file.status = STATUSES.SUCCESS;
                    file.endProgress();
                    this.$emit("success", file, response, e);
                    this.$emit("complete", file);
                }
            } catch (err) {
                _didIteratorError10 = true;
                _iteratorError10 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion10 && _iterator10.return) {
                        _iterator10.return();
                    }
                } finally {
                    if (_didIteratorError10) {
                        throw _iteratorError10;
                    }
                }
            }

            if (this.uploadMultiple) {
                this.$emit("success-multiple", files, response, e);
                this.$emit("complete-multiple", files);
            }
            if (this.autoProcessQueue) {
                this.processQueue();
            }
        }
    }, {
        key: "errorProcessing",
        value: function errorProcessing(files, message, xhr) {
            var _iteratorNormalCompletion11 = true;
            var _didIteratorError11 = false;
            var _iteratorError11 = undefined;

            try {
                for (var _iterator11 = files[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                    var file = _step11.value;

                    file.status = STATUSES.ERROR;
                    file.endProgress();
                    this.$emit("error", file, message, xhr);
                    this.$emit("complete", file);
                }
            } catch (err) {
                _didIteratorError11 = true;
                _iteratorError11 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion11 && _iterator11.return) {
                        _iterator11.return();
                    }
                } finally {
                    if (_didIteratorError11) {
                        throw _iteratorError11;
                    }
                }
            }

            if (this.uploadMultiple) {
                this.$emit("error-multiple", files, message, xhr);
                this.$emit("complete-multiple", files);
            }
            if (this.autoProcessQueue) {
                return this.processQueue();
            }
        }
    }, {
        key: "acceptFile",
        value: function acceptFile(file, done) {
            if (file.size > this.maxFileSize * 1024 * 1024) {
                done(this.dictFileTooBig.replace(_utils.hbsRegex, (0, _utils.hbsReplacer)({
                    fileSize: Math.round(file.size / 1024 / 10.24) / 100,
                    maxFileSize: this.maxFileSize
                })));
            } else if (!this.isValidFileType(file, this.acceptedFileTypes)) {
                done(this.dictInvalidFileType);
            } else if (this.maxFiles != null && this.acceptedFiles.length >= this.maxFiles) {
                done(this.dictMaxFilesExceeded.replace(_utils.hbsRegex, (0, _utils.hbsReplacer)({ maxFiles: this.maxFiles })));
                this.$emit("max-files-exceeded", file);
            } else {
                // Call the prop callback for the client to validate.
                this.accept(file, done);
            }
        }
    }, {
        key: "isValidFileType",
        value: function isValidFileType(file, acceptedFileTypes) {
            if (!acceptedFileTypes.length) {
                return true;
            }
            var mimeType = file.type;
            var baseMimeType = mimeType.replace(/\/.*$/, "");
            // Return true on the first condition match,
            // otherwise exhaust all conditions and return false.
            for (var i = 0; i < acceptedFileTypes.length; i++) {
                var validType = acceptedFileTypes[i];
                if (validType.charAt(0) === ".") {
                    // Handle extension validation
                    // Ensure extension exists at the end of the filename.
                    if (file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length) !== -1) {
                        return true;
                    }
                } else if (/\/\*$/.test(validType)) {
                    // Handle globbed mimetype validation ("image/*")
                    if (baseMimeType === validType.replace(/\/.*$/, "")) {
                        return true;
                    }
                } else {
                    if (mimeType === validType) {
                        return true;
                    }
                }
            }
            return false;
        }
    }, {
        key: "handleDragStart",
        value: function handleDragStart(e) {
            this.$emit("drag-start", e);
        }
    }, {
        key: "handleDragOver",
        value: function handleDragOver(e) {
            this.dragging = true;
            var effect = void 0;
            try {
                // Handle browser bug
                effect = e.dataTransfer.effectAllowed;
            } catch (error) {}
            e.dataTransfer.dropEffect = effect === "move" || effect === "linkMove" ? "move" : "copy";
            this.$emit("drag-over", e);
        }
    }, {
        key: "handleDragEnter",
        value: function handleDragEnter(e) {
            this.dragging = true;
            this.$emit("drag-enter", e);
        }
    }, {
        key: "handleDragLeave",
        value: function handleDragLeave(e) {
            this.dragging = false;
            this.$emit("drag-leave", e);
        }
    }, {
        key: "handleDragEnd",
        value: function handleDragEnd(e) {
            this.dragging = false;
            this.$emit("drag-end", e);
        }
    }, {
        key: "handleDrop",
        value: function handleDrop(e) {
            this.dragging = false;
            if (!e.dataTransfer) {
                return;
            }
            this.$emit("drop", e);
            var files = Array.from(e.dataTransfer.files);
            this.$emit("added-files", files);
            if (files.length && e.dataTransfer.items) {
                var items = Array.from(e.dataTransfer.items);
                if (items && items.length && items[0].webkitGetAsEntry) {
                    this.addFilesFromItems(items);
                } else {
                    this.handleFiles(files);
                }
            } else {
                this.handleFiles(files);
            }
        }
    }, {
        key: "paste",
        value: function paste(e) {
            if (!e || !e.clipboardData || !e.clipboardData.items) {
                return;
            }
            this.$emit("paste", e);
            var items = Array.from(e.clipboardData.items);
            if (items.length) {
                this.addFilesFromItems(items);
            }
        }
    }, {
        key: "handleFiles",
        value: function handleFiles(files) {
            return files.map(this.addFile);
        }
    }, {
        key: "addFilesFromItems",
        value: function addFilesFromItems(items) {
            var _iteratorNormalCompletion12 = true;
            var _didIteratorError12 = false;
            var _iteratorError12 = undefined;

            try {
                for (var _iterator12 = items[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                    var item = _step12.value;

                    if (item.webkitGetAsEntry) {
                        var entry = item.webkitGetAsEntry();
                        if (entry == null) {
                            continue;
                        }
                        if ((0, _utils.webkitIsFile)(entry)) {
                            entry.file(this.addFile);
                        } else if ((0, _utils.webkitIsDir)(entry)) {
                            this.addFilesFromDirectory(entry, entry.name);
                        }
                    } else if (item.getAsFile) {
                        if (item.kind === "file") {
                            this.addFile(item.getAsFile());
                        }
                    }
                }
            } catch (err) {
                _didIteratorError12 = true;
                _iteratorError12 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion12 && _iterator12.return) {
                        _iterator12.return();
                    }
                } finally {
                    if (_didIteratorError12) {
                        throw _iteratorError12;
                    }
                }
            }
        }
    }, {
        key: "addFilesFromDirectory",
        value: function addFilesFromDirectory(directory, path) {
            var _this7 = this;

            directory.createReader().readEntries(function (entries) {
                var _iteratorNormalCompletion13 = true;
                var _didIteratorError13 = false;
                var _iteratorError13 = undefined;

                try {
                    for (var _iterator13 = entries[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                        var entry = _step13.value;

                        if (entry == null) {
                            continue;
                        }
                        if ((0, _utils.webkitIsDir)(entry)) {
                            _this7.addFilesFromDirectory(entry, path + "/" + entry.name);
                            continue;
                        }
                        if ((0, _utils.webkitIsFile)(entry)) {
                            entry.file(function (file) {
                                if (_this7.ignoreHiddenFiles && /^\./.test(file.name)) {
                                    return;
                                }
                                ;
                                file.fullPath = path + "/" + file.name;
                                _this7.addFile(file);
                            }, console.error);
                        }
                    }
                } catch (err) {
                    _didIteratorError13 = true;
                    _iteratorError13 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion13 && _iterator13.return) {
                            _iterator13.return();
                        }
                    } finally {
                        if (_didIteratorError13) {
                            throw _iteratorError13;
                        }
                    }
                }
            }, console.error);
        }
    }, {
        key: "mounted",
        value: function mounted() {
            var _this8 = this;

            this.$on("upload-progress", this.updateTotalUploadProgress);
            this.$on("removed-file", this.updateTotalUploadProgress);
            this.$on("canceled", function (file) {
                return _this8.$emit("complete", file);
            });
            this.$on("complete", function (file) {
                if (_this8.addedFiles.length === 0 && _this8.uploadingFiles.length === 0 && _this8.queuedFiles.length === 0) {
                    setTimeout(function () {
                        return _this8.$emit("queue-complete", file);
                    }, 0);
                }
            });
            this.$emit("initialize", this);
        }
    }, {
        key: "inputEl",
        get: function get() {
            var el = null;
            if (this.$refs.hiddenFileInput instanceof HTMLInputElement) {
                el = this.$refs.hiddenFileInput;
            }
            return el;
        }
    }, {
        key: "filesToAccept",
        get: function get() {
            return this.acceptedFileTypes.join(",");
        }
    }, {
        key: "multiple",
        get: function get() {
            return this.maxFiles === null || this.maxFiles > 1;
        }
    }, {
        key: "acceptedFiles",
        get: function get() {
            return this.files.filter(function (f) {
                return f.accepted;
            });
        }
    }, {
        key: "rejectedFiles",
        get: function get() {
            return this.files.filter(function (f) {
                return !f.accepted;
            });
        }
    }, {
        key: "addedFiles",
        get: function get() {
            return this.getFilesWithStatus(STATUSES.ADDED);
        }
    }, {
        key: "queuedFiles",
        get: function get() {
            return this.getFilesWithStatus(STATUSES.QUEUED);
        }
    }, {
        key: "uploadingFiles",
        get: function get() {
            return this.getFilesWithStatus(STATUSES.UPLOADING);
        }
    }, {
        key: "activeFiles",
        get: function get() {
            return this.getFilesWithStatus(STATUSES.UPLOADING, STATUSES.QUEUED);
        }
    }, {
        key: "maxFilesReached",
        get: function get() {
            // Loose equality checks null && undefined
            return this.maxFiles != null && this.acceptedFiles.length >= this.maxFiles;
        }
    }, {
        key: "maxFilesReachedClass",
        get: function get() {
            return this.maxFilesReached ? "v-transmit__max-files--reached" : null;
        }
    }, {
        key: "isDraggingClass",
        get: function get() {
            return _defineProperty({
                "v-transmit__upload-area--is-dragging": this.dragging
            }, this.dragClass, this.dragging);
        }
    }, {
        key: "isUploading",
        get: function get() {
            return this.uploadingFiles.length > 0;
        }
    }, {
        key: "fileSlotBindings",
        get: function get() {
            return {
                files: this.files,
                acceptedFiles: this.acceptedFiles,
                rejectedFiles: this.rejectedFiles,
                addedFiles: this.addedFiles,
                queuedFiles: this.queuedFiles,
                uploadingFiles: this.uploadingFiles,
                activeFiles: this.activeFiles,
                isUploading: this.isUploading
            };
        }
    }]);

    return VueTransmit;
}(_vue2.default);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: String, default: "div" })], VueTransmit.prototype, "tag", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: [Array, Object, String], default: null })], VueTransmit.prototype, "uploadAreaClasses", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: Object, default: _utils.objFactory })], VueTransmit.prototype, "uploadAreaAttrs", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: Object, default: _utils.objFactory })], VueTransmit.prototype, "uploadAreaListeners", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: String, default: null })], VueTransmit.prototype, "dragClass", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: String, required: true })], VueTransmit.prototype, "url", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: String, default: "post" })], VueTransmit.prototype, "method", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: Boolean, default: false })], VueTransmit.prototype, "withCredentials", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: Number, default: 0 })], VueTransmit.prototype, "timeout", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: Number, default: 2 })], VueTransmit.prototype, "maxConcurrentUploads", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: Boolean, default: false })], VueTransmit.prototype, "uploadMultiple", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: Number, default: 256 })], VueTransmit.prototype, "maxFileSize", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: String, default: "file" })], VueTransmit.prototype, "paramName", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: Boolean, default: true })], VueTransmit.prototype, "createImageThumbnails", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: Number, default: 10 })], VueTransmit.prototype, "maxThumbnailFileSize", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: Number, default: 120 })], VueTransmit.prototype, "thumbnailWidth", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: Number, default: 120 })], VueTransmit.prototype, "thumbnailHeight", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: Number, default: 1000 })], VueTransmit.prototype, "fileSizeBase", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: Number, default: null })], VueTransmit.prototype, "maxFiles", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: Object, default: _utils.objFactory })], VueTransmit.prototype, "params", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: Object, default: _utils.objFactory })], VueTransmit.prototype, "headers", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: Boolean, default: true })], VueTransmit.prototype, "clickable", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: Boolean, default: true })], VueTransmit.prototype, "ignoreHiddenFiles", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: Array, default: function _default() {
        return [];
    } })], VueTransmit.prototype, "acceptedFileTypes", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: Boolean, default: true })], VueTransmit.prototype, "autoProcessQueue", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: Boolean, default: true })], VueTransmit.prototype, "autoQueue", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: String, default: null })], VueTransmit.prototype, "capture", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: Function, default: _identity2.default })], VueTransmit.prototype, "renameFile", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: String, default: "File is too big ({{ fileSize }}MiB). Max file size: {{ maxFileSize }}MB." })], VueTransmit.prototype, "dictFileTooBig", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: String, default: "You can't upload files of this type." })], VueTransmit.prototype, "dictInvalidFileType", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: String, default: "Server responded with {{ statusCode }} code." })], VueTransmit.prototype, "dictResponseError", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: String, default: "You can not upload any more files." })], VueTransmit.prototype, "dictMaxFilesExceeded", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: Function, default: function _default(_, done) {
        return done();
    } })], VueTransmit.prototype, "accept", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: Function, default: _utils.resizeImg })], VueTransmit.prototype, "resize", void 0);
__decorate([(0, _vuePropertyDecorator.Watch)("acceptedFiles")], VueTransmit.prototype, "onAcceptedFilesChange", null);
VueTransmit = __decorate([(0, _vuePropertyDecorator.Component)({ name: "VueTransmit" })], VueTransmit);
exports.default = VueTransmit;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
	 true ? factory(exports, __webpack_require__(0), __webpack_require__(9), __webpack_require__(10)) :
	typeof define === 'function' && define.amd ? define(['exports', 'vue', 'vue-class-component', 'reflect-metadata'], factory) :
	(factory((global.VuePropertyDecorator = {}),global.Vue,global.VueClassComponent));
}(this, (function (exports,vue,vueClassComponent) { 'use strict';

vue = vue && vue.hasOwnProperty('default') ? vue['default'] : vue;
var vueClassComponent__default = 'default' in vueClassComponent ? vueClassComponent['default'] : vueClassComponent;

/** vue-property-decorator verson 6.0.0 MIT LICENSE copyright 2017 kaorun343 */
'use strict';
/**
 * decorator of an inject
 * @param key key
 * @return PropertyDecorator
 */
function Inject(key) {
    return vueClassComponent.createDecorator(function (componentOptions, k) {
        if (typeof componentOptions.inject === 'undefined') {
            componentOptions.inject = {};
        }
        if (!Array.isArray(componentOptions.inject)) {
            componentOptions.inject[k] = key || k;
        }
    });
}
/**
 * decorator of a provide
 * @param key key
 * @return PropertyDecorator | void
 */
function Provide(key) {
    return vueClassComponent.createDecorator(function (componentOptions, k) {
        var provide = componentOptions.provide;
        if (typeof provide !== 'function' || !provide.managed) {
            var original_1 = componentOptions.provide;
            provide = componentOptions.provide = function () {
                var rv = Object.create((typeof original_1 === 'function' ? original_1.call(this) : original_1) || null);
                for (var i in provide.managed)
                    rv[provide.managed[i]] = this[i];
                return rv;
            };
            provide.managed = {};
        }
        provide.managed[k] = key || k;
    });
}
/**
 * decorator of model
 * @param  event event name
 * @return PropertyDecorator
 */
function Model(event, options) {
    if (options === void 0) { options = {}; }
    return function (target, key) {
        if (!Array.isArray(options) && typeof options.type === 'undefined') {
            options.type = Reflect.getMetadata('design:type', target, key);
        }
        vueClassComponent.createDecorator(function (componentOptions, k) {
            (componentOptions.props || (componentOptions.props = {}))[k] = options;
            componentOptions.model = { prop: k, event: event || k };
        })(target, key);
    };
}
/**
 * decorator of a prop
 * @param  options the options for the prop
 * @return PropertyDecorator | void
 */
function Prop(options) {
    if (options === void 0) { options = {}; }
    return function (target, key) {
        if (!Array.isArray(options) && typeof options.type === 'undefined') {
            options.type = Reflect.getMetadata('design:type', target, key);
        }
        vueClassComponent.createDecorator(function (componentOptions, k) {
            (componentOptions.props || (componentOptions.props = {}))[k] = options;
        })(target, key);
    };
}
/**
 * decorator of a watch function
 * @param  path the path or the expression to observe
 * @param  WatchOption
 * @return MethodDecorator
 */
function Watch(path, options) {
    if (options === void 0) { options = {}; }
    var _a = options.deep, deep = _a === void 0 ? false : _a, _b = options.immediate, immediate = _b === void 0 ? false : _b;
    return vueClassComponent.createDecorator(function (componentOptions, handler) {
        if (typeof componentOptions.watch !== 'object') {
            componentOptions.watch = Object.create(null);
        }
        componentOptions.watch[path] = { handler: handler, deep: deep, immediate: immediate };
    });
}
// Code copied from Vue/src/shared/util.js
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = function (str) { return str.replace(hyphenateRE, '-$1').toLowerCase(); };
/**
 * decorator of an event-emitter function
 * @param  event The name of the event
 * @return MethodDecorator
 */
function Emit(event) {
    return function (target, key, descriptor) {
        key = hyphenate(key);
        var original = descriptor.value;
        descriptor.value = function emitter() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (original.apply(this, args) !== false)
                this.$emit.apply(this, [event || key].concat(args));
        };
    };
}

exports.Component = vueClassComponent__default;
exports.Vue = vue;
exports.Inject = Inject;
exports.Provide = Provide;
exports.Model = Model;
exports.Prop = Prop;
exports.Watch = Watch;
exports.Emit = Emit;

Object.defineProperty(exports, '__esModule', { value: true });

})));


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
  * vue-class-component v6.1.0
  * (c) 2015-2017 Evan You
  * @license MIT
  */


Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue = _interopDefault(__webpack_require__(0));

function createDecorator(factory) {
    return function (target, key, index) {
        var Ctor = typeof target === 'function'
            ? target
            : target.constructor;
        if (!Ctor.__decorators__) {
            Ctor.__decorators__ = [];
        }
        if (typeof index !== 'number') {
            index = undefined;
        }
        Ctor.__decorators__.push(function (options) { return factory(options, key, index); });
    };
}
function warn(message) {
    if (typeof console !== 'undefined') {
        console.warn('[vue-class-component] ' + message);
    }
}

function collectDataFromConstructor(vm, Component) {
    Component.prototype._init = function () {
        var _this = this;
        var keys = Object.getOwnPropertyNames(vm);
        if (vm.$options.props) {
            for (var key in vm.$options.props) {
                if (!vm.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }
        }
        keys.forEach(function (key) {
            if (key.charAt(0) !== '_') {
                Object.defineProperty(_this, key, {
                    get: function () { return vm[key]; },
                    set: function (value) { return vm[key] = value; },
                    configurable: true
                });
            }
        });
    };
    var data = new Component();
    var plainData = {};
    Object.keys(data).forEach(function (key) {
        if (data[key] !== undefined) {
            plainData[key] = data[key];
        }
    });
    if (false) {
        if (!(Component.prototype instanceof Vue) && Object.keys(plainData).length > 0) {
            warn('Component class must inherit Vue or its descendant class ' +
                'when class property is used.');
        }
    }
    return plainData;
}

var $internalHooks = [
    'data',
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeDestroy',
    'destroyed',
    'beforeUpdate',
    'updated',
    'activated',
    'deactivated',
    'render',
    'errorCaptured'
];
function componentFactory(Component, options) {
    if (options === void 0) { options = {}; }
    options.name = options.name || Component._componentTag || Component.name;
    var proto = Component.prototype;
    Object.getOwnPropertyNames(proto).forEach(function (key) {
        if (key === 'constructor') {
            return;
        }
        if ($internalHooks.indexOf(key) > -1) {
            options[key] = proto[key];
            return;
        }
        var descriptor = Object.getOwnPropertyDescriptor(proto, key);
        if (typeof descriptor.value === 'function') {
            (options.methods || (options.methods = {}))[key] = descriptor.value;
        }
        else if (descriptor.get || descriptor.set) {
            (options.computed || (options.computed = {}))[key] = {
                get: descriptor.get,
                set: descriptor.set
            };
        }
    });
    (options.mixins || (options.mixins = [])).push({
        data: function () {
            return collectDataFromConstructor(this, Component);
        }
    });
    var decorators = Component.__decorators__;
    if (decorators) {
        decorators.forEach(function (fn) { return fn(options); });
    }
    var superProto = Object.getPrototypeOf(Component.prototype);
    var Super = superProto instanceof Vue
        ? superProto.constructor
        : Vue;
    var Extended = Super.extend(options);
    for (var staticKey in Component) {
        if (Component.hasOwnProperty(staticKey)) {
            Extended[staticKey] = Component[staticKey];
        }
    }
    return Extended;
}

function Component(options) {
    if (typeof options === 'function') {
        return componentFactory(options);
    }
    return function (Component) {
        return componentFactory(Component, options);
    };
}
(function (Component) {
    function registerHooks(keys) {
        $internalHooks.push.apply($internalHooks, keys);
    }
    Component.registerHooks = registerHooks;
})(Component || (Component = {}));
var Component$1 = Component;

exports['default'] = Component$1;
exports.createDecorator = createDecorator;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var Reflect;
(function (Reflect) {
    "use strict";
    var hasOwn = Object.prototype.hasOwnProperty;
    // feature test for Symbol support
    var supportsSymbol = typeof Symbol === "function";
    var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
    var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
    var HashMap;
    (function (HashMap) {
        var supportsCreate = typeof Object.create === "function"; // feature test for Object.create support
        var supportsProto = { __proto__: [] } instanceof Array; // feature test for __proto__ support
        var downLevel = !supportsCreate && !supportsProto;
        // create an object in dictionary mode (a.k.a. "slow" mode in v8)
        HashMap.create = supportsCreate
            ? function () { return MakeDictionary(Object.create(null)); }
            : supportsProto
                ? function () { return MakeDictionary({ __proto__: null }); }
                : function () { return MakeDictionary({}); };
        HashMap.has = downLevel
            ? function (map, key) { return hasOwn.call(map, key); }
            : function (map, key) { return key in map; };
        HashMap.get = downLevel
            ? function (map, key) { return hasOwn.call(map, key) ? map[key] : undefined; }
            : function (map, key) { return map[key]; };
    })(HashMap || (HashMap = {}));
    // Load global or shim versions of Map, Set, and WeakMap
    var functionPrototype = Object.getPrototypeOf(Function);
    var usePolyfill = typeof process === "object" && Object({"NODE_ENV":"production"}) && Object({"NODE_ENV":"production"})["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
    var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
    var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
    var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
    // [[Metadata]] internal slot
    // https://rbuckton.github.io/reflect-metadata/#ordinary-object-internal-methods-and-internal-slots
    var Metadata = new _WeakMap();
    /**
      * Applies a set of decorators to a property of a target object.
      * @param decorators An array of decorators.
      * @param target The target object.
      * @param propertyKey (Optional) The property key to decorate.
      * @param attributes (Optional) The property descriptor for the target key.
      * @remarks Decorators are applied in reverse order.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     Example = Reflect.decorate(decoratorsArray, Example);
      *
      *     // property (on constructor)
      *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
      *
      *     // property (on prototype)
      *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
      *
      *     // method (on constructor)
      *     Object.defineProperty(Example, "staticMethod",
      *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
      *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
      *
      *     // method (on prototype)
      *     Object.defineProperty(Example.prototype, "method",
      *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
      *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
      *
      */
    function decorate(decorators, target, propertyKey, attributes) {
        if (!IsUndefined(propertyKey)) {
            if (!IsArray(decorators))
                throw new TypeError();
            if (!IsObject(target))
                throw new TypeError();
            if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
                throw new TypeError();
            if (IsNull(attributes))
                attributes = undefined;
            propertyKey = ToPropertyKey(propertyKey);
            return DecorateProperty(decorators, target, propertyKey, attributes);
        }
        else {
            if (!IsArray(decorators))
                throw new TypeError();
            if (!IsConstructor(target))
                throw new TypeError();
            return DecorateConstructor(decorators, target);
        }
    }
    Reflect.decorate = decorate;
    // 4.1.2 Reflect.metadata(metadataKey, metadataValue)
    // https://rbuckton.github.io/reflect-metadata/#reflect.metadata
    /**
      * A default metadata decorator factory that can be used on a class, class member, or parameter.
      * @param metadataKey The key for the metadata entry.
      * @param metadataValue The value for the metadata entry.
      * @returns A decorator function.
      * @remarks
      * If `metadataKey` is already defined for the target and target key, the
      * metadataValue for that key will be overwritten.
      * @example
      *
      *     // constructor
      *     @Reflect.metadata(key, value)
      *     class Example {
      *     }
      *
      *     // property (on constructor, TypeScript only)
      *     class Example {
      *         @Reflect.metadata(key, value)
      *         static staticProperty;
      *     }
      *
      *     // property (on prototype, TypeScript only)
      *     class Example {
      *         @Reflect.metadata(key, value)
      *         property;
      *     }
      *
      *     // method (on constructor)
      *     class Example {
      *         @Reflect.metadata(key, value)
      *         static staticMethod() { }
      *     }
      *
      *     // method (on prototype)
      *     class Example {
      *         @Reflect.metadata(key, value)
      *         method() { }
      *     }
      *
      */
    function metadata(metadataKey, metadataValue) {
        function decorator(target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
                throw new TypeError();
            OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        return decorator;
    }
    Reflect.metadata = metadata;
    /**
      * Define a unique metadata entry on the target.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param metadataValue A value that contains attached metadata.
      * @param target The target object on which to define metadata.
      * @param propertyKey (Optional) The property key for the target.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     Reflect.defineMetadata("custom:annotation", options, Example);
      *
      *     // property (on constructor)
      *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
      *
      *     // property (on prototype)
      *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
      *
      *     // method (on constructor)
      *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
      *
      *     // method (on prototype)
      *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
      *
      *     // decorator factory as metadata-producing annotation.
      *     function MyAnnotation(options): Decorator {
      *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
      *     }
      *
      */
    function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
    }
    Reflect.defineMetadata = defineMetadata;
    /**
      * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param propertyKey (Optional) The property key for the target.
      * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.hasMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function hasMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryHasMetadata(metadataKey, target, propertyKey);
    }
    Reflect.hasMetadata = hasMetadata;
    /**
      * Gets a value indicating whether the target object has the provided metadata key defined.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param propertyKey (Optional) The property key for the target.
      * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function hasOwnMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
    }
    Reflect.hasOwnMetadata = hasOwnMetadata;
    /**
      * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param propertyKey (Optional) The property key for the target.
      * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.getMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function getMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryGetMetadata(metadataKey, target, propertyKey);
    }
    Reflect.getMetadata = getMetadata;
    /**
      * Gets the metadata value for the provided metadata key on the target object.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param propertyKey (Optional) The property key for the target.
      * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.getOwnMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function getOwnMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
    }
    Reflect.getOwnMetadata = getOwnMetadata;
    /**
      * Gets the metadata keys defined on the target object or its prototype chain.
      * @param target The target object on which the metadata is defined.
      * @param propertyKey (Optional) The property key for the target.
      * @returns An array of unique metadata keys.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.getMetadataKeys(Example);
      *
      *     // property (on constructor)
      *     result = Reflect.getMetadataKeys(Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.getMetadataKeys(Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.getMetadataKeys(Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.getMetadataKeys(Example.prototype, "method");
      *
      */
    function getMetadataKeys(target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryMetadataKeys(target, propertyKey);
    }
    Reflect.getMetadataKeys = getMetadataKeys;
    /**
      * Gets the unique metadata keys defined on the target object.
      * @param target The target object on which the metadata is defined.
      * @param propertyKey (Optional) The property key for the target.
      * @returns An array of unique metadata keys.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.getOwnMetadataKeys(Example);
      *
      *     // property (on constructor)
      *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
      *
      */
    function getOwnMetadataKeys(target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryOwnMetadataKeys(target, propertyKey);
    }
    Reflect.getOwnMetadataKeys = getOwnMetadataKeys;
    /**
      * Deletes the metadata entry from the target object with the provided key.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param propertyKey (Optional) The property key for the target.
      * @returns `true` if the metadata entry was found and deleted; otherwise, false.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.deleteMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function deleteMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        var metadataMap = GetOrCreateMetadataMap(target, propertyKey, /*Create*/ false);
        if (IsUndefined(metadataMap))
            return false;
        if (!metadataMap.delete(metadataKey))
            return false;
        if (metadataMap.size > 0)
            return true;
        var targetMetadata = Metadata.get(target);
        targetMetadata.delete(propertyKey);
        if (targetMetadata.size > 0)
            return true;
        Metadata.delete(target);
        return true;
    }
    Reflect.deleteMetadata = deleteMetadata;
    function DecorateConstructor(decorators, target) {
        for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            var decorated = decorator(target);
            if (!IsUndefined(decorated) && !IsNull(decorated)) {
                if (!IsConstructor(decorated))
                    throw new TypeError();
                target = decorated;
            }
        }
        return target;
    }
    function DecorateProperty(decorators, target, propertyKey, descriptor) {
        for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            var decorated = decorator(target, propertyKey, descriptor);
            if (!IsUndefined(decorated) && !IsNull(decorated)) {
                if (!IsObject(decorated))
                    throw new TypeError();
                descriptor = decorated;
            }
        }
        return descriptor;
    }
    function GetOrCreateMetadataMap(O, P, Create) {
        var targetMetadata = Metadata.get(O);
        if (IsUndefined(targetMetadata)) {
            if (!Create)
                return undefined;
            targetMetadata = new _Map();
            Metadata.set(O, targetMetadata);
        }
        var metadataMap = targetMetadata.get(P);
        if (IsUndefined(metadataMap)) {
            if (!Create)
                return undefined;
            metadataMap = new _Map();
            targetMetadata.set(P, metadataMap);
        }
        return metadataMap;
    }
    // 3.1.1.1 OrdinaryHasMetadata(MetadataKey, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinaryhasmetadata
    function OrdinaryHasMetadata(MetadataKey, O, P) {
        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
        if (hasOwn)
            return true;
        var parent = OrdinaryGetPrototypeOf(O);
        if (!IsNull(parent))
            return OrdinaryHasMetadata(MetadataKey, parent, P);
        return false;
    }
    // 3.1.2.1 OrdinaryHasOwnMetadata(MetadataKey, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinaryhasownmetadata
    function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
        if (IsUndefined(metadataMap))
            return false;
        return ToBoolean(metadataMap.has(MetadataKey));
    }
    // 3.1.3.1 OrdinaryGetMetadata(MetadataKey, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinarygetmetadata
    function OrdinaryGetMetadata(MetadataKey, O, P) {
        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
        if (hasOwn)
            return OrdinaryGetOwnMetadata(MetadataKey, O, P);
        var parent = OrdinaryGetPrototypeOf(O);
        if (!IsNull(parent))
            return OrdinaryGetMetadata(MetadataKey, parent, P);
        return undefined;
    }
    // 3.1.4.1 OrdinaryGetOwnMetadata(MetadataKey, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinarygetownmetadata
    function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
        if (IsUndefined(metadataMap))
            return undefined;
        return metadataMap.get(MetadataKey);
    }
    // 3.1.5.1 OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinarydefineownmetadata
    function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ true);
        metadataMap.set(MetadataKey, MetadataValue);
    }
    // 3.1.6.1 OrdinaryMetadataKeys(O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinarymetadatakeys
    function OrdinaryMetadataKeys(O, P) {
        var ownKeys = OrdinaryOwnMetadataKeys(O, P);
        var parent = OrdinaryGetPrototypeOf(O);
        if (parent === null)
            return ownKeys;
        var parentKeys = OrdinaryMetadataKeys(parent, P);
        if (parentKeys.length <= 0)
            return ownKeys;
        if (ownKeys.length <= 0)
            return parentKeys;
        var set = new _Set();
        var keys = [];
        for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
            var key = ownKeys_1[_i];
            var hasKey = set.has(key);
            if (!hasKey) {
                set.add(key);
                keys.push(key);
            }
        }
        for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
            var key = parentKeys_1[_a];
            var hasKey = set.has(key);
            if (!hasKey) {
                set.add(key);
                keys.push(key);
            }
        }
        return keys;
    }
    // 3.1.7.1 OrdinaryOwnMetadataKeys(O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinaryownmetadatakeys
    function OrdinaryOwnMetadataKeys(O, P) {
        var keys = [];
        var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
        if (IsUndefined(metadataMap))
            return keys;
        var keysObj = metadataMap.keys();
        var iterator = GetIterator(keysObj);
        var k = 0;
        while (true) {
            var next = IteratorStep(iterator);
            if (!next) {
                keys.length = k;
                return keys;
            }
            var nextValue = IteratorValue(next);
            try {
                keys[k] = nextValue;
            }
            catch (e) {
                try {
                    IteratorClose(iterator);
                }
                finally {
                    throw e;
                }
            }
            k++;
        }
    }
    // 6 ECMAScript Data Typ0es and Values
    // https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values
    function Type(x) {
        if (x === null)
            return 1 /* Null */;
        switch (typeof x) {
            case "undefined": return 0 /* Undefined */;
            case "boolean": return 2 /* Boolean */;
            case "string": return 3 /* String */;
            case "symbol": return 4 /* Symbol */;
            case "number": return 5 /* Number */;
            case "object": return x === null ? 1 /* Null */ : 6 /* Object */;
            default: return 6 /* Object */;
        }
    }
    // 6.1.1 The Undefined Type
    // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-undefined-type
    function IsUndefined(x) {
        return x === undefined;
    }
    // 6.1.2 The Null Type
    // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-null-type
    function IsNull(x) {
        return x === null;
    }
    // 6.1.5 The Symbol Type
    // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-symbol-type
    function IsSymbol(x) {
        return typeof x === "symbol";
    }
    // 6.1.7 The Object Type
    // https://tc39.github.io/ecma262/#sec-object-type
    function IsObject(x) {
        return typeof x === "object" ? x !== null : typeof x === "function";
    }
    // 7.1 Type Conversion
    // https://tc39.github.io/ecma262/#sec-type-conversion
    // 7.1.1 ToPrimitive(input [, PreferredType])
    // https://tc39.github.io/ecma262/#sec-toprimitive
    function ToPrimitive(input, PreferredType) {
        switch (Type(input)) {
            case 0 /* Undefined */: return input;
            case 1 /* Null */: return input;
            case 2 /* Boolean */: return input;
            case 3 /* String */: return input;
            case 4 /* Symbol */: return input;
            case 5 /* Number */: return input;
        }
        var hint = PreferredType === 3 /* String */ ? "string" : PreferredType === 5 /* Number */ ? "number" : "default";
        var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
        if (exoticToPrim !== undefined) {
            var result = exoticToPrim.call(input, hint);
            if (IsObject(result))
                throw new TypeError();
            return result;
        }
        return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
    }
    // 7.1.1.1 OrdinaryToPrimitive(O, hint)
    // https://tc39.github.io/ecma262/#sec-ordinarytoprimitive
    function OrdinaryToPrimitive(O, hint) {
        if (hint === "string") {
            var toString_1 = O.toString;
            if (IsCallable(toString_1)) {
                var result = toString_1.call(O);
                if (!IsObject(result))
                    return result;
            }
            var valueOf = O.valueOf;
            if (IsCallable(valueOf)) {
                var result = valueOf.call(O);
                if (!IsObject(result))
                    return result;
            }
        }
        else {
            var valueOf = O.valueOf;
            if (IsCallable(valueOf)) {
                var result = valueOf.call(O);
                if (!IsObject(result))
                    return result;
            }
            var toString_2 = O.toString;
            if (IsCallable(toString_2)) {
                var result = toString_2.call(O);
                if (!IsObject(result))
                    return result;
            }
        }
        throw new TypeError();
    }
    // 7.1.2 ToBoolean(argument)
    // https://tc39.github.io/ecma262/2016/#sec-toboolean
    function ToBoolean(argument) {
        return !!argument;
    }
    // 7.1.12 ToString(argument)
    // https://tc39.github.io/ecma262/#sec-tostring
    function ToString(argument) {
        return "" + argument;
    }
    // 7.1.14 ToPropertyKey(argument)
    // https://tc39.github.io/ecma262/#sec-topropertykey
    function ToPropertyKey(argument) {
        var key = ToPrimitive(argument, 3 /* String */);
        if (IsSymbol(key))
            return key;
        return ToString(key);
    }
    // 7.2 Testing and Comparison Operations
    // https://tc39.github.io/ecma262/#sec-testing-and-comparison-operations
    // 7.2.2 IsArray(argument)
    // https://tc39.github.io/ecma262/#sec-isarray
    function IsArray(argument) {
        return Array.isArray
            ? Array.isArray(argument)
            : argument instanceof Object
                ? argument instanceof Array
                : Object.prototype.toString.call(argument) === "[object Array]";
    }
    // 7.2.3 IsCallable(argument)
    // https://tc39.github.io/ecma262/#sec-iscallable
    function IsCallable(argument) {
        // NOTE: This is an approximation as we cannot check for [[Call]] internal method.
        return typeof argument === "function";
    }
    // 7.2.4 IsConstructor(argument)
    // https://tc39.github.io/ecma262/#sec-isconstructor
    function IsConstructor(argument) {
        // NOTE: This is an approximation as we cannot check for [[Construct]] internal method.
        return typeof argument === "function";
    }
    // 7.2.7 IsPropertyKey(argument)
    // https://tc39.github.io/ecma262/#sec-ispropertykey
    function IsPropertyKey(argument) {
        switch (Type(argument)) {
            case 3 /* String */: return true;
            case 4 /* Symbol */: return true;
            default: return false;
        }
    }
    // 7.3 Operations on Objects
    // https://tc39.github.io/ecma262/#sec-operations-on-objects
    // 7.3.9 GetMethod(V, P)
    // https://tc39.github.io/ecma262/#sec-getmethod
    function GetMethod(V, P) {
        var func = V[P];
        if (func === undefined || func === null)
            return undefined;
        if (!IsCallable(func))
            throw new TypeError();
        return func;
    }
    // 7.4 Operations on Iterator Objects
    // https://tc39.github.io/ecma262/#sec-operations-on-iterator-objects
    function GetIterator(obj) {
        var method = GetMethod(obj, iteratorSymbol);
        if (!IsCallable(method))
            throw new TypeError(); // from Call
        var iterator = method.call(obj);
        if (!IsObject(iterator))
            throw new TypeError();
        return iterator;
    }
    // 7.4.4 IteratorValue(iterResult)
    // https://tc39.github.io/ecma262/2016/#sec-iteratorvalue
    function IteratorValue(iterResult) {
        return iterResult.value;
    }
    // 7.4.5 IteratorStep(iterator)
    // https://tc39.github.io/ecma262/#sec-iteratorstep
    function IteratorStep(iterator) {
        var result = iterator.next();
        return result.done ? false : result;
    }
    // 7.4.6 IteratorClose(iterator, completion)
    // https://tc39.github.io/ecma262/#sec-iteratorclose
    function IteratorClose(iterator) {
        var f = iterator["return"];
        if (f)
            f.call(iterator);
    }
    // 9.1 Ordinary Object Internal Methods and Internal Slots
    // https://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots
    // 9.1.1.1 OrdinaryGetPrototypeOf(O)
    // https://tc39.github.io/ecma262/#sec-ordinarygetprototypeof
    function OrdinaryGetPrototypeOf(O) {
        var proto = Object.getPrototypeOf(O);
        if (typeof O !== "function" || O === functionPrototype)
            return proto;
        // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
        // Try to determine the superclass constructor. Compatible implementations
        // must either set __proto__ on a subclass constructor to the superclass constructor,
        // or ensure each class has a valid `constructor` property on its prototype that
        // points back to the constructor.
        // If this is not the same as Function.[[Prototype]], then this is definately inherited.
        // This is the case when in ES6 or when using __proto__ in a compatible browser.
        if (proto !== functionPrototype)
            return proto;
        // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
        var prototype = O.prototype;
        var prototypeProto = prototype && Object.getPrototypeOf(prototype);
        if (prototypeProto == null || prototypeProto === Object.prototype)
            return proto;
        // If the constructor was not a function, then we cannot determine the heritage.
        var constructor = prototypeProto.constructor;
        if (typeof constructor !== "function")
            return proto;
        // If we have some kind of self-reference, then we cannot determine the heritage.
        if (constructor === O)
            return proto;
        // we have a pretty good guess at the heritage.
        return constructor;
    }
    // naive Map shim
    function CreateMapPolyfill() {
        var cacheSentinel = {};
        var arraySentinel = [];
        var MapIterator = (function () {
            function MapIterator(keys, values, selector) {
                this._index = 0;
                this._keys = keys;
                this._values = values;
                this._selector = selector;
            }
            MapIterator.prototype["@@iterator"] = function () { return this; };
            MapIterator.prototype[iteratorSymbol] = function () { return this; };
            MapIterator.prototype.next = function () {
                var index = this._index;
                if (index >= 0 && index < this._keys.length) {
                    var result = this._selector(this._keys[index], this._values[index]);
                    if (index + 1 >= this._keys.length) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    else {
                        this._index++;
                    }
                    return { value: result, done: false };
                }
                return { value: undefined, done: true };
            };
            MapIterator.prototype.throw = function (error) {
                if (this._index >= 0) {
                    this._index = -1;
                    this._keys = arraySentinel;
                    this._values = arraySentinel;
                }
                throw error;
            };
            MapIterator.prototype.return = function (value) {
                if (this._index >= 0) {
                    this._index = -1;
                    this._keys = arraySentinel;
                    this._values = arraySentinel;
                }
                return { value: value, done: true };
            };
            return MapIterator;
        }());
        return (function () {
            function Map() {
                this._keys = [];
                this._values = [];
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
            }
            Object.defineProperty(Map.prototype, "size", {
                get: function () { return this._keys.length; },
                enumerable: true,
                configurable: true
            });
            Map.prototype.has = function (key) { return this._find(key, /*insert*/ false) >= 0; };
            Map.prototype.get = function (key) {
                var index = this._find(key, /*insert*/ false);
                return index >= 0 ? this._values[index] : undefined;
            };
            Map.prototype.set = function (key, value) {
                var index = this._find(key, /*insert*/ true);
                this._values[index] = value;
                return this;
            };
            Map.prototype.delete = function (key) {
                var index = this._find(key, /*insert*/ false);
                if (index >= 0) {
                    var size = this._keys.length;
                    for (var i = index + 1; i < size; i++) {
                        this._keys[i - 1] = this._keys[i];
                        this._values[i - 1] = this._values[i];
                    }
                    this._keys.length--;
                    this._values.length--;
                    if (key === this._cacheKey) {
                        this._cacheKey = cacheSentinel;
                        this._cacheIndex = -2;
                    }
                    return true;
                }
                return false;
            };
            Map.prototype.clear = function () {
                this._keys.length = 0;
                this._values.length = 0;
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
            };
            Map.prototype.keys = function () { return new MapIterator(this._keys, this._values, getKey); };
            Map.prototype.values = function () { return new MapIterator(this._keys, this._values, getValue); };
            Map.prototype.entries = function () { return new MapIterator(this._keys, this._values, getEntry); };
            Map.prototype["@@iterator"] = function () { return this.entries(); };
            Map.prototype[iteratorSymbol] = function () { return this.entries(); };
            Map.prototype._find = function (key, insert) {
                if (this._cacheKey !== key) {
                    this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
                }
                if (this._cacheIndex < 0 && insert) {
                    this._cacheIndex = this._keys.length;
                    this._keys.push(key);
                    this._values.push(undefined);
                }
                return this._cacheIndex;
            };
            return Map;
        }());
        function getKey(key, _) {
            return key;
        }
        function getValue(_, value) {
            return value;
        }
        function getEntry(key, value) {
            return [key, value];
        }
    }
    // naive Set shim
    function CreateSetPolyfill() {
        return (function () {
            function Set() {
                this._map = new _Map();
            }
            Object.defineProperty(Set.prototype, "size", {
                get: function () { return this._map.size; },
                enumerable: true,
                configurable: true
            });
            Set.prototype.has = function (value) { return this._map.has(value); };
            Set.prototype.add = function (value) { return this._map.set(value, value), this; };
            Set.prototype.delete = function (value) { return this._map.delete(value); };
            Set.prototype.clear = function () { this._map.clear(); };
            Set.prototype.keys = function () { return this._map.keys(); };
            Set.prototype.values = function () { return this._map.values(); };
            Set.prototype.entries = function () { return this._map.entries(); };
            Set.prototype["@@iterator"] = function () { return this.keys(); };
            Set.prototype[iteratorSymbol] = function () { return this.keys(); };
            return Set;
        }());
    }
    // naive WeakMap shim
    function CreateWeakMapPolyfill() {
        var UUID_SIZE = 16;
        var keys = HashMap.create();
        var rootKey = CreateUniqueKey();
        return (function () {
            function WeakMap() {
                this._key = CreateUniqueKey();
            }
            WeakMap.prototype.has = function (target) {
                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                return table !== undefined ? HashMap.has(table, this._key) : false;
            };
            WeakMap.prototype.get = function (target) {
                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                return table !== undefined ? HashMap.get(table, this._key) : undefined;
            };
            WeakMap.prototype.set = function (target, value) {
                var table = GetOrCreateWeakMapTable(target, /*create*/ true);
                table[this._key] = value;
                return this;
            };
            WeakMap.prototype.delete = function (target) {
                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                return table !== undefined ? delete table[this._key] : false;
            };
            WeakMap.prototype.clear = function () {
                // NOTE: not a real clear, just makes the previous data unreachable
                this._key = CreateUniqueKey();
            };
            return WeakMap;
        }());
        function CreateUniqueKey() {
            var key;
            do
                key = "@@WeakMap@@" + CreateUUID();
            while (HashMap.has(keys, key));
            keys[key] = true;
            return key;
        }
        function GetOrCreateWeakMapTable(target, create) {
            if (!hasOwn.call(target, rootKey)) {
                if (!create)
                    return undefined;
                Object.defineProperty(target, rootKey, { value: HashMap.create() });
            }
            return target[rootKey];
        }
        function FillRandomBytes(buffer, size) {
            for (var i = 0; i < size; ++i)
                buffer[i] = Math.random() * 0xff | 0;
            return buffer;
        }
        function GenRandomBytes(size) {
            if (typeof Uint8Array === "function") {
                if (typeof crypto !== "undefined")
                    return crypto.getRandomValues(new Uint8Array(size));
                if (typeof msCrypto !== "undefined")
                    return msCrypto.getRandomValues(new Uint8Array(size));
                return FillRandomBytes(new Uint8Array(size), size);
            }
            return FillRandomBytes(new Array(size), size);
        }
        function CreateUUID() {
            var data = GenRandomBytes(UUID_SIZE);
            // mark as random - RFC 4122 § 4.4
            data[6] = data[6] & 0x4f | 0x40;
            data[8] = data[8] & 0xbf | 0x80;
            var result = "";
            for (var offset = 0; offset < UUID_SIZE; ++offset) {
                var byte = data[offset];
                if (offset === 4 || offset === 6 || offset === 8)
                    result += "-";
                if (byte < 16)
                    result += "0";
                result += byte.toString(16).toLowerCase();
            }
            return result;
        }
    }
    // uses a heuristic used by v8 and chakra to force an object into dictionary mode.
    function MakeDictionary(obj) {
        obj.__ = undefined;
        delete obj.__;
        return obj;
    }
    // patch global Reflect
    (function (__global) {
        if (typeof __global.Reflect !== "undefined") {
            if (__global.Reflect !== Reflect) {
                for (var p in Reflect) {
                    if (hasOwn.call(Reflect, p)) {
                        __global.Reflect[p] = Reflect[p];
                    }
                }
            }
        }
        else {
            __global.Reflect = Reflect;
        }
    })(typeof global !== "undefined" ? global :
        typeof self !== "undefined" ? self :
            Function("return this;")());
})(Reflect || (Reflect = {}));
//# sourceMappingURL=Reflect.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11), __webpack_require__(12)))

/***/ }),
/* 11 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 12 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

exports.default = noop;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

exports.default = identity;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(1);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VTransmitFile = function () {
    function VTransmitFile() {
        _classCallCheck(this, VTransmitFile);

        this._nativeFile = null;
        this.id = VTransmitFile.idFactory();
        this.accepted = undefined; // Passed all validation.
        this.lastModified = undefined;
        this.lastModifiedDate = undefined;
        this.name = undefined;
        this.processing = undefined;
        this.size = undefined;
        this.status = undefined;
        this.type = undefined;
        this.upload = {
            bytesSent: 0,
            progress: 0,
            total: 0,
            speed: {
                kbps: undefined,
                mbps: undefined
            },
            start: undefined,
            end: undefined,
            time: undefined
        };
        this.webkitRelativePath = undefined;
        this.width = undefined;
        this.height = undefined;
        this.xhr = undefined;
        this.errorMessage = undefined;

        for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
            data[_key] = arguments[_key];
        }

        _utils.assign.apply(undefined, [this].concat(data));
    }

    _createClass(VTransmitFile, [{
        key: "set",
        value: function set() {
            for (var _len2 = arguments.length, data = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                data[_key2] = arguments[_key2];
            }

            _utils.assign.apply(undefined, [this].concat(data));
            return this;
        }
    }, {
        key: "copyNativeFile",
        value: function copyNativeFile(file) {
            // save reference for upload
            this.nativeFile = file;
            // Copy props to normal object for Vue reactivity.
            // Vue cannot define reactive properties on native file's readonly props.
            return this.set((0, _utils.copyOwnAndInheritedProps)(file));
        }
    }, {
        key: "copyOwnAndInheritedProps",
        value: function copyOwnAndInheritedProps() {
            for (var _len3 = arguments.length, data = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                data[_key3] = arguments[_key3];
            }

            return this.set.apply(this, _toConsumableArray(data.map(_utils.copyOwnAndInheritedProps)));
        }
    }, {
        key: "handleProgress",
        value: function handleProgress(e) {
            this.startProgress();
            var total = e.total || this.upload.total;
            this.upload.progress = Math.min(100, 100 * e.loaded / total);
            this.upload.bytesSent = e.loaded;
            this.upload.total = total;
            this.upload.time = (Date.now() - this.upload.start) / 1000;
            // Recalc the upload speed in bytes/sec
            this.upload.speed.kbps = (0, _utils.round)((0, _utils.toKbps)(this.upload.bytesSent, this.upload.time));
            this.upload.speed.mbps = (0, _utils.round)((0, _utils.toMbps)(this.upload.bytesSent, this.upload.time));
            if (this.upload.progress === 100) {
                this.endProgress();
            }
        }
    }, {
        key: "startProgress",
        value: function startProgress() {
            // Avoid starting twice
            if (typeof this.upload.start !== "number") {
                this.upload.start = Date.now();
            }
            return this;
        }
    }, {
        key: "endProgress",
        value: function endProgress() {
            // Avoid ending twice
            if (typeof this.upload.end !== "number") {
                this.upload.end = Date.now();
                this.upload.time = (Date.now() - this.upload.start) / 1000;
            }
            return this;
        }
    }, {
        key: "nativeFile",
        get: function get() {
            return this._nativeFile;
        },
        set: function set(file) {
            if (!(file instanceof File)) {
                throw new TypeError("[" + VTransmitFile.name + "] Expected an instance of File (native).");
            }
            this._nativeFile = file;
            this.upload.total = file.size;
        }
    }, {
        key: "dataUrl",
        get: function get() {
            return this._dataUrl || "";
        },
        set: function set(value) {
            (0, _utils.defineProperty)(this, "_dataUrl", {
                value: value,
                enumerable: false,
                configurable: true,
                writable: true
            });
        }
    }], [{
        key: "fromNativeFile",
        value: function fromNativeFile(file) {
            for (var _len4 = arguments.length, data = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
                data[_key4 - 1] = arguments[_key4];
            }

            var instance = new (Function.prototype.bind.apply(VTransmitFile, [null].concat(data)))();
            instance.copyNativeFile(file);
            return instance;
        }
    }, {
        key: "idFactory",
        value: function idFactory() {
            return (0, _utils.uniqueId)("v-transmit-file-");
        }
    }]);

    return VTransmitFile;
}();

exports.default = VTransmitFile;

/***/ })
/******/ ])["default"];
//# sourceMappingURL=vue-transmit.browser.js.map