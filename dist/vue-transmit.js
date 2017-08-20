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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var src_namespaceObject = {};
__webpack_require__.d(src_namespaceObject, "VueTransmit", function() { return src_components_VueTransmit; });
__webpack_require__.d(src_namespaceObject, "CheckMark", function() { return CheckMark; });

// EXTERNAL MODULE: ./node_modules/lodash-es/_freeGlobal.js
var _freeGlobal = __webpack_require__(3);

// CONCATENATED MODULE: ./node_modules/lodash-es/_root.js


/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal["a" /* default */] || freeSelf || Function('return this')();

/* harmony default export */ var _root = (root);
// CONCATENATED MODULE: ./node_modules/lodash-es/_Symbol.js


/** Built-in value references. */
var Symbol = _root.Symbol;

/* harmony default export */ var _Symbol = (Symbol);
// CONCATENATED MODULE: ./node_modules/lodash-es/_arrayMap.js
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

/* harmony default export */ var _arrayMap = (arrayMap);
// CONCATENATED MODULE: ./node_modules/lodash-es/isArray.js
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

/* harmony default export */ var lodash_es_isArray = (isArray);
// CONCATENATED MODULE: ./node_modules/lodash-es/_getRawTag.js


/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var _getRawTag_hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = _getRawTag_hasOwnProperty.call(value, symToStringTag),
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

/* harmony default export */ var _getRawTag = (getRawTag);
// CONCATENATED MODULE: ./node_modules/lodash-es/_objectToString.js
/** Used for built-in method references. */
var _objectToString_objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var _objectToString_nativeObjectToString = _objectToString_objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return _objectToString_nativeObjectToString.call(value);
}

/* harmony default export */ var _objectToString = (objectToString);
// CONCATENATED MODULE: ./node_modules/lodash-es/_baseGetTag.js




/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var _baseGetTag_symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

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
  return _baseGetTag_symToStringTag && _baseGetTag_symToStringTag in Object(value) ? _getRawTag(value) : _objectToString(value);
}

/* harmony default export */ var _baseGetTag = (baseGetTag);
// CONCATENATED MODULE: ./node_modules/lodash-es/isObjectLike.js
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
  return value != null && typeof value == 'object';
}

/* harmony default export */ var lodash_es_isObjectLike = (isObjectLike);
// CONCATENATED MODULE: ./node_modules/lodash-es/isSymbol.js



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
  return typeof value == 'symbol' || lodash_es_isObjectLike(value) && _baseGetTag(value) == symbolTag;
}

/* harmony default export */ var lodash_es_isSymbol = (isSymbol);
// CONCATENATED MODULE: ./node_modules/lodash-es/_baseToString.js





/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = _Symbol ? _Symbol.prototype : undefined,
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
  if (lodash_es_isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return _arrayMap(value, baseToString) + '';
  }
  if (lodash_es_isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

/* harmony default export */ var _baseToString = (baseToString);
// CONCATENATED MODULE: ./node_modules/lodash-es/toString.js


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
function toString_toString(value) {
  return value == null ? '' : _baseToString(value);
}

/* harmony default export */ var lodash_es_toString = (toString_toString);
// CONCATENATED MODULE: ./node_modules/lodash-es/uniqueId.js


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
  return lodash_es_toString(prefix) + id;
}

/* harmony default export */ var lodash_es_uniqueId = (uniqueId);
// CONCATENATED MODULE: ./node_modules/lodash-es/_baseHas.js
/** Used for built-in method references. */
var _baseHas_objectProto = Object.prototype;

/** Used to check objects for own properties. */
var _baseHas_hasOwnProperty = _baseHas_objectProto.hasOwnProperty;

/**
 * The base implementation of `_.has` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHas(object, key) {
  return object != null && _baseHas_hasOwnProperty.call(object, key);
}

/* harmony default export */ var _baseHas = (baseHas);
// CONCATENATED MODULE: ./node_modules/lodash-es/_isKey.js



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
  if (lodash_es_isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || lodash_es_isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}

/* harmony default export */ var _isKey = (isKey);
// CONCATENATED MODULE: ./node_modules/lodash-es/isObject.js
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
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/* harmony default export */ var lodash_es_isObject = (isObject);
// CONCATENATED MODULE: ./node_modules/lodash-es/isFunction.js



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
  if (!lodash_es_isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = _baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/* harmony default export */ var lodash_es_isFunction = (isFunction);
// CONCATENATED MODULE: ./node_modules/lodash-es/_coreJsData.js


/** Used to detect overreaching core-js shims. */
var coreJsData = _root['__core-js_shared__'];

/* harmony default export */ var _coreJsData = (coreJsData);
// CONCATENATED MODULE: ./node_modules/lodash-es/_isMasked.js


/** Used to detect methods masquerading as native. */
var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
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

/* harmony default export */ var _isMasked = (isMasked);
// CONCATENATED MODULE: ./node_modules/lodash-es/_toSource.js
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

/* harmony default export */ var _toSource = (toSource);
// CONCATENATED MODULE: ./node_modules/lodash-es/_baseIsNative.js





/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var _baseIsNative_funcProto = Function.prototype,
    _baseIsNative_objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var _baseIsNative_funcToString = _baseIsNative_funcProto.toString;

/** Used to check objects for own properties. */
var _baseIsNative_hasOwnProperty = _baseIsNative_objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' + _baseIsNative_funcToString.call(_baseIsNative_hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!lodash_es_isObject(value) || _isMasked(value)) {
    return false;
  }
  var pattern = lodash_es_isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(_toSource(value));
}

/* harmony default export */ var _baseIsNative = (baseIsNative);
// CONCATENATED MODULE: ./node_modules/lodash-es/_getValue.js
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

/* harmony default export */ var _getValue = (getValue);
// CONCATENATED MODULE: ./node_modules/lodash-es/_getNative.js



/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = _getValue(object, key);
  return _baseIsNative(value) ? value : undefined;
}

/* harmony default export */ var _getNative = (getNative);
// CONCATENATED MODULE: ./node_modules/lodash-es/_nativeCreate.js


/* Built-in method references that are verified to be native. */
var nativeCreate = _getNative(Object, 'create');

/* harmony default export */ var _nativeCreate = (nativeCreate);
// CONCATENATED MODULE: ./node_modules/lodash-es/_hashClear.js


/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
  this.size = 0;
}

/* harmony default export */ var _hashClear = (hashClear);
// CONCATENATED MODULE: ./node_modules/lodash-es/_hashDelete.js
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

/* harmony default export */ var _hashDelete = (hashDelete);
// CONCATENATED MODULE: ./node_modules/lodash-es/_hashGet.js


/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var _hashGet_objectProto = Object.prototype;

/** Used to check objects for own properties. */
var _hashGet_hasOwnProperty = _hashGet_objectProto.hasOwnProperty;

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
  if (_nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return _hashGet_hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/* harmony default export */ var _hashGet = (hashGet);
// CONCATENATED MODULE: ./node_modules/lodash-es/_hashHas.js


/** Used for built-in method references. */
var _hashHas_objectProto = Object.prototype;

/** Used to check objects for own properties. */
var _hashHas_hasOwnProperty = _hashHas_objectProto.hasOwnProperty;

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
  return _nativeCreate ? data[key] !== undefined : _hashHas_hasOwnProperty.call(data, key);
}

/* harmony default export */ var _hashHas = (hashHas);
// CONCATENATED MODULE: ./node_modules/lodash-es/_hashSet.js


/** Used to stand-in for `undefined` hash values. */
var _hashSet_HASH_UNDEFINED = '__lodash_hash_undefined__';

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
  data[key] = _nativeCreate && value === undefined ? _hashSet_HASH_UNDEFINED : value;
  return this;
}

/* harmony default export */ var _hashSet = (hashSet);
// CONCATENATED MODULE: ./node_modules/lodash-es/_Hash.js






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
Hash.prototype.clear = _hashClear;
Hash.prototype['delete'] = _hashDelete;
Hash.prototype.get = _hashGet;
Hash.prototype.has = _hashHas;
Hash.prototype.set = _hashSet;

/* harmony default export */ var _Hash = (Hash);
// CONCATENATED MODULE: ./node_modules/lodash-es/_listCacheClear.js
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

/* harmony default export */ var _listCacheClear = (listCacheClear);
// CONCATENATED MODULE: ./node_modules/lodash-es/eq.js
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

/* harmony default export */ var lodash_es_eq = (eq);
// CONCATENATED MODULE: ./node_modules/lodash-es/_assocIndexOf.js


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
    if (lodash_es_eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/* harmony default export */ var _assocIndexOf = (assocIndexOf);
// CONCATENATED MODULE: ./node_modules/lodash-es/_listCacheDelete.js


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
      index = _assocIndexOf(data, key);

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

/* harmony default export */ var _listCacheDelete = (listCacheDelete);
// CONCATENATED MODULE: ./node_modules/lodash-es/_listCacheGet.js


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
      index = _assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/* harmony default export */ var _listCacheGet = (listCacheGet);
// CONCATENATED MODULE: ./node_modules/lodash-es/_listCacheHas.js


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
  return _assocIndexOf(this.__data__, key) > -1;
}

/* harmony default export */ var _listCacheHas = (listCacheHas);
// CONCATENATED MODULE: ./node_modules/lodash-es/_listCacheSet.js


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
      index = _assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

/* harmony default export */ var _listCacheSet = (listCacheSet);
// CONCATENATED MODULE: ./node_modules/lodash-es/_ListCache.js






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
ListCache.prototype.clear = _listCacheClear;
ListCache.prototype['delete'] = _listCacheDelete;
ListCache.prototype.get = _listCacheGet;
ListCache.prototype.has = _listCacheHas;
ListCache.prototype.set = _listCacheSet;

/* harmony default export */ var _ListCache = (ListCache);
// CONCATENATED MODULE: ./node_modules/lodash-es/_Map.js



/* Built-in method references that are verified to be native. */
var Map = _getNative(_root, 'Map');

/* harmony default export */ var _Map = (Map);
// CONCATENATED MODULE: ./node_modules/lodash-es/_mapCacheClear.js




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
    'hash': new _Hash(),
    'map': new (_Map || _ListCache)(),
    'string': new _Hash()
  };
}

/* harmony default export */ var _mapCacheClear = (mapCacheClear);
// CONCATENATED MODULE: ./node_modules/lodash-es/_isKeyable.js
/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}

/* harmony default export */ var _isKeyable = (isKeyable);
// CONCATENATED MODULE: ./node_modules/lodash-es/_getMapData.js


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
  return _isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}

/* harmony default export */ var _getMapData = (getMapData);
// CONCATENATED MODULE: ./node_modules/lodash-es/_mapCacheDelete.js


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
  var result = _getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/* harmony default export */ var _mapCacheDelete = (mapCacheDelete);
// CONCATENATED MODULE: ./node_modules/lodash-es/_mapCacheGet.js


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
  return _getMapData(this, key).get(key);
}

/* harmony default export */ var _mapCacheGet = (mapCacheGet);
// CONCATENATED MODULE: ./node_modules/lodash-es/_mapCacheHas.js


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
  return _getMapData(this, key).has(key);
}

/* harmony default export */ var _mapCacheHas = (mapCacheHas);
// CONCATENATED MODULE: ./node_modules/lodash-es/_mapCacheSet.js


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
  var data = _getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

/* harmony default export */ var _mapCacheSet = (mapCacheSet);
// CONCATENATED MODULE: ./node_modules/lodash-es/_MapCache.js






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
MapCache.prototype.clear = _mapCacheClear;
MapCache.prototype['delete'] = _mapCacheDelete;
MapCache.prototype.get = _mapCacheGet;
MapCache.prototype.has = _mapCacheHas;
MapCache.prototype.set = _mapCacheSet;

/* harmony default export */ var _MapCache = (MapCache);
// CONCATENATED MODULE: ./node_modules/lodash-es/memoize.js


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
  var memoized = function () {
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
  memoized.cache = new (memoize.Cache || _MapCache)();
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = _MapCache;

/* harmony default export */ var lodash_es_memoize = (memoize);
// CONCATENATED MODULE: ./node_modules/lodash-es/_memoizeCapped.js


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
  var result = lodash_es_memoize(func, function (key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

/* harmony default export */ var _memoizeCapped = (memoizeCapped);
// CONCATENATED MODULE: ./node_modules/lodash-es/_stringToPath.js


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
var stringToPath = _memoizeCapped(function (string) {
  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function (match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
  });
  return result;
});

/* harmony default export */ var _stringToPath = (stringToPath);
// CONCATENATED MODULE: ./node_modules/lodash-es/_castPath.js





/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (lodash_es_isArray(value)) {
    return value;
  }
  return _isKey(value, object) ? [value] : _stringToPath(lodash_es_toString(value));
}

/* harmony default export */ var _castPath = (castPath);
// CONCATENATED MODULE: ./node_modules/lodash-es/_baseIsArguments.js



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
  return lodash_es_isObjectLike(value) && _baseGetTag(value) == argsTag;
}

/* harmony default export */ var _baseIsArguments = (baseIsArguments);
// CONCATENATED MODULE: ./node_modules/lodash-es/isArguments.js



/** Used for built-in method references. */
var isArguments_objectProto = Object.prototype;

/** Used to check objects for own properties. */
var isArguments_hasOwnProperty = isArguments_objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = isArguments_objectProto.propertyIsEnumerable;

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
var isArguments = _baseIsArguments(function () {
  return arguments;
}()) ? _baseIsArguments : function (value) {
  return lodash_es_isObjectLike(value) && isArguments_hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
};

/* harmony default export */ var lodash_es_isArguments = (isArguments);
// CONCATENATED MODULE: ./node_modules/lodash-es/_isIndex.js
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

/* harmony default export */ var _isIndex = (isIndex);
// CONCATENATED MODULE: ./node_modules/lodash-es/isLength.js
/** Used as references for various `Number` constants. */
var isLength_MAX_SAFE_INTEGER = 9007199254740991;

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
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= isLength_MAX_SAFE_INTEGER;
}

/* harmony default export */ var lodash_es_isLength = (isLength);
// CONCATENATED MODULE: ./node_modules/lodash-es/_toKey.js


/** Used as references for various `Number` constants. */
var _toKey_INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || lodash_es_isSymbol(value)) {
    return value;
  }
  var result = value + '';
  return result == '0' && 1 / value == -_toKey_INFINITY ? '-0' : result;
}

/* harmony default export */ var _toKey = (toKey);
// CONCATENATED MODULE: ./node_modules/lodash-es/_hasPath.js







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
  path = _castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = _toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && lodash_es_isLength(length) && _isIndex(key, length) && (lodash_es_isArray(object) || lodash_es_isArguments(object));
}

/* harmony default export */ var _hasPath = (hasPath);
// CONCATENATED MODULE: ./node_modules/lodash-es/has.js



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
  return object != null && _hasPath(object, path, _baseHas);
}

/* harmony default export */ var lodash_es_has = (has);
// CONCATENATED MODULE: ./node_modules/lodash-es/noop.js
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

/* harmony default export */ var lodash_es_noop = (noop);
// CONCATENATED MODULE: ./src/core/utils.js
const utils_assign = Object.assign;

let utils_idCounter = 0;
/**
 * @param {string} prefix
 */
function utils_uniqueId(prefix) {
  var id = ++utils_idCounter;
  return String(prefix) + id;
}

function utils_copyOwnAndInheritedProps(obj) {
  let newData = {};
  for (let prop in obj) {
    if (typeof obj[prop] !== "function") {
      newData[prop] = obj[prop];
    }
  }
  return newData;
}

function round(number) {
  let decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  let roundStyle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "round";

  const roundingFactor = Math.pow(10, decimals);
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

const hbsRegex = /{{\s*?([a-zA-Z]+)\s*?}}/g;
function hbsReplacer() {
  let context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function hbsReplacerFn(match, capture) {
    return context[capture] !== undefined ? context[capture] : match;
  };
}

const READY_STATES = {
  UNSENT: 0,
  OPENED: 1,
  HEADERS_RECEIVED: 2,
  LOADING: 3,
  DONE: 4
};
// CONCATENATED MODULE: ./src/core/VTransmitFile.js
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



let VTransmitFile_VTransmitFile = function () {
  function VTransmitFile() {
    _classCallCheck(this, VTransmitFile);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    utils_assign.apply(undefined, [this, this.constructor.defaults()].concat(data));
  }

  _createClass(VTransmitFile, [{
    key: "set",
    value: function set() {
      for (var _len2 = arguments.length, data = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        data[_key2] = arguments[_key2];
      }

      utils_assign.apply(undefined, [this].concat(data));
      return this;
    }
  }, {
    key: "copyNativeFile",
    value: function copyNativeFile(file) {
      if (!(file instanceof window.File)) {
        throw new TypeError("The method 'copyNativeFile' expects an instance of File (Native).");
      }
      // save reference for upload
      this._nativeFile = file;
      // Copy props to normal object for Vue reactivity.
      // Vue cannot define reactive properties on native file's readonly props.
      return this.set(utils_copyOwnAndInheritedProps(file));
    }
  }, {
    key: "copyOwnAndInheritedProps",
    value: function copyOwnAndInheritedProps() {
      for (var _len3 = arguments.length, data = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        data[_key3] = arguments[_key3];
      }

      return this.set.apply(this, _toConsumableArray(data.map(utils_copyOwnAndInheritedProps)));
    }
  }, {
    key: "handleProgress",
    value: function handleProgress(e) {
      if (!(e instanceof ProgressEvent)) {
        throw new TypeError("'" + this.constructor.name + ".prototype.handleProgress' can only be called with the 'ProgressEvent' object.");
      }
      this.startProgress();
      const total = Math.max(e.total, this.upload.total);
      this.upload.progress = 100 * e.loaded / total;
      this.upload.bytesSent = e.loaded;
      this.upload.total = total;
      this.upload.time = (Date.now() - this.upload.start) / 1000;
      // Recalc the upload speed in bytes/sec
      this.upload.speed.kbps = round(toKbps(this.upload.bytesSent, this.upload.time));
      this.upload.speed.mbps = round(toMbps(this.upload.bytesSent, this.upload.time));
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
    }
  }, {
    key: "endProgress",
    value: function endProgress() {
      // Avoid ending twice
      if (typeof this.upload.end !== "number") {
        this.upload.end = Date.now();
        this.upload.time = (Date.now() - this.upload.start) / 1000;
      }
    }

    /**
     * @return {File|null}
     */

  }, {
    key: "nativeFile",
    get: function () {
      return this._nativeFile;
    }
  }], [{
    key: "defaults",
    value: function defaults() {
      return {
        _nativeFile: null,
        id: VTransmitFile.idFactory(),
        accepted: undefined, // Passed all validation.
        lastModified: undefined,
        lastModifiedDate: undefined,
        name: undefined,
        previewElement: undefined,
        previewTemplate: undefined,
        processing: undefined,
        size: undefined,
        status: undefined,
        type: undefined,
        upload: {
          bytesSent: 0,
          progress: 0,
          speed: {
            kbps: undefined,
            mbps: undefined
          },
          start: undefined,
          end: undefined,
          time: undefined
        },
        webkitRelativePath: undefined,
        width: undefined,
        height: undefined,
        xhr: undefined,
        dataUrl: undefined,
        errorMessage: undefined,
        VERSION: "1.0.4"
      };
    }
  }, {
    key: "fromNativeFile",
    value: function fromNativeFile(file) {
      for (var _len4 = arguments.length, data = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        data[_key4 - 1] = arguments[_key4];
      }

      const instance = new (Function.prototype.bind.apply(VTransmitFile, [null].concat(data)))();
      instance.copyNativeFile(file);
      instance.upload.total = file.size;
      return instance;
    }
  }, {
    key: "idFactory",
    value: function idFactory() {
      return utils_uniqueId("v-transmit-file-");
    }
  }]);

  return VTransmitFile;
}();

/* harmony default export */ var core_VTransmitFile = (VTransmitFile_VTransmitFile);
// CONCATENATED MODULE: ./node_modules/lodash-es/identity.js
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

/* harmony default export */ var lodash_es_identity = (identity);
// CONCATENATED MODULE: ./src/core/props.js



/* harmony default export */ var core_props = ({
  tag: {
    type: String,
    default: "div"
  },
  dropZoneClasses: {
    type: [Array, Object, String],
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
    default: function () {
      return new Object();
    }
  },
  headers: {
    type: Object,
    default: function () {
      return new Object();
    }
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
    default: function () {
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
    default: lodash_es_identity
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
    default: function (file, done) {
      return done();
    }
  },
  resize: {
    type: Function,
    default: function (_ref) {
      let width = _ref.width,
          height = _ref.height;

      let info = {
        srcX: 0,
        srcY: 0,
        srcWidth: width,
        srcHeight: height
      };

      const srcRatio = width / height;

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

      const trgRatio = info.optWidth / info.optHeight;

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
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/VueTransmit.vue
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








const STATUSES = {
  ADDED: "added",
  QUEUED: "queued",
  ACCEPTED: "queued",
  UPLOADING: "uploading",
  PROCESSING: "uploading",
  CANCELED: "canceled",
  ERROR: "error",
  SUCCESS: "success"
};

/* harmony default export */ var VueTransmit = ({
  props: core_props,
  data() {
    return {
      version: "1.0.4",
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
      }
    };
  },
  computed: {
    inputEl() {
      return this.$refs.hiddenFileInput;
    },
    filesToAccept() {
      return this.acceptedFileTypes.join(",");
    },
    multiple() {
      return this.maxFiles === null || this.maxFiles > 1;
    },
    acceptedFiles() {
      return this.files.filter(f => f.accepted);
    },
    rejectedFiles() {
      return this.files.filter(f => !f.accepted);
    },
    addedFiles() {
      return this.getFilesWithStatus(STATUSES.ADDED);
    },
    queuedFiles() {
      return this.getFilesWithStatus(STATUSES.QUEUED);
    },
    uploadingFiles() {
      return this.getFilesWithStatus(STATUSES.UPLOADING);
    },
    activeFiles() {
      return this.getFilesWithStatus(STATUSES.UPLOADING, STATUSES.QUEUED);
    },
    maxFilesReached() {
      return this.maxFiles != null && this.acceptedFiles.length >= this.maxFiles;
    },
    maxFilesReachedClass() {
      return this.maxFilesReached ? 'dz-max-files-reached' : null;
    }
  },
  watch: {
    acceptedFiles(value) {
      if (this.maxFiles == null) {
        return;
      }
      if (value.length >= this.maxFiles) {
        this.$emit('max-files-reached', this.files);
      }
    }
  },
  methods: {
    getFilesWithStatus(...statuses) {
      return this.files.filter(f => statuses.includes(f.status));
    },
    onFileInputChange(e) {
      const files = Array.from(this.$refs.hiddenFileInput.files).map(this.addFile);
      this.$emit('added-files', files);
    },
    addFile(file) {
      const vTransmitFile = core_VTransmitFile.fromNativeFile(file);
      vTransmitFile.status = STATUSES.ADDED;
      this.files.push(vTransmitFile);
      this.$emit("added-file", vTransmitFile);
      this.enqueueThumbnail(vTransmitFile);

      return this.acceptFile(vTransmitFile, error => {
        if (error) {
          vTransmitFile.accepted = false;
          this.errorProcessing([vTransmitFile], error);
        } else {
          vTransmitFile.accepted = true;
          if (this.autoQueue) {
            this.enqueueFile(vTransmitFile);
          }
        }
        return vTransmitFile;
      });
    },
    removeFile(file) {
      if (file.status === STATUSES.UPLOADING) {
        this.cancelUpload(file);
      }
      this.files = this.files.filter(f => f.id === file.id);
      this.$emit("removed-file", file);
      if (this.files.length === 0) {
        return this.$emit("reset");
      }
    },
    removeAllFiles(cancelInProgressUploads = false) {
      this.files.forEach(file => {
        if (file.status !== STATUSES.UPLOADING || cancelInProgressUploads) {
          this.removeFile(file);
        }
      });
    },
    triggerBrowseFiles() {
      this.inputEl.click();
    },
    handleClickUploaderAction(e) {
      if (this.clickable) {
        this.triggerBrowseFiles();
      }
    },
    enqueueFile(file) {
      if (file.status === STATUSES.ADDED && file.accepted === true) {
        file.status = STATUSES.QUEUED;
        if (this.autoProcessQueue) {
          setTimeout(this.processQueue, 0);
        }
      } else {
        throw new Error("This file can't be queued because it has already been processed or was rejected.");
      }
    },
    enqueueThumbnail(file) {
      if (this.createImageThumbnails && file.type.match(/image.*/) && file.size <= this.maxThumbnailFileSize * 1024 * 1024) {
        this.thumbnailQueue.push(file);
        setTimeout(this.processThumbnailQueue, 0);
      }
    },
    processThumbnailQueue() {
      // Employ a chain of self-calling, self-queuing createThumbnail calls
      // so execution can stay as non-blocking as possible.
      if (this.processingThumbnail || this.thumbnailQueue.length === 0) {
        return;
      }
      this.processingThumbnail = true;
      return this.createThumbnail(this.thumbnailQueue.shift(), () => {
        this.processingThumbnail = false;
        return this.processThumbnailQueue();
      });
    },
    createThumbnail(file, callback = lodash_es_noop) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        if (file.type === "image/svg+xml") {
          file.dataUrl = reader.result;
          this.$emit("thumbnail", file, reader.result);
          return callback();
        }
        return this.createThumbnailFromUrl(file, reader.result, callback);
      }, false);

      // FileReader requires a native File|Blob object
      return reader.readAsDataURL(file.nativeFile);
    },
    createThumbnailFromUrl(file, imageUrl, callback, crossOrigin) {
      const $img = document.createElement("img");
      if (crossOrigin) {
        $img.crossOrigin = crossOrigin;
      }

      $img.addEventListener("load", () => {
        file.width = $img.width;
        file.height = $img.height;
        const resizeInfo = this.resize.call(this, file);
        if (!resizeInfo.trgWidth) {
          resizeInfo.trgWidth = resizeInfo.optWidth;
        }
        if (!resizeInfo.trgHeight) {
          resizeInfo.trgHeight = resizeInfo.optHeight;
        }

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = resizeInfo.trgWidth;
        canvas.height = resizeInfo.trgHeight;
        ctx.drawImage($img, resizeInfo.srcX || 0, resizeInfo.srcY || 0, resizeInfo.srcWidth, resizeInfo.srcHeight, resizeInfo.trgX || 0, resizeInfo.trgY || 0, resizeInfo.trgWidth, resizeInfo.trgHeight);
        const thumbnail = canvas.toDataURL("image/png");
        file.dataUrl = thumbnail;
        this.$emit("thumbnail", file, thumbnail);

        if (callback) {
          return callback();
        }
      }, false);
      if (callback) {
        $img.addEventListener("error", callback, false);
      }

      return $img.src = imageUrl;
    },
    processQueue() {
      const processingLength = this.uploadingFiles.length;
      if (processingLength >= this.maxConcurrentUploads || this.queuedFiles.length === 0) {
        return;
      }

      const queuedFiles = [...this.queuedFiles];
      if (this.uploadMultiple) {
        return this.processFiles(queuedFiles.slice(0, this.maxConcurrentUploads - processingLength));
      } else {
        for (let i = processingLength; i < this.maxConcurrentUploads; i++) {
          if (queuedFiles.length) {
            this.processFile(queuedFiles.shift());
          }
        }
      }
    },
    processFile(file) {
      return this.processFiles([file]);
    },
    processFiles(files) {
      for (const file of files) {
        file.processing = true;
        file.status = STATUSES.UPLOADING;
        this.$emit("processing", file);
      }
      if (this.uploadMultiple) {
        this.$emit("processing-multiple", files);
      }

      return this.uploadFiles(files);
    },
    getFilesWithXhr(xhr) {
      return this.files.filter(file => file.xhr === xhr);
    },
    cancelUpload(file) {
      if (file.status === STATUSES.UPLOADING) {
        const groupedFiles = this.getFilesWithXhr(file.xhr);
        file.xhr.abort();
        for (const gFile of groupedFiles) {
          gFile.status = STATUSES.CANCELED;
          this.$emit("canceled", gFile);
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
    uploadFile(file) {
      return this.uploadFiles([file]);
    },
    /**
     * @param {VTransmitFile[]}
     */
    uploadFiles(files) {
      let response = null;
      const xhr = new XMLHttpRequest();
      xhr.timeout = this.timeout;
      for (const file of files) {
        file.xhr = xhr;
        file.startProgress();
      }
      xhr.open(this.method, this.url, true);
      xhr.withCredentials = Boolean(this.withCredentials);

      const handleError = this.handleUploadError(files, xhr, response);
      const updateProgress = this.handleUploadProgress(files);
      xhr.addEventListener("error", handleError);
      xhr.addEventListener("progress", updateProgress);
      xhr.addEventListener("load", e => {
        if (files[0].status === STATUSES.CANCELED || xhr.readyState !== READY_STATES.DONE) {
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
          return this.uploadFinished(files, response, e);
        }
      });

      // Use null proto obj for the following 'for in' loop
      const headers = Object.assign(Object.create(null), this.defaultHeaders, this.headers);
      for (const headerName in headers) {
        if (headers[headerName]) {
          xhr.setRequestHeader(headerName, headers[headerName]);
        }
      }

      const formData = new FormData();
      for (const key in this.params) {
        formData.append(key, this.params[key]);
      }

      for (const file of files) {
        this.$emit("sending", file, xhr, formData);
      }
      if (this.uploadMultiple) {
        this.$emit("sending-multiple", files, xhr, formData);
      }

      for (let i = 0; i < files.length; i++) {
        formData.append(this.getParamName(i), files[i].nativeFile, this.renameFile(files[i].name));
      }

      return xhr.send(formData);
    },
    handleUploadError(files, xhr, response) {
      const vm = this;
      return function onUploadErrorFn() {
        if (files[0].status !== STATUSES.CANCELED) {
          vm.errorProcessing(files, response || vm.dictResponseError.replace(hbsRegex, hbsReplacer({ statusCode: xhr.status })), xhr);
        }
      };
    },
    handleUploadProgress(files) {
      const vm = this;
      return function onProgressFn(e) {
        if (e instanceof ProgressEvent) {
          for (const file of files) {
            file.handleProgress(e);
          }
        } else {
          let allFilesFinished = true;
          for (const file of files) {
            if (file.upload.progress !== 100 || file.upload.bytesSent !== file.upload.total) {
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
          vm.$emit("upload-progress", file, file.upload.progress, file.upload.bytesSent);
        }
      };
    },
    updateTotalUploadProgress() {
      const progress = this.activeFiles.reduce((memo, file) => {
        memo.totalBytesSent += file.upload.bytesSent;
        memo.totalBytes += file.upload.total;
        return memo;
      }, { totalBytesSent: 0, totalBytes: 0, totalProgress: 100 });

      if (this.activeFiles.length) {
        progress.totalProgress = 100 * progress.totalBytesSent / progress.totalBytes;
      }

      this.$emit("total-upload-progress", progress);
    },
    getParamName(index) {
      return this.paramName + (this.uploadMultiple ? `[${index}]` : '');
    },
    uploadFinished(files, responseText, e) {
      for (const file of files) {
        file.status = STATUSES.SUCCESS;
        file.endProgress();
        this.$emit("success", file, responseText, e);
        this.$emit("complete", file);
      }

      if (this.uploadMultiple) {
        this.$emit("success-multiple", files, responseText, e);
        this.$emit("complete-multiple", files);
      }

      if (this.autoProcessQueue) {
        return this.processQueue();
      }
    },
    errorProcessing(files, message, xhr) {
      for (const file of files) {
        file.status = STATUSES.ERROR;
        file.endProgress();
        this.$emit("error", file, message, xhr);
        this.$emit("complete", file);
      }

      if (this.uploadMultiple) {
        this.$emit("error-multiple", files, message, xhr);
        this.$emit("complete-multiple", files);
      }

      if (this.autoProcessQueue) {
        return this.processQueue();
      }
    },
    acceptFile(file, done) {
      if (file.size > this.maxFileSize * 1024 * 1024) {
        return done(this.dictFileTooBig.replace(hbsRegex, hbsReplacer({
          fileSize: Math.round(file.size / 1024 / 10.24) / 100,
          maxFileSize: this.maxFileSize
        })));
      } else if (!this.isValidFileType(file, this.acceptedFileTypes)) {
        return done(this.dictInvalidFileType);
      } else if (this.maxFiles != null && this.acceptedFiles.length >= this.maxFiles) {
        done(this.dictMaxFilesExceeded.replace(hbsRegex, hbsReplacer({ maxFiles: this.maxFiles })));
        return this.$emit("max-files-exceeded", file);
      } else {
        // Call the prop callback for the client to validate.
        return this.accept(file, done);
      }
    },
    isValidFileType(file, acceptedFiles) {
      if (!acceptedFiles.length) {
        return true;
      }
      const mimeType = file.type;
      const baseMimeType = mimeType.replace(/\/.*$/, "");
      // Return true on the first condition match,
      // otherwise exhaust all conditions and return false.
      for (let i = 0; i < acceptedFiles.length; i++) {
        const validType = acceptedFiles[i];
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
    handleDragOver(e) {
      this.dragging = true;
      let effect;
      try {
        // Handle browser bug
        effect = e.dataTransfer.effectAllowed;
      } catch (error) {}
      e.dataTransfer.dropEffect = effect === 'move' || effect === 'linkMove' ? 'move' : 'copy';
      this.$emit('drag-over', e);
    },
    handleDragEnter(e) {
      this.dragging = true;
      this.$emit('drag-enter', e);
    },
    handleDragLeave(e) {
      this.dragging = false;
      this.$emit('drag-leave', e);
    },
    handleDragEnd(e) {
      this.dragging = false;
      this.$emit('drag-end', e);
    },
    onDrop(e) {
      this.dragging = false;
      if (!e.dataTransfer) {
        return;
      }
      this.$emit("drop", e);
      const files = Array.from(e.dataTransfer.files);
      this.$emit("added-files", files);
      if (files.length) {
        const items = Array.from(e.dataTransfer.items);
        if (items && items.length && items[0].webkitGetAsEntry) {
          this.addFilesFromItems(items);
        } else {
          this.handleFiles(files);
        }
      }
    },
    paste(e) {
      if (!lodash_es_has(e, ['clipboardData', 'items'])) {
        return;
      }
      this.$emit("paste", e);
      const items = Array.from(e.clipboardData.items);
      if (items.length) {
        this.addFilesFromItems(items);
      }
    },
    handleFiles(files) {
      return files.map(file => this.addFile(file));
    },
    addFilesFromItems(items) {
      items.forEach(item => {
        if (item.webkitGetAsEntry) {
          const entry = item.webkitGetAsEntry();

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
      });
    },
    addFilesFromDirectory(directory, path) {
      directory.createReader().readEntries(entries => {
        entries.forEach(entry => {
          if (entry.isFile) {
            entry.file(file => {
              if (this.ignoreHiddenFiles && /^\./.test(file.name)) {
                return;
              }
              file.fullPath = `${path}/${file.name}`;
              this.addFile(file);
            }, console.error);
          } else if (entry.isDirectory) {
            this.addFilesFromDirectory(entry, `${path}/${entry.name}`);
          }
        });
      }, console.error);
    }
  },
  mounted() {
    this.$on("upload-progress", this.updateTotalUploadProgress);
    this.$on("removed-file", this.updateTotalUploadProgress);
    this.$on("canceled", file => this.$emit("complete", file));
    this.$on("complete", file => {
      if (this.addedFiles.length === 0 && this.uploadingFiles.length === 0 && this.queuedFiles.length === 0) {
        setTimeout(() => this.$emit("queue-complete", file), 0);
      }
    });

    this.$emit('initialize', this);
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-55f49822","hasScoped":false}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/VueTransmit.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c(_vm.tag, {
    tag: "component"
  }, [_c('div', {
    staticClass: "v-transmit__drop-zone",
    class: [{
      'v-transmit__drop-zone--is-dragging': _vm.dragging
    }, _vm.dropZoneClasses],
    on: {
      "click": _vm.handleClickUploaderAction,
      "dragstart": function($event) {
        _vm.$emit('drag-start', $event)
      },
      "dragend": _vm.handleDragEnd,
      "dragenter": function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        _vm.handleDragEnter($event)
      },
      "dragover": function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        _vm.handleDragOver($event)
      },
      "dragleave": _vm.handleDragLeave,
      "drop": function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        _vm.onDrop($event)
      }
    }
  }, [_vm._t("default")], 2), _vm._v(" "), _vm._t("files", null, {
    files: _vm.files,
    acceptedFiles: _vm.acceptedFiles,
    rejectedFiles: _vm.rejectedFiles,
    addedFiles: _vm.addedFiles,
    queuedFiles: _vm.queuedFiles,
    uploadingFiles: _vm.uploadingFiles,
    activeFiles: _vm.activeFiles
  }), _vm._v(" "), _c('input', {
    ref: "hiddenFileInput",
    staticClass: "v-transmit__input--hidden",
    class: [_vm.maxFilesReachedClass],
    attrs: {
      "type": "file",
      "multiple": _vm.multiple,
      "accept": _vm.filesToAccept,
      "capture": _vm.capture
    },
    on: {
      "change": _vm.onFileInputChange
    }
  })], 2)
}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var components_VueTransmit = (esExports);
// CONCATENATED MODULE: ./src/components/VueTransmit.vue
function injectStyle (ssrContext) {
  __webpack_require__(1)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  VueTransmit,
  components_VueTransmit,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_components_VueTransmit = (Component.exports);

// CONCATENATED MODULE: ./node_modules/vue-functional-data-merge/dist/lib.esm.js
function concat(){return Array.prototype.concat.apply([],arguments)}function mergeData(){for(var e=__assign({},arguments[0]),a=1;a<arguments.length;a++)for(var s=0,t=keys(arguments[a]);s<t.length;s++){var c=t[s];if(void 0!==e[c])switch(c){case"class":case"style":case"directives":e[c]=concat(e[c],arguments[a][c]);break;case"staticClass":e[c]&&(e[c]=e[c].trim()+" "),e[c]+=arguments[a][c].trim();break;case"on":case"nativeOn":for(var r=0,o=keys(arguments[a][c]);r<o.length;r++){var n=o[r];e[c][n]?e[c][n]=concat(arguments[a][c][n],e[c][n]):e[c][n]=arguments[a][c][n]}break;case"attrs":case"props":case"domProps":case"scopedSlots":case"staticStyle":case"hook":case"transition":e[c]=__assign({},e[c],arguments[a][c]);break;case"slot":case"key":case"ref":case"tag":case"show":case"keepAlive":default:e[c]=arguments[a][c]}else e[c]=arguments[a][c]}return e}var __assign=Object.assign||function(e){for(var a,s=1,t=arguments.length;s<t;s++){a=arguments[s];for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(e[c]=a[c])}return e},keys=Object.keys;/* harmony default export */ var lib_esm = (mergeData);
//# sourceMappingURL=lib.esm.js.map

// CONCATENATED MODULE: ./src/components/CheckMark.js


/* harmony default export */ var CheckMark = ({
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
  render: function (h, _ref) {
    let props = _ref.props,
        data = _ref.data;

    return h("svg", lib_esm(data, {
      attrs: {
        "enable-background": "new 0 0 64 64",
        version: "1.1",
        viewBox: "0 0 64 64",
        "xml:space": "preserve",
        xmlns: "http://www.w3.org/2000/svg",
        "xmlns:xlink": "http://www.w3.org/1999/xlink"
      }
    }), [h("circle", {
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
});
// CONCATENATED MODULE: ./src/index.js




// CONCATENATED MODULE: ./index.js


/* harmony default export */ var index_0 = __webpack_exports__["default"] = ({
  install(Vue, options) {
    for (const component in src_namespaceObject) {
      if (Object.prototype.hasOwnProperty.call(src_namespaceObject, component)) {
        Vue.component(component, src_namespaceObject[component])
      }
    }
  }
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/* harmony default export */ __webpack_exports__["a"] = (freeGlobal);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(4)))

/***/ }),
/* 4 */
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


/***/ })
/******/ ]);
//# sourceMappingURL=vue-transmit.js.map