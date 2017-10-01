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
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

exports.default = isArray;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getNative = __webpack_require__(10);

var _getNative2 = _interopRequireDefault(_getNative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Built-in method references that are verified to be native. */
var nativeCreate = (0, _getNative2.default)(Object, 'create');

exports.default = nativeCreate;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _eq = __webpack_require__(52);

var _eq2 = _interopRequireDefault(_eq);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if ((0, _eq2.default)(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

exports.default = assocIndexOf;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isKeyable = __webpack_require__(58);

var _isKeyable2 = _interopRequireDefault(_isKeyable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return (0, _isKeyable2.default)(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}

exports.default = getMapData;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _root = __webpack_require__(5);

var _root2 = _interopRequireDefault(_root);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Built-in value references. */
var _Symbol = _root2.default.Symbol;

exports.default = _Symbol;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _freeGlobal = __webpack_require__(22);

var _freeGlobal2 = _interopRequireDefault(_freeGlobal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal2.default || freeSelf || Function('return this')();

exports.default = root;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _baseGetTag = __webpack_require__(7);

var _baseGetTag2 = _interopRequireDefault(_baseGetTag);

var _isObjectLike = __webpack_require__(8);

var _isObjectLike2 = _interopRequireDefault(_isObjectLike);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'symbol' || (0, _isObjectLike2.default)(value) && (0, _baseGetTag2.default)(value) == symbolTag;
}

exports.default = isSymbol;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Symbol2 = __webpack_require__(4);

var _Symbol3 = _interopRequireDefault(_Symbol2);

var _getRawTag = __webpack_require__(25);

var _getRawTag2 = _interopRequireDefault(_getRawTag);

var _objectToString = __webpack_require__(26);

var _objectToString2 = _interopRequireDefault(_objectToString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = _Symbol3.default ? _Symbol3.default.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? (0, _getRawTag2.default)(value) : (0, _objectToString2.default)(value);
}

exports.default = baseGetTag;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

exports.default = isObjectLike;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _baseToString = __webpack_require__(21);

var _baseToString2 = _interopRequireDefault(_baseToString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : (0, _baseToString2.default)(value);
}

exports.default = toString;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _baseIsNative = __webpack_require__(39);

var _baseIsNative2 = _interopRequireDefault(_baseIsNative);

var _getValue = __webpack_require__(44);

var _getValue2 = _interopRequireDefault(_getValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = (0, _getValue2.default)(object, key);
  return (0, _baseIsNative2.default)(value) ? value : undefined;
}

exports.default = getNative;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return value != null && (type == 'object' || type == 'function');
}

exports.default = isObject;

/***/ }),
/* 12 */
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.uniqueId = uniqueId;
exports.copyOwnAndInheritedProps = copyOwnAndInheritedProps;
exports.round = round;
exports.fromBytesToKbit = fromBytesToKbit;
exports.fromBytesToMbit = fromBytesToMbit;
exports.toKbps = toKbps;
exports.toMbps = toMbps;
exports.hbsReplacer = hbsReplacer;
var assign = exports.assign = Object.assign;
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
var READY_STATES = exports.READY_STATES = undefined;
(function (READY_STATES) {
    READY_STATES[READY_STATES["UNSENT"] = 0] = "UNSENT";
    READY_STATES[READY_STATES["OPENED"] = 1] = "OPENED";
    READY_STATES[READY_STATES["HEADERS_RECEIVED"] = 2] = "HEADERS_RECEIVED";
    READY_STATES[READY_STATES["LOADING"] = 3] = "LOADING";
    READY_STATES[READY_STATES["DONE"] = 4] = "DONE";
})(READY_STATES || (exports.READY_STATES = READY_STATES = {}));

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _src = __webpack_require__(15);

var components = _interopRequireWildcard(_src);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
  install: function install(Vue, options) {
    for (var component in components) {
      if (Object.prototype.hasOwnProperty.call(components, component)) {
        Vue.component(component, components[component]);
      }
    }
  },

  name: "vue-transmit"
  // name: NAME,
  // version: VERSION
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckMark = exports.VueTransmit = undefined;

var _VueTransmit = __webpack_require__(16);

var _VueTransmit2 = _interopRequireDefault(_VueTransmit);

var _CheckMark = __webpack_require__(70);

var _CheckMark2 = _interopRequireDefault(_CheckMark);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.VueTransmit = _VueTransmit2.default;
exports.CheckMark = _CheckMark2.default;

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/VueTransmit.vue
var VueTransmit = __webpack_require__(19);
var VueTransmit_default = /*#__PURE__*/__webpack_require__.n(VueTransmit);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-55f49822","hasScoped":false}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/VueTransmit.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.tag,{tag:"component"},[_c('div',_vm._g(_vm._b({staticClass:"v-transmit__upload-area",class:[_vm.isDraggingClass, _vm.uploadAreaClasses],attrs:{"draggable":"true"},on:{"click":_vm.handleClickUploaderAction,"dragstart":_vm.handleDragStart,"dragend":_vm.handleDragEnd,"dragenter":function($event){$event.preventDefault();$event.stopPropagation();_vm.handleDragEnter($event)},"dragover":function($event){$event.preventDefault();$event.stopPropagation();_vm.handleDragOver($event)},"dragleave":_vm.handleDragLeave,"drop":function($event){$event.preventDefault();$event.stopPropagation();_vm.onDrop($event)}}},'div',_vm.uploadAreaAttrs,false),_vm.uploadAreaListeners),[_vm._t("default")],2),_vm._v(" "),_vm._t("files",null,null,_vm.fileSlotBindings),_vm._v(" "),_c('input',{ref:"hiddenFileInput",class:[_vm.maxFilesReachedClass],style:(_vm.fileInputStyles),attrs:{"type":"file","multiple":_vm.multiple,"accept":_vm.filesToAccept,"capture":_vm.capture},on:{"change":_vm.onFileInputChange}})],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var components_VueTransmit = (esExports);
// CONCATENATED MODULE: ./src/components/VueTransmit.vue
function injectStyle (ssrContext) {
  __webpack_require__(17)
}
var normalizeComponent = __webpack_require__(18)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  VueTransmit_default.a,
  components_VueTransmit,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_components_VueTransmit = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 17 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 18 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _uniqueId = __webpack_require__(20);

var _uniqueId2 = _interopRequireDefault(_uniqueId);

var _has = __webpack_require__(27);

var _has2 = _interopRequireDefault(_has);

var _noop = __webpack_require__(12);

var _noop2 = _interopRequireDefault(_noop);

var _props = __webpack_require__(67);

var _props2 = _interopRequireDefault(_props);

var _utils = __webpack_require__(13);

var _VTransmitFile = __webpack_require__(69);

var _VTransmitFile2 = _interopRequireDefault(_VTransmitFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

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

exports.default = {
  props: _props2.default,
  data: function data() {
    return {
      dragging: false,
      processingThumbnail: false, // Used to keep the createThumbnail calls processing async one-at-a-time
      thumbnailQueue: [],
      clickableElements: [],
      listeners: [],
      files: [],
      defaultHeaders: {
        "Accept": "application/json",
        "Cache-Control": "no-cache",
        "X-Requested-With": "XMLHttpRequest"
      },
      fileInputStyles: {
        visibility: "hidden !important",
        position: "absolute !important",
        top: "0 !important",
        left: "0 !important",
        height: "0px !important",
        width: "0px !important"
      }
    };
  },

  computed: {
    inputEl: function inputEl() {
      return this.$refs.hiddenFileInput;
    },
    filesToAccept: function filesToAccept() {
      return this.acceptedFileTypes.join(",");
    },
    multiple: function multiple() {
      return this.maxFiles === null || this.maxFiles > 1;
    },
    acceptedFiles: function acceptedFiles() {
      return this.files.filter(function (f) {
        return f.accepted;
      });
    },
    rejectedFiles: function rejectedFiles() {
      return this.files.filter(function (f) {
        return !f.accepted;
      });
    },
    addedFiles: function addedFiles() {
      return this.getFilesWithStatus(STATUSES.ADDED);
    },
    queuedFiles: function queuedFiles() {
      return this.getFilesWithStatus(STATUSES.QUEUED);
    },
    uploadingFiles: function uploadingFiles() {
      return this.getFilesWithStatus(STATUSES.UPLOADING);
    },
    activeFiles: function activeFiles() {
      return this.getFilesWithStatus(STATUSES.UPLOADING, STATUSES.QUEUED);
    },
    maxFilesReached: function maxFilesReached() {
      // Loose equality checks null && undefined
      return this.maxFiles != null && this.acceptedFiles.length >= this.maxFiles;
    },
    maxFilesReachedClass: function maxFilesReachedClass() {
      return this.maxFilesReached ? "v-transmit__max-files--reached" : null;
    },
    isDraggingClass: function isDraggingClass() {
      return _defineProperty({
        "v-transmit__upload-area--is-dragging": this.dragging
      }, this.dragClass, this.dragging);
    },
    isUploading: function isUploading() {
      return this.uploadingFiles.length > 0;
    },
    fileSlotBindings: function fileSlotBindings() {
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
  },
  watch: {
    acceptedFiles: function acceptedFiles(value) {
      if (this.maxFiles == null) {
        return;
      }
      if (value.length >= this.maxFiles) {
        this.$emit('max-files-reached', this.files);
      }
    }
  },
  methods: {
    getFilesWithStatus: function getFilesWithStatus() {
      for (var _len = arguments.length, statuses = Array(_len), _key = 0; _key < _len; _key++) {
        statuses[_key] = arguments[_key];
      }

      return this.files.filter(function (f) {
        return statuses.includes(f.status);
      });
    },
    onFileInputChange: function onFileInputChange(e) {
      this.$emit('added-files', Array.from(this.$refs.hiddenFileInput.files).map(this.addFile));
    },
    addFile: function addFile(file) {
      var _this = this;

      var vTransmitFile = _VTransmitFile2.default.fromNativeFile(file);
      vTransmitFile.status = STATUSES.ADDED;
      this.files.push(vTransmitFile);
      this.$emit("added-file", vTransmitFile);
      this.enqueueThumbnail(vTransmitFile);
      this.acceptFile(vTransmitFile, function (error) {
        if (error) {
          vTransmitFile.accepted = false;
          _this.errorProcessing([vTransmitFile], error);
          _this.$emit("rejected-file", vTransmitFile);
        } else {
          vTransmitFile.accepted = true;
          _this.$emit("accepted-file", vTransmitFile);
          if (_this.autoQueue) {
            _this.enqueueFile(vTransmitFile);
          }
        }
        _this.$emit("accept-complete", vTransmitFile);
      });

      return vTransmitFile;
    },
    removeFile: function removeFile(file) {
      if (file.status === STATUSES.UPLOADING) {
        this.cancelUpload(file);
      }
      var idxToRm = this.files.findIndex(function (f) {
        return f.id === file.id;
      });
      if (~idxToRm) {
        this.$emit("removed-file", this.files.splice(idxToRm, 1)[0]);
        if (this.files.length === 0) {
          return this.$emit("reset");
        }
      }
    },
    removeAllFiles: function removeAllFiles() {
      var cancelInProgressUploads = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
    },
    triggerBrowseFiles: function triggerBrowseFiles() {
      this.inputEl.click();
    },
    handleClickUploaderAction: function handleClickUploaderAction(e) {
      if (this.clickable) {
        this.triggerBrowseFiles();
      }
    },
    enqueueFile: function enqueueFile(file) {
      if (file.status === STATUSES.ADDED && file.accepted === true) {
        file.status = STATUSES.QUEUED;
        if (this.autoProcessQueue) {
          setTimeout(this.processQueue, 0);
        }
      } else {
        throw new Error("This file can't be queued because it has already been processed or was rejected.");
      }
    },
    enqueueThumbnail: function enqueueThumbnail(file) {
      if (this.createImageThumbnails && file.type.match(/image.*/) && file.size <= this.maxThumbnailFileSize * 1024 * 1024) {
        this.thumbnailQueue.push(file);
        setTimeout(this.processThumbnailQueue, 0);
      }
    },
    processThumbnailQueue: function processThumbnailQueue() {
      var _this2 = this;

      // Employ a chain of self-calling, self-queuing createThumbnail calls
      // so execution can stay as non-blocking as possible.
      if (this.processingThumbnail || this.thumbnailQueue.length === 0) {
        return;
      }
      this.processingThumbnail = true;
      return this.createThumbnail(this.thumbnailQueue.shift(), function () {
        _this2.processingThumbnail = false;
        return _this2.processThumbnailQueue();
      });
    },
    createThumbnail: function createThumbnail(file) {
      var _this3 = this;

      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _noop2.default;

      var reader = new FileReader();
      reader.addEventListener("load", function () {
        if (file.type === "image/svg+xml") {
          file.dataUrl = reader.result;
          _this3.$emit("thumbnail", file, reader.result);
          return callback();
        }
        return _this3.createThumbnailFromUrl(file, reader.result, callback);
      }, false);

      // FileReader requires a native File|Blob object
      return reader.readAsDataURL(file.nativeFile);
    },
    createThumbnailFromUrl: function createThumbnailFromUrl(file, imageUrl, callback, crossOrigin) {
      var _this4 = this;

      var $img = document.createElement("img");
      if (crossOrigin) {
        $img.crossOrigin = crossOrigin;
      }

      $img.addEventListener("load", function () {
        file.width = $img.width;
        file.height = $img.height;
        var resizeInfo = _this4.resize.call(_this4, file);
        if (!resizeInfo.trgWidth) {
          resizeInfo.trgWidth = resizeInfo.optWidth;
        }
        if (!resizeInfo.trgHeight) {
          resizeInfo.trgHeight = resizeInfo.optHeight;
        }

        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        canvas.width = resizeInfo.trgWidth;
        canvas.height = resizeInfo.trgHeight;
        ctx.drawImage($img, resizeInfo.srcX || 0, resizeInfo.srcY || 0, resizeInfo.srcWidth, resizeInfo.srcHeight, resizeInfo.trgX || 0, resizeInfo.trgY || 0, resizeInfo.trgWidth, resizeInfo.trgHeight);
        var thumbnail = canvas.toDataURL("image/png");
        file.dataUrl = thumbnail;
        _this4.$emit("thumbnail", file, thumbnail);

        if (callback) {
          return callback();
        }
      }, false);
      if (callback) {
        $img.addEventListener("error", callback, false);
      }

      return $img.src = imageUrl;
    },
    processQueue: function processQueue() {
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
    },
    processFile: function processFile(file) {
      return this.processFiles([file]);
    },
    processFiles: function processFiles(files) {
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
    },
    getFilesWithXhr: function getFilesWithXhr(xhr) {
      return this.files.filter(function (file) {
        return file.xhr === xhr;
      });
    },
    cancelUpload: function cancelUpload(file) {
      if (file.status === STATUSES.UPLOADING) {
        var groupedFiles = this.getFilesWithXhr(file.xhr);
        file.xhr.abort();
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = groupedFiles[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _file = _step3.value;

            _file.status = STATUSES.CANCELED;
            this.$emit("canceled", _file);
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
        return this.processQueue();
      }
    },
    uploadFile: function uploadFile(file) {
      return this.uploadFiles([file]);
    },

    /**
     * @param {VTransmitFile[]}
     */
    uploadFiles: function uploadFiles(files) {
      var _this5 = this;

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

      var handleError = this.handleUploadError(files, xhr, response);
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
          return _this5.uploadFinished(files, response, e);
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
          var _file2 = _step5.value;

          this.$emit("sending", _file2, xhr, formData);
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
    },
    handleUploadError: function handleUploadError(files, xhr, response) {
      var vm = this;
      return function onUploadErrorFn() {
        if (files[0].status !== STATUSES.CANCELED) {
          vm.errorProcessing(files, response || vm.dictResponseError.replace(_utils.hbsRegex, (0, _utils.hbsReplacer)({ statusCode: xhr.status })), xhr);
        }
      };
    },
    handleTimeout: function handleTimeout(files, xhr) {
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
          return this.processQueue();
        }
      };
    },
    handleUploadProgress: function handleUploadProgress(files) {
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
              var _file3 = _step8.value;

              if (_file3.upload.progress !== 100 || _file3.upload.bytesSent !== _file3.upload.total) {
                allFilesFinished = false;
              }
              _file3.upload.progress = 100;
              _file3.upload.bytesSent = _file3.upload.total;
              _file3.endProgress();
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
            var _file4 = _step9.value;

            vm.$emit("upload-progress", _file4, _file4.upload.progress, _file4.upload.bytesSent);
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
    },
    updateTotalUploadProgress: function updateTotalUploadProgress() {
      var progress = this.activeFiles.reduce(function (memo, file) {
        memo.totalBytesSent += file.upload.bytesSent;
        memo.totalBytes += file.upload.total;
        return memo;
      }, { totalBytesSent: 0, totalBytes: 0, totalProgress: 100 });

      if (this.activeFiles.length) {
        progress.totalProgress = 100 * progress.totalBytesSent / progress.totalBytes;
      }

      this.$emit("total-upload-progress", progress);
    },
    getParamName: function getParamName(index) {
      return this.paramName + (this.uploadMultiple ? "[" + index + "]" : '');
    },
    uploadFinished: function uploadFinished(files, responseText, e) {
      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = files[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var file = _step10.value;

          file.status = STATUSES.SUCCESS;
          file.endProgress();
          this.$emit("success", file, responseText, e);
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
        this.$emit("success-multiple", files, responseText, e);
        this.$emit("complete-multiple", files);
      }

      if (this.autoProcessQueue) {
        return this.processQueue();
      }
    },
    errorProcessing: function errorProcessing(files, message, xhr) {
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
    },
    acceptFile: function acceptFile(file, done) {
      if (file.size > this.maxFileSize * 1024 * 1024) {
        return done(this.dictFileTooBig.replace(_utils.hbsRegex, (0, _utils.hbsReplacer)({
          fileSize: Math.round(file.size / 1024 / 10.24) / 100,
          maxFileSize: this.maxFileSize
        })));
      } else if (!this.isValidFileType(file, this.acceptedFileTypes)) {
        return done(this.dictInvalidFileType);
      } else if (this.maxFiles != null && this.acceptedFiles.length >= this.maxFiles) {
        done(this.dictMaxFilesExceeded.replace(_utils.hbsRegex, (0, _utils.hbsReplacer)({ maxFiles: this.maxFiles })));
        return this.$emit("max-files-exceeded", file);
      } else {
        // Call the prop callback for the client to validate.
        return this.accept(file, done);
      }
    },
    isValidFileType: function isValidFileType(file, acceptedFiles) {
      if (!acceptedFiles.length) {
        return true;
      }
      var mimeType = file.type;
      var baseMimeType = mimeType.replace(/\/.*$/, "");
      // Return true on the first condition match,
      // otherwise exhaust all conditions and return false.
      for (var i = 0; i < acceptedFiles.length; i++) {
        var validType = acceptedFiles[i];
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
    },

    /**
     * @param {DragEvent} e
     */
    handleDragStart: function handleDragStart(e) {
      this.$emit('drag-start', e);
    },

    /**
     * @param {DragEvent} e
     */
    handleDragOver: function handleDragOver(e) {
      this.dragging = true;
      var effect = void 0;
      try {
        // Handle browser bug
        effect = e.dataTransfer.effectAllowed;
      } catch (error) {}
      e.dataTransfer.dropEffect = effect === 'move' || effect === 'linkMove' ? 'move' : 'copy';
      this.$emit('drag-over', e);
    },

    /**
     * @param {DragEvent} e
     */
    handleDragEnter: function handleDragEnter(e) {
      this.dragging = true;
      this.$emit('drag-enter', e);
    },

    /**
     * @param {DragEvent} e
     */
    handleDragLeave: function handleDragLeave(e) {
      this.dragging = false;
      this.$emit('drag-leave', e);
    },

    /**
     * @param {DragEvent} e
     */
    handleDragEnd: function handleDragEnd(e) {
      this.dragging = false;
      this.$emit('drag-end', e);
    },

    /**
     * @param {DragEvent} e
     */
    onDrop: function onDrop(e) {
      this.dragging = false;
      if (!e.dataTransfer) {
        return;
      }
      this.$emit("drop", e);
      var files = Array.from(e.dataTransfer.files);
      this.$emit("added-files", files);
      if (files.length) {
        var items = Array.from(e.dataTransfer.items);
        if (items && items.length && items[0].webkitGetAsEntry) {
          this.addFilesFromItems(items);
        } else {
          this.handleFiles(files);
        }
      }
    },
    paste: function paste(e) {
      if (!(0, _has2.default)(e, ['clipboardData', 'items'])) {
        return;
      }
      this.$emit("paste", e);
      var items = Array.from(e.clipboardData.items);
      if (items.length) {
        this.addFilesFromItems(items);
      }
    },
    handleFiles: function handleFiles(files) {
      var _this6 = this;

      return files.map(function (file) {
        return _this6.addFile(file);
      });
    },
    addFilesFromItems: function addFilesFromItems(items) {
      var _iteratorNormalCompletion12 = true;
      var _didIteratorError12 = false;
      var _iteratorError12 = undefined;

      try {
        for (var _iterator12 = items[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
          var item = _step12.value;

          if (item.webkitGetAsEntry) {
            var entry = item.webkitGetAsEntry();

            if (entry.isFile) {
              entry.file(this.addFile);
            } else if (entry.isDirectory) {
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
    },
    addFilesFromDirectory: function addFilesFromDirectory(directory, path) {
      var _this7 = this;

      directory.createReader().readEntries(function (entries) {
        var _iteratorNormalCompletion13 = true;
        var _didIteratorError13 = false;
        var _iteratorError13 = undefined;

        try {
          for (var _iterator13 = entries[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
            var entry = _step13.value;

            if (entry.isFile) {
              entry.file(function (file) {
                if (_this7.ignoreHiddenFiles && /^\./.test(file.name)) {
                  return;
                }
                file.fullPath = path + "/" + file.name;
                _this7.addFile(file);
              }, console.error);
            } else if (entry.isDirectory) {
              _this7.addFilesFromDirectory(entry, path + "/" + entry.name);
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
  },
  mounted: function mounted() {
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

    this.$emit('initialize', this);
  }
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toString = __webpack_require__(9);

var _toString2 = _interopRequireDefault(_toString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Used to generate unique IDs. */
var idCounter = 0;

/**
 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {string} [prefix=''] The value to prefix the ID with.
 * @returns {string} Returns the unique ID.
 * @example
 *
 * _.uniqueId('contact_');
 * // => 'contact_104'
 *
 * _.uniqueId();
 * // => '105'
 */
function uniqueId(prefix) {
  var id = ++idCounter;
  return (0, _toString2.default)(prefix) + id;
}

exports.default = uniqueId;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Symbol2 = __webpack_require__(4);

var _Symbol3 = _interopRequireDefault(_Symbol2);

var _arrayMap = __webpack_require__(24);

var _arrayMap2 = _interopRequireDefault(_arrayMap);

var _isArray = __webpack_require__(0);

var _isArray2 = _interopRequireDefault(_isArray);

var _isSymbol = __webpack_require__(6);

var _isSymbol2 = _interopRequireDefault(_isSymbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = _Symbol3.default ? _Symbol3.default.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if ((0, _isArray2.default)(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return (0, _arrayMap2.default)(value, baseToString) + '';
  }
  if ((0, _isSymbol2.default)(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

exports.default = baseToString;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

exports.default = freeGlobal;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23)))

/***/ }),
/* 23 */
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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

exports.default = arrayMap;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Symbol2 = __webpack_require__(4);

var _Symbol3 = _interopRequireDefault(_Symbol2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = _Symbol3.default ? _Symbol3.default.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

exports.default = getRawTag;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

exports.default = objectToString;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _baseHas = __webpack_require__(28);

var _baseHas2 = _interopRequireDefault(_baseHas);

var _hasPath = __webpack_require__(29);

var _hasPath2 = _interopRequireDefault(_hasPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Checks if `path` is a direct property of `object`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = { 'a': { 'b': 2 } };
 * var other = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.has(object, 'a');
 * // => true
 *
 * _.has(object, 'a.b');
 * // => true
 *
 * _.has(object, ['a', 'b']);
 * // => true
 *
 * _.has(other, 'a');
 * // => false
 */
function has(object, path) {
  return object != null && (0, _hasPath2.default)(object, path, _baseHas2.default);
}

exports.default = has;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.has` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHas(object, key) {
  return object != null && hasOwnProperty.call(object, key);
}

exports.default = baseHas;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _castPath = __webpack_require__(30);

var _castPath2 = _interopRequireDefault(_castPath);

var _isArguments = __webpack_require__(62);

var _isArguments2 = _interopRequireDefault(_isArguments);

var _isArray = __webpack_require__(0);

var _isArray2 = _interopRequireDefault(_isArray);

var _isIndex = __webpack_require__(64);

var _isIndex2 = _interopRequireDefault(_isIndex);

var _isLength = __webpack_require__(65);

var _isLength2 = _interopRequireDefault(_isLength);

var _toKey = __webpack_require__(66);

var _toKey2 = _interopRequireDefault(_toKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = (0, _castPath2.default)(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = (0, _toKey2.default)(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && (0, _isLength2.default)(length) && (0, _isIndex2.default)(key, length) && ((0, _isArray2.default)(object) || (0, _isArguments2.default)(object));
}

exports.default = hasPath;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isArray = __webpack_require__(0);

var _isArray2 = _interopRequireDefault(_isArray);

var _isKey = __webpack_require__(31);

var _isKey2 = _interopRequireDefault(_isKey);

var _stringToPath = __webpack_require__(32);

var _stringToPath2 = _interopRequireDefault(_stringToPath);

var _toString = __webpack_require__(9);

var _toString2 = _interopRequireDefault(_toString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if ((0, _isArray2.default)(value)) {
    return value;
  }
  return (0, _isKey2.default)(value, object) ? [value] : (0, _stringToPath2.default)((0, _toString2.default)(value));
}

exports.default = castPath;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _isArray = __webpack_require__(0);

var _isArray2 = _interopRequireDefault(_isArray);

var _isSymbol = __webpack_require__(6);

var _isSymbol2 = _interopRequireDefault(_isSymbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if ((0, _isArray2.default)(value)) {
    return false;
  }
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || (0, _isSymbol2.default)(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}

exports.default = isKey;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _memoizeCapped = __webpack_require__(33);

var _memoizeCapped2 = _interopRequireDefault(_memoizeCapped);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Used to match property names within property paths. */
var reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = (0, _memoizeCapped2.default)(function (string) {
  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function (match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
  });
  return result;
});

exports.default = stringToPath;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _memoize = __webpack_require__(34);

var _memoize2 = _interopRequireDefault(_memoize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = (0, _memoize2.default)(func, function (key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

exports.default = memoizeCapped;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MapCache = __webpack_require__(35);

var _MapCache2 = _interopRequireDefault(_MapCache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || resolver != null && typeof resolver != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function memoized() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || _MapCache2.default)();
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = _MapCache2.default;

exports.default = memoize;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mapCacheClear = __webpack_require__(36);

var _mapCacheClear2 = _interopRequireDefault(_mapCacheClear);

var _mapCacheDelete = __webpack_require__(57);

var _mapCacheDelete2 = _interopRequireDefault(_mapCacheDelete);

var _mapCacheGet = __webpack_require__(59);

var _mapCacheGet2 = _interopRequireDefault(_mapCacheGet);

var _mapCacheHas = __webpack_require__(60);

var _mapCacheHas2 = _interopRequireDefault(_mapCacheHas);

var _mapCacheSet = __webpack_require__(61);

var _mapCacheSet2 = _interopRequireDefault(_mapCacheSet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = _mapCacheClear2.default;
MapCache.prototype['delete'] = _mapCacheDelete2.default;
MapCache.prototype.get = _mapCacheGet2.default;
MapCache.prototype.has = _mapCacheHas2.default;
MapCache.prototype.set = _mapCacheSet2.default;

exports.default = MapCache;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Hash = __webpack_require__(37);

var _Hash2 = _interopRequireDefault(_Hash);

var _ListCache = __webpack_require__(49);

var _ListCache2 = _interopRequireDefault(_ListCache);

var _Map = __webpack_require__(56);

var _Map2 = _interopRequireDefault(_Map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new _Hash2.default(),
    'map': new (_Map2.default || _ListCache2.default)(),
    'string': new _Hash2.default()
  };
}

exports.default = mapCacheClear;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hashClear = __webpack_require__(38);

var _hashClear2 = _interopRequireDefault(_hashClear);

var _hashDelete = __webpack_require__(45);

var _hashDelete2 = _interopRequireDefault(_hashDelete);

var _hashGet = __webpack_require__(46);

var _hashGet2 = _interopRequireDefault(_hashGet);

var _hashHas = __webpack_require__(47);

var _hashHas2 = _interopRequireDefault(_hashHas);

var _hashSet = __webpack_require__(48);

var _hashSet2 = _interopRequireDefault(_hashSet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = _hashClear2.default;
Hash.prototype['delete'] = _hashDelete2.default;
Hash.prototype.get = _hashGet2.default;
Hash.prototype.has = _hashHas2.default;
Hash.prototype.set = _hashSet2.default;

exports.default = Hash;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nativeCreate = __webpack_require__(1);

var _nativeCreate2 = _interopRequireDefault(_nativeCreate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = _nativeCreate2.default ? (0, _nativeCreate2.default)(null) : {};
  this.size = 0;
}

exports.default = hashClear;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isFunction = __webpack_require__(40);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isMasked = __webpack_require__(41);

var _isMasked2 = _interopRequireDefault(_isMasked);

var _isObject = __webpack_require__(11);

var _isObject2 = _interopRequireDefault(_isObject);

var _toSource = __webpack_require__(43);

var _toSource2 = _interopRequireDefault(_toSource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!(0, _isObject2.default)(value) || (0, _isMasked2.default)(value)) {
    return false;
  }
  var pattern = (0, _isFunction2.default)(value) ? reIsNative : reIsHostCtor;
  return pattern.test((0, _toSource2.default)(value));
}

exports.default = baseIsNative;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _baseGetTag = __webpack_require__(7);

var _baseGetTag2 = _interopRequireDefault(_baseGetTag);

var _isObject = __webpack_require__(11);

var _isObject2 = _interopRequireDefault(_isObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!(0, _isObject2.default)(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = (0, _baseGetTag2.default)(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

exports.default = isFunction;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _coreJsData = __webpack_require__(42);

var _coreJsData2 = _interopRequireDefault(_coreJsData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Used to detect methods masquerading as native. */
var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(_coreJsData2.default && _coreJsData2.default.keys && _coreJsData2.default.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}

exports.default = isMasked;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _root = __webpack_require__(5);

var _root2 = _interopRequireDefault(_root);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Used to detect overreaching core-js shims. */
var coreJsData = _root2.default['__core-js_shared__'];

exports.default = coreJsData;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return func + '';
    } catch (e) {}
  }
  return '';
}

exports.default = toSource;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

exports.default = getValue;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

exports.default = hashDelete;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nativeCreate = __webpack_require__(1);

var _nativeCreate2 = _interopRequireDefault(_nativeCreate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (_nativeCreate2.default) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

exports.default = hashGet;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nativeCreate = __webpack_require__(1);

var _nativeCreate2 = _interopRequireDefault(_nativeCreate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return _nativeCreate2.default ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

exports.default = hashHas;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nativeCreate = __webpack_require__(1);

var _nativeCreate2 = _interopRequireDefault(_nativeCreate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = _nativeCreate2.default && value === undefined ? HASH_UNDEFINED : value;
  return this;
}

exports.default = hashSet;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _listCacheClear = __webpack_require__(50);

var _listCacheClear2 = _interopRequireDefault(_listCacheClear);

var _listCacheDelete = __webpack_require__(51);

var _listCacheDelete2 = _interopRequireDefault(_listCacheDelete);

var _listCacheGet = __webpack_require__(53);

var _listCacheGet2 = _interopRequireDefault(_listCacheGet);

var _listCacheHas = __webpack_require__(54);

var _listCacheHas2 = _interopRequireDefault(_listCacheHas);

var _listCacheSet = __webpack_require__(55);

var _listCacheSet2 = _interopRequireDefault(_listCacheSet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = _listCacheClear2.default;
ListCache.prototype['delete'] = _listCacheDelete2.default;
ListCache.prototype.get = _listCacheGet2.default;
ListCache.prototype.has = _listCacheHas2.default;
ListCache.prototype.set = _listCacheSet2.default;

exports.default = ListCache;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

exports.default = listCacheClear;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assocIndexOf = __webpack_require__(2);

var _assocIndexOf2 = _interopRequireDefault(_assocIndexOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = (0, _assocIndexOf2.default)(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

exports.default = listCacheDelete;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || value !== value && other !== other;
}

exports.default = eq;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assocIndexOf = __webpack_require__(2);

var _assocIndexOf2 = _interopRequireDefault(_assocIndexOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = (0, _assocIndexOf2.default)(data, key);

  return index < 0 ? undefined : data[index][1];
}

exports.default = listCacheGet;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assocIndexOf = __webpack_require__(2);

var _assocIndexOf2 = _interopRequireDefault(_assocIndexOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return (0, _assocIndexOf2.default)(this.__data__, key) > -1;
}

exports.default = listCacheHas;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assocIndexOf = __webpack_require__(2);

var _assocIndexOf2 = _interopRequireDefault(_assocIndexOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = (0, _assocIndexOf2.default)(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

exports.default = listCacheSet;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getNative = __webpack_require__(10);

var _getNative2 = _interopRequireDefault(_getNative);

var _root = __webpack_require__(5);

var _root2 = _interopRequireDefault(_root);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Built-in method references that are verified to be native. */
var Map = (0, _getNative2.default)(_root2.default, 'Map');

exports.default = Map;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getMapData = __webpack_require__(3);

var _getMapData2 = _interopRequireDefault(_getMapData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = (0, _getMapData2.default)(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

exports.default = mapCacheDelete;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}

exports.default = isKeyable;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getMapData = __webpack_require__(3);

var _getMapData2 = _interopRequireDefault(_getMapData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return (0, _getMapData2.default)(this, key).get(key);
}

exports.default = mapCacheGet;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getMapData = __webpack_require__(3);

var _getMapData2 = _interopRequireDefault(_getMapData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return (0, _getMapData2.default)(this, key).has(key);
}

exports.default = mapCacheHas;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getMapData = __webpack_require__(3);

var _getMapData2 = _interopRequireDefault(_getMapData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = (0, _getMapData2.default)(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

exports.default = mapCacheSet;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _baseIsArguments = __webpack_require__(63);

var _baseIsArguments2 = _interopRequireDefault(_baseIsArguments);

var _isObjectLike = __webpack_require__(8);

var _isObjectLike2 = _interopRequireDefault(_isObjectLike);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = (0, _baseIsArguments2.default)(function () {
  return arguments;
}()) ? _baseIsArguments2.default : function (value) {
  return (0, _isObjectLike2.default)(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
};

exports.default = isArguments;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _baseGetTag = __webpack_require__(7);

var _baseGetTag2 = _interopRequireDefault(_baseGetTag);

var _isObjectLike = __webpack_require__(8);

var _isObjectLike2 = _interopRequireDefault(_isObjectLike);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return (0, _isObjectLike2.default)(value) && (0, _baseGetTag2.default)(value) == argsTag;
}

exports.default = baseIsArguments;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (typeof value == 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}

exports.default = isIndex;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

exports.default = isLength;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isSymbol = __webpack_require__(6);

var _isSymbol2 = _interopRequireDefault(_isSymbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || (0, _isSymbol2.default)(value)) {
    return value;
  }
  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

exports.default = toKey;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _noop = __webpack_require__(12);

var _noop2 = _interopRequireDefault(_noop);

var _identity = __webpack_require__(68);

var _identity2 = _interopRequireDefault(_identity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function objFactory() {
  return {};
}

exports.default = {
  tag: {
    type: String,
    default: "div"
  },
  uploadAreaClasses: {
    type: [Array, Object, String],
    default: null
  },
  uploadAreaAttrs: {
    type: Object,
    default: objFactory
  },
  uploadAreaListeners: {
    type: Object,
    default: objFactory
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
    default: objFactory
  },
  headers: {
    type: Object,
    default: objFactory
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
    default: function _default() {
      return [];
    }
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
    default: _identity2.default
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
    default: function _default(file, done) {
      return done();
    }
  },
  resize: {
    type: Function,
    default: function _default(_ref) {
      var width = _ref.width,
          height = _ref.height;

      var info = {
        srcX: 0,
        srcY: 0,
        srcWidth: width,
        srcHeight: height
      };

      var srcRatio = width / height;

      info.optWidth = this.thumbnailWidth;
      info.optHeight = this.thumbnailHeight;

      if (info.optWidth == null && info.optHeight == null) {
        info.optWidth = info.srcWidth;
        info.optHeight = info.srcHeight;
      } else if (info.optWidth == null) {
        info.optWidth = srcRatio * info.optHeight;
      } else if (info.optHeight == null) {
        info.optHeight = 1 / srcRatio * info.optWidth;
      }

      var trgRatio = info.optWidth / info.optHeight;

      if (height < info.optHeight || width < info.optWidth) {
        info.trgHeight = info.srcHeight;
        info.trgWidth = info.srcWidth;
      } else {
        if (srcRatio > trgRatio) {
          info.srcHeight = height;
          info.srcWidth = info.srcHeight * trgRatio;
        } else {
          info.srcWidth = width;
          info.srcHeight = info.srcWidth / trgRatio;
        }
      }

      info.srcX = (width - info.srcWidth) / 2;
      info.srcY = (height - info.srcHeight) / 2;

      return info;
    }
  }
};

/***/ }),
/* 68 */
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
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(13);

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
        this.dataUrl = undefined;
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

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vueFunctionalDataMerge = __webpack_require__(71);

var _vueFunctionalDataMerge2 = _interopRequireDefault(_vueFunctionalDataMerge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  functional: true,
  props: {
    color: {
      type: String,
      default: "#14C18B"
    },
    fill: {
      type: String,
      default: "#FFFFFF"
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data;

    return h("svg", (0, _vueFunctionalDataMerge2.default)(data, { attrs: { viewBox: "0 0 64 64" } }), [h("circle", {
      attrs: {
        cx: "32",
        cy: "32",
        r: "32",
        fill: props.color
      }
    }), h("polygon", {
      attrs: {
        fill: props.fill,
        points: "43.266,18.345 27.915,37 21.465,30.725 17.211,35.34 28.413,46.236 47.989,22.449"
      }
    })]);
  }
};

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function concat(){return Array.prototype.concat.apply([],arguments)}function mergeData(){for(var e=__assign({},arguments[0]),a=1;a<arguments.length;a++)for(var s=0,t=keys(arguments[a]);s<t.length;s++){var c=t[s];if(void 0!==e[c])switch(c){case"class":case"style":case"directives":e[c]=concat(e[c],arguments[a][c]);break;case"staticClass":e[c]&&(e[c]=e[c].trim()+" "),e[c]+=arguments[a][c].trim();break;case"on":case"nativeOn":for(var r=0,o=keys(arguments[a][c]);r<o.length;r++){var n=o[r];e[c][n]?e[c][n]=concat(arguments[a][c][n],e[c][n]):e[c][n]=arguments[a][c][n]}break;case"attrs":case"props":case"domProps":case"scopedSlots":case"staticStyle":case"hook":case"transition":e[c]=__assign({},e[c],arguments[a][c]);break;case"slot":case"key":case"ref":case"tag":case"show":case"keepAlive":default:e[c]=arguments[a][c]}else e[c]=arguments[a][c]}return e}var __assign=Object.assign||function(e){for(var a,s=1,t=arguments.length;s<t;s++){a=arguments[s];for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(e[c]=a[c])}return e},keys=Object.keys;/* harmony default export */ __webpack_exports__["default"] = (mergeData);
//# sourceMappingURL=lib.esm.js.map


/***/ })
/******/ ])["default"];
//# sourceMappingURL=vue-transmit.browser.js.map