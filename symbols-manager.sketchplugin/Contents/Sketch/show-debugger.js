var that = this
function __skpm_run(key, context) {
  that.context = context

  var exports = /******/ (function(modules) {
    // webpackBootstrap
    /******/ // The module cache
    /******/ var installedModules = {} // The require function
    /******/
    /******/ /******/ function __webpack_require__(moduleId) {
      /******/
      /******/ // Check if module is in cache
      /******/ if (installedModules[moduleId]) {
        /******/ return installedModules[moduleId].exports
        /******/
      } // Create a new module (and put it into the cache)
      /******/ /******/ var module = (installedModules[moduleId] = {
        /******/ i: moduleId,
        /******/ l: false,
        /******/ exports: {},
        /******/
      }) // Execute the module function
      /******/
      /******/ /******/ modules[moduleId].call(
        module.exports,
        module,
        module.exports,
        __webpack_require__
      ) // Flag the module as loaded
      /******/
      /******/ /******/ module.l = true // Return the exports of the module
      /******/
      /******/ /******/ return module.exports
      /******/
    } // expose the modules object (__webpack_modules__)
    /******/
    /******/
    /******/ /******/ __webpack_require__.m = modules // expose the module cache
    /******/
    /******/ /******/ __webpack_require__.c = installedModules // define getter function for harmony exports
    /******/
    /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
      /******/ if (!__webpack_require__.o(exports, name)) {
        /******/ Object.defineProperty(exports, name, {
          enumerable: true,
          get: getter,
        })
        /******/
      }
      /******/
    } // define __esModule on exports
    /******/
    /******/ /******/ __webpack_require__.r = function(exports) {
      /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module',
        })
        /******/
      }
      /******/ Object.defineProperty(exports, '__esModule', { value: true })
      /******/
    } // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
    /******/
    /******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function(
      value,
      mode
    ) {
      /******/ if (mode & 1) value = __webpack_require__(value)
      /******/ if (mode & 8) return value
      /******/ if (
        mode & 4 &&
        typeof value === 'object' &&
        value &&
        value.__esModule
      )
        return value
      /******/ var ns = Object.create(null)
      /******/ __webpack_require__.r(ns)
      /******/ Object.defineProperty(ns, 'default', {
        enumerable: true,
        value: value,
      })
      /******/ if (mode & 2 && typeof value != 'string')
        for (var key in value)
          __webpack_require__.d(
            ns,
            key,
            function(key) {
              return value[key]
            }.bind(null, key)
          )
      /******/ return ns
      /******/
    } // getDefaultExport function for compatibility with non-harmony modules
    /******/
    /******/ /******/ __webpack_require__.n = function(module) {
      /******/ var getter =
        module && module.__esModule
          ? /******/ function getDefault() {
              return module['default']
            }
          : /******/ function getModuleExports() {
              return module
            }
      /******/ __webpack_require__.d(getter, 'a', getter)
      /******/ return getter
      /******/
    } // Object.prototype.hasOwnProperty.call
    /******/
    /******/ /******/ __webpack_require__.o = function(object, property) {
      return Object.prototype.hasOwnProperty.call(object, property)
    } // __webpack_public_path__
    /******/
    /******/ /******/ __webpack_require__.p = '' // Load entry module and return exports
    /******/
    /******/
    /******/ /******/ return __webpack_require__(
      (__webpack_require__.s = './src/show-debugger.js')
    )
    /******/
  })(
    /************************************************************************/
    /******/ {
      /***/ './debugger.js':
        /*!*********************!*\
  !*** ./debugger.js ***!
  \*********************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          /* eslint-disable no-var, prefer-template, prefer-arrow-callback, prefer-destructuring, object-shorthand */
          var remoteWebview = __webpack_require__(
            /*! sketch-module-web-view/remote */ './node_modules/sketch-module-web-view/remote.js'
          )

          module.exports.identifier = 'skpm.debugger'
          module.exports.isDebuggerPresent = remoteWebview.isWebviewPresent.bind(
            this,
            module.exports.identifier
          )

          module.exports.sendToDebugger = function sendToDebugger(
            name,
            payload
          ) {
            return remoteWebview
              .sendToWebview(
                module.exports.identifier,
                'sketchBridge(' +
                  JSON.stringify({
                    name: name,
                    payload: payload,
                  }) +
                  ');'
              )
              .catch(function swallowError() {}) // swallow the error otherwise we end up in an infinite loop
          }

          /***/
        },

      /***/ './node_modules/@skpm/buffer/base64-js.js':
        /*!************************************************!*\
  !*** ./node_modules/@skpm/buffer/base64-js.js ***!
  \************************************************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          'use strict'

          exports.byteLength = byteLength
          exports.toByteArray = toByteArray
          exports.fromByteArray = fromByteArray

          var lookup = []
          var revLookup = []
          var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

          var code =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
          for (var i = 0, len = code.length; i < len; ++i) {
            lookup[i] = code[i]
            revLookup[code.charCodeAt(i)] = i
          }

          // Support decoding URL-safe base64 strings, as Node.js does.
          // See: https://en.wikipedia.org/wiki/Base64#URL_applications
          revLookup['-'.charCodeAt(0)] = 62
          revLookup['_'.charCodeAt(0)] = 63

          function getLens(b64) {
            var len = b64.length

            if (len % 4 > 0) {
              throw new Error('Invalid string. Length must be a multiple of 4')
            }

            // Trim off extra bytes after placeholder bytes are found
            // See: https://github.com/beatgammit/base64-js/issues/42
            var validLen = b64.indexOf('=')
            if (validLen === -1) validLen = len

            var placeHoldersLen = validLen === len ? 0 : 4 - (validLen % 4)

            return [validLen, placeHoldersLen]
          }

          // base64 is 4/3 + up to two characters of the original data
          function byteLength(b64) {
            var lens = getLens(b64)
            var validLen = lens[0]
            var placeHoldersLen = lens[1]
            return ((validLen + placeHoldersLen) * 3) / 4 - placeHoldersLen
          }

          function _byteLength(b64, validLen, placeHoldersLen) {
            return ((validLen + placeHoldersLen) * 3) / 4 - placeHoldersLen
          }

          function toByteArray(b64) {
            var tmp
            var lens = getLens(b64)
            var validLen = lens[0]
            var placeHoldersLen = lens[1]

            var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

            var curByte = 0

            // if there are placeholders, only get up to the last complete 4 chars
            var len = placeHoldersLen > 0 ? validLen - 4 : validLen

            for (var i = 0; i < len; i += 4) {
              tmp =
                (revLookup[b64.charCodeAt(i)] << 18) |
                (revLookup[b64.charCodeAt(i + 1)] << 12) |
                (revLookup[b64.charCodeAt(i + 2)] << 6) |
                revLookup[b64.charCodeAt(i + 3)]
              arr[curByte++] = (tmp >> 16) & 0xff
              arr[curByte++] = (tmp >> 8) & 0xff
              arr[curByte++] = tmp & 0xff
            }

            if (placeHoldersLen === 2) {
              tmp =
                (revLookup[b64.charCodeAt(i)] << 2) |
                (revLookup[b64.charCodeAt(i + 1)] >> 4)
              arr[curByte++] = tmp & 0xff
            }

            if (placeHoldersLen === 1) {
              tmp =
                (revLookup[b64.charCodeAt(i)] << 10) |
                (revLookup[b64.charCodeAt(i + 1)] << 4) |
                (revLookup[b64.charCodeAt(i + 2)] >> 2)
              arr[curByte++] = (tmp >> 8) & 0xff
              arr[curByte++] = tmp & 0xff
            }

            return arr
          }

          function tripletToBase64(num) {
            return (
              lookup[(num >> 18) & 0x3f] +
              lookup[(num >> 12) & 0x3f] +
              lookup[(num >> 6) & 0x3f] +
              lookup[num & 0x3f]
            )
          }

          function encodeChunk(uint8, start, end) {
            var tmp
            var output = []
            for (var i = start; i < end; i += 3) {
              tmp =
                ((uint8[i] << 16) & 0xff0000) +
                ((uint8[i + 1] << 8) & 0xff00) +
                (uint8[i + 2] & 0xff)
              output.push(tripletToBase64(tmp))
            }
            return output.join('')
          }

          function fromByteArray(uint8) {
            var tmp
            var len = uint8.length
            var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
            var parts = []
            var maxChunkLength = 16383 // must be multiple of 3

            // go through the array every three bytes, we'll deal with trailing stuff later
            for (
              var i = 0, len2 = len - extraBytes;
              i < len2;
              i += maxChunkLength
            ) {
              parts.push(
                encodeChunk(
                  uint8,
                  i,
                  i + maxChunkLength > len2 ? len2 : i + maxChunkLength
                )
              )
            }

            // pad the end with zeros, but make sure to not forget the extra bytes
            if (extraBytes === 1) {
              tmp = uint8[len - 1]
              parts.push(lookup[tmp >> 2] + lookup[(tmp << 4) & 0x3f] + '==')
            } else if (extraBytes === 2) {
              tmp = (uint8[len - 2] << 8) + uint8[len - 1]
              parts.push(
                lookup[tmp >> 10] +
                  lookup[(tmp >> 4) & 0x3f] +
                  lookup[(tmp << 2) & 0x3f] +
                  '='
              )
            }

            return parts.join('')
          }

          /***/
        },

      /***/ './node_modules/@skpm/buffer/ieee754.js':
        /*!**********************************************!*\
  !*** ./node_modules/@skpm/buffer/ieee754.js ***!
  \**********************************************/
        /*! no static exports found */
        /***/ function(module, exports) {
          exports.read = function(buffer, offset, isLE, mLen, nBytes) {
            var e, m
            var eLen = nBytes * 8 - mLen - 1
            var eMax = (1 << eLen) - 1
            var eBias = eMax >> 1
            var nBits = -7
            var i = isLE ? nBytes - 1 : 0
            var d = isLE ? -1 : 1
            var s = buffer[offset + i]

            i += d

            e = s & ((1 << -nBits) - 1)
            s >>= -nBits
            nBits += eLen
            for (
              ;
              nBits > 0;
              e = e * 256 + buffer[offset + i], i += d, nBits -= 8
            ) {}

            m = e & ((1 << -nBits) - 1)
            e >>= -nBits
            nBits += mLen
            for (
              ;
              nBits > 0;
              m = m * 256 + buffer[offset + i], i += d, nBits -= 8
            ) {}

            if (e === 0) {
              e = 1 - eBias
            } else if (e === eMax) {
              return m ? NaN : (s ? -1 : 1) * Infinity
            } else {
              m = m + Math.pow(2, mLen)
              e = e - eBias
            }
            return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
          }

          exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
            var e, m, c
            var eLen = nBytes * 8 - mLen - 1
            var eMax = (1 << eLen) - 1
            var eBias = eMax >> 1
            var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0
            var i = isLE ? 0 : nBytes - 1
            var d = isLE ? 1 : -1
            var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

            value = Math.abs(value)

            if (isNaN(value) || value === Infinity) {
              m = isNaN(value) ? 1 : 0
              e = eMax
            } else {
              e = Math.floor(Math.log(value) / Math.LN2)
              if (value * (c = Math.pow(2, -e)) < 1) {
                e--
                c *= 2
              }
              if (e + eBias >= 1) {
                value += rt / c
              } else {
                value += rt * Math.pow(2, 1 - eBias)
              }
              if (value * c >= 2) {
                e++
                c /= 2
              }

              if (e + eBias >= eMax) {
                m = 0
                e = eMax
              } else if (e + eBias >= 1) {
                m = (value * c - 1) * Math.pow(2, mLen)
                e = e + eBias
              } else {
                m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
                e = 0
              }
            }

            for (
              ;
              mLen >= 8;
              buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8
            ) {}

            e = (e << mLen) | m
            eLen += mLen
            for (
              ;
              eLen > 0;
              buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8
            ) {}

            buffer[offset + i - d] |= s * 128
          }

          /***/
        },

      /***/ './node_modules/@skpm/buffer/index.js':
        /*!********************************************!*\
  !*** ./node_modules/@skpm/buffer/index.js ***!
  \********************************************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          'use strict'
          /*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
          /* eslint-disable no-proto */

          var base64 = __webpack_require__(
            /*! ./base64-js */ './node_modules/@skpm/buffer/base64-js.js'
          )
          var ieee754 = __webpack_require__(
            /*! ./ieee754 */ './node_modules/@skpm/buffer/ieee754.js'
          )

          exports.Buffer = Buffer
          exports.SlowBuffer = SlowBuffer
          exports.INSPECT_MAX_BYTES = 50

          var K_MAX_LENGTH = 0x7fffffff
          exports.kMaxLength = K_MAX_LENGTH

          Object.defineProperty(Buffer.prototype, 'parent', {
            enumerable: true,
            get: function() {
              if (!Buffer.isBuffer(this)) return undefined
              return this.buffer
            },
          })

          Object.defineProperty(Buffer.prototype, 'offset', {
            enumerable: true,
            get: function() {
              if (!Buffer.isBuffer(this)) return undefined
              return this.byteOffset
            },
          })

          function createBuffer(length) {
            if (length > K_MAX_LENGTH) {
              throw new RangeError(
                'The value "' + length + '" is invalid for option "size"'
              )
            }
            // Return an augmented `Uint8Array` instance
            var buf = new Uint8Array(length)
            buf.__proto__ = Buffer.prototype
            return buf
          }

          /**
           * The Buffer constructor returns instances of `Uint8Array` that have their
           * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
           * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
           * and the `Uint8Array` methods. Square bracket notation works as expected -- it
           * returns a single octet.
           *
           * The `Uint8Array` prototype remains unmodified.
           */

          function Buffer(arg, encodingOrOffset, length) {
            // Common case.
            if (typeof arg === 'number') {
              if (typeof encodingOrOffset === 'string') {
                throw new TypeError(
                  'The "string" argument must be of type string. Received type number'
                )
              }
              return allocUnsafe(arg)
            }
            return from(arg, encodingOrOffset, length)
          }

          // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
          if (
            typeof Symbol !== 'undefined' &&
            Symbol.species != null &&
            Buffer[Symbol.species] === Buffer
          ) {
            Object.defineProperty(Buffer, Symbol.species, {
              value: null,
              configurable: true,
              enumerable: false,
              writable: false,
            })
          }

          Buffer.poolSize = 8192 // not used by this implementation

          function from(value, encodingOrOffset, length) {
            if (typeof value === 'string') {
              return fromString(value, encodingOrOffset)
            }

            if (ArrayBuffer.isView(value)) {
              return fromArrayLike(value)
            }

            if (value == null) {
              throw TypeError(
                'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
                  'or Array-like Object. Received type ' +
                  typeof value
              )
            }

            if (
              isInstance(value, ArrayBuffer) ||
              (value && isInstance(value.buffer, ArrayBuffer))
            ) {
              return fromArrayBuffer(value, encodingOrOffset, length)
            }

            if (typeof value === 'number') {
              throw new TypeError(
                'The "value" argument must not be of type number. Received type number'
              )
            }

            var valueOf = value.valueOf && value.valueOf()
            if (valueOf != null && valueOf !== value) {
              return Buffer.from(valueOf, encodingOrOffset, length)
            }

            var b = fromObject(value, encodingOrOffset, length)
            if (b) return b

            if (
              typeof Symbol !== 'undefined' &&
              Symbol.toPrimitive != null &&
              typeof value[Symbol.toPrimitive] === 'function'
            ) {
              return Buffer.from(
                value[Symbol.toPrimitive]('string'),
                encodingOrOffset,
                length
              )
            }

            throw new TypeError(
              'The first argument must be one of type string, Buffer, ArrayBuffer, Array, NSData, ' +
                'or Array-like Object. Received type ' +
                typeof value
            )
          }

          /**
           * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
           * if value is a number.
           * Buffer.from(str[, encoding])
           * Buffer.from(array)
           * Buffer.from(buffer)
           * Buffer.from(arrayBuffer[, byteOffset[, length]])
           **/
          Buffer.from = function(value, encodingOrOffset, length) {
            return from(value, encodingOrOffset, length)
          }

          // Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
          // https://github.com/feross/buffer/pull/148
          Buffer.prototype.__proto__ = Uint8Array.prototype
          Buffer.__proto__ = Uint8Array

          function assertSize(size) {
            if (typeof size !== 'number') {
              throw new TypeError('"size" argument must be of type number')
            } else if (size < 0) {
              throw new RangeError(
                'The value "' + size + '" is invalid for option "size"'
              )
            }
          }

          function alloc(size, fill, encoding) {
            assertSize(size)
            if (size <= 0) {
              return createBuffer(size)
            }
            if (fill !== undefined) {
              // Only pay attention to encoding if it's a string. This
              // prevents accidentally sending in a number that would
              // be interpretted as a start offset.
              return typeof encoding === 'string'
                ? createBuffer(size).fill(fill, encoding)
                : createBuffer(size).fill(fill)
            }
            return createBuffer(size)
          }

          /**
           * Creates a new filled Buffer instance.
           * alloc(size[, fill[, encoding]])
           **/
          Buffer.alloc = function(size, fill, encoding) {
            return alloc(size, fill, encoding)
          }

          function allocUnsafe(size) {
            assertSize(size)
            return createBuffer(size < 0 ? 0 : checked(size) | 0)
          }

          /**
           * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
           * */
          Buffer.allocUnsafe = function(size) {
            return allocUnsafe(size)
          }
          /**
           * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
           */
          Buffer.allocUnsafeSlow = function(size) {
            return allocUnsafe(size)
          }

          function fromString(string, encoding) {
            if (typeof encoding !== 'string' || encoding === '') {
              encoding = 'utf8'
            }

            if (!Buffer.isEncoding(encoding)) {
              throw new TypeError('Unknown encoding: ' + encoding)
            }

            var length = byteLength(string, encoding) | 0
            var buf = createBuffer(length)

            var actual = buf.write(string, encoding)

            if (actual !== length) {
              // Writing a hex string, for example, that contains invalid characters will
              // cause everything after the first invalid character to be ignored. (e.g.
              // 'abxxcd' will be treated as 'ab')
              buf = buf.slice(0, actual)
            }

            return buf
          }

          function fromArrayLike(array) {
            var length = array.length < 0 ? 0 : checked(array.length) | 0
            var buf = createBuffer(length)
            for (var i = 0; i < length; i += 1) {
              buf[i] = array[i] & 255
            }
            return buf
          }

          function fromArrayBuffer(array, byteOffset, length) {
            if (byteOffset < 0 || array.byteLength < byteOffset) {
              throw new RangeError('"offset" is outside of buffer bounds')
            }

            if (array.byteLength < byteOffset + (length || 0)) {
              throw new RangeError('"length" is outside of buffer bounds')
            }

            var buf
            if (byteOffset === undefined && length === undefined) {
              buf = new Uint8Array(array)
            } else if (length === undefined) {
              buf = new Uint8Array(array, byteOffset)
            } else {
              buf = new Uint8Array(array, byteOffset, length)
            }

            // Return an augmented `Uint8Array` instance
            buf.__proto__ = Buffer.prototype
            return buf
          }

          function fromNSData(nsdata, encodingOrOffset, length) {
            // parse nsdata as a string
            const data = String(
              NSString.alloc().initWithData_encoding(
                nsdata,
                NSISOLatin1StringEncoding
              )
            )

            // respect options
            const _offset = encodingOrOffset || 0
            const _length =
              typeof length !== 'undefined' ? length : data.length - _offset

            const buf = new Uint8Array(_length)
            for (let i = _offset; i < _length + _offset; i += 1) {
              buf[i] = data.charCodeAt(i)
            }

            // Return an augmented `Uint8Array` instance
            buf.__proto__ = Buffer.prototype
            return buf
          }

          function fromObject(obj, encodingOrOffset, length) {
            if (Buffer.isBuffer(obj)) {
              var len = checked(obj.length) | 0
              var buf = createBuffer(len)

              if (buf.length === 0) {
                return buf
              }

              obj.copy(buf, 0, 0, len)
              return buf
            }

            var className

            try {
              className = String(obj.class())
            } catch (err) {}

            if (
              (className && className === 'NSData') ||
              className === 'NSConcreteData' ||
              className === 'NSConcreteMutableData'
            ) {
              return fromNSData(obj, encodingOrOffset, length)
            }

            if (obj.length !== undefined) {
              if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
                return createBuffer(0)
              }
              return fromArrayLike(obj)
            }

            if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
              return fromArrayLike(obj.data)
            }
          }

          function checked(length) {
            // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
            // length is NaN (which is otherwise coerced to zero.)
            if (length >= K_MAX_LENGTH) {
              throw new RangeError(
                'Attempt to allocate Buffer larger than maximum ' +
                  'size: 0x' +
                  K_MAX_LENGTH.toString(16) +
                  ' bytes'
              )
            }
            return length | 0
          }

          function SlowBuffer(length) {
            if (+length != length) {
              // eslint-disable-line eqeqeq
              length = 0
            }
            return Buffer.alloc(+length)
          }

          Buffer.isBuffer = function isBuffer(b) {
            return b != null && b._isBuffer === true && b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
          }

          Buffer.compare = function compare(a, b) {
            if (isInstance(a, Uint8Array))
              a = Buffer.from(a, a.offset, a.byteLength)
            if (isInstance(b, Uint8Array))
              b = Buffer.from(b, b.offset, b.byteLength)
            if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
              throw new TypeError(
                'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
              )
            }

            if (a === b) return 0

            var x = a.length
            var y = b.length

            for (var i = 0, len = Math.min(x, y); i < len; ++i) {
              if (a[i] !== b[i]) {
                x = a[i]
                y = b[i]
                break
              }
            }

            if (x < y) return -1
            if (y < x) return 1
            return 0
          }

          Buffer.isEncoding = function isEncoding(encoding) {
            switch (String(encoding).toLowerCase()) {
              case 'hex':
              case 'utf8':
              case 'utf-8':
              case 'ascii':
              case 'latin1':
              case 'binary':
              case 'base64':
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return true
              default:
                return false
            }
          }

          Buffer.concat = function concat(list, length) {
            if (!Array.isArray(list)) {
              throw new TypeError('"list" argument must be an Array of Buffers')
            }

            if (list.length === 0) {
              return Buffer.alloc(0)
            }

            var i
            if (length === undefined) {
              length = 0
              for (i = 0; i < list.length; ++i) {
                length += list[i].length
              }
            }

            var buffer = Buffer.allocUnsafe(length)
            var pos = 0
            for (i = 0; i < list.length; ++i) {
              var buf = list[i]
              if (isInstance(buf, Uint8Array)) {
                buf = Buffer.from(buf)
              }
              if (!Buffer.isBuffer(buf)) {
                throw new TypeError(
                  '"list" argument must be an Array of Buffers'
                )
              }
              buf.copy(buffer, pos)
              pos += buf.length
            }
            return buffer
          }

          function byteLength(string, encoding) {
            if (Buffer.isBuffer(string)) {
              return string.length
            }
            if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
              return string.byteLength
            }
            if (typeof string !== 'string') {
              throw new TypeError(
                'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
                  'Received type ' +
                  typeof string
              )
            }

            var len = string.length
            var mustMatch = arguments.length > 2 && arguments[2] === true
            if (!mustMatch && len === 0) return 0

            // Use a for loop to avoid recursion
            var loweredCase = false
            for (;;) {
              switch (encoding) {
                case 'ascii':
                case 'latin1':
                case 'binary':
                  return len
                case 'utf8':
                case 'utf-8':
                  return utf8ToBytes(string).length
                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                  return len * 2
                case 'hex':
                  return len >>> 1
                case 'base64':
                  return base64ToBytes(string).length
                default:
                  if (loweredCase) {
                    return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
                  }
                  encoding = ('' + encoding).toLowerCase()
                  loweredCase = true
              }
            }
          }
          Buffer.byteLength = byteLength

          function slowToString(encoding, start, end) {
            var loweredCase = false

            // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
            // property of a typed array.

            // This behaves neither like String nor Uint8Array in that we set start/end
            // to their upper/lower bounds if the value passed is out of range.
            // undefined is handled specially as per ECMA-262 6th Edition,
            // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
            if (start === undefined || start < 0) {
              start = 0
            }
            // Return early if start > this.length. Done here to prevent potential uint32
            // coercion fail below.
            if (start > this.length) {
              return ''
            }

            if (end === undefined || end > this.length) {
              end = this.length
            }

            if (end <= 0) {
              return ''
            }

            // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
            end >>>= 0
            start >>>= 0

            if (end <= start) {
              return ''
            }

            if (!encoding) encoding = 'utf8'

            while (true) {
              switch (encoding) {
                case 'hex':
                  return hexSlice(this, start, end)

                case 'utf8':
                case 'utf-8':
                  return utf8Slice(this, start, end)

                case 'ascii':
                  return asciiSlice(this, start, end)

                case 'latin1':
                case 'binary':
                  return latin1Slice(this, start, end)

                case 'base64':
                  return base64Slice(this, start, end)

                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                  return utf16leSlice(this, start, end)

                default:
                  if (loweredCase)
                    throw new TypeError('Unknown encoding: ' + encoding)
                  encoding = (encoding + '').toLowerCase()
                  loweredCase = true
              }
            }
          }

          // This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
          // to detect a Buffer instance. It's not possible to use `instanceof Buffer`
          // reliably in a browserify context because there could be multiple different
          // copies of the 'buffer' package in use. This method works even for Buffer
          // instances that were created from another copy of the `buffer` package.
          // See: https://github.com/feross/buffer/issues/154
          Buffer.prototype._isBuffer = true

          function swap(b, n, m) {
            var i = b[n]
            b[n] = b[m]
            b[m] = i
          }

          Buffer.prototype.swap16 = function swap16() {
            var len = this.length
            if (len % 2 !== 0) {
              throw new RangeError('Buffer size must be a multiple of 16-bits')
            }
            for (var i = 0; i < len; i += 2) {
              swap(this, i, i + 1)
            }
            return this
          }

          Buffer.prototype.swap32 = function swap32() {
            var len = this.length
            if (len % 4 !== 0) {
              throw new RangeError('Buffer size must be a multiple of 32-bits')
            }
            for (var i = 0; i < len; i += 4) {
              swap(this, i, i + 3)
              swap(this, i + 1, i + 2)
            }
            return this
          }

          Buffer.prototype.swap64 = function swap64() {
            var len = this.length
            if (len % 8 !== 0) {
              throw new RangeError('Buffer size must be a multiple of 64-bits')
            }
            for (var i = 0; i < len; i += 8) {
              swap(this, i, i + 7)
              swap(this, i + 1, i + 6)
              swap(this, i + 2, i + 5)
              swap(this, i + 3, i + 4)
            }
            return this
          }

          Buffer.prototype.toString = function toString() {
            var length = this.length
            if (length === 0) return ''
            if (arguments.length === 0) return utf8Slice(this, 0, length)
            return slowToString.apply(this, arguments)
          }

          Buffer.prototype.toLocaleString = Buffer.prototype.toString

          Buffer.prototype.equals = function equals(b) {
            if (!Buffer.isBuffer(b))
              throw new TypeError('Argument must be a Buffer')
            if (this === b) return true
            return Buffer.compare(this, b) === 0
          }

          Buffer.prototype.inspect = function inspect() {
            var str = ''
            var max = exports.INSPECT_MAX_BYTES
            str = this.toString('hex', 0, max)
              .replace(/(.{2})/g, '$1 ')
              .trim()
            console.log(str)
            if (this.length > max) str += ' ... '
            return '<Buffer ' + str + '>'
          }

          Buffer.prototype.compare = function compare(
            target,
            start,
            end,
            thisStart,
            thisEnd
          ) {
            if (isInstance(target, Uint8Array)) {
              target = Buffer.from(target, target.offset, target.byteLength)
            }
            if (!Buffer.isBuffer(target)) {
              throw new TypeError(
                'The "target" argument must be one of type Buffer or Uint8Array. ' +
                  'Received type ' +
                  typeof target
              )
            }

            if (start === undefined) {
              start = 0
            }
            if (end === undefined) {
              end = target ? target.length : 0
            }
            if (thisStart === undefined) {
              thisStart = 0
            }
            if (thisEnd === undefined) {
              thisEnd = this.length
            }

            if (
              start < 0 ||
              end > target.length ||
              thisStart < 0 ||
              thisEnd > this.length
            ) {
              throw new RangeError('out of range index')
            }

            if (thisStart >= thisEnd && start >= end) {
              return 0
            }
            if (thisStart >= thisEnd) {
              return -1
            }
            if (start >= end) {
              return 1
            }

            start >>>= 0
            end >>>= 0
            thisStart >>>= 0
            thisEnd >>>= 0

            if (this === target) return 0

            var x = thisEnd - thisStart
            var y = end - start
            var len = Math.min(x, y)

            var thisCopy = this.slice(thisStart, thisEnd)
            var targetCopy = target.slice(start, end)

            for (var i = 0; i < len; ++i) {
              if (thisCopy[i] !== targetCopy[i]) {
                x = thisCopy[i]
                y = targetCopy[i]
                break
              }
            }

            if (x < y) return -1
            if (y < x) return 1
            return 0
          }

          // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
          // OR the last index of `val` in `buffer` at offset <= `byteOffset`.
          //
          // Arguments:
          // - buffer - a Buffer to search
          // - val - a string, Buffer, or number
          // - byteOffset - an index into `buffer`; will be clamped to an int32
          // - encoding - an optional encoding, relevant is val is a string
          // - dir - true for indexOf, false for lastIndexOf
          function bidirectionalIndexOf(
            buffer,
            val,
            byteOffset,
            encoding,
            dir
          ) {
            // Empty buffer means no match
            if (buffer.length === 0) return -1

            // Normalize byteOffset
            if (typeof byteOffset === 'string') {
              encoding = byteOffset
              byteOffset = 0
            } else if (byteOffset > 0x7fffffff) {
              byteOffset = 0x7fffffff
            } else if (byteOffset < -0x80000000) {
              byteOffset = -0x80000000
            }
            byteOffset = +byteOffset // Coerce to Number.
            if (numberIsNaN(byteOffset)) {
              // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
              byteOffset = dir ? 0 : buffer.length - 1
            }

            // Normalize byteOffset: negative offsets start from the end of the buffer
            if (byteOffset < 0) byteOffset = buffer.length + byteOffset
            if (byteOffset >= buffer.length) {
              if (dir) return -1
              else byteOffset = buffer.length - 1
            } else if (byteOffset < 0) {
              if (dir) byteOffset = 0
              else return -1
            }

            // Normalize val
            if (typeof val === 'string') {
              val = Buffer.from(val, encoding)
            }

            // Finally, search either indexOf (if dir is true) or lastIndexOf
            if (Buffer.isBuffer(val)) {
              // Special case: looking for empty string/buffer always fails
              if (val.length === 0) {
                return -1
              }
              return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
            } else if (typeof val === 'number') {
              val = val & 0xff // Search for a byte value [0-255]
              if (typeof Uint8Array.prototype.indexOf === 'function') {
                if (dir) {
                  return Uint8Array.prototype.indexOf.call(
                    buffer,
                    val,
                    byteOffset
                  )
                } else {
                  return Uint8Array.prototype.lastIndexOf.call(
                    buffer,
                    val,
                    byteOffset
                  )
                }
              }
              return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
            }

            throw new TypeError('val must be string, number or Buffer')
          }

          function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
            var indexSize = 1
            var arrLength = arr.length
            var valLength = val.length

            if (encoding !== undefined) {
              encoding = String(encoding).toLowerCase()
              if (
                encoding === 'ucs2' ||
                encoding === 'ucs-2' ||
                encoding === 'utf16le' ||
                encoding === 'utf-16le'
              ) {
                if (arr.length < 2 || val.length < 2) {
                  return -1
                }
                indexSize = 2
                arrLength /= 2
                valLength /= 2
                byteOffset /= 2
              }
            }

            function read(buf, i) {
              if (indexSize === 1) {
                return buf[i]
              } else {
                return buf.readUInt16BE(i * indexSize)
              }
            }

            var i
            if (dir) {
              var foundIndex = -1
              for (i = byteOffset; i < arrLength; i++) {
                if (
                  read(arr, i) ===
                  read(val, foundIndex === -1 ? 0 : i - foundIndex)
                ) {
                  if (foundIndex === -1) foundIndex = i
                  if (i - foundIndex + 1 === valLength)
                    return foundIndex * indexSize
                } else {
                  if (foundIndex !== -1) i -= i - foundIndex
                  foundIndex = -1
                }
              }
            } else {
              if (byteOffset + valLength > arrLength)
                byteOffset = arrLength - valLength
              for (i = byteOffset; i >= 0; i--) {
                var found = true
                for (var j = 0; j < valLength; j++) {
                  if (read(arr, i + j) !== read(val, j)) {
                    found = false
                    break
                  }
                }
                if (found) return i
              }
            }

            return -1
          }

          Buffer.prototype.includes = function includes(
            val,
            byteOffset,
            encoding
          ) {
            return this.indexOf(val, byteOffset, encoding) !== -1
          }

          Buffer.prototype.indexOf = function indexOf(
            val,
            byteOffset,
            encoding
          ) {
            return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
          }

          Buffer.prototype.lastIndexOf = function lastIndexOf(
            val,
            byteOffset,
            encoding
          ) {
            return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
          }

          function hexWrite(buf, string, offset, length) {
            offset = Number(offset) || 0
            var remaining = buf.length - offset
            if (!length) {
              length = remaining
            } else {
              length = Number(length)
              if (length > remaining) {
                length = remaining
              }
            }

            var strLen = string.length

            if (length > strLen / 2) {
              length = strLen / 2
            }
            for (var i = 0; i < length; ++i) {
              var parsed = parseInt(string.substr(i * 2, 2), 16)
              if (numberIsNaN(parsed)) return i
              buf[offset + i] = parsed
            }
            return i
          }

          function utf8Write(buf, string, offset, length) {
            return blitBuffer(
              utf8ToBytes(string, buf.length - offset),
              buf,
              offset,
              length
            )
          }

          function asciiWrite(buf, string, offset, length) {
            return blitBuffer(asciiToBytes(string), buf, offset, length)
          }

          function latin1Write(buf, string, offset, length) {
            return asciiWrite(buf, string, offset, length)
          }

          function base64Write(buf, string, offset, length) {
            return blitBuffer(base64ToBytes(string), buf, offset, length)
          }

          function ucs2Write(buf, string, offset, length) {
            return blitBuffer(
              utf16leToBytes(string, buf.length - offset),
              buf,
              offset,
              length
            )
          }

          Buffer.prototype.write = function write(
            string,
            offset,
            length,
            encoding
          ) {
            // Buffer#write(string)
            if (offset === undefined) {
              encoding = 'utf8'
              length = this.length
              offset = 0
              // Buffer#write(string, encoding)
            } else if (length === undefined && typeof offset === 'string') {
              encoding = offset
              length = this.length
              offset = 0
              // Buffer#write(string, offset[, length][, encoding])
            } else if (isFinite(offset)) {
              offset = offset >>> 0
              if (isFinite(length)) {
                length = length >>> 0
                if (encoding === undefined) encoding = 'utf8'
              } else {
                encoding = length
                length = undefined
              }
            } else {
              throw new Error(
                'Buffer.write(string, encoding, offset[, length]) is no longer supported'
              )
            }

            var remaining = this.length - offset
            if (length === undefined || length > remaining) length = remaining

            if (
              (string.length > 0 && (length < 0 || offset < 0)) ||
              offset > this.length
            ) {
              throw new RangeError('Attempt to write outside buffer bounds')
            }

            if (!encoding) encoding = 'utf8'

            var loweredCase = false
            for (;;) {
              switch (encoding) {
                case 'hex':
                  return hexWrite(this, string, offset, length)

                case 'utf8':
                case 'utf-8':
                  return utf8Write(this, string, offset, length)

                case 'ascii':
                  return asciiWrite(this, string, offset, length)

                case 'latin1':
                case 'binary':
                  return latin1Write(this, string, offset, length)

                case 'base64':
                  // Warning: maxLength not taken into account in base64Write
                  return base64Write(this, string, offset, length)

                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                  return ucs2Write(this, string, offset, length)

                default:
                  if (loweredCase)
                    throw new TypeError('Unknown encoding: ' + encoding)
                  encoding = ('' + encoding).toLowerCase()
                  loweredCase = true
              }
            }
          }

          Buffer.prototype.toJSON = function toJSON() {
            return {
              type: 'Buffer',
              data: Array.prototype.slice.call(this._arr || this, 0),
            }
          }

          Buffer.prototype.toNSData = function toNSData() {
            const string = NSString.stringWithString(this.toString('binary'))
            return string.dataUsingEncoding(NSISOLatin1StringEncoding)
          }

          function base64Slice(buf, start, end) {
            if (start === 0 && end === buf.length) {
              return base64.fromByteArray(buf)
            } else {
              return base64.fromByteArray(buf.slice(start, end))
            }
          }

          function utf8Slice(buf, start, end) {
            end = Math.min(buf.length, end)
            var res = []

            var i = start
            while (i < end) {
              var firstByte = buf[i]
              var codePoint = null
              var bytesPerSequence =
                firstByte > 0xef
                  ? 4
                  : firstByte > 0xdf
                    ? 3
                    : firstByte > 0xbf
                      ? 2
                      : 1

              if (i + bytesPerSequence <= end) {
                var secondByte, thirdByte, fourthByte, tempCodePoint

                switch (bytesPerSequence) {
                  case 1:
                    if (firstByte < 0x80) {
                      codePoint = firstByte
                    }
                    break
                  case 2:
                    secondByte = buf[i + 1]
                    if ((secondByte & 0xc0) === 0x80) {
                      tempCodePoint =
                        ((firstByte & 0x1f) << 0x6) | (secondByte & 0x3f)
                      if (tempCodePoint > 0x7f) {
                        codePoint = tempCodePoint
                      }
                    }
                    break
                  case 3:
                    secondByte = buf[i + 1]
                    thirdByte = buf[i + 2]
                    if (
                      (secondByte & 0xc0) === 0x80 &&
                      (thirdByte & 0xc0) === 0x80
                    ) {
                      tempCodePoint =
                        ((firstByte & 0xf) << 0xc) |
                        ((secondByte & 0x3f) << 0x6) |
                        (thirdByte & 0x3f)
                      if (
                        tempCodePoint > 0x7ff &&
                        (tempCodePoint < 0xd800 || tempCodePoint > 0xdfff)
                      ) {
                        codePoint = tempCodePoint
                      }
                    }
                    break
                  case 4:
                    secondByte = buf[i + 1]
                    thirdByte = buf[i + 2]
                    fourthByte = buf[i + 3]
                    if (
                      (secondByte & 0xc0) === 0x80 &&
                      (thirdByte & 0xc0) === 0x80 &&
                      (fourthByte & 0xc0) === 0x80
                    ) {
                      tempCodePoint =
                        ((firstByte & 0xf) << 0x12) |
                        ((secondByte & 0x3f) << 0xc) |
                        ((thirdByte & 0x3f) << 0x6) |
                        (fourthByte & 0x3f)
                      if (tempCodePoint > 0xffff && tempCodePoint < 0x110000) {
                        codePoint = tempCodePoint
                      }
                    }
                }
              }

              if (codePoint === null) {
                // we did not generate a valid codePoint so insert a
                // replacement char (U+FFFD) and advance only 1 byte
                codePoint = 0xfffd
                bytesPerSequence = 1
              } else if (codePoint > 0xffff) {
                // encode to utf16 (surrogate pair dance)
                codePoint -= 0x10000
                res.push(((codePoint >>> 10) & 0x3ff) | 0xd800)
                codePoint = 0xdc00 | (codePoint & 0x3ff)
              }

              res.push(codePoint)
              i += bytesPerSequence
            }

            return decodeCodePointsArray(res)
          }

          // Based on http://stackoverflow.com/a/22747272/680742, the browser with
          // the lowest limit is Chrome, with 0x10000 args.
          // We go 1 magnitude less, for safety
          var MAX_ARGUMENTS_LENGTH = 0x1000

          function decodeCodePointsArray(codePoints) {
            var len = codePoints.length
            if (len <= MAX_ARGUMENTS_LENGTH) {
              return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
            }

            // Decode in chunks to avoid "call stack size exceeded".
            var res = ''
            var i = 0
            while (i < len) {
              res += String.fromCharCode.apply(
                String,
                codePoints.slice(i, (i += MAX_ARGUMENTS_LENGTH))
              )
            }
            return res
          }

          function asciiSlice(buf, start, end) {
            var ret = ''
            end = Math.min(buf.length, end)

            for (var i = start; i < end; ++i) {
              ret += String.fromCharCode(buf[i] & 0x7f)
            }
            return ret
          }

          function latin1Slice(buf, start, end) {
            var ret = ''
            end = Math.min(buf.length, end)

            for (var i = start; i < end; ++i) {
              ret += String.fromCharCode(buf[i])
            }
            return ret
          }

          function hexSlice(buf, start, end) {
            var len = buf.length

            if (!start || start < 0) start = 0
            if (!end || end < 0 || end > len) end = len

            var out = ''
            for (var i = start; i < end; ++i) {
              out += toHex(buf[i])
            }
            return out
          }

          function utf16leSlice(buf, start, end) {
            var bytes = buf.slice(start, end)
            var res = ''
            for (var i = 0; i < bytes.length; i += 2) {
              res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
            }
            return res
          }

          Buffer.prototype.slice = function slice(start, end) {
            var len = this.length
            start = ~~start
            end = end === undefined ? len : ~~end

            if (start < 0) {
              start += len
              if (start < 0) start = 0
            } else if (start > len) {
              start = len
            }

            if (end < 0) {
              end += len
              if (end < 0) end = 0
            } else if (end > len) {
              end = len
            }

            if (end < start) end = start

            var newBuf = this.subarray(start, end)
            // Return an augmented `Uint8Array` instance
            newBuf.__proto__ = Buffer.prototype
            return newBuf
          }

          /*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
          function checkOffset(offset, ext, length) {
            if (offset % 1 !== 0 || offset < 0)
              throw new RangeError('offset is not uint')
            if (offset + ext > length)
              throw new RangeError('Trying to access beyond buffer length')
          }

          Buffer.prototype.readUIntLE = function readUIntLE(
            offset,
            byteLength,
            noAssert
          ) {
            offset = offset >>> 0
            byteLength = byteLength >>> 0
            if (!noAssert) checkOffset(offset, byteLength, this.length)

            var val = this[offset]
            var mul = 1
            var i = 0
            while (++i < byteLength && (mul *= 0x100)) {
              val += this[offset + i] * mul
            }

            return val
          }

          Buffer.prototype.readUIntBE = function readUIntBE(
            offset,
            byteLength,
            noAssert
          ) {
            offset = offset >>> 0
            byteLength = byteLength >>> 0
            if (!noAssert) {
              checkOffset(offset, byteLength, this.length)
            }

            var val = this[offset + --byteLength]
            var mul = 1
            while (byteLength > 0 && (mul *= 0x100)) {
              val += this[offset + --byteLength] * mul
            }

            return val
          }

          Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
            offset = offset >>> 0
            if (!noAssert) checkOffset(offset, 1, this.length)
            return this[offset]
          }

          Buffer.prototype.readUInt16LE = function readUInt16LE(
            offset,
            noAssert
          ) {
            offset = offset >>> 0
            if (!noAssert) checkOffset(offset, 2, this.length)
            return this[offset] | (this[offset + 1] << 8)
          }

          Buffer.prototype.readUInt16BE = function readUInt16BE(
            offset,
            noAssert
          ) {
            offset = offset >>> 0
            if (!noAssert) checkOffset(offset, 2, this.length)
            return (this[offset] << 8) | this[offset + 1]
          }

          Buffer.prototype.readUInt32LE = function readUInt32LE(
            offset,
            noAssert
          ) {
            offset = offset >>> 0
            if (!noAssert) checkOffset(offset, 4, this.length)

            return (
              (this[offset] |
                (this[offset + 1] << 8) |
                (this[offset + 2] << 16)) +
              this[offset + 3] * 0x1000000
            )
          }

          Buffer.prototype.readUInt32BE = function readUInt32BE(
            offset,
            noAssert
          ) {
            offset = offset >>> 0
            if (!noAssert) checkOffset(offset, 4, this.length)

            return (
              this[offset] * 0x1000000 +
              ((this[offset + 1] << 16) |
                (this[offset + 2] << 8) |
                this[offset + 3])
            )
          }

          Buffer.prototype.readIntLE = function readIntLE(
            offset,
            byteLength,
            noAssert
          ) {
            offset = offset >>> 0
            byteLength = byteLength >>> 0
            if (!noAssert) checkOffset(offset, byteLength, this.length)

            var val = this[offset]
            var mul = 1
            var i = 0
            while (++i < byteLength && (mul *= 0x100)) {
              val += this[offset + i] * mul
            }
            mul *= 0x80

            if (val >= mul) val -= Math.pow(2, 8 * byteLength)

            return val
          }

          Buffer.prototype.readIntBE = function readIntBE(
            offset,
            byteLength,
            noAssert
          ) {
            offset = offset >>> 0
            byteLength = byteLength >>> 0
            if (!noAssert) checkOffset(offset, byteLength, this.length)

            var i = byteLength
            var mul = 1
            var val = this[offset + --i]
            while (i > 0 && (mul *= 0x100)) {
              val += this[offset + --i] * mul
            }
            mul *= 0x80

            if (val >= mul) val -= Math.pow(2, 8 * byteLength)

            return val
          }

          Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
            offset = offset >>> 0
            if (!noAssert) checkOffset(offset, 1, this.length)
            if (!(this[offset] & 0x80)) return this[offset]
            return (0xff - this[offset] + 1) * -1
          }

          Buffer.prototype.readInt16LE = function readInt16LE(
            offset,
            noAssert
          ) {
            offset = offset >>> 0
            if (!noAssert) checkOffset(offset, 2, this.length)
            var val = this[offset] | (this[offset + 1] << 8)
            return val & 0x8000 ? val | 0xffff0000 : val
          }

          Buffer.prototype.readInt16BE = function readInt16BE(
            offset,
            noAssert
          ) {
            offset = offset >>> 0
            if (!noAssert) checkOffset(offset, 2, this.length)
            var val = this[offset + 1] | (this[offset] << 8)
            return val & 0x8000 ? val | 0xffff0000 : val
          }

          Buffer.prototype.readInt32LE = function readInt32LE(
            offset,
            noAssert
          ) {
            offset = offset >>> 0
            if (!noAssert) checkOffset(offset, 4, this.length)

            return (
              this[offset] |
              (this[offset + 1] << 8) |
              (this[offset + 2] << 16) |
              (this[offset + 3] << 24)
            )
          }

          Buffer.prototype.readInt32BE = function readInt32BE(
            offset,
            noAssert
          ) {
            offset = offset >>> 0
            if (!noAssert) checkOffset(offset, 4, this.length)

            return (
              (this[offset] << 24) |
              (this[offset + 1] << 16) |
              (this[offset + 2] << 8) |
              this[offset + 3]
            )
          }

          Buffer.prototype.readFloatLE = function readFloatLE(
            offset,
            noAssert
          ) {
            offset = offset >>> 0
            if (!noAssert) checkOffset(offset, 4, this.length)
            return ieee754.read(this, offset, true, 23, 4)
          }

          Buffer.prototype.readFloatBE = function readFloatBE(
            offset,
            noAssert
          ) {
            offset = offset >>> 0
            if (!noAssert) checkOffset(offset, 4, this.length)
            return ieee754.read(this, offset, false, 23, 4)
          }

          Buffer.prototype.readDoubleLE = function readDoubleLE(
            offset,
            noAssert
          ) {
            offset = offset >>> 0
            if (!noAssert) checkOffset(offset, 8, this.length)
            return ieee754.read(this, offset, true, 52, 8)
          }

          Buffer.prototype.readDoubleBE = function readDoubleBE(
            offset,
            noAssert
          ) {
            offset = offset >>> 0
            if (!noAssert) checkOffset(offset, 8, this.length)
            return ieee754.read(this, offset, false, 52, 8)
          }

          function checkInt(buf, value, offset, ext, max, min) {
            if (!Buffer.isBuffer(buf))
              throw new TypeError('"buffer" argument must be a Buffer instance')
            if (value > max || value < min)
              throw new RangeError('"value" argument is out of bounds')
            if (offset + ext > buf.length)
              throw new RangeError('Index out of range')
          }

          Buffer.prototype.writeUIntLE = function writeUIntLE(
            value,
            offset,
            byteLength,
            noAssert
          ) {
            value = +value
            offset = offset >>> 0
            byteLength = byteLength >>> 0
            if (!noAssert) {
              var maxBytes = Math.pow(2, 8 * byteLength) - 1
              checkInt(this, value, offset, byteLength, maxBytes, 0)
            }

            var mul = 1
            var i = 0
            this[offset] = value & 0xff
            while (++i < byteLength && (mul *= 0x100)) {
              this[offset + i] = (value / mul) & 0xff
            }

            return offset + byteLength
          }

          Buffer.prototype.writeUIntBE = function writeUIntBE(
            value,
            offset,
            byteLength,
            noAssert
          ) {
            value = +value
            offset = offset >>> 0
            byteLength = byteLength >>> 0
            if (!noAssert) {
              var maxBytes = Math.pow(2, 8 * byteLength) - 1
              checkInt(this, value, offset, byteLength, maxBytes, 0)
            }

            var i = byteLength - 1
            var mul = 1
            this[offset + i] = value & 0xff
            while (--i >= 0 && (mul *= 0x100)) {
              this[offset + i] = (value / mul) & 0xff
            }

            return offset + byteLength
          }

          Buffer.prototype.writeUInt8 = function writeUInt8(
            value,
            offset,
            noAssert
          ) {
            value = +value
            offset = offset >>> 0
            if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
            this[offset] = value & 0xff
            return offset + 1
          }

          Buffer.prototype.writeUInt16LE = function writeUInt16LE(
            value,
            offset,
            noAssert
          ) {
            value = +value
            offset = offset >>> 0
            if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
            this[offset] = value & 0xff
            this[offset + 1] = value >>> 8
            return offset + 2
          }

          Buffer.prototype.writeUInt16BE = function writeUInt16BE(
            value,
            offset,
            noAssert
          ) {
            value = +value
            offset = offset >>> 0
            if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
            this[offset] = value >>> 8
            this[offset + 1] = value & 0xff
            return offset + 2
          }

          Buffer.prototype.writeUInt32LE = function writeUInt32LE(
            value,
            offset,
            noAssert
          ) {
            value = +value
            offset = offset >>> 0
            if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
            this[offset + 3] = value >>> 24
            this[offset + 2] = value >>> 16
            this[offset + 1] = value >>> 8
            this[offset] = value & 0xff
            return offset + 4
          }

          Buffer.prototype.writeUInt32BE = function writeUInt32BE(
            value,
            offset,
            noAssert
          ) {
            value = +value
            offset = offset >>> 0
            if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
            this[offset] = value >>> 24
            this[offset + 1] = value >>> 16
            this[offset + 2] = value >>> 8
            this[offset + 3] = value & 0xff
            return offset + 4
          }

          Buffer.prototype.writeIntLE = function writeIntLE(
            value,
            offset,
            byteLength,
            noAssert
          ) {
            value = +value
            offset = offset >>> 0
            if (!noAssert) {
              var limit = Math.pow(2, 8 * byteLength - 1)

              checkInt(this, value, offset, byteLength, limit - 1, -limit)
            }

            var i = 0
            var mul = 1
            var sub = 0
            this[offset] = value & 0xff
            while (++i < byteLength && (mul *= 0x100)) {
              if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
                sub = 1
              }
              this[offset + i] = (((value / mul) >> 0) - sub) & 0xff
            }

            return offset + byteLength
          }

          Buffer.prototype.writeIntBE = function writeIntBE(
            value,
            offset,
            byteLength,
            noAssert
          ) {
            value = +value
            offset = offset >>> 0
            if (!noAssert) {
              var limit = Math.pow(2, 8 * byteLength - 1)

              checkInt(this, value, offset, byteLength, limit - 1, -limit)
            }

            var i = byteLength - 1
            var mul = 1
            var sub = 0
            this[offset + i] = value & 0xff
            while (--i >= 0 && (mul *= 0x100)) {
              if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
                sub = 1
              }
              this[offset + i] = (((value / mul) >> 0) - sub) & 0xff
            }

            return offset + byteLength
          }

          Buffer.prototype.writeInt8 = function writeInt8(
            value,
            offset,
            noAssert
          ) {
            value = +value
            offset = offset >>> 0
            if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
            if (value < 0) value = 0xff + value + 1
            this[offset] = value & 0xff
            return offset + 1
          }

          Buffer.prototype.writeInt16LE = function writeInt16LE(
            value,
            offset,
            noAssert
          ) {
            value = +value
            offset = offset >>> 0
            if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
            this[offset] = value & 0xff
            this[offset + 1] = value >>> 8
            return offset + 2
          }

          Buffer.prototype.writeInt16BE = function writeInt16BE(
            value,
            offset,
            noAssert
          ) {
            value = +value
            offset = offset >>> 0
            if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
            this[offset] = value >>> 8
            this[offset + 1] = value & 0xff
            return offset + 2
          }

          Buffer.prototype.writeInt32LE = function writeInt32LE(
            value,
            offset,
            noAssert
          ) {
            value = +value
            offset = offset >>> 0
            if (!noAssert)
              checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
            this[offset] = value & 0xff
            this[offset + 1] = value >>> 8
            this[offset + 2] = value >>> 16
            this[offset + 3] = value >>> 24
            return offset + 4
          }

          Buffer.prototype.writeInt32BE = function writeInt32BE(
            value,
            offset,
            noAssert
          ) {
            value = +value
            offset = offset >>> 0
            if (!noAssert)
              checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
            if (value < 0) value = 0xffffffff + value + 1
            this[offset] = value >>> 24
            this[offset + 1] = value >>> 16
            this[offset + 2] = value >>> 8
            this[offset + 3] = value & 0xff
            return offset + 4
          }

          function checkIEEE754(buf, value, offset, ext, max, min) {
            if (offset + ext > buf.length)
              throw new RangeError('Index out of range')
            if (offset < 0) throw new RangeError('Index out of range')
          }

          function writeFloat(buf, value, offset, littleEndian, noAssert) {
            value = +value
            offset = offset >>> 0
            if (!noAssert) {
              checkIEEE754(
                buf,
                value,
                offset,
                4,
                3.4028234663852886e38,
                -3.4028234663852886e38
              )
            }
            ieee754.write(buf, value, offset, littleEndian, 23, 4)
            return offset + 4
          }

          Buffer.prototype.writeFloatLE = function writeFloatLE(
            value,
            offset,
            noAssert
          ) {
            return writeFloat(this, value, offset, true, noAssert)
          }

          Buffer.prototype.writeFloatBE = function writeFloatBE(
            value,
            offset,
            noAssert
          ) {
            return writeFloat(this, value, offset, false, noAssert)
          }

          function writeDouble(buf, value, offset, littleEndian, noAssert) {
            value = +value
            offset = offset >>> 0
            if (!noAssert) {
              checkIEEE754(
                buf,
                value,
                offset,
                8,
                1.7976931348623157e308,
                -1.7976931348623157e308
              )
            }
            ieee754.write(buf, value, offset, littleEndian, 52, 8)
            return offset + 8
          }

          Buffer.prototype.writeDoubleLE = function writeDoubleLE(
            value,
            offset,
            noAssert
          ) {
            return writeDouble(this, value, offset, true, noAssert)
          }

          Buffer.prototype.writeDoubleBE = function writeDoubleBE(
            value,
            offset,
            noAssert
          ) {
            return writeDouble(this, value, offset, false, noAssert)
          }

          // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
          Buffer.prototype.copy = function copy(
            target,
            targetStart,
            start,
            end
          ) {
            if (!Buffer.isBuffer(target))
              throw new TypeError('argument should be a Buffer')
            if (!start) start = 0
            if (!end && end !== 0) end = this.length
            if (targetStart >= target.length) targetStart = target.length
            if (!targetStart) targetStart = 0
            if (end > 0 && end < start) end = start

            // Copy 0 bytes; we're done
            if (end === start) return 0
            if (target.length === 0 || this.length === 0) return 0

            // Fatal error conditions
            if (targetStart < 0) {
              throw new RangeError('targetStart out of bounds')
            }
            if (start < 0 || start >= this.length)
              throw new RangeError('Index out of range')
            if (end < 0) throw new RangeError('sourceEnd out of bounds')

            // Are we oob?
            if (end > this.length) end = this.length
            if (target.length - targetStart < end - start) {
              end = target.length - targetStart + start
            }

            var len = end - start

            if (
              this === target &&
              typeof Uint8Array.prototype.copyWithin === 'function'
            ) {
              // Use built-in when available, missing from IE11
              this.copyWithin(targetStart, start, end)
            } else if (
              this === target &&
              start < targetStart &&
              targetStart < end
            ) {
              // descending copy from end
              for (var i = len - 1; i >= 0; --i) {
                target[i + targetStart] = this[i + start]
              }
            } else {
              Uint8Array.prototype.set.call(
                target,
                this.subarray(start, end),
                targetStart
              )
            }

            return len
          }

          // Usage:
          //    buffer.fill(number[, offset[, end]])
          //    buffer.fill(buffer[, offset[, end]])
          //    buffer.fill(string[, offset[, end]][, encoding])
          Buffer.prototype.fill = function fill(val, start, end, encoding) {
            // Handle string cases:
            if (typeof val === 'string') {
              if (typeof start === 'string') {
                encoding = start
                start = 0
                end = this.length
              } else if (typeof end === 'string') {
                encoding = end
                end = this.length
              }
              if (encoding !== undefined && typeof encoding !== 'string') {
                throw new TypeError('encoding must be a string')
              }
              if (
                typeof encoding === 'string' &&
                !Buffer.isEncoding(encoding)
              ) {
                throw new TypeError('Unknown encoding: ' + encoding)
              }
              if (val.length === 1) {
                var code = val.charCodeAt(0)
                if (
                  (encoding === 'utf8' && code < 128) ||
                  encoding === 'latin1'
                ) {
                  // Fast path: If `val` fits into a single byte, use that numeric value.
                  val = code
                }
              }
            } else if (typeof val === 'number') {
              val = val & 255
            }

            // Invalid ranges are not set to a default, so can range check early.
            if (start < 0 || this.length < start || this.length < end) {
              throw new RangeError('Out of range index')
            }

            if (end <= start) {
              return this
            }

            start = start >>> 0
            end = end === undefined ? this.length : end >>> 0

            if (!val) val = 0

            var i
            if (typeof val === 'number') {
              for (i = start; i < end; ++i) {
                this[i] = val
              }
            } else {
              var bytes = Buffer.isBuffer(val)
                ? val
                : Buffer.from(val, encoding)
              var len = bytes.length
              if (len === 0) {
                throw new TypeError(
                  'The value "' + val + '" is invalid for argument "value"'
                )
              }
              for (i = 0; i < end - start; ++i) {
                this[i + start] = bytes[i % len]
              }
            }

            return this
          }

          // HELPER FUNCTIONS
          // ================

          var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

          function base64clean(str) {
            // Node takes equal signs as end of the Base64 encoding
            str = str.split('=')[0]
            // Node strips out invalid characters like \n and \t from the string, base64-js does not
            str = str.trim().replace(INVALID_BASE64_RE, '')
            // Node converts strings with length < 2 to ''
            if (str.length < 2) return ''
            // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
            while (str.length % 4 !== 0) {
              str = str + '='
            }
            return str
          }

          function toHex(n) {
            if (n < 16) return '0' + n.toString(16)
            return n.toString(16)
          }

          function utf8ToBytes(string, units) {
            units = units || Infinity
            var codePoint
            var length = string.length
            var leadSurrogate = null
            var bytes = []

            for (var i = 0; i < length; ++i) {
              codePoint = string.charCodeAt(i)

              // is surrogate component
              if (codePoint > 0xd7ff && codePoint < 0xe000) {
                // last char was a lead
                if (!leadSurrogate) {
                  // no lead yet
                  if (codePoint > 0xdbff) {
                    // unexpected trail
                    if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd)
                    continue
                  } else if (i + 1 === length) {
                    // unpaired lead
                    if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd)
                    continue
                  }

                  // valid lead
                  leadSurrogate = codePoint

                  continue
                }

                // 2 leads in a row
                if (codePoint < 0xdc00) {
                  if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd)
                  leadSurrogate = codePoint
                  continue
                }

                // valid surrogate pair
                codePoint =
                  (((leadSurrogate - 0xd800) << 10) | (codePoint - 0xdc00)) +
                  0x10000
              } else if (leadSurrogate) {
                // valid bmp char, but last char was a lead
                if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd)
              }

              leadSurrogate = null

              // encode utf8
              if (codePoint < 0x80) {
                if ((units -= 1) < 0) break
                bytes.push(codePoint)
              } else if (codePoint < 0x800) {
                if ((units -= 2) < 0) break
                bytes.push((codePoint >> 0x6) | 0xc0, (codePoint & 0x3f) | 0x80)
              } else if (codePoint < 0x10000) {
                if ((units -= 3) < 0) break
                bytes.push(
                  (codePoint >> 0xc) | 0xe0,
                  ((codePoint >> 0x6) & 0x3f) | 0x80,
                  (codePoint & 0x3f) | 0x80
                )
              } else if (codePoint < 0x110000) {
                if ((units -= 4) < 0) break
                bytes.push(
                  (codePoint >> 0x12) | 0xf0,
                  ((codePoint >> 0xc) & 0x3f) | 0x80,
                  ((codePoint >> 0x6) & 0x3f) | 0x80,
                  (codePoint & 0x3f) | 0x80
                )
              } else {
                throw new Error('Invalid code point')
              }
            }

            return bytes
          }

          function asciiToBytes(str) {
            var byteArray = []
            for (var i = 0; i < str.length; ++i) {
              // Node's code seems to be doing this and not & 0x7F..
              byteArray.push(str.charCodeAt(i) & 0xff)
            }
            return byteArray
          }

          function utf16leToBytes(str, units) {
            var c, hi, lo
            var byteArray = []
            for (var i = 0; i < str.length; ++i) {
              if ((units -= 2) < 0) break

              c = str.charCodeAt(i)
              hi = c >> 8
              lo = c % 256
              byteArray.push(lo)
              byteArray.push(hi)
            }

            return byteArray
          }

          function base64ToBytes(str) {
            return base64.toByteArray(base64clean(str))
          }

          function blitBuffer(src, dst, offset, length) {
            for (var i = 0; i < length; ++i) {
              if (i + offset >= dst.length || i >= src.length) break
              dst[i + offset] = src[i]
            }
            return i
          }

          // ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
          // the `instanceof` check but they should be treated as of that type.
          // See: https://github.com/feross/buffer/issues/166
          function isInstance(obj, type) {
            return (
              obj instanceof type ||
              (obj != null &&
                obj.constructor != null &&
                obj.constructor.name != null &&
                obj.constructor.name === type.name)
            )
          }
          function numberIsNaN(obj) {
            // For IE11 support
            return obj !== obj // eslint-disable-line no-self-compare
          }

          /***/
        },

      /***/ './node_modules/@skpm/child_process/index.js':
        /*!***************************************************!*\
  !*** ./node_modules/@skpm/child_process/index.js ***!
  \***************************************************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          module.exports.exec = __webpack_require__(
            /*! ./lib/exec */ './node_modules/@skpm/child_process/lib/exec.js'
          )
          module.exports.execFile = __webpack_require__(
            /*! ./lib/execFile */ './node_modules/@skpm/child_process/lib/execFile.js'
          )
          module.exports.spawn = __webpack_require__(
            /*! ./lib/spawn */ './node_modules/@skpm/child_process/lib/spawn.js'
          )
          module.exports.spawnSync = __webpack_require__(
            /*! ./lib/spawnSync */ './node_modules/@skpm/child_process/lib/spawnSync.js'
          )
          module.exports.execFileSync = __webpack_require__(
            /*! ./lib/execFileSync */ './node_modules/@skpm/child_process/lib/execFileSync.js'
          )
          module.exports.execSync = __webpack_require__(
            /*! ./lib/execSync */ './node_modules/@skpm/child_process/lib/execSync.js'
          )

          /***/
        },

      /***/ './node_modules/@skpm/child_process/lib/exec.js':
        /*!******************************************************!*\
  !*** ./node_modules/@skpm/child_process/lib/exec.js ***!
  \******************************************************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          var execFile = __webpack_require__(
            /*! ./execFile */ './node_modules/@skpm/child_process/lib/execFile.js'
          )

          function normalizeExecArgs(command, options, callback) {
            if (typeof options === 'function') {
              callback = options
              options = undefined
            }

            // Make a shallow copy so we don't clobber the user's options object.
            options = Object.assign({}, options)
            options.shell =
              typeof options.shell === 'string' ? options.shell : true

            return {
              file: command,
              options: options,
              callback: callback,
            }
          }

          module.exports = function(command, options, callback) {
            var opts = normalizeExecArgs(command, options, callback)
            return execFile(opts.file, opts.options, opts.callback)
          }

          /***/
        },

      /***/ './node_modules/@skpm/child_process/lib/execFile.js':
        /*!**********************************************************!*\
  !*** ./node_modules/@skpm/child_process/lib/execFile.js ***!
  \**********************************************************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          /* WEBPACK VAR INJECTION */ ;(function(clearTimeout, setTimeout) {
            var spawn = __webpack_require__(
              /*! ./spawn */ './node_modules/@skpm/child_process/lib/spawn.js'
            )

            function validateTimeout(timeout) {
              if (
                timeout != null &&
                !(Number.isInteger(timeout) && timeout >= 0)
              ) {
                throw new Error('ERR_OUT_OF_RANGE options.timeout')
              }
            }

            function validateMaxBuffer(maxBuffer) {
              if (
                maxBuffer != null &&
                !(typeof maxBuffer === 'number' && maxBuffer >= 0)
              ) {
                throw new Error('ERR_OUT_OF_RANGE options.maxBuffer')
              }
            }

            module.exports = function(file, args, options, callback) {
              var defaultOptions = {
                encoding: 'utf8',
                timeout: 0,
                maxBuffer: 200 * 1024,
                killSignal: 'SIGTERM',
                cwd: undefined,
                env: undefined,
                shell: false,
              }

              if (typeof args === 'function') {
                // function (file, callback)
                callback = args
                args = []
                options = defaultOptions
              } else if (typeof args === 'object' && !Array.isArray(args)) {
                // function (file, options, callback)
                callback = options
                options = Object.assign(defaultOptions, args)
                args = []
              } else {
                // function (file, args, options, callback)
                options = Object.assign(defaultOptions, options)
              }

              // Validate the timeout, if present.
              validateTimeout(options.timeout)

              // Validate maxBuffer, if present.
              validateMaxBuffer(options.maxBuffer)

              var child = spawn(file, args, {
                cwd: options.cwd,
                env: options.env,
                gid: options.gid,
                uid: options.uid,
                shell: options.shell,
              })

              var encoding
              var _stdout
              var _stderr
              if (options.encoding !== 'buffer' && options.encoding) {
                encoding = options.encoding
                _stdout = ''
                _stderr = ''
              } else {
                _stdout = []
                _stderr = []
                encoding = null
              }
              var stdoutLen = 0
              var stderrLen = 0
              var killed = false
              var exited = false
              var timeoutId

              var ex = null

              var cmd = file

              function exithandler(code, signal) {
                if (exited) return
                exited = true

                if (timeoutId) {
                  clearTimeout(timeoutId)
                  timeoutId = null
                }

                if (!callback) return

                // merge chunks
                var stdout
                var stderr
                if (encoding) {
                  stdout = _stdout
                  stderr = _stderr
                } else {
                  stdout = _stdout.reduce(function(prev, d) {
                    prev.appendData(d)
                    return prev
                  }, NSMutableData.data())
                  stderr = _stderr.reduce(function(prev, d) {
                    prev.appendData(d)
                    return prev
                  }, NSMutableData.data())
                }

                if (!ex && code === 0 && signal === null) {
                  callback(null, stdout, stderr)
                  return
                }

                if (args.length !== 0) cmd += ' ' + args.join(' ')

                if (!ex) {
                  ex = new Error('Command failed: ' + cmd + '\n' + stderr)
                  ex.killed = child.killed || killed
                  ex.code = code
                  ex.signal = signal
                }

                ex.cmd = cmd
                callback(ex, stdout, stderr)
              }

              function errorhandler(e) {
                ex = e

                exithandler()
              }

              function kill() {
                killed = true
                try {
                  child.kill(options.killSignal)
                } catch (e) {
                  ex = e
                  exithandler()
                }
              }

              if (options.timeout > 0) {
                timeoutId = setTimeout(function delayedKill() {
                  kill()
                  timeoutId = null
                }, options.timeout)
              }

              if (child.stdout) {
                if (encoding) child.stdout.setEncoding(encoding)

                child.stdout.on('data', function onChildStdout(chunk) {
                  stdoutLen += encoding ? chunk.length : chunk.length()

                  if (stdoutLen > options.maxBuffer) {
                    ex = new Error('ERR_CHILD_PROCESS_STDIO_MAXBUFFER stdout')
                    kill()
                  } else if (encoding) {
                    _stdout += chunk
                  } else {
                    _stdout.push(chunk)
                  }
                })
              }

              if (child.stderr) {
                if (encoding) child.stderr.setEncoding(encoding)

                child.stderr.on('data', function onChildStderr(chunk) {
                  stderrLen += encoding ? chunk.length : chunk.length()

                  if (stderrLen > options.maxBuffer) {
                    ex = new Error('ERR_CHILD_PROCESS_STDIO_MAXBUFFER stderr')
                    kill()
                  } else if (encoding) {
                    _stderr += chunk
                  } else {
                    _stderr.push(chunk)
                  }
                })
              }

              child.addListener('close', exithandler)
              child.addListener('error', errorhandler)

              return child
            }

            /* WEBPACK VAR INJECTION */
          }.call(
            this,
            __webpack_require__(
              /*! ./node_modules/@skpm/timers/timeout.js */ './node_modules/@skpm/timers/timeout.js'
            )['clearTimeout'],
            __webpack_require__(
              /*! ./node_modules/@skpm/timers/timeout.js */ './node_modules/@skpm/timers/timeout.js'
            )['setTimeout']
          ))

          /***/
        },

      /***/ './node_modules/@skpm/child_process/lib/execFileSync.js':
        /*!**************************************************************!*\
  !*** ./node_modules/@skpm/child_process/lib/execFileSync.js ***!
  \**************************************************************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          var spawnSync = __webpack_require__(
            /*! ./spawnSync */ './node_modules/@skpm/child_process/lib/spawnSync.js'
          )

          function validateTimeout(timeout) {
            if (
              timeout != null &&
              !(Number.isInteger(timeout) && timeout >= 0)
            ) {
              throw new Error('ERR_OUT_OF_RANGE options.timeout')
            }
          }

          function validateMaxBuffer(maxBuffer) {
            if (
              maxBuffer != null &&
              !(typeof maxBuffer === 'number' && maxBuffer >= 0)
            ) {
              throw new Error('ERR_OUT_OF_RANGE options.maxBuffer')
            }
          }

          module.exports = function(file, args, options) {
            var defaultOptions = {
              encoding: 'utf8',
              timeout: 0,
              maxBuffer: 200 * 1024,
              killSignal: 'SIGTERM',
              cwd: null,
              env: null,
              shell: false,
            }

            if (typeof args === 'object' && !Array.isArray(args)) {
              // function (file, options, callback)
              callback = options
              options = Object.assign(defaultOptions, args)
              args = []
            } else {
              // function (file, args, options, callback)
              options = Object.assign(defaultOptions, options || {})
            }

            // Validate the timeout, if present.
            validateTimeout(options.timeout)

            // Validate maxBuffer, if present.
            validateMaxBuffer(options.maxBuffer)

            var child = spawnSync(file, args, {
              cwd: options.cwd,
              env: options.env,
              gid: options.gid,
              uid: options.uid,
              shell: options.shell,
              encoding: options.encoding,
            })

            if (child.status !== 0) {
              var error = new Error('Failed to run: ' + String(child.stderr))
              error.pid = child.pid
              error.status = child.status
              error.stdout = child.stdout
              error.stderr = child.stderr
              throw error
            }

            return child.stdout
          }

          /***/
        },

      /***/ './node_modules/@skpm/child_process/lib/execSync.js':
        /*!**********************************************************!*\
  !*** ./node_modules/@skpm/child_process/lib/execSync.js ***!
  \**********************************************************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          var execFileSync = __webpack_require__(
            /*! ./execFileSync */ './node_modules/@skpm/child_process/lib/execFileSync.js'
          )

          function normalizeExecArgs(command, options) {
            // Make a shallow copy so we don't clobber the user's options object.
            options = Object.assign({}, options)
            options.shell =
              typeof options.shell === 'string' ? options.shell : true

            return {
              file: command,
              options: options,
            }
          }

          module.exports = function(command, options) {
            var opts = normalizeExecArgs(command, options)
            return execFileSync(opts.file, opts.options)
          }

          /***/
        },

      /***/ './node_modules/@skpm/child_process/lib/handleData.js':
        /*!************************************************************!*\
  !*** ./node_modules/@skpm/child_process/lib/handleData.js ***!
  \************************************************************/
        /*! no static exports found */
        /***/ function(module, exports) {
          module.exports = function handleData(data, encoding) {
            switch (encoding) {
              case 'utf8':
                return String(
                  NSString.alloc().initWithData_encoding(
                    data,
                    NSUTF8StringEncoding
                  )
                )
              case 'ascii':
                return String(
                  NSString.alloc().initWithData_encoding(
                    data,
                    NSASCIIStringEncoding
                  )
                )
              case 'utf16le':
              case 'ucs2':
                return String(
                  NSString.alloc().initWithData_encoding(
                    data,
                    NSUTF16LittleEndianStringEncoding
                  )
                )
              case 'base64':
                var nsdataDecoded = NSData.alloc().initWithBase64EncodedData_options(
                  data,
                  0
                )
                return String(
                  NSString.alloc().initWithData_encoding(
                    nsdataDecoded,
                    NSUTF8StringEncoding
                  )
                )
              case 'latin1':
              case 'binary':
                return String(
                  NSString.alloc().initWithData_encoding(
                    data,
                    NSISOLatin1StringEncoding
                  )
                )
              case 'hex':
                // TODO: how?
                return data
              default:
                return data
            }
          }

          /***/
        },

      /***/ './node_modules/@skpm/child_process/lib/normalizeSpawnArguments.js':
        /*!*************************************************************************!*\
  !*** ./node_modules/@skpm/child_process/lib/normalizeSpawnArguments.js ***!
  \*************************************************************************/
        /*! no static exports found */
        /***/ function(module, exports) {
          module.exports = function normalizeSpawnArguments(
            file,
            args,
            options
          ) {
            if (typeof file !== 'string' || file.length === 0)
              throw new Error('ERR_INVALID_ARG_TYPE')

            if (Array.isArray(args)) {
              args = args.slice(0)
            } else if (
              args !== undefined &&
              (args === null || typeof args !== 'object')
            ) {
              throw new Error('ERR_INVALID_ARG_TYPE args')
            } else {
              options = args
              args = []
            }

            if (options === undefined) options = {}
            else if (options === null || typeof options !== 'object')
              throw new Error('ERR_INVALID_ARG_TYPE options')

            // Validate the cwd, if present.
            if (options.cwd != null && typeof options.cwd !== 'string') {
              throw new Error('ERR_INVALID_ARG_TYPE options.cwd')
            }

            // Validate detached, if present.
            if (
              options.detached != null &&
              typeof options.detached !== 'boolean'
            ) {
              throw new Error('ERR_INVALID_ARG_TYPE options.detached')
            }

            // Validate the uid, if present.
            if (options.uid != null && !Number.isInteger(options.uid)) {
              throw new Error('ERR_INVALID_ARG_TYPE options.uid')
            }

            // Validate the gid, if present.
            if (options.gid != null && !Number.isInteger(options.gid)) {
              throw new Error('ERR_INVALID_ARG_TYPE options.gid')
            }

            // Validate the shell, if present.
            if (
              options.shell != null &&
              typeof options.shell !== 'boolean' &&
              typeof options.shell !== 'string'
            ) {
              throw new Error('ERR_INVALID_ARG_TYPE options.shell')
            }

            // Validate argv0, if present.
            if (options.argv0 != null && typeof options.argv0 !== 'string') {
              throw new Error('ERR_INVALID_ARG_TYPE options.argv0')
            }

            // Make a shallow copy so we don't clobber the user's options object.
            options = Object.assign({}, options)

            if (options.shell) {
              var command = [file].concat(args).join(' ')

              if (typeof options.shell === 'string') {
                file = options.shell
              } else {
                file = '/bin/bash'
              }
              args = ['-l', '-c', command]
            }

            if (typeof options.argv0 === 'string') {
              args.unshift(options.argv0)
            }

            var env = options.env

            return {
              file: file,
              args: args,
              options: options,
              envPairs: env,
            }
          }

          /***/
        },

      /***/ './node_modules/@skpm/child_process/lib/spawn.js':
        /*!*******************************************************!*\
  !*** ./node_modules/@skpm/child_process/lib/spawn.js ***!
  \*******************************************************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          /* globals NSPipe, NSTask, NSArray, NSHomeDirectory, NSFileHandleNotificationDataItem, NSUTF8StringEncoding, NSString, NSNotificationCenter, NSSelectorFromString, NSFileHandleReadCompletionNotification, NSDictionary, NSBundle */
          var ObjCClass = __webpack_require__(
            /*! cocoascript-class */ './node_modules/cocoascript-class/lib/index.js'
          ).default
          var EventEmitter = __webpack_require__(
            /*! @skpm/events */ './node_modules/@skpm/events/index.js'
          )
          var spawnSync = __webpack_require__(
            /*! ./spawnSync */ './node_modules/@skpm/child_process/lib/spawnSync.js'
          )
          var handleData = __webpack_require__(
            /*! ./handleData */ './node_modules/@skpm/child_process/lib/handleData.js'
          )
          var normalizeSpawnArguments = __webpack_require__(
            /*! ./normalizeSpawnArguments */ './node_modules/@skpm/child_process/lib/normalizeSpawnArguments.js'
          )
          // We create one ObjC class for ourselves here
          var ChildProcess

          function spawn(_command, _args, _options) {
            var opts = normalizeSpawnArguments(_command, _args, _options)

            if (
              opts.file[0] !== '.' &&
              opts.file[0] !== '/' &&
              opts.file[0] !== '~'
            ) {
              // means that someone refered to an executable that might be in the path, let's find it
              var whichChild = spawnSync(
                '/bin/bash',
                ['-l', '-c', 'which ' + opts.file],
                { encoding: 'utf8' }
              )
              if (whichChild.err) {
                var result = new EventEmitter()

                result.stderr = new EventEmitter()
                result.stdout = new EventEmitter()

                result.stderr.setEncoding = function(encoding) {
                  result.stderr.encoding = encoding
                }
                result.stdout.setEncoding = function(encoding) {
                  result.stdout.encoding = encoding
                }
                result.emit('error', whichChild.err)
                return result
              }
              return spawn(whichChild.stdout.trim(), _args, _options)
            } else {
              var options = opts.options
              var result = new EventEmitter()

              result.stderr = new EventEmitter()
              result.stdout = new EventEmitter()

              result.stderr.setEncoding = function(encoding) {
                result.stderr.encoding = encoding
              }
              result.stdout.setEncoding = function(encoding) {
                result.stdout.encoding = encoding
              }

              if (!ChildProcess) {
                ChildProcess = ObjCClass({
                  classname: 'ChildProcess',
                  listeners: null,
                  fileHandle: null,
                  errFileHandle: null,
                  task: null,

                  spawn(args, listeners) {
                    this.listeners = NSDictionary.dictionaryWithDictionary(
                      listeners
                    )
                    var pipe = NSPipe.pipe()
                    var errPipe = NSPipe.pipe()

                    this.fileHandle = pipe.fileHandleForReading()
                    this.fileHandle.waitForDataInBackgroundAndNotify()

                    this.errFileHandle = pipe.fileHandleForReading()
                    this.errFileHandle.waitForDataInBackgroundAndNotify()

                    this.task = NSTask.alloc().init()
                    this.task.setLaunchPath(
                      NSString.stringWithString(
                        opts.file
                      ).stringByExpandingTildeInPath()
                    )
                    this.task.arguments = NSArray.arrayWithArray(
                      args.args || []
                    )
                    if (args.envPairs) {
                      this.task.environment = args.envPairs
                    }
                    if (args.cwd) {
                      this.task.setCurrentDirectoryPath(
                        NSString.stringWithString(
                          args.cwd
                        ).stringByExpandingTildeInPath()
                      )
                    }

                    this.task.setStandardOutput(pipe)
                    this.task.setStandardError(errPipe)

                    this.task.launch()
                  },

                  kill() {
                    if (this.task) {
                      this.task.terminate()
                    }
                  },

                  'readLine:': function readLine(fileHandle) {
                    var fileDescriptor = fileHandle.object().fileDescriptor()
                    if (
                      fileDescriptor != this.fileHandle.fileDescriptor() &&
                      fileDescriptor != this.errFileHandle.fileDescriptor()
                    ) {
                      return
                    }
                    var data = fileHandle.object().availableData()
                    if (!data) {
                      return
                    }

                    if (fileDescriptor == this.fileHandle.fileDescriptor()) {
                      this.listeners.onStdout(data)
                      if (this.task) {
                        this.fileHandle.waitForDataInBackgroundAndNotify()
                      }
                    } else if (
                      fileDescriptor == this.errFileHandle.fileDescriptor()
                    ) {
                      this.listeners.onStderr(data)
                      if (this.task) {
                        this.errFileHandle.waitForDataInBackgroundAndNotify()
                      }
                    }
                  },

                  'taskTerminated:': function taskTerminated(task) {
                    if (
                      task.object().processIdentifier() ==
                      this.task.processIdentifier()
                    ) {
                      this.listeners.onEnd(
                        Number(this.task.terminationStatus()),
                        null
                      )
                    }
                  },
                })
              }

              var child

              try {
                child = ChildProcess.new()
              } catch (err) {
                result.emit('error', err)
                return result
              }

              result.killed = false
              var fiber
              if (coscript.createFiber) {
                fiber = coscript.createFiber()
                fiber.onCleanup(function() {
                  NSNotificationCenter.defaultCenter().removeObserver(child)
                })
              } else {
                coscript.shouldKeepAround = true
              }

              function cleanupAsync() {
                if (fiber) {
                  fiber.cleanup()
                } else {
                  NSNotificationCenter.defaultCenter().removeObserver(child)
                  coscript.shouldKeepAround = false
                }
              }

              function onStdout(data) {
                if (data && data.length()) {
                  result.stdout.emit(
                    'data',
                    handleData(data, result.stdout.encoding)
                  )
                }
              }
              function onStderr(data) {
                if (data && data.length()) {
                  result.stderr.emit(
                    'data',
                    handleData(data, result.stderr.encoding)
                  )
                }
              }

              child.spawn(
                {
                  file: opts.file,
                  args: opts.args,
                  cwd: options.cwd,
                  detached: !!options.detached,
                  envPairs: opts.envPairs,
                  stdio: options.stdio,
                  uid: options.uid,
                  gid: options.gid,
                },
                {
                  onStdout: onStdout,
                  onStderr: onStderr,
                  onEnd: function(code, signal) {
                    if (!result.killed) {
                      // flush remaining data
                      onStdout(child.fileHandle.readDataToEndOfFile())
                      onStderr(child.errFileHandle.readDataToEndOfFile())

                      result.emit('close', code, signal)
                      result.stderr.emit('close')
                      result.stdout.emit('close')

                      cleanupAsync()
                    }
                  },
                }
              )

              NSNotificationCenter.defaultCenter().addObserver_selector_name_object(
                child,
                NSSelectorFromString('readLine:'),
                NSFileHandleDataAvailableNotification,
                null
              )

              NSNotificationCenter.defaultCenter().addObserver_selector_name_object(
                child,
                NSSelectorFromString('taskTerminated:'),
                NSTaskDidTerminateNotification,
                null
              )

              result.kill = function(signal) {
                if (!result.killed) {
                  result.killed = true
                  result.emit('close', null, signal)
                  child.kill()
                  cleanupAsync()
                }
              }

              result.pid = String(child.task.processIdentifier())

              return result
            }
          }

          module.exports = spawn

          /***/
        },

      /***/ './node_modules/@skpm/child_process/lib/spawnSync.js':
        /*!***********************************************************!*\
  !*** ./node_modules/@skpm/child_process/lib/spawnSync.js ***!
  \***********************************************************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          /* globals NSPipe, NSTask, NSArray, NSHomeDirectory, NSFileHandleNotificationDataItem, NSUTF8StringEncoding, NSString, NSNotificationCenter, NSSelectorFromString, NSFileHandleReadCompletionNotification, NSDictionary, NSBundle */
          var handleData = __webpack_require__(
            /*! ./handleData */ './node_modules/@skpm/child_process/lib/handleData.js'
          )
          var normalizeSpawnArguments = __webpack_require__(
            /*! ./normalizeSpawnArguments */ './node_modules/@skpm/child_process/lib/normalizeSpawnArguments.js'
          )

          function spawnSync(_command, _args, _options) {
            var opts = normalizeSpawnArguments(_command, _args, _options)

            if (
              opts.file[0] !== '.' &&
              opts.file[0] !== '/' &&
              opts.file[0] !== '~'
            ) {
              // means that someone refered to an executable that might be in the path, let's find it
              var whichChild = spawnSync(
                '/bin/bash',
                ['-l', '-c', 'which ' + opts.file],
                { encoding: 'utf8' }
              )
              if (whichChild.err) {
                return whichChild
              }
              return spawnSync(whichChild.stdout.trim(), _args, _options)
            } else {
              var options = opts.options

              var pipe = NSPipe.pipe()
              var errPipe = NSPipe.pipe()

              try {
                var task = NSTask.alloc().init()
                task.setLaunchPath(
                  NSString.stringWithString(
                    opts.file
                  ).stringByExpandingTildeInPath()
                )
                task.arguments = NSArray.arrayWithArray(opts.args || [])
                if (opts.envPairs) {
                  task.environment = opts.envPairs
                }

                if (options.cwd) {
                  task.setCurrentDirectoryPath(
                    NSString.stringWithString(
                      options.cwd
                    ).stringByExpandingTildeInPath()
                  )
                }

                task.setStandardOutput(pipe)
                task.setStandardError(errPipe)

                task.launch()
                task.waitUntilExit()

                return {
                  pid: String(task.processIdentifier()),
                  status: Number(task.terminationStatus()),
                  get stdout() {
                    var data = pipe.fileHandleForReading().readDataToEndOfFile()
                    return handleData(data, options.encoding)
                  },
                  get stderr() {
                    var data = errPipe
                      .fileHandleForReading()
                      .readDataToEndOfFile()
                    return handleData(data, options.encoding)
                  },
                }
              } catch (err) {
                return {
                  err: err,
                }
              }
            }
          }

          module.exports = spawnSync

          /***/
        },

      /***/ './node_modules/@skpm/events/index.js':
        /*!********************************************!*\
  !*** ./node_modules/@skpm/events/index.js ***!
  \********************************************/
        /*! no static exports found */
        /***/ function(module, exports) {
          function EventEmitter() {}

          // By default, a maximum of 10 listeners can be registered for any single event.
          EventEmitter.defaultMaxListeners = 10

          // Shortcuts to improve speed and size
          var proto = EventEmitter.prototype

          proto._maxListeners = EventEmitter.defaultMaxListeners

          function indexOfListener(listeners, listener) {
            var i = listeners.length
            while (i--) {
              if (listeners[i].listener === listener) {
                return i
              }
            }

            return -1
          }

          function alias(name) {
            return function aliasClosure() {
              return this[name].apply(this, arguments)
            }
          }

          function isValidListener(listener) {
            if (typeof listener === 'function') {
              return true
            } else if (listener && typeof listener === 'object') {
              return isValidListener(listener.listener)
            } else {
              return false
            }
          }

          proto._getListeners = function _getListeners(evt) {
            var events = this._getEvents()

            return events[evt] || (events[evt] = [])
          }

          proto._getEvents = function _getEvents() {
            return this._events || (this._events = {})
          }

          /*
  Alias for emitter.on(eventName, listener).
*/
          proto.addListener = alias('on')

          /*
  Synchronously calls each of the listeners registered for the event named eventName, in the order they were registered, passing the supplied arguments to each.

  Returns true if the event had listeners, false otherwise.
*/
          proto.emit = function emit(evt) {
            var args = Array.prototype.slice.call(arguments, 1)
            var listeners = this._getListeners(evt) || []
            var listener
            var i
            var key
            var response

            for (i = 0; i < listeners.length; i++) {
              listener = listeners[i]

              if (listener.once === true) {
                this.removeListener(evt, listener.listener)
              }

              response = listener.listener.apply(this, args || [])
            }

            return listeners.length > 0
          }

          /*
  Returns an array listing the events for which the emitter has registered listeners.
  The values in the array will be strings or Symbols.
*/
          proto.eventNames = function eventNames() {
            var events = this._getEvents()
            return Object.keys(events)
          }

          /*
  Returns the current max listener value for the EventEmitter which is either set by emitter.setMaxListeners(n) or defaults to EventEmitter.defaultMaxListeners.
*/
          proto.getMaxListeners = function getMaxListeners() {
            return this._maxListeners
          }

          /*
  Returns the number of listeners listening to the event named eventName.
*/
          proto.listenerCount = function listenerCount(eventName) {
            return this._getListeners(eventName).length
          }

          /*
  Returns a copy of the array of listeners for the event named eventName.
*/
          proto.listeners = function listeners(eventName) {
            return this._getListeners(eventName).map(function(wrappedListener) {
              return wrappedListener.listener
            })
          }

          /*
  Adds the listener function to the end of the listeners array for the event named eventName. No checks are made to see if the listener has already been added. Multiple calls passing the same combination of eventName and listener will result in the listener being added, and called, multiple times.

  Returns a reference to the EventEmitter, so that calls can be chained.

  By default, event listeners are invoked in the order they are added. The emitter.prependListener() method can be used as an alternative to add the event listener to the beginning of the listeners array.
*/
          proto.on = function on(evt, listener) {
            if (!isValidListener(listener)) {
              throw new Error('listener must be a function')
            }

            var listeners = this._getListeners(evt)
            var listenerIsWrapped = typeof listener === 'object'

            this.emit(
              'newListener',
              evt,
              listenerIsWrapped ? listener.listener : listener
            )

            listeners.push(
              listenerIsWrapped
                ? listener
                : {
                    listener: listener,
                    once: false,
                  }
            )

            return this
          }

          /*
  Adds a one-time listener function for the event named eventName. The next time eventName is triggered, this listener is removed and then invoked.

  Returns a reference to the EventEmitter, so that calls can be chained.

  By default, event listeners are invoked in the order they are added. The emitter.prependOnceListener() method can be used as an alternative to add the event listener to the beginning of the listeners array.
*/
          proto.once = function once(evt, listener) {
            return this.on(evt, {
              listener: listener,
              once: true,
            })
          }

          /*
  Adds the listener function to the beginning of the listeners array for the event named eventName. No checks are made to see if the listener has already been added. Multiple calls passing the same combination of eventName and listener will result in the listener being added, and called, multiple times.

  Returns a reference to the EventEmitter, so that calls can be chained.
*/
          proto.prependListener = function prependListener(evt, listener) {
            if (!isValidListener(listener)) {
              throw new Error('listener must be a function')
            }

            var listeners = this._getListeners(evt)
            var listenerIsWrapped = typeof listener === 'object'

            this.emit(
              'newListener',
              evt,
              listenerIsWrapped ? listener.listener : listener
            )

            listeners.unshift(
              listenerIsWrapped
                ? listener
                : {
                    listener: listener,
                    once: false,
                  }
            )

            return this
          }

          /*
  Adds a one-time listener function for the event named eventName to the beginning of the listeners array. The next time eventName is triggered, this listener is removed, and then invoked.

  Returns a reference to the EventEmitter, so that calls can be chained.
*/
          proto.prependOnceListener = function prependOnceListener(
            evt,
            listener
          ) {
            return this.prependListener(evt, {
              listener: listener,
              once: true,
            })
          }

          /*
  Removes all listeners, or those of the specified eventName.

  Note that it is bad practice to remove listeners added elsewhere in the code, particularly when the EventEmitter instance was created by some other component or module (e.g. sockets or file streams).

  Returns a reference to the EventEmitter, so that calls can be chained.
*/
          proto.removeAllListeners = function removeAllListeners(evt) {
            var events = this._getEvents()

            if (typeof evt === 'string') {
              // Remove all listeners for the specified event
              delete events[evt]
            } else {
              // Remove all listeners in all events
              delete this._events
            }

            return this
          }

          /*
  Removes the specified listener from the listener array for the event named eventName.

  removeListener will remove, at most, one instance of a listener from the listener array. If any single listener has been added multiple times to the listener array for the specified eventName, then removeListener must be called multiple times to remove each instance.

  Note that once an event has been emitted, all listeners attached to it at the time of emitting will be called in order. This implies that any removeListener() or removeAllListeners() calls after emitting and before the last listener finishes execution will not remove them from emit() in progress. Subsequent events will behave as expected.

  Because listeners are managed using an internal array, calling this will change the position indices of any listener registered after the listener being removed. This will not impact the order in which listeners are called, but it means that any copies of the listener array as returned by the emitter.listeners() method will need to be recreated.

  Returns a reference to the EventEmitter, so that calls can be chained.
*/
          proto.removeListener = function removeListener(evt, listener) {
            var listeners = this._getListeners(evt)

            var index = indexOfListener(listeners, listener)

            if (index !== -1) {
              listeners.splice(index, 1)

              this.emit('removeListener', evt, listener)
            }

            return this
          }

          /*
  By default EventEmitters will print a warning if more than 10 listeners are added for a particular event. This is a useful default that helps finding memory leaks. Obviously, not all events should be limited to just 10 listeners. The emitter.setMaxListeners() method allows the limit to be modified for this specific EventEmitter instance. The value can be set to Infinity (or 0) to indicate an unlimited number of listeners.

  Returns a reference to the EventEmitter, so that calls can be chained.
*/
          proto.setMaxListeners = function setMaxListeners(n) {
            this._maxListeners = n
            return this
          }

          /*
  Returns a copy of the array of listeners for the event named eventName, including any wrappers (such as those created by .once).
*/
          proto.rawListeners = function rawListeners(evt) {
            return this._getListeners(evt).slice()
          }

          module.exports = EventEmitter

          /***/
        },

      /***/ './node_modules/@skpm/fs/index.js':
        /*!****************************************!*\
  !*** ./node_modules/@skpm/fs/index.js ***!
  \****************************************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          // TODO: async. Should probably be done with NSFileHandle and some notifications
          // TODO: file descriptor. Needs to be done with NSFileHandle
          var Buffer = __webpack_require__(/*! buffer */ 'buffer').Buffer

          function encodingFromOptions(options, defaultValue) {
            return options && options.encoding
              ? String(options.encoding)
              : options
                ? String(options)
                : defaultValue
          }

          module.exports.constants = {
            F_OK: 0,
            R_OK: 4,
            W_OK: 2,
            X_OK: 1,
          }

          module.exports.accessSync = function(path, mode) {
            mode = mode | 0
            var fileManager = NSFileManager.defaultManager()

            switch (mode) {
              case 0:
                return module.exports.existsSync(path)
              case 1:
                return Boolean(fileManager.isExecutableFileAtPath(path))
              case 2:
                return Boolean(fileManager.isWritableFileAtPath(path))
              case 3:
                return Boolean(
                  fileManager.isExecutableFileAtPath(path) &&
                    fileManager.isWritableFileAtPath(path)
                )
              case 4:
                return Boolean(fileManager.isReadableFileAtPath(path))
              case 5:
                return Boolean(
                  fileManager.isReadableFileAtPath(path) &&
                    fileManager.isExecutableFileAtPath(path)
                )
              case 6:
                return Boolean(
                  fileManager.isReadableFileAtPath(path) &&
                    fileManager.isWritableFileAtPath(path)
                )
              case 7:
                return Boolean(
                  fileManager.isReadableFileAtPath(path) &&
                    fileManager.isWritableFileAtPath(path) &&
                    fileManager.isExecutableFileAtPath(path)
                )
            }
          }

          module.exports.appendFileSync = function(file, data, options) {
            if (!module.exports.existsSync(file)) {
              return module.exports.writeFileSync(file, data, options)
            }

            var handle = NSFileHandle.fileHandleForWritingAtPath(file)
            handle.seekToEndOfFile()

            var encoding = encodingFromOptions(options, 'utf8')

            var nsdata = Buffer.from(
              data,
              encoding === 'NSData' || encoding === 'buffer'
                ? undefined
                : encoding
            ).toNSData()

            handle.writeData(nsdata)
          }

          module.exports.chmodSync = function(path, mode) {
            var err = MOPointer.alloc().init()
            var fileManager = NSFileManager.defaultManager()
            fileManager.setAttributes_ofItemAtPath_error(
              {
                NSFilePosixPermissions: mode,
              },
              path,
              err
            )

            if (err.value() !== null) {
              throw new Error(err.value())
            }
          }

          module.exports.copyFileSync = function(path, dest, flags) {
            var err = MOPointer.alloc().init()
            var fileManager = NSFileManager.defaultManager()
            fileManager.copyItemAtPath_toPath_error(path, dest, err)

            if (err.value() !== null) {
              throw new Error(err.value())
            }
          }

          module.exports.existsSync = function(path) {
            var fileManager = NSFileManager.defaultManager()
            return Boolean(fileManager.fileExistsAtPath(path))
          }

          module.exports.linkSync = function(existingPath, newPath) {
            var err = MOPointer.alloc().init()
            var fileManager = NSFileManager.defaultManager()
            fileManager.linkItemAtPath_toPath_error(existingPath, newPath, err)

            if (err.value() !== null) {
              throw new Error(err.value())
            }
          }

          module.exports.mkdirSync = function(path, mode) {
            mode = mode || 0o777
            var err = MOPointer.alloc().init()
            var fileManager = NSFileManager.defaultManager()
            fileManager.createDirectoryAtPath_withIntermediateDirectories_attributes_error(
              path,
              false,
              {
                NSFilePosixPermissions: mode,
              },
              err
            )

            if (err.value() !== null) {
              throw new Error(err.value())
            }
          }

          module.exports.mkdtempSync = function(path) {
            function makeid() {
              var text = ''
              var possible =
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

              for (var i = 0; i < 6; i++)
                text += possible.charAt(
                  Math.floor(Math.random() * possible.length)
                )

              return text
            }
            var tempPath = path + makeid()
            module.exports.mkdirSync(tempPath)
            return tempPath
          }

          module.exports.readdirSync = function(path) {
            var fileManager = NSFileManager.defaultManager()
            var paths = fileManager.subpathsAtPath(path)
            var arr = []
            for (var i = 0; i < paths.length; i++) {
              arr.push(String(paths[i]))
            }
            return arr
          }

          module.exports.readFileSync = function(path, options) {
            var encoding = encodingFromOptions(options, 'buffer')
            var fileManager = NSFileManager.defaultManager()
            var data = fileManager.contentsAtPath(path)
            var buffer = Buffer.from(data)

            if (encoding === 'buffer') {
              return buffer
            } else if (encoding === 'NSData') {
              return buffer.toNSData()
            } else {
              return buffer.toString(encoding)
            }
          }

          module.exports.readlinkSync = function(path) {
            var err = MOPointer.alloc().init()
            var fileManager = NSFileManager.defaultManager()
            var result = fileManager.destinationOfSymbolicLinkAtPath_error(
              path,
              err
            )

            if (err.value() !== null) {
              throw new Error(err.value())
            }

            return String(result)
          }

          module.exports.realpathSync = function(path) {
            return String(NSString.stringByResolvingSymlinksInPath(path))
          }

          module.exports.renameSync = function(oldPath, newPath) {
            var err = MOPointer.alloc().init()
            var fileManager = NSFileManager.defaultManager()
            fileManager.moveItemAtPath_toPath_error(oldPath, newPath, err)

            if (err.value() !== null) {
              throw new Error(err.value())
            }
          }

          module.exports.rmdirSync = function(path) {
            var err = MOPointer.alloc().init()
            var fileManager = NSFileManager.defaultManager()
            fileManager.removeItemAtPath_error(path, err)

            if (err.value() !== null) {
              throw new Error(err.value())
            }
          }

          module.exports.statSync = function(path) {
            var err = MOPointer.alloc().init()
            var fileManager = NSFileManager.defaultManager()
            var result = fileManager.attributesOfItemAtPath_error(path, err)

            if (err.value() !== null) {
              throw new Error(err.value())
            }

            return {
              dev: String(result.NSFileDeviceIdentifier),
              // ino: 48064969, The file system specific "Inode" number for the file.
              mode: result.NSFileType | result.NSFilePosixPermissions,
              nlink: Number(result.NSFileReferenceCount),
              uid: String(result.NSFileOwnerAccountID),
              gid: String(result.NSFileGroupOwnerAccountID),
              // rdev: 0, A numeric device identifier if the file is considered "special".
              size: Number(result.NSFileSize),
              // blksize: 4096, The file system block size for i/o operations.
              // blocks: 8, The number of blocks allocated for this file.
              atimeMs:
                Number(result.NSFileModificationDate.timeIntervalSince1970()) *
                1000,
              mtimeMs:
                Number(result.NSFileModificationDate.timeIntervalSince1970()) *
                1000,
              ctimeMs:
                Number(result.NSFileModificationDate.timeIntervalSince1970()) *
                1000,
              birthtimeMs:
                Number(result.NSFileCreationDate.timeIntervalSince1970()) *
                1000,
              atime: new Date(
                Number(result.NSFileModificationDate.timeIntervalSince1970()) *
                  1000 +
                  0.5
              ), // the 0.5 comes from the node source. Not sure why it's added but in doubt...
              mtime: new Date(
                Number(result.NSFileModificationDate.timeIntervalSince1970()) *
                  1000 +
                  0.5
              ),
              ctime: new Date(
                Number(result.NSFileModificationDate.timeIntervalSince1970()) *
                  1000 +
                  0.5
              ),
              birthtime: new Date(
                Number(result.NSFileCreationDate.timeIntervalSince1970()) *
                  1000 +
                  0.5
              ),
              isBlockDevice: function() {
                return result.NSFileType === NSFileTypeBlockSpecial
              },
              isCharacterDevice: function() {
                return result.NSFileType === NSFileTypeCharacterSpecial
              },
              isDirectory: function() {
                return result.NSFileType === NSFileTypeDirectory
              },
              isFIFO: function() {
                return false
              },
              isFile: function() {
                return result.NSFileType === NSFileTypeRegular
              },
              isSocket: function() {
                return result.NSFileType === NSFileTypeSocket
              },
              isSymbolicLink: function() {
                return result.NSFileType === NSFileTypeSymbolicLink
              },
            }
          }

          module.exports.symlinkSync = function(target, path) {
            var err = MOPointer.alloc().init()
            var fileManager = NSFileManager.defaultManager()
            var result = fileManager.createSymbolicLinkAtPath_withDestinationPath_error(
              path,
              target,
              err
            )

            if (err.value() !== null) {
              throw new Error(err.value())
            }
          }

          module.exports.truncateSync = function(path, len) {
            var hFile = NSFileHandle.fileHandleForUpdatingAtPath(sFilePath)
            hFile.truncateFileAtOffset(len || 0)
            hFile.closeFile()
          }

          module.exports.unlinkSync = function(path) {
            var err = MOPointer.alloc().init()
            var fileManager = NSFileManager.defaultManager()
            var result = fileManager.removeItemAtPath_error(path, err)

            if (err.value() !== null) {
              throw new Error(err.value())
            }
          }

          module.exports.utimesSync = function(path, aTime, mTime) {
            var err = MOPointer.alloc().init()
            var fileManager = NSFileManager.defaultManager()
            var result = fileManager.setAttributes_ofItemAtPath_error(
              {
                NSFileModificationDate: aTime,
              },
              path,
              err
            )

            if (err.value() !== null) {
              throw new Error(err.value())
            }
          }

          module.exports.writeFileSync = function(path, data, options) {
            var encoding = encodingFromOptions(options, 'utf8')

            var nsdata = Buffer.from(
              data,
              encoding === 'NSData' || encoding === 'buffer'
                ? undefined
                : encoding
            ).toNSData()

            nsdata.writeToFile_atomically(path, true)
          }

          /***/
        },

      /***/ './node_modules/@skpm/path/index.js':
        /*!******************************************!*\
  !*** ./node_modules/@skpm/path/index.js ***!
  \******************************************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          // Copyright Joyent, Inc. and other Node contributors.
          //
          // Permission is hereby granted, free of charge, to any person obtaining a
          // copy of this software and associated documentation files (the
          // "Software"), to deal in the Software without restriction, including
          // without limitation the rights to use, copy, modify, merge, publish,
          // distribute, sublicense, and/or sell copies of the Software, and to permit
          // persons to whom the Software is furnished to do so, subject to the
          // following conditions:
          //
          // The above copyright notice and this permission notice shall be included
          // in all copies or substantial portions of the Software.
          //
          // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
          // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
          // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
          // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
          // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
          // USE OR OTHER DEALINGS IN THE SOFTWARE.

          var sketchSpecifics = __webpack_require__(
            /*! ./sketch-specifics */ './node_modules/@skpm/path/sketch-specifics.js'
          )

          // we only expose the posix implementation since Sketch only runs on macOS

          var CHAR_FORWARD_SLASH = 47
          var CHAR_DOT = 46

          // Resolves . and .. elements in a path with directory names
          function normalizeString(path, allowAboveRoot) {
            var res = ''
            var lastSegmentLength = 0
            var lastSlash = -1
            var dots = 0
            var code
            for (var i = 0; i <= path.length; i += 1) {
              if (i < path.length) code = path.charCodeAt(i)
              else if (code === CHAR_FORWARD_SLASH) break
              else code = CHAR_FORWARD_SLASH
              if (code === CHAR_FORWARD_SLASH) {
                if (lastSlash === i - 1 || dots === 1) {
                  // NOOP
                } else if (lastSlash !== i - 1 && dots === 2) {
                  if (
                    res.length < 2 ||
                    lastSegmentLength !== 2 ||
                    res.charCodeAt(res.length - 1) !== CHAR_DOT ||
                    res.charCodeAt(res.length - 2) !== CHAR_DOT
                  ) {
                    if (res.length > 2) {
                      var lastSlashIndex = res.lastIndexOf('/')
                      if (lastSlashIndex !== res.length - 1) {
                        if (lastSlashIndex === -1) {
                          res = ''
                          lastSegmentLength = 0
                        } else {
                          res = res.slice(0, lastSlashIndex)
                          lastSegmentLength =
                            res.length - 1 - res.lastIndexOf('/')
                        }
                        lastSlash = i
                        dots = 0
                        continue
                      }
                    } else if (res.length === 2 || res.length === 1) {
                      res = ''
                      lastSegmentLength = 0
                      lastSlash = i
                      dots = 0
                      continue
                    }
                  }
                  if (allowAboveRoot) {
                    if (res.length > 0) res += '/..'
                    else res = '..'
                    lastSegmentLength = 2
                  }
                } else {
                  if (res.length > 0) res += '/' + path.slice(lastSlash + 1, i)
                  else res = path.slice(lastSlash + 1, i)
                  lastSegmentLength = i - lastSlash - 1
                }
                lastSlash = i
                dots = 0
              } else if (code === CHAR_DOT && dots !== -1) {
                ++dots
              } else {
                dots = -1
              }
            }
            return res
          }

          function _format(sep, pathObject) {
            var dir = pathObject.dir || pathObject.root
            var base =
              pathObject.base ||
              (pathObject.name || '') + (pathObject.ext || '')
            if (!dir) {
              return base
            }
            if (dir === pathObject.root) {
              return dir + base
            }
            return dir + sep + base
          }

          var posix = {
            // path.resolve([from ...], to)
            resolve: function resolve() {
              var resolvedPath = ''
              var resolvedAbsolute = false
              var cwd

              for (
                var i = arguments.length - 1;
                i >= -1 && !resolvedAbsolute;
                i -= 1
              ) {
                var path
                if (i >= 0) {
                  path = arguments[i]
                } else {
                  if (cwd === undefined) {
                    cwd = posix.dirname(sketchSpecifics.cwd())
                  }
                  path = cwd
                }

                path = sketchSpecifics.getString(path, 'path')

                // Skip empty entries
                if (path.length === 0) {
                  continue
                }

                resolvedPath = path + '/' + resolvedPath
                resolvedAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH
              }

              // At this point the path should be resolved to a full absolute path, but
              // handle relative paths to be safe (might happen when process.cwd() fails)

              // Normalize the path
              resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute)

              if (resolvedAbsolute) {
                if (resolvedPath.length > 0) return '/' + resolvedPath
                else return '/'
              } else if (resolvedPath.length > 0) {
                return resolvedPath
              } else {
                return '.'
              }
            },

            normalize: function normalize(path) {
              path = sketchSpecifics.getString(path, 'path')

              if (path.length === 0) return '.'

              var isAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH
              var trailingSeparator =
                path.charCodeAt(path.length - 1) === CHAR_FORWARD_SLASH

              // Normalize the path
              path = normalizeString(path, !isAbsolute)

              if (path.length === 0 && !isAbsolute) path = '.'
              if (path.length > 0 && trailingSeparator) path += '/'

              if (isAbsolute) return '/' + path
              return path
            },

            isAbsolute: function isAbsolute(path) {
              path = sketchSpecifics.getString(path, 'path')
              return (
                path.length > 0 && path.charCodeAt(0) === CHAR_FORWARD_SLASH
              )
            },

            join: function join() {
              if (arguments.length === 0) return '.'
              var joined
              for (var i = 0; i < arguments.length; i += 1) {
                var arg = arguments[i]
                arg = sketchSpecifics.getString(arg, 'path')
                if (arg.length > 0) {
                  if (joined === undefined) joined = arg
                  else joined += '/' + arg
                }
              }
              if (joined === undefined) return '.'
              return posix.normalize(joined)
            },

            relative: function relative(from, to) {
              from = sketchSpecifics.getString(from, 'from path')
              to = sketchSpecifics.getString(to, 'to path')

              if (from === to) return ''

              from = posix.resolve(from)
              to = posix.resolve(to)

              if (from === to) return ''

              // Trim any leading backslashes
              var fromStart = 1
              for (; fromStart < from.length; fromStart += 1) {
                if (from.charCodeAt(fromStart) !== CHAR_FORWARD_SLASH) break
              }
              var fromEnd = from.length
              var fromLen = fromEnd - fromStart

              // Trim any leading backslashes
              var toStart = 1
              for (; toStart < to.length; toStart += 1) {
                if (to.charCodeAt(toStart) !== CHAR_FORWARD_SLASH) break
              }
              var toEnd = to.length
              var toLen = toEnd - toStart

              // Compare paths to find the longest common path from root
              var length = fromLen < toLen ? fromLen : toLen
              var lastCommonSep = -1
              var i = 0
              for (; i <= length; i += 1) {
                if (i === length) {
                  if (toLen > length) {
                    if (to.charCodeAt(toStart + i) === CHAR_FORWARD_SLASH) {
                      // We get here if `from` is the exact base path for `to`.
                      // For example: from='/foo/bar'; to='/foo/bar/baz'
                      return to.slice(toStart + i + 1)
                    } else if (i === 0) {
                      // We get here if `from` is the root
                      // For example: from='/'; to='/foo'
                      return to.slice(toStart + i)
                    }
                  } else if (fromLen > length) {
                    if (from.charCodeAt(fromStart + i) === CHAR_FORWARD_SLASH) {
                      // We get here if `to` is the exact base path for `from`.
                      // For example: from='/foo/bar/baz'; to='/foo/bar'
                      lastCommonSep = i
                    } else if (i === 0) {
                      // We get here if `to` is the root.
                      // For example: from='/foo'; to='/'
                      lastCommonSep = 0
                    }
                  }
                  break
                }
                var fromCode = from.charCodeAt(fromStart + i)
                var toCode = to.charCodeAt(toStart + i)
                if (fromCode !== toCode) break
                else if (fromCode === CHAR_FORWARD_SLASH) lastCommonSep = i
              }

              var out = ''
              // Generate the relative path based on the path difference between `to`
              // and `from`
              for (i = fromStart + lastCommonSep + 1; i <= fromEnd; i += 1) {
                if (
                  i === fromEnd ||
                  from.charCodeAt(i) === CHAR_FORWARD_SLASH
                ) {
                  if (out.length === 0) out += '..'
                  else out += '/..'
                }
              }

              // Lastly, append the rest of the destination (`to`) path that comes after
              // the common path parts
              if (out.length > 0) return out + to.slice(toStart + lastCommonSep)
              else {
                toStart += lastCommonSep
                if (to.charCodeAt(toStart) === CHAR_FORWARD_SLASH) toStart += 1
                return to.slice(toStart)
              }
            },

            toNamespacedPath: function toNamespacedPath(path) {
              // Non-op on posix systems
              return path
            },

            dirname: function dirname(path) {
              path = sketchSpecifics.getString(path, 'path')
              if (path.length === 0) return '.'
              var code = path.charCodeAt(0)
              var hasRoot = code === CHAR_FORWARD_SLASH
              var end = -1
              var matchedSlash = true
              for (var i = path.length - 1; i >= 1; i -= 1) {
                code = path.charCodeAt(i)
                if (code === CHAR_FORWARD_SLASH) {
                  if (!matchedSlash) {
                    end = i
                    break
                  }
                } else {
                  // We saw the first non-path separator
                  matchedSlash = false
                }
              }

              if (end === -1) return hasRoot ? '/' : '.'
              if (hasRoot && end === 1) return '//'
              return path.slice(0, end)
            },

            basename: function basename(path, ext) {
              if (ext !== undefined) ext = sketchSpecifics.getString(ext, 'ext')
              path = sketchSpecifics.getString(path, 'path')

              var start = 0
              var end = -1
              var matchedSlash = true
              var i

              if (
                ext !== undefined &&
                ext.length > 0 &&
                ext.length <= path.length
              ) {
                if (ext.length === path.length && ext === path) return ''
                var extIdx = ext.length - 1
                var firstNonSlashEnd = -1
                for (i = path.length - 1; i >= 0; i -= 1) {
                  var code = path.charCodeAt(i)
                  if (code === CHAR_FORWARD_SLASH) {
                    // If we reached a path separator that was not part of a set of path
                    // separators at the end of the string, stop now
                    if (!matchedSlash) {
                      start = i + 1
                      break
                    }
                  } else {
                    if (firstNonSlashEnd === -1) {
                      // We saw the first non-path separator, remember this index in case
                      // we need it if the extension ends up not matching
                      matchedSlash = false
                      firstNonSlashEnd = i + 1
                    }
                    if (extIdx >= 0) {
                      // Try to match the explicit extension
                      if (code === ext.charCodeAt(extIdx)) {
                        if (--extIdx === -1) {
                          // We matched the extension, so mark this as the end of our path
                          // component
                          end = i
                        }
                      } else {
                        // Extension does not match, so our result is the entire path
                        // component
                        extIdx = -1
                        end = firstNonSlashEnd
                      }
                    }
                  }
                }

                if (start === end) end = firstNonSlashEnd
                else if (end === -1) end = path.length
                return path.slice(start, end)
              } else {
                for (i = path.length - 1; i >= 0; --i) {
                  if (path.charCodeAt(i) === CHAR_FORWARD_SLASH) {
                    // If we reached a path separator that was not part of a set of path
                    // separators at the end of the string, stop now
                    if (!matchedSlash) {
                      start = i + 1
                      break
                    }
                  } else if (end === -1) {
                    // We saw the first non-path separator, mark this as the end of our
                    // path component
                    matchedSlash = false
                    end = i + 1
                  }
                }

                if (end === -1) return ''
                return path.slice(start, end)
              }
            },

            extname: function extname(path) {
              path = sketchSpecifics.getString(path, 'path')
              var startDot = -1
              var startPart = 0
              var end = -1
              var matchedSlash = true
              // Track the state of characters (if any) we see before our first dot and
              // after any path separator we find
              var preDotState = 0
              for (var i = path.length - 1; i >= 0; --i) {
                var code = path.charCodeAt(i)
                if (code === CHAR_FORWARD_SLASH) {
                  // If we reached a path separator that was not part of a set of path
                  // separators at the end of the string, stop now
                  if (!matchedSlash) {
                    startPart = i + 1
                    break
                  }
                  continue
                }
                if (end === -1) {
                  // We saw the first non-path separator, mark this as the end of our
                  // extension
                  matchedSlash = false
                  end = i + 1
                }
                if (code === CHAR_DOT) {
                  // If this is our first dot, mark it as the start of our extension
                  if (startDot === -1) startDot = i
                  else if (preDotState !== 1) preDotState = 1
                } else if (startDot !== -1) {
                  // We saw a non-dot and non-path separator before our dot, so we should
                  // have a good chance at having a non-empty extension
                  preDotState = -1
                }
              }

              if (
                startDot === -1 ||
                end === -1 ||
                // We saw a non-dot character immediately before the dot
                preDotState === 0 ||
                // The (right-most) trimmed path component is exactly '..'
                (preDotState === 1 &&
                  startDot === end - 1 &&
                  startDot === startPart + 1)
              ) {
                return ''
              }
              return path.slice(startDot, end)
            },

            format: function format(pathObject) {
              if (pathObject === null || typeof pathObject !== 'object') {
                throw new Error('pathObject should be an Object')
              }
              return _format('/', pathObject)
            },

            parse: function parse(path) {
              path = sketchSpecifics.getString(path, 'path')

              var ret = { root: '', dir: '', base: '', ext: '', name: '' }
              if (path.length === 0) return ret
              var code = path.charCodeAt(0)
              var isAbsolute = code === CHAR_FORWARD_SLASH
              var start
              if (isAbsolute) {
                ret.root = '/'
                start = 1
              } else {
                start = 0
              }
              var startDot = -1
              var startPart = 0
              var end = -1
              var matchedSlash = true
              var i = path.length - 1

              // Track the state of characters (if any) we see before our first dot and
              // after any path separator we find
              var preDotState = 0

              // Get non-dir info
              for (; i >= start; --i) {
                code = path.charCodeAt(i)
                if (code === CHAR_FORWARD_SLASH) {
                  // If we reached a path separator that was not part of a set of path
                  // separators at the end of the string, stop now
                  if (!matchedSlash) {
                    startPart = i + 1
                    break
                  }
                  continue
                }
                if (end === -1) {
                  // We saw the first non-path separator, mark this as the end of our
                  // extension
                  matchedSlash = false
                  end = i + 1
                }
                if (code === CHAR_DOT) {
                  // If this is our first dot, mark it as the start of our extension
                  if (startDot === -1) startDot = i
                  else if (preDotState !== 1) preDotState = 1
                } else if (startDot !== -1) {
                  // We saw a non-dot and non-path separator before our dot, so we should
                  // have a good chance at having a non-empty extension
                  preDotState = -1
                }
              }

              if (
                startDot === -1 ||
                end === -1 ||
                // We saw a non-dot character immediately before the dot
                preDotState === 0 ||
                // The (right-most) trimmed path component is exactly '..'
                (preDotState === 1 &&
                  startDot === end - 1 &&
                  startDot === startPart + 1)
              ) {
                if (end !== -1) {
                  if (startPart === 0 && isAbsolute)
                    ret.base = ret.name = path.slice(1, end)
                  else ret.base = ret.name = path.slice(startPart, end)
                }
              } else {
                if (startPart === 0 && isAbsolute) {
                  ret.name = path.slice(1, startDot)
                  ret.base = path.slice(1, end)
                } else {
                  ret.name = path.slice(startPart, startDot)
                  ret.base = path.slice(startPart, end)
                }
                ret.ext = path.slice(startDot, end)
              }

              if (startPart > 0) ret.dir = path.slice(0, startPart - 1)
              else if (isAbsolute) ret.dir = '/'

              return ret
            },

            sep: '/',
            delimiter: ':',
            win32: null,
            posix: null,
          }

          posix.posix = posix

          module.exports = posix

          /***/
        },

      /***/ './node_modules/@skpm/path/sketch-specifics.js':
        /*!*****************************************************!*\
  !*** ./node_modules/@skpm/path/sketch-specifics.js ***!
  \*****************************************************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          var util = __webpack_require__(/*! util */ 'util')

          module.exports.getString = function getString(path, argumentName) {
            if (!util.isString(path)) {
              // let's make a special case for NSURL
              if (util.getNativeClass(path) === 'NSURL') {
                return String(path.path().copy())
              }
              throw new Error(
                argumentName +
                  ' should be a string. Got ' +
                  typeof path +
                  ' instead.'
              )
            }
            return String(path)
          }

          module.exports.cwd = function cwd() {
            if (
              typeof __command !== 'undefined' &&
              __command.script() &&
              __command.script().URL()
            ) {
              return String(
                __command
                  .script()
                  .URL()
                  .path()
                  .copy()
              )
            }
            return String(
              MSPluginManager.defaultPluginURL()
                .path()
                .copy()
            )
          }

          /***/
        },

      /***/ './node_modules/@skpm/timers/immediate.js':
        /*!************************************************!*\
  !*** ./node_modules/@skpm/timers/immediate.js ***!
  \************************************************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          /* globals coscript, sketch */
          var timeout = __webpack_require__(
            /*! ./timeout */ './node_modules/@skpm/timers/timeout.js'
          )

          function setImmediate(
            func,
            param1,
            param2,
            param3,
            param4,
            param5,
            param6,
            param7,
            param8,
            param9,
            param10
          ) {
            return timeout.setTimeout(
              func,
              0,
              param1,
              param2,
              param3,
              param4,
              param5,
              param6,
              param7,
              param8,
              param9,
              param10
            )
          }

          function clearImmediate(id) {
            return timeout.clearTimeout(id)
          }

          module.exports = {
            setImmediate: setImmediate,
            clearImmediate: clearImmediate,
          }

          /***/
        },

      /***/ './node_modules/@skpm/timers/test-if-fiber.js':
        /*!****************************************************!*\
  !*** ./node_modules/@skpm/timers/test-if-fiber.js ***!
  \****************************************************/
        /*! no static exports found */
        /***/ function(module, exports) {
          module.exports = function() {
            return typeof coscript !== 'undefined' && coscript.createFiber
          }

          /***/
        },

      /***/ './node_modules/@skpm/timers/timeout.js':
        /*!**********************************************!*\
  !*** ./node_modules/@skpm/timers/timeout.js ***!
  \**********************************************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          /* globals coscript, sketch */
          var fiberAvailable = __webpack_require__(
            /*! ./test-if-fiber */ './node_modules/@skpm/timers/test-if-fiber.js'
          )

          var setTimeout
          var clearTimeout

          var fibers = []

          if (fiberAvailable()) {
            var fibers = []

            setTimeout = function(
              func,
              delay,
              param1,
              param2,
              param3,
              param4,
              param5,
              param6,
              param7,
              param8,
              param9,
              param10
            ) {
              // fibers takes care of keeping coscript around
              var id = fibers.length
              fibers.push(
                coscript.scheduleWithInterval_jsFunction(
                  (delay || 0) / 1000,
                  function() {
                    func(
                      param1,
                      param2,
                      param3,
                      param4,
                      param5,
                      param6,
                      param7,
                      param8,
                      param9,
                      param10
                    )
                  }
                )
              )
              return id
            }

            clearTimeout = function(id) {
              var timeout = fibers[id]
              if (timeout) {
                timeout.cancel() // fibers takes care of keeping coscript around
                fibers[id] = undefined // garbage collect the fiber
              }
            }
          } else {
            setTimeout = function(
              func,
              delay,
              param1,
              param2,
              param3,
              param4,
              param5,
              param6,
              param7,
              param8,
              param9,
              param10
            ) {
              coscript.shouldKeepAround = true
              var id = fibers.length
              fibers.push(true)
              coscript.scheduleWithInterval_jsFunction(
                (delay || 0) / 1000,
                function() {
                  if (fibers[id]) {
                    // if not cleared
                    func(
                      param1,
                      param2,
                      param3,
                      param4,
                      param5,
                      param6,
                      param7,
                      param8,
                      param9,
                      param10
                    )
                  }
                  clearTimeout(id)
                  if (
                    fibers.every(function(_id) {
                      return !_id
                    })
                  ) {
                    // if everything is cleared
                    coscript.shouldKeepAround = false
                  }
                }
              )
              return id
            }

            clearTimeout = function(id) {
              fibers[id] = false
            }
          }

          module.exports = {
            setTimeout: setTimeout,
            clearTimeout: clearTimeout,
          }

          /***/
        },

      /***/ './node_modules/cocoascript-class/lib/index.js':
        /*!*****************************************************!*\
  !*** ./node_modules/cocoascript-class/lib/index.js ***!
  \*****************************************************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          'use strict'

          Object.defineProperty(exports, '__esModule', {
            value: true,
          })
          exports.SuperCall = undefined
          exports.default = ObjCClass

          var _runtime = __webpack_require__(
            /*! ./runtime.js */ './node_modules/cocoascript-class/lib/runtime.js'
          )

          exports.SuperCall = _runtime.SuperCall

          // super when returnType is id and args are void
          // id objc_msgSendSuper(struct objc_super *super, SEL op, void)

          const SuperInit = (0, _runtime.SuperCall)(
            NSStringFromSelector('init'),
            [],
            { type: '@' }
          )

          // Returns a real ObjC class. No need to use new.
          function ObjCClass(defn) {
            const superclass = defn.superclass || NSObject
            const className =
              (defn.className || defn.classname || 'ObjCClass') +
              NSUUID.UUID().UUIDString()
            const reserved = new Set(['className', 'classname', 'superclass'])
            var cls = MOClassDescription.allocateDescriptionForClassWithName_superclass_(
              className,
              superclass
            )
            // Add each handler to the class description
            const ivars = []
            for (var key in defn) {
              const v = defn[key]
              if (typeof v == 'function' && key !== 'init') {
                var selector = NSSelectorFromString(key)
                cls.addInstanceMethodWithSelector_function_(selector, v)
              } else if (!reserved.has(key)) {
                ivars.push(key)
                cls.addInstanceVariableWithName_typeEncoding(key, '@')
              }
            }

            cls.addInstanceMethodWithSelector_function_(
              NSSelectorFromString('init'),
              function() {
                const self = SuperInit.call(this)
                ivars.map(name => {
                  Object.defineProperty(self, name, {
                    get() {
                      return getIvar(self, name)
                    },
                    set(v) {
                      ;(0, _runtime.object_setInstanceVariable)(self, name, v)
                    },
                  })
                  self[name] = defn[name]
                })
                // If there is a passsed-in init funciton, call it now.
                if (typeof defn.init == 'function') defn.init.call(this)
                return self
              }
            )

            return cls.registerClass()
          }

          function getIvar(obj, name) {
            const retPtr = MOPointer.new()
            ;(0, _runtime.object_getInstanceVariable)(obj, name, retPtr)
            return retPtr
              .value()
              .retain()
              .autorelease()
          }

          /***/
        },

      /***/ './node_modules/cocoascript-class/lib/runtime.js':
        /*!*******************************************************!*\
  !*** ./node_modules/cocoascript-class/lib/runtime.js ***!
  \*******************************************************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          'use strict'

          Object.defineProperty(exports, '__esModule', {
            value: true,
          })
          exports.SuperCall = SuperCall
          exports.CFunc = CFunc
          const objc_super_typeEncoding =
            '{objc_super="receiver"@"super_class"#}'

          // You can store this to call your function. this must be bound to the current instance.
          function SuperCall(selector, argTypes, returnType) {
            const func = CFunc(
              'objc_msgSendSuper',
              [
                { type: '^' + objc_super_typeEncoding },
                { type: ':' },
                ...argTypes,
              ],
              returnType
            )
            return function(...args) {
              const struct = make_objc_super(this, this.superclass())
              const structPtr = MOPointer.alloc().initWithValue_(struct)
              return func(structPtr, selector, ...args)
            }
          }

          // Recursively create a MOStruct
          function makeStruct(def) {
            if (typeof def !== 'object' || Object.keys(def).length == 0) {
              return def
            }
            const name = Object.keys(def)[0]
            const values = def[name]

            const structure = MOStruct.structureWithName_memberNames_runtime(
              name,
              Object.keys(values),
              Mocha.sharedRuntime()
            )

            Object.keys(values).map(member => {
              structure[member] = makeStruct(values[member])
            })

            return structure
          }

          function make_objc_super(self, cls) {
            return makeStruct({
              objc_super: {
                receiver: self,
                super_class: cls,
              },
            })
          }

          // Due to particularities of the JS bridge, we can't call into MOBridgeSupport objects directly
          // But, we can ask key value coding to do the dirty work for us ;)
          function setKeys(o, d) {
            const funcDict = NSMutableDictionary.dictionary()
            funcDict.o = o
            Object.keys(d).map(k =>
              funcDict.setValue_forKeyPath(d[k], 'o.' + k)
            )
          }

          // Use any C function, not just ones with BridgeSupport
          function CFunc(name, args, retVal) {
            function makeArgument(a) {
              if (!a) return null
              const arg = MOBridgeSupportArgument.alloc().init()
              setKeys(arg, {
                type64: a.type,
              })
              return arg
            }
            const func = MOBridgeSupportFunction.alloc().init()
            setKeys(func, {
              name: name,
              arguments: args.map(makeArgument),
              returnValue: makeArgument(retVal),
            })
            return func
          }

          /*
@encode(char*) = "*"
@encode(id) = "@"
@encode(Class) = "#"
@encode(void*) = "^v"
@encode(CGRect) = "{CGRect={CGPoint=dd}{CGSize=dd}}"
@encode(SEL) = ":"
*/

          function addStructToBridgeSupport(key, structDef) {
            // OK, so this is probably the nastiest hack in this file.
            // We go modify MOBridgeSupportController behind its back and use kvc to add our own definition
            // There isn't another API for this though. So the only other way would be to make a real bridgesupport file.
            const symbols = MOBridgeSupportController.sharedController().valueForKey(
              'symbols'
            )
            if (!symbols)
              throw Error(
                "Something has changed within bridge support so we can't add our definitions"
              )
            // If someone already added this definition, don't re-register it.
            if (symbols[key] !== null) return
            const def = MOBridgeSupportStruct.alloc().init()
            setKeys(def, {
              name: key,
              type: structDef.type,
            })
            symbols[key] = def
          }

          // This assumes the ivar is an object type. Return value is pretty useless.
          const object_getInstanceVariable = (exports.object_getInstanceVariable = CFunc(
            'object_getInstanceVariable',
            [{ type: '@' }, { type: '*' }, { type: '^@' }],
            { type: '^{objc_ivar=}' }
          ))
          // Again, ivar is of object type
          const object_setInstanceVariable = (exports.object_setInstanceVariable = CFunc(
            'object_setInstanceVariable',
            [{ type: '@' }, { type: '*' }, { type: '@' }],
            { type: '^{objc_ivar=}' }
          ))

          // We need Mocha to understand what an objc_super is so we can use it as a function argument
          addStructToBridgeSupport('objc_super', {
            type: objc_super_typeEncoding,
          })

          /***/
        },

      /***/ './node_modules/promise-polyfill/lib/index.js':
        /*!****************************************************!*\
  !*** ./node_modules/promise-polyfill/lib/index.js ***!
  \****************************************************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          'use strict'
          /* WEBPACK VAR INJECTION */ ;(function(setTimeout, setImmediate) {
            /**
             * @this {Promise}
             */
            function finallyConstructor(callback) {
              var constructor = this.constructor
              return this.then(
                function(value) {
                  return constructor.resolve(callback()).then(function() {
                    return value
                  })
                },
                function(reason) {
                  return constructor.resolve(callback()).then(function() {
                    return constructor.reject(reason)
                  })
                }
              )
            }

            // Store setTimeout reference so promise-polyfill will be unaffected by
            // other code modifying setTimeout (like sinon.useFakeTimers())
            var setTimeoutFunc = setTimeout

            function noop() {}

            // Polyfill for Function.prototype.bind
            function bind(fn, thisArg) {
              return function() {
                fn.apply(thisArg, arguments)
              }
            }

            /**
             * @constructor
             * @param {Function} fn
             */
            function Promise(fn) {
              if (!(this instanceof Promise))
                throw new TypeError('Promises must be constructed via new')
              if (typeof fn !== 'function')
                throw new TypeError('not a function')
              /** @type {!number} */
              this._state = 0
              /** @type {!boolean} */
              this._handled = false
              /** @type {Promise|undefined} */
              this._value = undefined
              /** @type {!Array<!Function>} */
              this._deferreds = []

              doResolve(fn, this)
            }

            function handle(self, deferred) {
              while (self._state === 3) {
                self = self._value
              }
              if (self._state === 0) {
                self._deferreds.push(deferred)
                return
              }
              self._handled = true
              Promise._immediateFn(function() {
                var cb =
                  self._state === 1 ? deferred.onFulfilled : deferred.onRejected
                if (cb === null) {
                  ;(self._state === 1 ? resolve : reject)(
                    deferred.promise,
                    self._value
                  )
                  return
                }
                var ret
                try {
                  ret = cb(self._value)
                } catch (e) {
                  reject(deferred.promise, e)
                  return
                }
                resolve(deferred.promise, ret)
              })
            }

            function resolve(self, newValue) {
              try {
                // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
                if (newValue === self)
                  throw new TypeError(
                    'A promise cannot be resolved with itself.'
                  )
                if (
                  newValue &&
                  (typeof newValue === 'object' ||
                    typeof newValue === 'function')
                ) {
                  var then = newValue.then
                  if (newValue instanceof Promise) {
                    self._state = 3
                    self._value = newValue
                    finale(self)
                    return
                  } else if (typeof then === 'function') {
                    doResolve(bind(then, newValue), self)
                    return
                  }
                }
                self._state = 1
                self._value = newValue
                finale(self)
              } catch (e) {
                reject(self, e)
              }
            }

            function reject(self, newValue) {
              self._state = 2
              self._value = newValue
              finale(self)
            }

            function finale(self) {
              if (self._state === 2 && self._deferreds.length === 0) {
                Promise._immediateFn(function() {
                  if (!self._handled) {
                    Promise._unhandledRejectionFn(self._value)
                  }
                })
              }

              for (var i = 0, len = self._deferreds.length; i < len; i++) {
                handle(self, self._deferreds[i])
              }
              self._deferreds = null
            }

            /**
             * @constructor
             */
            function Handler(onFulfilled, onRejected, promise) {
              this.onFulfilled =
                typeof onFulfilled === 'function' ? onFulfilled : null
              this.onRejected =
                typeof onRejected === 'function' ? onRejected : null
              this.promise = promise
            }

            /**
             * Take a potentially misbehaving resolver function and make sure
             * onFulfilled and onRejected are only called once.
             *
             * Makes no guarantees about asynchrony.
             */
            function doResolve(fn, self) {
              var done = false
              try {
                fn(
                  function(value) {
                    if (done) return
                    done = true
                    resolve(self, value)
                  },
                  function(reason) {
                    if (done) return
                    done = true
                    reject(self, reason)
                  }
                )
              } catch (ex) {
                if (done) return
                done = true
                reject(self, ex)
              }
            }

            Promise.prototype['catch'] = function(onRejected) {
              return this.then(null, onRejected)
            }

            Promise.prototype.then = function(onFulfilled, onRejected) {
              // @ts-ignore
              var prom = new this.constructor(noop)

              handle(this, new Handler(onFulfilled, onRejected, prom))
              return prom
            }

            Promise.prototype['finally'] = finallyConstructor

            Promise.all = function(arr) {
              return new Promise(function(resolve, reject) {
                if (!arr || typeof arr.length === 'undefined')
                  throw new TypeError('Promise.all accepts an array')
                var args = Array.prototype.slice.call(arr)
                if (args.length === 0) return resolve([])
                var remaining = args.length

                function res(i, val) {
                  try {
                    if (
                      val &&
                      (typeof val === 'object' || typeof val === 'function')
                    ) {
                      var then = val.then
                      if (typeof then === 'function') {
                        then.call(
                          val,
                          function(val) {
                            res(i, val)
                          },
                          reject
                        )
                        return
                      }
                    }
                    args[i] = val
                    if (--remaining === 0) {
                      resolve(args)
                    }
                  } catch (ex) {
                    reject(ex)
                  }
                }

                for (var i = 0; i < args.length; i++) {
                  res(i, args[i])
                }
              })
            }

            Promise.resolve = function(value) {
              if (
                value &&
                typeof value === 'object' &&
                value.constructor === Promise
              ) {
                return value
              }

              return new Promise(function(resolve) {
                resolve(value)
              })
            }

            Promise.reject = function(value) {
              return new Promise(function(resolve, reject) {
                reject(value)
              })
            }

            Promise.race = function(values) {
              return new Promise(function(resolve, reject) {
                for (var i = 0, len = values.length; i < len; i++) {
                  values[i].then(resolve, reject)
                }
              })
            }

            // Use polyfill for setImmediate for performance gains
            Promise._immediateFn =
              (typeof setImmediate === 'function' &&
                function(fn) {
                  setImmediate(fn)
                }) ||
              function(fn) {
                setTimeoutFunc(fn, 0)
              }

            Promise._unhandledRejectionFn = function _unhandledRejectionFn(
              err
            ) {
              if (typeof console !== 'undefined' && console) {
                console.warn('Possible Unhandled Promise Rejection:', err) // eslint-disable-line no-console
              }
            }

            module.exports = Promise

            /* WEBPACK VAR INJECTION */
          }.call(
            this,
            __webpack_require__(
              /*! ./node_modules/@skpm/timers/timeout.js */ './node_modules/@skpm/timers/timeout.js'
            )['setTimeout'],
            __webpack_require__(
              /*! ./node_modules/@skpm/timers/immediate.js */ './node_modules/@skpm/timers/immediate.js'
            )['setImmediate']
          ))

          /***/
        },

      /***/ './node_modules/sketch-module-web-view/lib/browser-api.js':
        /*!****************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/browser-api.js ***!
  \****************************************************************/
        /*! no static exports found */
        /***/ function(module, exports) {
          var COLOR_CLASSES = [
            'NSColor',
            'NSCachedWhiteColor',
            'NSColorSpaceColor',
            'NSDynamicSystemColor',
            'NSCachedColorSpaceColor',
          ]
          function parseHexColor(color) {
            // Check the string for incorrect formatting.
            if (!color || color[0] !== '#') {
              if (
                color &&
                color.class &&
                COLOR_CLASSES.indexOf(String(color.class())) !== -1
              ) {
                return color
              }
              throw new Error(
                'Incorrect color formating. It should be an hex color: #RRGGBBAA'
              )
            }

            // append FF if alpha channel is not specified.
            var source = color.substr(1)
            if (source.length === 3) {
              source += 'F'
            } else if (source.length === 6) {
              source += 'FF'
            }
            // Convert the string from #FFF format to #FFFFFF format.
            var hex
            if (source.length === 4) {
              for (var i = 0; i < 4; i += 1) {
                hex += source[i]
                hex += source[i]
              }
            } else if (source.length === 8) {
              hex = source
            } else {
              return NSColor.whiteColor()
            }

            var r = parseInt(hex.slice(0, 2), 16)
            var g = parseInt(hex.slice(2, 4), 16)
            var b = parseInt(hex.slice(4, 6), 16)
            var a = parseInt(hex.slice(6, 8), 16)

            return NSColor.colorWithSRGBRed_green_blue_alpha(r, g, b, a)
          }

          module.exports = function(browserWindow, panel, webview) {
            // keep reference to the subviews
            browserWindow._panel = panel
            browserWindow._webview = webview
            browserWindow._destroyed = false

            browserWindow.destroy = function() {
              return panel.close()
            }

            browserWindow.close = function() {
              if (!browserWindow.isClosable()) {
                return
              }

              panel.performClose(null)
            }

            function focus(focused) {
              if (browserWindow.isVisible()) {
                return
              }
              if (focused) {
                NSApplication.sharedApplication().activateIgnoringOtherApps(
                  true
                )
                panel.makeKeyAndOrderFront(null)
              } else {
                panel.orderBack(null)
              }
            }

            browserWindow.focus = focus.bind(this, true)
            browserWindow.blur = focus.bind(this, false)

            browserWindow.isFocused = function() {
              return panel.isKeyWindow()
            }

            browserWindow.isDestroyed = function() {
              return browserWindow._destroyed
            }

            browserWindow.show = function() {
              // This method is supposed to put focus on window, however if the app does not
              // have focus then "makeKeyAndOrderFront" will only show the window.
              NSApp.activateIgnoringOtherApps(true)

              return panel.makeKeyAndOrderFront(null)
            }

            browserWindow.showInactive = function() {
              return panel.orderFrontRegardless()
            }

            browserWindow.hide = function() {
              return panel.orderOut(null)
            }

            browserWindow.isVisible = function() {
              return panel.isVisible()
            }

            browserWindow.isModal = function() {
              return false
            }

            browserWindow.maximize = function() {
              if (!browserWindow.isMaximized()) {
                panel.zoom(null)
              }
            }
            browserWindow.unmaximize = function() {
              if (browserWindow.isMaximized()) {
                panel.zoom(null)
              }
            }

            browserWindow.isMaximized = function() {
              if ((panel.styleMask() & NSResizableWindowMask) !== 0) {
                return panel.isZoomed()
              }
              var rectScreen = NSScreen.mainScreen().visibleFrame()
              var rectWindow = panel.frame()
              return (
                rectScreen.origin.x == rectWindow.origin.x &&
                rectScreen.origin.y == rectWindow.origin.y &&
                rectScreen.size.width == rectWindow.size.width &&
                rectScreen.size.height == rectWindow.size.height
              )
            }

            browserWindow.minimize = function() {
              return panel.miniaturize(null)
            }

            browserWindow.restore = function() {
              return panel.deminiaturize(null)
            }

            browserWindow.isMinimized = function() {
              return panel.isMiniaturized()
            }

            browserWindow.setFullScreen = function(fullscreen) {
              if (fullscreen !== browserWindow.isFullscreen()) {
                panel.toggleFullScreen(null)
              }
            }

            browserWindow.isFullscreen = function() {
              return panel.styleMask() & NSFullScreenWindowMask
            }

            browserWindow.setAspectRatio = function(
              aspectRatio /* , extraSize */
            ) {
              // Reset the behaviour to default if aspect_ratio is set to 0 or less.
              if (aspectRatio > 0.0) {
                panel.setAspectRatio(NSMakeSize(aspectRatio, 1.0))
              } else {
                panel.setResizeIncrements(NSMakeSize(1.0, 1.0))
              }
            }

            browserWindow.setBounds = function(bounds, animate) {
              // Do nothing if in fullscreen mode.
              if (browserWindow.isFullscreen()) {
                return
              }

              // TODO: Check size constraints since setFrame does not check it.
              var size = bounds.size
              // size.SetToMax(GetMinimumSize());
              // gfx::Size max_size = GetMaximumSize();
              // if (!max_size.IsEmpty())
              //   size.SetToMin(max_size);

              var cocoaBounds = NSMakeRect(
                bounds.origin.x,
                0,
                size.width,
                size.height
              )
              // Flip coordinates based on the primary screen.
              var screen = NSScreen.screens().firstObject()
              cocoaBounds.origin.y =
                NSHeight(screen.frame()) - size.height - bounds.origin.y

              panel.setFrame_display_animate(cocoaBounds, true, animate)
            }

            browserWindow.getBounds = function() {
              return panel.frame()
            }

            browserWindow.setContentBounds = function(/* bounds, animate */) {
              // TODO:
            }

            browserWindow.getContentBounds = function() {
              // TODO:
            }

            browserWindow.setSize = function(width, height, animate) {
              var bounds = browserWindow.getBounds()
              bounds.size.height = height
              bounds.size.width = width

              // TODO: handle resizing around center

              return browserWindow.setBounds(bounds, animate)
            }

            browserWindow.getSize = function() {
              var bounds = browserWindow.getBounds()
              return [bounds.size.width, bounds.size.height]
            }

            browserWindow.setContentSize = function(width, height, animate) {
              var bounds = browserWindow.getContentBounds()
              bounds.size.height = height
              bounds.size.width = width

              // TODO: handle resizing around center

              return browserWindow.setContentBounds(bounds, animate)
            }

            browserWindow.getContentSize = function() {
              var bounds = browserWindow.getContentBounds()
              return [bounds.size.width, bounds.size.height]
            }

            browserWindow.setMinimumSize = function(width, height) {
              const minSize = { width: width, height: height }
              panel.setContentMinSize(minSize)
            }

            browserWindow.getMinimumSize = function() {
              const size = panel.contentMinSize()
              return [size.width, size.height]
            }

            browserWindow.setMaximumSize = function(width, height) {
              const minSize = { width: width, height: height }
              panel.setContentMaxSize(minSize)
            }

            browserWindow.getMaximumSize = function() {
              const size = panel.contentMaxSize()
              return [size.width, size.height]
            }

            browserWindow.setResizable = function(resizable) {
              return browserWindow._setStyleMask(
                resizable,
                NSResizableWindowMask
              )
            }

            browserWindow.isResizable = function() {
              return panel.styleMask() & NSResizableWindowMask
            }

            browserWindow.setMovable = function(movable) {
              return panel.setMovable(movable)
            }
            browserWindow.isMovable = function() {
              return panel.isMovable()
            }

            browserWindow.setMinimizable = function(minimizable) {
              return browserWindow._setStyleMask(
                minimizable,
                NSMiniaturizableWindowMask
              )
            }

            browserWindow.isMinimizable = function() {
              return panel.styleMask() & NSMiniaturizableWindowMask
            }

            browserWindow.setMaximizable = function(maximizable) {
              if (panel.standardWindowButton(NSWindowZoomButton)) {
                panel
                  .standardWindowButton(NSWindowZoomButton)
                  .setEnabled(maximizable)
              }
            }

            browserWindow.isMaximizable = function() {
              return (
                panel.standardWindowButton(NSWindowZoomButton) &&
                panel.standardWindowButton(NSWindowZoomButton).isEnabled()
              )
            }

            browserWindow.setFullScreenable = function(fullscreenable) {
              browserWindow._setCollectionBehavior(
                fullscreenable,
                NSWindowCollectionBehaviorFullScreenPrimary
              )
              // On EL Capitan this flag is required to hide fullscreen button.
              browserWindow._setCollectionBehavior(
                !fullscreenable,
                NSWindowCollectionBehaviorFullScreenAuxiliary
              )
            }

            browserWindow.isFullScreenable = function() {
              var collectionBehavior = panel.collectionBehavior()
              return (
                collectionBehavior & NSWindowCollectionBehaviorFullScreenPrimary
              )
            }

            browserWindow.setClosable = function(closable) {
              browserWindow._setStyleMask(closable, NSClosableWindowMask)
            }

            browserWindow.isClosable = function() {
              return panel.styleMask() & NSClosableWindowMask
            }

            browserWindow.setAlwaysOnTop = function(top, level, relativeLevel) {
              var windowLevel = NSNormalWindowLevel
              var maxWindowLevel = CGWindowLevelForKey(kCGMaximumWindowLevelKey)
              var minWindowLevel = CGWindowLevelForKey(kCGMinimumWindowLevelKey)

              if (top) {
                if (level === 'normal') {
                  windowLevel = NSNormalWindowLevel
                } else if (level === 'torn-off-menu') {
                  windowLevel = NSTornOffMenuWindowLevel
                } else if (level === 'modal-panel') {
                  windowLevel = NSModalPanelWindowLevel
                } else if (level === 'main-menu') {
                  windowLevel = NSMainMenuWindowLevel
                } else if (level === 'status') {
                  windowLevel = NSStatusWindowLevel
                } else if (level === 'pop-up-menu') {
                  windowLevel = NSPopUpMenuWindowLevel
                } else if (level === 'screen-saver') {
                  windowLevel = NSScreenSaverWindowLevel
                } else if (level === 'dock') {
                  // Deprecated by macOS, but kept for backwards compatibility
                  windowLevel = NSDockWindowLevel
                } else {
                  windowLevel = NSFloatingWindowLevel
                }
              }

              var newLevel = windowLevel + (relativeLevel || 0)
              if (newLevel >= minWindowLevel && newLevel <= maxWindowLevel) {
                panel.setLevel(newLevel)
              } else {
                throw new Error(
                  'relativeLevel must be between ' +
                    minWindowLevel +
                    ' and ' +
                    maxWindowLevel
                )
              }
            }

            browserWindow.isAlwaysOnTop = function() {
              return panel.level() !== NSNormalWindowLevel
            }

            browserWindow.moveTop = function() {
              return panel.orderFrontRegardless()
            }

            browserWindow.center = function() {
              panel.center()
            }

            browserWindow.setPosition = function(x, y, animate) {
              var bounds = browserWindow.getBounds()
              var mainScreenRect = NSScreen.screens()
                .firstObject()
                .frame()
              bounds.origin.x = x
              bounds.origin.y = Math.round(NSHeight(mainScreenRect) - y)

              return browserWindow.setBounds(bounds, animate)
            }

            browserWindow.getPosition = function() {
              var bounds = browserWindow.getBounds()
              var mainScreenRect = NSScreen.screens()
                .firstObject()
                .frame()
              return [
                bounds.origin.x,
                Math.round(NSHeight(mainScreenRect) - bounds.origin.y),
              ]
            }

            browserWindow.setTitle = function(title) {
              panel.setTitle(title)
            }

            browserWindow.getTitle = function() {
              return String(panel.title())
            }

            var attentionRequestId = 0
            browserWindow.flashFrame = function(flash) {
              if (flash) {
                attentionRequestId = NSApp.requestUserAttention(
                  NSInformationalRequest
                )
              } else {
                NSApp.cancelUserAttentionRequest(attentionRequestId)
                attentionRequestId = 0
              }
            }

            browserWindow.getNativeWindowHandle = function() {
              return panel
            }

            browserWindow.getNativeWebViewHandle = function() {
              return webview
            }

            browserWindow.loadURL = function(url) {
              // When frameLocation is a file, prefix it with the Sketch Resources path
              if (/^(?!http|localhost|www|file).*\.html?$/.test(url)) {
                if (
                  typeof __command !== 'undefined' &&
                  __command.pluginBundle()
                ) {
                  url =
                    'file://' +
                    __command
                      .pluginBundle()
                      .urlForResourceNamed(url)
                      .path()
                }
              }

              if (/^file:\/\/.*\.html?$/.test(url)) {
                webview.loadFileURL_allowingReadAccessToURL(
                  NSURL.fileURLWithPath(url),
                  NSURL.fileURLWithPath('file:///')
                )
                return
              }

              webview.loadRequest(
                NSURLRequest.requestWithURL(NSURL.URLWithString(url))
              )
            }

            browserWindow.reload = function() {
              webview.reload()
            }

            browserWindow.setHasShadow = function(hasShadow) {
              return panel.setHasShadow(hasShadow)
            }

            browserWindow.hasShadow = function() {
              return panel.hasShadow()
            }

            browserWindow.setOpacity = function(opacity) {
              return panel.setAlphaValue(opacity)
            }

            browserWindow.getOpacity = function() {
              return panel.alphaValue()
            }

            browserWindow.setVisibleOnAllWorkspaces = function(visible) {
              return browserWindow._setCollectionBehavior(
                visible,
                NSWindowCollectionBehaviorCanJoinAllSpaces
              )
            }

            browserWindow.isVisibleOnAllWorkspaces = function() {
              var collectionBehavior = panel.collectionBehavior()
              return (
                collectionBehavior & NSWindowCollectionBehaviorCanJoinAllSpaces
              )
            }

            browserWindow.setIgnoreMouseEvents = function(ignore) {
              return panel.setIgnoresMouseEvents(ignore)
            }

            browserWindow.setContentProtection = function(enable) {
              panel.setSharingType(
                enable ? NSWindowSharingNone : NSWindowSharingReadOnly
              )
            }

            browserWindow.setAutoHideCursor = function(autoHide) {
              panel.setDisableAutoHideCursor(autoHide)
            }

            browserWindow.setVibrancy = function(type) {
              var effectView = browserWindow._vibrantView

              if (!type) {
                if (effectView == null) {
                  return
                }

                effectView.removeFromSuperview()
                panel.setVibrantView(null)
                return
              }

              if (effectView == null) {
                var contentView = panel.contentView()
                effectView = NSVisualEffectView.alloc().initWithFrame(
                  contentView.bounds()
                )
                browserWindow._vibrantView = effectView

                effectView.setAutoresizingMask(
                  NSViewWidthSizable | NSViewHeightSizable
                )
                effectView.setBlendingMode(
                  NSVisualEffectBlendingModeBehindWindow
                )
                effectView.setState(NSVisualEffectStateActive)
                effectView.setFrame(contentView.bounds())
                contentView.addSubview_positioned_relativeTo(
                  effectView,
                  NSWindowBelow,
                  null
                )
              }

              var vibrancyType = NSVisualEffectMaterialLight

              if (type === 'appearance-based') {
                vibrancyType = NSVisualEffectMaterialAppearanceBased
              } else if (type === 'light') {
                vibrancyType = NSVisualEffectMaterialLight
              } else if (type === 'dark') {
                vibrancyType = NSVisualEffectMaterialDark
              } else if (type === 'titlebar') {
                vibrancyType = NSVisualEffectMaterialTitlebar
              } else if (type === 'selection') {
                vibrancyType = NSVisualEffectMaterialSelection
              } else if (type === 'menu') {
                vibrancyType = NSVisualEffectMaterialMenu
              } else if (type === 'popover') {
                vibrancyType = NSVisualEffectMaterialPopover
              } else if (type === 'sidebar') {
                vibrancyType = NSVisualEffectMaterialSidebar
              } else if (type === 'medium-light') {
                vibrancyType = NSVisualEffectMaterialMediumLight
              } else if (type === 'ultra-dark') {
                vibrancyType = NSVisualEffectMaterialUltraDark
              }

              effectView.setMaterial(vibrancyType)
            }

            browserWindow._setBackgroundColor = function(colorName) {
              var color = parseHexColor(colorName)
              webview.isOpaque = false
              webview.setBackgroundColor(NSColor.clearColor())
              panel.backgroundColor = color
            }

            browserWindow._invalidate = function() {
              panel.flushWindow()
              panel.contentView().setNeedsDisplay(true)
            }

            browserWindow._setStyleMask = function(on, flag) {
              var wasMaximizable = browserWindow.isMaximizable()
              if (on) {
                panel.setStyleMask(panel.styleMask() | flag)
              } else {
                panel.setStyleMask(panel.styleMask() & ~flag)
              }
              // Change style mask will make the zoom button revert to default, probably
              // a bug of Cocoa or macOS.
              browserWindow.setMaximizable(wasMaximizable)
            }

            browserWindow._setCollectionBehavior = function(on, flag) {
              var wasMaximizable = browserWindow.isMaximizable()
              if (on) {
                panel.setCollectionBehavior(panel.collectionBehavior() | flag)
              } else {
                panel.setCollectionBehavior(panel.collectionBehavior() & ~flag)
              }
              // Change collectionBehavior will make the zoom button revert to default,
              // probably a bug of Cocoa or macOS.
              browserWindow.setMaximizable(wasMaximizable)
            }

            browserWindow._showWindowButton = function(button) {
              var view = panel.standardWindowButton(button)
              view
                .superview()
                .addSubview_positioned_relative(view, NSWindowAbove, null)
            }
          }

          /***/
        },

      /***/ './node_modules/sketch-module-web-view/lib/constants.js':
        /*!**************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/constants.js ***!
  \**************************************************************/
        /*! no static exports found */
        /***/ function(module, exports) {
          module.exports = {
            JS_BRIDGE: '__skpm_sketchBridge',
          }

          /***/
        },

      /***/ './node_modules/sketch-module-web-view/lib/dispatch-first-click.js':
        /*!*************************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/dispatch-first-click.js ***!
  \*************************************************************************/
        /*! no static exports found */
        /***/ function(module, exports) {
          var tagsToFocus =
            '["text", "textarea", "date", "datetime-local", "email", "number", "month", "password", "search", "tel", "time", "url", "week" ]'

          module.exports = function(webView, event) {
            var point = webView.convertPoint_fromView(
              event.locationInWindow(),
              null
            )
            var x = point.x
            var y = webView.frame().size.height - point.y // the coord start from the bottom instead of the top
            return (
              'var el = document.elementFromPoint(' + // get the DOM element that match the event
              x +
              ', ' +
              y +
              '); ' +
              'if (el && ' + // some tags need to be focused instead of clicked
              tagsToFocus +
              '.indexOf(el.type) >= 0 && ' +
              'el.focus' +
              ') {' +
              'el.focus();' + // so focus them
              '} else if (el) {' +
              'el.dispatchEvent(new Event("click", {bubbles: true}))' + // click the others
              '}'
            )
          }

          /***/
        },

      /***/ './node_modules/sketch-module-web-view/lib/fitSubview.js':
        /*!***************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/fitSubview.js ***!
  \***************************************************************/
        /*! no static exports found */
        /***/ function(module, exports) {
          function addEdgeConstraint(edge, subview, view, constant) {
            view.addConstraint(
              NSLayoutConstraint.constraintWithItem_attribute_relatedBy_toItem_attribute_multiplier_constant(
                subview,
                edge,
                NSLayoutRelationEqual,
                view,
                edge,
                1,
                constant
              )
            )
          }
          module.exports = function fitSubviewToView(subview, view, constants) {
            constants = constants || []
            subview.setTranslatesAutoresizingMaskIntoConstraints(false)

            addEdgeConstraint(
              NSLayoutAttributeLeft,
              subview,
              view,
              constants[0] || 0
            )
            addEdgeConstraint(
              NSLayoutAttributeTop,
              subview,
              view,
              constants[1] || 0
            )
            addEdgeConstraint(
              NSLayoutAttributeRight,
              subview,
              view,
              constants[2] || 0
            )
            addEdgeConstraint(
              NSLayoutAttributeBottom,
              subview,
              view,
              constants[3] || 0
            )
          }

          /***/
        },

      /***/ './node_modules/sketch-module-web-view/lib/index.js':
        /*!**********************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/index.js ***!
  \**********************************************************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          /* let's try to match the API from Electron's Browser window
(https://github.com/electron/electron/blob/master/docs/api/browser-window.md) */
          var EventEmitter = __webpack_require__(/*! events */ 'events')
          var buildBrowserAPI = __webpack_require__(
            /*! ./browser-api */ './node_modules/sketch-module-web-view/lib/browser-api.js'
          )
          var buildWebAPI = __webpack_require__(
            /*! ./webview-api */ './node_modules/sketch-module-web-view/lib/webview-api.js'
          )
          var fitSubviewToView = __webpack_require__(
            /*! ./fitSubview */ './node_modules/sketch-module-web-view/lib/fitSubview.js'
          )
          var dispatchFirstClick = __webpack_require__(
            /*! ./dispatch-first-click */ './node_modules/sketch-module-web-view/lib/dispatch-first-click.js'
          )
          var injectClientMessaging = __webpack_require__(
            /*! ./inject-client-messaging */ './node_modules/sketch-module-web-view/lib/inject-client-messaging.js'
          )
          var setDelegates = __webpack_require__(
            /*! ./set-delegates */ './node_modules/sketch-module-web-view/lib/set-delegates.js'
          )

          function BrowserWindow(options) {
            options = options || {}

            var identifier = options.identifier || NSUUID.UUID().UUIDString()
            var threadDictionary = NSThread.mainThread().threadDictionary()

            var existingBrowserWindow = BrowserWindow.fromId(identifier)

            // if we already have a window opened, reuse it
            if (existingBrowserWindow) {
              return existingBrowserWindow
            }

            var browserWindow = new EventEmitter()
            browserWindow.id = identifier

            // Long-running script
            var fiber = coscript.createFiber()

            // Window size
            var width = options.width || 800
            var height = options.height || 600
            var mainScreenRect = NSScreen.screens()
              .firstObject()
              .frame()
            var cocoaBounds = NSMakeRect(
              typeof options.x !== 'undefined'
                ? options.x
                : Math.round((NSWidth(mainScreenRect) - width) / 2),
              typeof options.y !== 'undefined'
                ? options.y
                : Math.round((NSHeight(mainScreenRect) - height) / 2),
              width,
              height
            )

            if (options.titleBarStyle && options.titleBarStyle !== 'default') {
              options.frame = false
            }

            var useStandardWindow = options.windowType !== 'textured'
            var styleMask = NSTitledWindowMask

            // this is commented out because the toolbar doesn't appear otherwise :thinking-face:
            // if (!useStandardWindow || options.frame === false) {
            //   styleMask = NSFullSizeContentViewWindowMask
            // }
            if (options.minimizable !== false) {
              styleMask |= NSMiniaturizableWindowMask
            }
            if (options.closable !== false) {
              styleMask |= NSClosableWindowMask
            }
            if (options.resizable !== false) {
              styleMask |= NSResizableWindowMask
            }
            if (
              !useStandardWindow ||
              options.transparent ||
              options.frame === false
            ) {
              styleMask |= NSTexturedBackgroundWindowMask
            }

            // TODO: handle modal mode

            var panel = NSPanel.alloc().initWithContentRect_styleMask_backing_defer(
              cocoaBounds,
              styleMask,
              NSBackingStoreBuffered,
              true
            )

            var wkwebviewConfig = WKWebViewConfiguration.alloc().init()
            var webView = WKWebView.alloc().initWithFrame_configuration(
              CGRectMake(0, 0, options.width || 800, options.height || 600),
              wkwebviewConfig
            )
            injectClientMessaging(webView)
            webView.setAutoresizingMask(
              NSViewWidthSizable | NSViewHeightSizable
            )

            buildBrowserAPI(browserWindow, panel, webView)
            buildWebAPI(browserWindow, panel, webView)
            setDelegates(browserWindow, panel, webView)

            if (options.windowType === 'desktop') {
              panel.setLevel(kCGDesktopWindowLevel - 1)
              // panel.setCanBecomeKeyWindow(false)
              panel.setCollectionBehavior(
                NSWindowCollectionBehaviorCanJoinAllSpaces |
                  NSWindowCollectionBehaviorStationary |
                  NSWindowCollectionBehaviorIgnoresCycle
              )
            }

            if (
              typeof options.minWidth !== 'undefined' ||
              typeof options.minHeight !== 'undefined'
            ) {
              browserWindow.setMinimumSize(
                options.minWidth || 0,
                options.minHeight || 0
              )
            }

            if (
              typeof options.maxWidth !== 'undefined' ||
              typeof options.maxHeight !== 'undefined'
            ) {
              browserWindow.setMaximumSize(
                options.maxWidth || 10000,
                options.maxHeight || 10000
              )
            }

            // if (options.focusable === false) {
            //   panel.setCanBecomeKeyWindow(false)
            // }

            if (options.transparent || options.frame === false) {
              panel.titlebarAppearsTransparent = true
              panel.titleVisibility = NSWindowTitleHidden
              panel.setOpaque(0)
              panel.isMovableByWindowBackground = true
              var toolbar2 = NSToolbar.alloc().initWithIdentifier(
                'titlebarStylingToolbar'
              )
              toolbar2.setShowsBaselineSeparator(false)
              panel.setToolbar(toolbar2)
            }

            if (options.titleBarStyle === 'hiddenInset') {
              var toolbar = NSToolbar.alloc().initWithIdentifier(
                'titlebarStylingToolbar'
              )
              toolbar.setShowsBaselineSeparator(false)
              panel.setToolbar(toolbar)
            }

            if (options.frame === false || !options.useContentSize) {
              browserWindow.setSize(width, height)
            }

            if (options.center) {
              browserWindow.center()
            }

            if (options.alwaysOnTop) {
              browserWindow.setAlwaysOnTop(true)
            }

            if (options.fullscreen) {
              browserWindow.setFullScreen(true)
            }
            browserWindow.setFullScreenable(!!options.fullscreenable)

            const title =
              options.title ||
              (typeof __command !== 'undefined' && __command.pluginBundle()
                ? __command.pluginBundle().name()
                : undefined)
            if (title) {
              browserWindow.setTitle(title)
            }

            var backgroundColor = options.backgroundColor
            if (options.transparent) {
              backgroundColor = NSColor.clearColor()
            }
            if (
              !backgroundColor &&
              options.frame === false &&
              options.vibrancy
            ) {
              backgroundColor = NSColor.clearColor()
            }

            browserWindow._setBackgroundColor(
              backgroundColor || NSColor.windowBackgroundColor()
            )

            if (options.hasShadow === false) {
              browserWindow.setHasShadow(false)
            }

            if (typeof options.opacity !== 'undefined') {
              browserWindow.setOpacity(options.opacity)
            }

            if (options.webPreferences) {
              // TODO:
            }

            var contentView = panel.contentView()

            if (options.frame !== false) {
              webView.setFrame(contentView.bounds())
              contentView.addSubview(webView)
            } else {
              // In OSX 10.10, adding subviews to the root view for the NSView hierarchy
              // produces warnings. To eliminate the warnings, we resize the contentView
              // to fill the window, and add subviews to that.
              // http://crbug.com/380412
              contentView.setAutoresizingMask(
                NSViewWidthSizable | NSViewHeightSizable
              )
              fitSubviewToView(contentView, contentView.superview())

              webView.setFrame(contentView.bounds())
              contentView.addSubview(webView)

              // The fullscreen button should always be hidden for frameless window.
              if (panel.standardWindowButton(NSWindowFullScreenButton)) {
                panel
                  .standardWindowButton(NSWindowFullScreenButton)
                  .setHidden(true)
              }

              if (
                !options.titleBarStyle ||
                options.titleBarStyle === 'default'
              ) {
                // Hide the window buttons.
                panel.standardWindowButton(NSWindowZoomButton).setHidden(true)
                panel
                  .standardWindowButton(NSWindowMiniaturizeButton)
                  .setHidden(true)
                panel.standardWindowButton(NSWindowCloseButton).setHidden(true)

                // Some third-party macOS utilities check the zoom button's enabled state to
                // determine whether to show custom UI on hover, so we disable it here to
                // prevent them from doing so in a frameless app window.
                panel.standardWindowButton(NSWindowZoomButton).setEnabled(false)
              }
            }

            if (options.vibrancy) {
              browserWindow.setVibrancy(options.vibrancy)
            }

            // Set maximizable state last to ensure zoom button does not get reset
            // by calls to other APIs.
            browserWindow.setMaximizable(options.maximizable !== false)

            if (options.acceptsFirstMouse) {
              browserWindow.on('focus', function(event) {
                if (event.type() === NSEventTypeLeftMouseDown) {
                  browserWindow.webContents
                    .executeJavaScript(dispatchFirstClick(webView, event))
                    .catch(() => {})
                }
              })
            }

            if (options.show !== false) {
              browserWindow.show()
            }

            browserWindow.on('closed', function() {
              browserWindow._destroyed = true
              threadDictionary.removeObjectForKey(identifier)
              fiber.cleanup()
            })

            threadDictionary[identifier] = panel

            fiber.onCleanup(function() {
              if (!browserWindow._destroyed) {
                browserWindow.destroy()
              }
            })

            return browserWindow
          }

          BrowserWindow.fromId = function(identifier) {
            var threadDictionary = NSThread.mainThread().threadDictionary()

            if (threadDictionary[identifier]) {
              return BrowserWindow.fromPanel(
                threadDictionary[identifier],
                identifier
              )
            }

            return undefined
          }

          BrowserWindow.fromPanel = function(panel, identifier) {
            var browserWindow = new EventEmitter()
            browserWindow.id = identifier

            if (!panel || !panel.contentView) {
              throw new Error('needs to pass an NSPanel')
            }

            var webView = panel.contentView().subviews()[0]

            if (!webView) {
              throw new Error('The NSPanel needs to have a webview')
            }

            buildBrowserAPI(browserWindow, panel, webView)
            buildWebAPI(browserWindow, panel, webView)

            return browserWindow
          }

          module.exports = BrowserWindow

          /***/
        },

      /***/ './node_modules/sketch-module-web-view/lib/inject-client-messaging.js':
        /*!****************************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/inject-client-messaging.js ***!
  \****************************************************************************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          var CONSTANTS = __webpack_require__(
            /*! ./constants */ './node_modules/sketch-module-web-view/lib/constants.js'
          )

          module.exports = function(webView) {
            var source =
              'window.originalPostMessage = window.postMessage;' +
              'window.postMessage = function(actionName) {' +
              'if (!actionName) {' +
              "throw new Error('missing action name')" +
              '}' +
              'window.webkit.messageHandlers.' +
              CONSTANTS.JS_BRIDGE +
              '.postMessage(' +
              'JSON.stringify([].slice.call(arguments))' +
              ');' +
              '}'
            var script = WKUserScript.alloc().initWithSource_injectionTime_forMainFrameOnly(
              source,
              0,
              true
            )
            webView
              .configuration()
              .userContentController()
              .addUserScript(script)
          }

          /***/
        },

      /***/ './node_modules/sketch-module-web-view/lib/parseWebArguments.js':
        /*!**********************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/parseWebArguments.js ***!
  \**********************************************************************/
        /*! no static exports found */
        /***/ function(module, exports) {
          module.exports = function(webArguments) {
            var args = null
            try {
              args = JSON.parse(webArguments[0])
            } catch (e) {
              // malformed arguments
            }

            if (
              !args ||
              !args.constructor ||
              args.constructor !== Array ||
              args.length == 0
            ) {
              return null
            }

            return args
          }

          /***/
        },

      /***/ './node_modules/sketch-module-web-view/lib/set-delegates.js':
        /*!******************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/set-delegates.js ***!
  \******************************************************************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          var ObjCClass = __webpack_require__(
            /*! cocoascript-class */ './node_modules/cocoascript-class/lib/index.js'
          ).default
          var parseWebArguments = __webpack_require__(
            /*! ./parseWebArguments */ './node_modules/sketch-module-web-view/lib/parseWebArguments.js'
          )
          var CONSTANTS = __webpack_require__(
            /*! ./constants */ './node_modules/sketch-module-web-view/lib/constants.js'
          )

          // We create one ObjC class for ourselves here
          var WindowDelegateClass
          var NavigationDelegateClass
          var WebScriptHandlerClass

          // TODO: events
          // - 'page-favicon-updated'
          // - 'new-window'
          // - 'did-navigate-in-page'
          // - 'will-prevent-unload'
          // - 'crashed'
          // - 'unresponsive'
          // - 'responsive'
          // - 'destroyed'
          // - 'before-input-event'
          // - 'certificate-error'
          // - 'found-in-page'
          // - 'media-started-playing'
          // - 'media-paused'
          // - 'did-change-theme-color'
          // - 'update-target-url'
          // - 'cursor-changed'
          // - 'context-menu'
          // - 'select-bluetooth-device'
          // - 'paint'
          // - 'console-message'

          module.exports = function(browserWindow, panel, webview) {
            if (!WindowDelegateClass) {
              WindowDelegateClass = ObjCClass({
                classname: 'WindowDelegateClass',
                utils: null,
                panel: null,

                // Tells the delegate that the window has been resized.
                'windowDidResize:': function() {
                  this.utils.emit('resize')
                },

                // Tells the delegate that the window has been resized.
                'windowDidMiniaturize:': function() {
                  this.utils.emit('minimize')
                },

                // Tells the delegate that the window has been resized.
                'windowDidDeminiaturize:': function() {
                  this.utils.emit('restore')
                },

                // Tells the delegate that the window has been resized.
                'windowDidEnterFullScreen:': function() {
                  this.utils.emit('enter-full-screen')
                },

                // Tells the delegate that the window has been resized.
                'windowDidExitFullScreen:': function() {
                  this.utils.emit('leave-full-screen')
                },

                // Tells the delegate that the window has been resized.
                'windowDidMove:': function() {
                  this.utils.emit('move')
                  this.utils.emit('moved')
                },

                // Tells the delegate that the window has been resized.
                'windowShouldClose:': function() {
                  var shouldClose = true
                  this.utils.emit('close', {
                    get defaultPrevented() {
                      return !shouldClose
                    },
                    preventDefault: function() {
                      shouldClose = false
                    },
                  })
                  return shouldClose
                },

                'windowWillClose:': function() {
                  this.utils.emit('closed')
                },

                'windowDidBecomeKey:': function() {
                  this.utils.emit('focus', this.panel.currentEvent())
                },

                'windowDidResignKey:': function() {
                  this.utils.emit('blur')
                },
              })
            }

            if (!NavigationDelegateClass) {
              NavigationDelegateClass = ObjCClass({
                classname: 'NavigationDelegateClass',
                state: NSMutableDictionary.dictionaryWithDictionary({
                  wasReady: 0,
                }),
                utils: null,

                // // Called when the web view begins to receive web content.
                'webView:didCommitNavigation:': function(webView) {
                  this.utils.emit(
                    'will-navigate',
                    {},
                    String(String(webView.url()))
                  )
                },

                // // Called when web content begins to load in a web view.
                'webView:didStartProvisionalNavigation:': function() {
                  this.utils.emit('did-start-navigation')
                  this.utils.emit('did-start-loading')
                },

                // Called when a web view receives a server redirect.
                'webView:didReceiveServerRedirectForProvisionalNavigation:': function() {
                  this.utils.emit('did-get-redirect-request')
                },

                // // Called when the web view needs to respond to an authentication challenge.
                'webView:didReceiveAuthenticationChallenge:completionHandler:': function(
                  webView,
                  challenge,
                  completionHandler
                ) {
                  function callback(username, password) {
                    completionHandler(
                      0,
                      NSURLCredential.credentialWithUser_password_persistence(
                        username,
                        password,
                        1
                      )
                    )
                  }
                  var protectionSpace = challenge.protectionSpace()
                  this.utils.emit(
                    'login',
                    {},
                    {
                      method: String(protectionSpace.authenticationMethod()),
                      url: 'not implemented', // TODO:
                      referrer: 'not implemented', // TODO:
                    },
                    {
                      isProxy: !!protectionSpace.isProxy(),
                      scheme: String(protectionSpace.protocol()),
                      host: String(protectionSpace.host()),
                      port: Number(protectionSpace.port()),
                      realm: String(protectionSpace.realm()),
                    },
                    callback
                  )
                },

                // Called when an error occurs during navigation.
                // 'webView:didFailNavigation:withError:': function(
                //   webView,
                //   navigation,
                //   error
                // ) {},

                // Called when an error occurs while the web view is loading content.
                'webView:didFailProvisionalNavigation:withError:': function(
                  webView,
                  navigation,
                  error
                ) {
                  this.utils.emit('did-fail-load', error)
                },

                // Called when the navigation is complete.
                'webView:didFinishNavigation:': function() {
                  if (this.state.wasReady == 0) {
                    // eslint-disable-line
                    this.utils.emitBrowserEvent('ready-to-show')
                    this.state.setObject_forKey(1, 'wasReady')
                  }
                  this.utils.emit('did-navigate')
                  this.utils.emit('did-frame-navigate')
                  this.utils.emit('did-stop-loading')
                  this.utils.emit('did-finish-load')
                  this.utils.emit('did-frame-finish-load')
                },

                // Called when the web view’s web content process is terminated.
                'webViewWebContentProcessDidTerminate:': function() {
                  this.utils.emit('dom-ready')
                },

                // Decides whether to allow or cancel a navigation.
                // webView:decidePolicyForNavigationAction:decisionHandler:

                // Decides whether to allow or cancel a navigation after its response is known.
                // webView:decidePolicyForNavigationResponse:decisionHandler:
              })
            }

            if (!WebScriptHandlerClass) {
              WebScriptHandlerClass = ObjCClass({
                classname: 'WebScriptHandlerClass',
                utils: null,
                'userContentController:didReceiveScriptMessage:': function(
                  _,
                  message
                ) {
                  var webArguments = JSON.parse(String(message.body()))
                  var args = this.utils.parseWebArguments([
                    JSON.stringify(webArguments),
                  ])
                  if (!args) {
                    return
                  }

                  this.utils.emit.apply(this, args)
                },
              })
            }

            var navigationDelegate = NavigationDelegateClass.new()
            navigationDelegate.utils = NSDictionary.dictionaryWithDictionary({
              setTitle: browserWindow.setTitle.bind(browserWindow),
              emitBrowserEvent: browserWindow.emit.bind(browserWindow),
              emit: browserWindow.webContents.emit.bind(
                browserWindow.webContents
              ),
            })
            // reset state as well
            navigationDelegate.state = NSMutableDictionary.dictionaryWithDictionary(
              {
                wasReady: 0,
              }
            )

            webview.setNavigationDelegate(navigationDelegate)

            var webScriptHandler = WebScriptHandlerClass.new()
            webScriptHandler.utils = NSDictionary.dictionaryWithDictionary({
              emit: browserWindow.webContents.emit.bind(
                browserWindow.webContents
              ),
              parseWebArguments: parseWebArguments,
            })

            webview
              .configuration()
              .userContentController()
              .addScriptMessageHandler_name(
                webScriptHandler,
                CONSTANTS.JS_BRIDGE
              )

            var windowDelegate = WindowDelegateClass.new()
            windowDelegate.utils = NSDictionary.dictionaryWithDictionary({
              emit: browserWindow.emit.bind(browserWindow),
            })
            windowDelegate.panel = panel

            panel.setDelegate(windowDelegate)
          }

          /***/
        },

      /***/ './node_modules/sketch-module-web-view/lib/webview-api.js':
        /*!****************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/webview-api.js ***!
  \****************************************************************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          /* WEBPACK VAR INJECTION */ ;(function(Promise) {
            var EventEmitter = __webpack_require__(/*! events */ 'events')

            // let's try to match https://github.com/electron/electron/blob/master/docs/api/web-contents.md
            module.exports = function buildAPI(browserWindow, panel, webview) {
              var webContents = new EventEmitter()

              webContents.loadURL = browserWindow.loadURL

              webContents.loadFile = function(/* filePath */) {
                // TODO:
                console.warn(
                  'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
                )
              }

              webContents.downloadURL = function(/* filePath */) {
                // TODO:
                console.warn(
                  'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
                )
              }

              webContents.getURL = function() {
                return String(webview.url())
              }

              webContents.getTitle = function() {
                return String(webview.title())
              }

              webContents.isDestroyed = function() {
                // TODO:
                console.warn(
                  'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
                )
              }

              webContents.focus = browserWindow.focus
              webContents.isFocused = browserWindow.isFocused

              webContents.isLoading = function() {
                return !!webview.loading()
              }

              webContents.isLoadingMainFrame = function() {
                // TODO:
                return !!webview.loading()
              }

              webContents.isWaitingForResponse = function() {
                return !webview.loading()
              }

              webContents.stop = function() {
                webview.stopLoading()
              }
              webContents.reload = function() {
                webview.reload()
              }
              webContents.reloadIgnoringCache = function() {
                webview.reloadFromOrigin()
              }
              webContents.canGoBack = function() {
                return !!webview.canGoBack()
              }
              webContents.canGoForward = function() {
                return !!webview.canGoForward()
              }
              webContents.canGoToOffset = function(offset) {
                return !!webview.backForwardList().itemAtIndex(offset)
              }
              webContents.clearHistory = function() {
                // TODO:
                console.warn(
                  'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
                )
              }
              webContents.goBack = function() {
                webview.goBack()
              }
              webContents.goForward = function() {
                webview.goForward()
              }
              webContents.goToIndex = function(index) {
                var backForwardList = webview.backForwardList()
                var backList = backForwardList.backList()
                var backListLength = backList.count()
                if (backListLength > index) {
                  webview.loadRequest(
                    NSURLRequest.requestWithURL(backList[index])
                  )
                  return
                }
                var forwardList = backForwardList.forwardList()
                if (forwardList.count() > index - backListLength) {
                  webview.loadRequest(
                    NSURLRequest.requestWithURL(
                      forwardList[index - backListLength]
                    )
                  )
                  return
                }
                throw new Error('Cannot go to index ' + index)
              }
              webContents.goToOffset = function(offset) {
                if (!webContents.canGoToOffset(offset)) {
                  throw new Error('Cannot go to offset ' + offset)
                }
                webview.loadRequest(
                  NSURLRequest.requestWithURL(
                    webview.backForwardList().itemAtIndex(offset)
                  )
                )
              }
              webContents.isCrashed = function() {
                // TODO:
                console.warn(
                  'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
                )
              }
              webContents.setUserAgent = function(/* userAgent */) {
                // TODO:
                console.warn(
                  'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
                )
              }
              webContents.getUserAgent = function() {
                const userAgent = webview.customUserAgent()
                return userAgent ? String(userAgent) : undefined
              }
              webContents.insertCSS = function(css) {
                var source =
                  "var style = document.createElement('style'); style.innerHTML = " +
                  css.replace(/"/, '\\"') +
                  '; document.head.appendChild(style);'
                var script = WKUserScript.alloc().initWithSource_injectionTime_forMainFrameOnly(
                  source,
                  0,
                  true
                )
                webview
                  .configuration()
                  .userContentController()
                  .addUserScript(script)
              }
              webContents.insertJS = function(source) {
                var script = WKUserScript.alloc().initWithSource_injectionTime_forMainFrameOnly(
                  source,
                  0,
                  true
                )
                webview
                  .configuration()
                  .userContentController()
                  .addUserScript(script)
              }
              webContents.executeJavaScript = function(
                script,
                userGesture,
                callback
              ) {
                if (typeof userGesture === 'function') {
                  callback = userGesture
                  userGesture = false
                }
                var fiber = coscript.createFiber()
                return new Promise(function(resolve, reject) {
                  webview.evaluateJavaScript_completionHandler(
                    script,
                    __mocha__.createBlock_function(
                      'v28@?0@8c16@"NSError"20',
                      function(result, err) {
                        var isError =
                          err &&
                          err.class &&
                          (String(err.class()) === 'NSException' ||
                            String(err.class()) === 'NSError')
                        if (callback) {
                          try {
                            callback(isError ? err : null, result)
                          } catch (error) {
                            // /shrug
                          }
                          resolve()
                        } else if (isError) {
                          reject(err)
                        } else {
                          resolve(result)
                        }
                        fiber.cleanup()
                      }
                    )
                  )
                })
              }
              webContents.setIgnoreMenuShortcuts = function() {
                // TODO:??
                console.warn(
                  'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
                )
              }
              webContents.setAudioMuted = function(/* muted */) {
                // TODO:??
                console.warn(
                  'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
                )
              }
              webContents.isAudioMuted = function() {
                // TODO:??
                console.warn(
                  'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
                )
              }
              webContents.setZoomFactor = function(factor) {
                webview.setMagnification_centeredAtPoint(
                  factor,
                  CGPointMake(0, 0)
                )
              }
              webContents.getZoomFactor = function(callback) {
                callback(Number(webview.magnification()))
              }
              webContents.setZoomLevel = function(level) {
                // eslint-disable-next-line no-restricted-properties
                webContents.setZoomFactor(Math.pow(1.2, level))
              }
              webContents.getZoomLevel = function(callback) {
                // eslint-disable-next-line no-restricted-properties
                callback(
                  Math.log(Number(webview.magnification())) / Math.log(1.2)
                )
              }
              webContents.setVisualZoomLevelLimits = function(/* minimumLevel, maximumLevel */) {
                // TODO:??
                console.warn(
                  'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
                )
              }
              webContents.setLayoutZoomLevelLimits = function(/* minimumLevel, maximumLevel */) {
                // TODO:??
                console.warn(
                  'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
                )
              }

              // TODO:
              // webContents.undo = function() {
              //   webview.undoManager().undo()
              // }
              // webContents.redo = function() {
              //   webview.undoManager().redo()
              // }
              // webContents.cut = webview.cut
              // webContents.copy = webview.copy
              // webContents.paste = webview.paste
              // webContents.pasteAndMatchStyle = webview.pasteAsRichText
              // webContents.delete = webview.delete
              // webContents.replace = webview.replaceSelectionWithText

              webContents.send = function() {
                const script =
                  'window.postMessage({' +
                  'isSketchMessage: true,' +
                  "origin: '" +
                  String(__command.identifier()) +
                  "'," +
                  'args: ' +
                  JSON.stringify([].slice.call(arguments)) +
                  '}, "*")'
                webview.evaluateJavaScript_completionHandler(script, null)
              }

              webContents.getNativeWebview = function() {
                return webview
              }

              browserWindow.webContents = webContents
            }

            /* WEBPACK VAR INJECTION */
          }.call(
            this,
            __webpack_require__(
              /*! ./node_modules/promise-polyfill/lib/index.js */ './node_modules/promise-polyfill/lib/index.js'
            )
          ))

          /***/
        },

      /***/ './node_modules/sketch-module-web-view/remote.js':
        /*!*******************************************************!*\
  !*** ./node_modules/sketch-module-web-view/remote.js ***!
  \*******************************************************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          /* globals NSThread */
          var BrowserWindow = __webpack_require__(
            /*! ./lib */ './node_modules/sketch-module-web-view/lib/index.js'
          )

          var threadDictionary = NSThread.mainThread().threadDictionary()

          module.exports.getWebview = BrowserWindow.fromId

          module.exports.isWebviewPresent = function isWebviewPresent(
            identifier
          ) {
            return !!threadDictionary[identifier]
          }

          module.exports.sendToWebview = function sendToWebview(
            identifier,
            evalString,
            callback
          ) {
            var browserView = module.exports.getWebview(identifier)

            if (!browserView) {
              throw new Error('Webview ' + identifier + ' not found')
            }

            return browserView.webContents.executeJavaScript(
              evalString,
              callback
            )
          }

          /***/
        },

      /***/ './node_modules/sketch-utils/index.js':
        /*!********************************************!*\
  !*** ./node_modules/sketch-utils/index.js ***!
  \********************************************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          var prepareValue = __webpack_require__(
            /*! ./prepare-value */ './node_modules/sketch-utils/prepare-value.js'
          )

          module.exports.toArray = __webpack_require__(
            /*! util */ 'util'
          ).toArray
          module.exports.prepareStackTrace = __webpack_require__(
            /*! ./prepare-stack-trace */ './node_modules/sketch-utils/prepare-stack-trace.js'
          )
          module.exports.sourceMapStackTrace = __webpack_require__(
            /*! ./source-map-stack-trace */ './node_modules/sketch-utils/source-map-stack-trace.js'
          )
          module.exports.prepareValue = prepareValue
          module.exports.prepareObject = prepareValue.prepareObject
          module.exports.prepareArray = prepareValue.prepareArray

          /***/
        },

      /***/ './node_modules/sketch-utils/node_modules/source-map/lib/array-set.js':
        /*!****************************************************************************!*\
  !*** ./node_modules/sketch-utils/node_modules/source-map/lib/array-set.js ***!
  \****************************************************************************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          /* -*- Mode: js; js-indent-level: 2; -*- */
          /*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

          var util = __webpack_require__(
            /*! ./util */ './node_modules/sketch-utils/node_modules/source-map/lib/util.js'
          )
          var has = Object.prototype.hasOwnProperty
          var hasNativeMap = typeof Map !== 'undefined'

          /**
           * A data structure which is a combination of an array and a set. Adding a new
           * member is O(1), testing for membership is O(1), and finding the index of an
           * element is O(1). Removing elements from the set is not supported. Only
           * strings are supported for membership.
           */
          function ArraySet() {
            this._array = []
            this._set = hasNativeMap ? new Map() : Object.create(null)
          }

          /**
           * Static method for creating ArraySet instances from an existing array.
           */
          ArraySet.fromArray = function ArraySet_fromArray(
            aArray,
            aAllowDuplicates
          ) {
            var set = new ArraySet()
            for (var i = 0, len = aArray.length; i < len; i++) {
              set.add(aArray[i], aAllowDuplicates)
            }
            return set
          }

          /**
           * Return how many unique items are in this ArraySet. If duplicates have been
           * added, than those do not count towards the size.
           *
           * @returns Number
           */
          ArraySet.prototype.size = function ArraySet_size() {
            return hasNativeMap
              ? this._set.size
              : Object.getOwnPropertyNames(this._set).length
          }

          /**
           * Add the given string to this set.
           *
           * @param String aStr
           */
          ArraySet.prototype.add = function ArraySet_add(
            aStr,
            aAllowDuplicates
          ) {
            var sStr = hasNativeMap ? aStr : util.toSetString(aStr)
            var isDuplicate = hasNativeMap
              ? this.has(aStr)
              : has.call(this._set, sStr)
            var idx = this._array.length
            if (!isDuplicate || aAllowDuplicates) {
              this._array.push(aStr)
            }
            if (!isDuplicate) {
              if (hasNativeMap) {
                this._set.set(aStr, idx)
              } else {
                this._set[sStr] = idx
              }
            }
          }

          /**
           * Is the given string a member of this set?
           *
           * @param String aStr
           */
          ArraySet.prototype.has = function ArraySet_has(aStr) {
            if (hasNativeMap) {
              return this._set.has(aStr)
            } else {
              var sStr = util.toSetString(aStr)
              return has.call(this._set, sStr)
            }
          }

          /**
           * What is the index of the given string in the array?
           *
           * @param String aStr
           */
          ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
            if (hasNativeMap) {
              var idx = this._set.get(aStr)
              if (idx >= 0) {
                return idx
              }
            } else {
              var sStr = util.toSetString(aStr)
              if (has.call(this._set, sStr)) {
                return this._set[sStr]
              }
            }

            throw new Error('"' + aStr + '" is not in the set.')
          }

          /**
           * What is the element at the given index?
           *
           * @param Number aIdx
           */
          ArraySet.prototype.at = function ArraySet_at(aIdx) {
            if (aIdx >= 0 && aIdx < this._array.length) {
              return this._array[aIdx]
            }
            throw new Error('No element indexed by ' + aIdx)
          }

          /**
           * Returns the array representation of this set (which has the proper indices
           * indicated by indexOf). Note that this is a copy of the internal array used
           * for storing the members so that no one can mess with internal state.
           */
          ArraySet.prototype.toArray = function ArraySet_toArray() {
            return this._array.slice()
          }

          exports.ArraySet = ArraySet

          /***/
        },

      /***/ './node_modules/sketch-utils/node_modules/source-map/lib/base64-vlq.js':
        /*!*****************************************************************************!*\
  !*** ./node_modules/sketch-utils/node_modules/source-map/lib/base64-vlq.js ***!
  \*****************************************************************************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          /* -*- Mode: js; js-indent-level: 2; -*- */
          /*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Based on the Base 64 VLQ implementation in Closure Compiler:
 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
 *
 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *  * Neither the name of Google Inc. nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

          var base64 = __webpack_require__(
            /*! ./base64 */ './node_modules/sketch-utils/node_modules/source-map/lib/base64.js'
          )

          // A single base 64 digit can contain 6 bits of data. For the base 64 variable
          // length quantities we use in the source map spec, the first bit is the sign,
          // the next four bits are the actual value, and the 6th bit is the
          // continuation bit. The continuation bit tells us whether there are more
          // digits in this value following this digit.
          //
          //   Continuation
          //   |    Sign
          //   |    |
          //   V    V
          //   101011

          var VLQ_BASE_SHIFT = 5

          // binary: 100000
          var VLQ_BASE = 1 << VLQ_BASE_SHIFT

          // binary: 011111
          var VLQ_BASE_MASK = VLQ_BASE - 1

          // binary: 100000
          var VLQ_CONTINUATION_BIT = VLQ_BASE

          /**
           * Converts from a two-complement value to a value where the sign bit is
           * placed in the least significant bit.  For example, as decimals:
           *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
           *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
           */
          function toVLQSigned(aValue) {
            return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0
          }

          /**
           * Converts to a two-complement value from a value where the sign bit is
           * placed in the least significant bit.  For example, as decimals:
           *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
           *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
           */
          function fromVLQSigned(aValue) {
            var isNegative = (aValue & 1) === 1
            var shifted = aValue >> 1
            return isNegative ? -shifted : shifted
          }

          /**
           * Returns the base 64 VLQ encoded value.
           */
          exports.encode = function base64VLQ_encode(aValue) {
            var encoded = ''
            var digit

            var vlq = toVLQSigned(aValue)

            do {
              digit = vlq & VLQ_BASE_MASK
              vlq >>>= VLQ_BASE_SHIFT
              if (vlq > 0) {
                // There are still more digits in this value, so we must make sure the
                // continuation bit is marked.
                digit |= VLQ_CONTINUATION_BIT
              }
              encoded += base64.encode(digit)
            } while (vlq > 0)

            return encoded
          }

          /**
           * Decodes the next base 64 VLQ value from the given string and returns the
           * value and the rest of the string via the out parameter.
           */
          exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
            var strLen = aStr.length
            var result = 0
            var shift = 0
            var continuation, digit

            do {
              if (aIndex >= strLen) {
                throw new Error('Expected more digits in base 64 VLQ value.')
              }

              digit = base64.decode(aStr.charCodeAt(aIndex++))
              if (digit === -1) {
                throw new Error(
                  'Invalid base64 digit: ' + aStr.charAt(aIndex - 1)
                )
              }

              continuation = !!(digit & VLQ_CONTINUATION_BIT)
              digit &= VLQ_BASE_MASK
              result = result + (digit << shift)
              shift += VLQ_BASE_SHIFT
            } while (continuation)

            aOutParam.value = fromVLQSigned(result)
            aOutParam.rest = aIndex
          }

          /***/
        },

      /***/ './node_modules/sketch-utils/node_modules/source-map/lib/base64.js':
        /*!*************************************************************************!*\
  !*** ./node_modules/sketch-utils/node_modules/source-map/lib/base64.js ***!
  \*************************************************************************/
        /*! no static exports found */
        /***/ function(module, exports) {
          /* -*- Mode: js; js-indent-level: 2; -*- */
          /*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

          var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split(
            ''
          )

          /**
           * Encode an integer in the range of 0 to 63 to a single base 64 digit.
           */
          exports.encode = function(number) {
            if (0 <= number && number < intToCharMap.length) {
              return intToCharMap[number]
            }
            throw new TypeError('Must be between 0 and 63: ' + number)
          }

          /**
           * Decode a single base 64 character code digit to an integer. Returns -1 on
           * failure.
           */
          exports.decode = function(charCode) {
            var bigA = 65 // 'A'
            var bigZ = 90 // 'Z'

            var littleA = 97 // 'a'
            var littleZ = 122 // 'z'

            var zero = 48 // '0'
            var nine = 57 // '9'

            var plus = 43 // '+'
            var slash = 47 // '/'

            var littleOffset = 26
            var numberOffset = 52

            // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
            if (bigA <= charCode && charCode <= bigZ) {
              return charCode - bigA
            }

            // 26 - 51: abcdefghijklmnopqrstuvwxyz
            if (littleA <= charCode && charCode <= littleZ) {
              return charCode - littleA + littleOffset
            }

            // 52 - 61: 0123456789
            if (zero <= charCode && charCode <= nine) {
              return charCode - zero + numberOffset
            }

            // 62: +
            if (charCode == plus) {
              return 62
            }

            // 63: /
            if (charCode == slash) {
              return 63
            }

            // Invalid base64 digit.
            return -1
          }

          /***/
        },

      /***/ './node_modules/sketch-utils/node_modules/source-map/lib/binary-search.js':
        /*!********************************************************************************!*\
  !*** ./node_modules/sketch-utils/node_modules/source-map/lib/binary-search.js ***!
  \********************************************************************************/
        /*! no static exports found */
        /***/ function(module, exports) {
          /* -*- Mode: js; js-indent-level: 2; -*- */
          /*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

          exports.GREATEST_LOWER_BOUND = 1
          exports.LEAST_UPPER_BOUND = 2

          /**
           * Recursive implementation of binary search.
           *
           * @param aLow Indices here and lower do not contain the needle.
           * @param aHigh Indices here and higher do not contain the needle.
           * @param aNeedle The element being searched for.
           * @param aHaystack The non-empty array being searched.
           * @param aCompare Function which takes two elements and returns -1, 0, or 1.
           * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
           *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
           *     closest element that is smaller than or greater than the one we are
           *     searching for, respectively, if the exact element cannot be found.
           */
          function recursiveSearch(
            aLow,
            aHigh,
            aNeedle,
            aHaystack,
            aCompare,
            aBias
          ) {
            // This function terminates when one of the following is true:
            //
            //   1. We find the exact element we are looking for.
            //
            //   2. We did not find the exact element, but we can return the index of
            //      the next-closest element.
            //
            //   3. We did not find the exact element, and there is no next-closest
            //      element than the one we are searching for, so we return -1.
            var mid = Math.floor((aHigh - aLow) / 2) + aLow
            var cmp = aCompare(aNeedle, aHaystack[mid], true)
            if (cmp === 0) {
              // Found the element we are looking for.
              return mid
            } else if (cmp > 0) {
              // Our needle is greater than aHaystack[mid].
              if (aHigh - mid > 1) {
                // The element is in the upper half.
                return recursiveSearch(
                  mid,
                  aHigh,
                  aNeedle,
                  aHaystack,
                  aCompare,
                  aBias
                )
              }

              // The exact needle element was not found in this haystack. Determine if
              // we are in termination case (3) or (2) and return the appropriate thing.
              if (aBias == exports.LEAST_UPPER_BOUND) {
                return aHigh < aHaystack.length ? aHigh : -1
              } else {
                return mid
              }
            } else {
              // Our needle is less than aHaystack[mid].
              if (mid - aLow > 1) {
                // The element is in the lower half.
                return recursiveSearch(
                  aLow,
                  mid,
                  aNeedle,
                  aHaystack,
                  aCompare,
                  aBias
                )
              }

              // we are in termination case (3) or (2) and return the appropriate thing.
              if (aBias == exports.LEAST_UPPER_BOUND) {
                return mid
              } else {
                return aLow < 0 ? -1 : aLow
              }
            }
          }

          /**
           * This is an implementation of binary search which will always try and return
           * the index of the closest element if there is no exact hit. This is because
           * mappings between original and generated line/col pairs are single points,
           * and there is an implicit region between each of them, so a miss just means
           * that you aren't on the very start of a region.
           *
           * @param aNeedle The element you are looking for.
           * @param aHaystack The array that is being searched.
           * @param aCompare A function which takes the needle and an element in the
           *     array and returns -1, 0, or 1 depending on whether the needle is less
           *     than, equal to, or greater than the element, respectively.
           * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
           *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
           *     closest element that is smaller than or greater than the one we are
           *     searching for, respectively, if the exact element cannot be found.
           *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
           */
          exports.search = function search(
            aNeedle,
            aHaystack,
            aCompare,
            aBias
          ) {
            if (aHaystack.length === 0) {
              return -1
            }

            var index = recursiveSearch(
              -1,
              aHaystack.length,
              aNeedle,
              aHaystack,
              aCompare,
              aBias || exports.GREATEST_LOWER_BOUND
            )
            if (index < 0) {
              return -1
            }

            // We have found either the exact element, or the next-closest element than
            // the one we are searching for. However, there may be more than one such
            // element. Make sure we always return the smallest of these.
            while (index - 1 >= 0) {
              if (
                aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0
              ) {
                break
              }
              --index
            }

            return index
          }

          /***/
        },

      /***/ './node_modules/sketch-utils/node_modules/source-map/lib/quick-sort.js':
        /*!*****************************************************************************!*\
  !*** ./node_modules/sketch-utils/node_modules/source-map/lib/quick-sort.js ***!
  \*****************************************************************************/
        /*! no static exports found */
        /***/ function(module, exports) {
          /* -*- Mode: js; js-indent-level: 2; -*- */
          /*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

          // It turns out that some (most?) JavaScript engines don't self-host
          // `Array.prototype.sort`. This makes sense because C++ will likely remain
          // faster than JS when doing raw CPU-intensive sorting. However, when using a
          // custom comparator function, calling back and forth between the VM's C++ and
          // JIT'd JS is rather slow *and* loses JIT type information, resulting in
          // worse generated code for the comparator function than would be optimal. In
          // fact, when sorting with a comparator, these costs outweigh the benefits of
          // sorting in C++. By using our own JS-implemented Quick Sort (below), we get
          // a ~3500ms mean speed-up in `bench/bench.html`.

          /**
           * Swap the elements indexed by `x` and `y` in the array `ary`.
           *
           * @param {Array} ary
           *        The array.
           * @param {Number} x
           *        The index of the first item.
           * @param {Number} y
           *        The index of the second item.
           */
          function swap(ary, x, y) {
            var temp = ary[x]
            ary[x] = ary[y]
            ary[y] = temp
          }

          /**
           * Returns a random integer within the range `low .. high` inclusive.
           *
           * @param {Number} low
           *        The lower bound on the range.
           * @param {Number} high
           *        The upper bound on the range.
           */
          function randomIntInRange(low, high) {
            return Math.round(low + Math.random() * (high - low))
          }

          /**
           * The Quick Sort algorithm.
           *
           * @param {Array} ary
           *        An array to sort.
           * @param {function} comparator
           *        Function to use to compare two items.
           * @param {Number} p
           *        Start index of the array
           * @param {Number} r
           *        End index of the array
           */
          function doQuickSort(ary, comparator, p, r) {
            // If our lower bound is less than our upper bound, we (1) partition the
            // array into two pieces and (2) recurse on each half. If it is not, this is
            // the empty array and our base case.

            if (p < r) {
              // (1) Partitioning.
              //
              // The partitioning chooses a pivot between `p` and `r` and moves all
              // elements that are less than or equal to the pivot to the before it, and
              // all the elements that are greater than it after it. The effect is that
              // once partition is done, the pivot is in the exact place it will be when
              // the array is put in sorted order, and it will not need to be moved
              // again. This runs in O(n) time.

              // Always choose a random pivot so that an input array which is reverse
              // sorted does not cause O(n^2) running time.
              var pivotIndex = randomIntInRange(p, r)
              var i = p - 1

              swap(ary, pivotIndex, r)
              var pivot = ary[r]

              // Immediately after `j` is incremented in this loop, the following hold
              // true:
              //
              //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
              //
              //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
              for (var j = p; j < r; j++) {
                if (comparator(ary[j], pivot) <= 0) {
                  i += 1
                  swap(ary, i, j)
                }
              }

              swap(ary, i + 1, j)
              var q = i + 1

              // (2) Recurse on each half.

              doQuickSort(ary, comparator, p, q - 1)
              doQuickSort(ary, comparator, q + 1, r)
            }
          }

          /**
           * Sort the given array in-place with the given comparator function.
           *
           * @param {Array} ary
           *        An array to sort.
           * @param {function} comparator
           *        Function to use to compare two items.
           */
          exports.quickSort = function(ary, comparator) {
            doQuickSort(ary, comparator, 0, ary.length - 1)
          }

          /***/
        },

      /***/ './node_modules/sketch-utils/node_modules/source-map/lib/source-map-consumer.js':
        /*!**************************************************************************************!*\
  !*** ./node_modules/sketch-utils/node_modules/source-map/lib/source-map-consumer.js ***!
  \**************************************************************************************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          /* -*- Mode: js; js-indent-level: 2; -*- */
          /*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

          var util = __webpack_require__(
            /*! ./util */ './node_modules/sketch-utils/node_modules/source-map/lib/util.js'
          )
          var binarySearch = __webpack_require__(
            /*! ./binary-search */ './node_modules/sketch-utils/node_modules/source-map/lib/binary-search.js'
          )
          var ArraySet = __webpack_require__(
            /*! ./array-set */ './node_modules/sketch-utils/node_modules/source-map/lib/array-set.js'
          ).ArraySet
          var base64VLQ = __webpack_require__(
            /*! ./base64-vlq */ './node_modules/sketch-utils/node_modules/source-map/lib/base64-vlq.js'
          )
          var quickSort = __webpack_require__(
            /*! ./quick-sort */ './node_modules/sketch-utils/node_modules/source-map/lib/quick-sort.js'
          ).quickSort

          function SourceMapConsumer(aSourceMap, aSourceMapURL) {
            var sourceMap = aSourceMap
            if (typeof aSourceMap === 'string') {
              sourceMap = util.parseSourceMapInput(aSourceMap)
            }

            return sourceMap.sections != null
              ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL)
              : new BasicSourceMapConsumer(sourceMap, aSourceMapURL)
          }

          SourceMapConsumer.fromSourceMap = function(
            aSourceMap,
            aSourceMapURL
          ) {
            return BasicSourceMapConsumer.fromSourceMap(
              aSourceMap,
              aSourceMapURL
            )
          }

          /**
           * The version of the source mapping spec that we are consuming.
           */
          SourceMapConsumer.prototype._version = 3

          // `__generatedMappings` and `__originalMappings` are arrays that hold the
          // parsed mapping coordinates from the source map's "mappings" attribute. They
          // are lazily instantiated, accessed via the `_generatedMappings` and
          // `_originalMappings` getters respectively, and we only parse the mappings
          // and create these arrays once queried for a source location. We jump through
          // these hoops because there can be many thousands of mappings, and parsing
          // them is expensive, so we only want to do it if we must.
          //
          // Each object in the arrays is of the form:
          //
          //     {
          //       generatedLine: The line number in the generated code,
          //       generatedColumn: The column number in the generated code,
          //       source: The path to the original source file that generated this
          //               chunk of code,
          //       originalLine: The line number in the original source that
          //                     corresponds to this chunk of generated code,
          //       originalColumn: The column number in the original source that
          //                       corresponds to this chunk of generated code,
          //       name: The name of the original symbol which generated this chunk of
          //             code.
          //     }
          //
          // All properties except for `generatedLine` and `generatedColumn` can be
          // `null`.
          //
          // `_generatedMappings` is ordered by the generated positions.
          //
          // `_originalMappings` is ordered by the original positions.

          SourceMapConsumer.prototype.__generatedMappings = null
          Object.defineProperty(
            SourceMapConsumer.prototype,
            '_generatedMappings',
            {
              configurable: true,
              enumerable: true,
              get: function() {
                if (!this.__generatedMappings) {
                  this._parseMappings(this._mappings, this.sourceRoot)
                }

                return this.__generatedMappings
              },
            }
          )

          SourceMapConsumer.prototype.__originalMappings = null
          Object.defineProperty(
            SourceMapConsumer.prototype,
            '_originalMappings',
            {
              configurable: true,
              enumerable: true,
              get: function() {
                if (!this.__originalMappings) {
                  this._parseMappings(this._mappings, this.sourceRoot)
                }

                return this.__originalMappings
              },
            }
          )

          SourceMapConsumer.prototype._charIsMappingSeparator = function SourceMapConsumer_charIsMappingSeparator(
            aStr,
            index
          ) {
            var c = aStr.charAt(index)
            return c === ';' || c === ','
          }

          /**
           * Parse the mappings in a string in to a data structure which we can easily
           * query (the ordered arrays in the `this.__generatedMappings` and
           * `this.__originalMappings` properties).
           */
          SourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(
            aStr,
            aSourceRoot
          ) {
            throw new Error('Subclasses must implement _parseMappings')
          }

          SourceMapConsumer.GENERATED_ORDER = 1
          SourceMapConsumer.ORIGINAL_ORDER = 2

          SourceMapConsumer.GREATEST_LOWER_BOUND = 1
          SourceMapConsumer.LEAST_UPPER_BOUND = 2

          /**
           * Iterate over each mapping between an original source/line/column and a
           * generated line/column in this source map.
           *
           * @param Function aCallback
           *        The function that is called with each mapping.
           * @param Object aContext
           *        Optional. If specified, this object will be the value of `this` every
           *        time that `aCallback` is called.
           * @param aOrder
           *        Either `SourceMapConsumer.GENERATED_ORDER` or
           *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
           *        iterate over the mappings sorted by the generated file's line/column
           *        order or the original's source/line/column order, respectively. Defaults to
           *        `SourceMapConsumer.GENERATED_ORDER`.
           */
          SourceMapConsumer.prototype.eachMapping = function SourceMapConsumer_eachMapping(
            aCallback,
            aContext,
            aOrder
          ) {
            var context = aContext || null
            var order = aOrder || SourceMapConsumer.GENERATED_ORDER

            var mappings
            switch (order) {
              case SourceMapConsumer.GENERATED_ORDER:
                mappings = this._generatedMappings
                break
              case SourceMapConsumer.ORIGINAL_ORDER:
                mappings = this._originalMappings
                break
              default:
                throw new Error('Unknown order of iteration.')
            }

            var sourceRoot = this.sourceRoot
            mappings
              .map(function(mapping) {
                var source =
                  mapping.source === null
                    ? null
                    : this._sources.at(mapping.source)
                source = util.computeSourceURL(
                  sourceRoot,
                  source,
                  this._sourceMapURL
                )
                return {
                  source: source,
                  generatedLine: mapping.generatedLine,
                  generatedColumn: mapping.generatedColumn,
                  originalLine: mapping.originalLine,
                  originalColumn: mapping.originalColumn,
                  name:
                    mapping.name === null ? null : this._names.at(mapping.name),
                }
              }, this)
              .forEach(aCallback, context)
          }

          /**
           * Returns all generated line and column information for the original source,
           * line, and column provided. If no column is provided, returns all mappings
           * corresponding to a either the line we are searching for or the next
           * closest line that has any mappings. Otherwise, returns all mappings
           * corresponding to the given line and either the column we are searching for
           * or the next closest column that has any offsets.
           *
           * The only argument is an object with the following properties:
           *
           *   - source: The filename of the original source.
           *   - line: The line number in the original source.  The line number is 1-based.
           *   - column: Optional. the column number in the original source.
           *    The column number is 0-based.
           *
           * and an array of objects is returned, each with the following properties:
           *
           *   - line: The line number in the generated source, or null.  The
           *    line number is 1-based.
           *   - column: The column number in the generated source, or null.
           *    The column number is 0-based.
           */
          SourceMapConsumer.prototype.allGeneratedPositionsFor = function SourceMapConsumer_allGeneratedPositionsFor(
            aArgs
          ) {
            var line = util.getArg(aArgs, 'line')

            // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
            // returns the index of the closest mapping less than the needle. By
            // setting needle.originalColumn to 0, we thus find the last mapping for
            // the given line, provided such a mapping exists.
            var needle = {
              source: util.getArg(aArgs, 'source'),
              originalLine: line,
              originalColumn: util.getArg(aArgs, 'column', 0),
            }

            needle.source = this._findSourceIndex(needle.source)
            if (needle.source < 0) {
              return []
            }

            var mappings = []

            var index = this._findMapping(
              needle,
              this._originalMappings,
              'originalLine',
              'originalColumn',
              util.compareByOriginalPositions,
              binarySearch.LEAST_UPPER_BOUND
            )
            if (index >= 0) {
              var mapping = this._originalMappings[index]

              if (aArgs.column === undefined) {
                var originalLine = mapping.originalLine

                // Iterate until either we run out of mappings, or we run into
                // a mapping for a different line than the one we found. Since
                // mappings are sorted, this is guaranteed to find all mappings for
                // the line we found.
                while (mapping && mapping.originalLine === originalLine) {
                  mappings.push({
                    line: util.getArg(mapping, 'generatedLine', null),
                    column: util.getArg(mapping, 'generatedColumn', null),
                    lastColumn: util.getArg(
                      mapping,
                      'lastGeneratedColumn',
                      null
                    ),
                  })

                  mapping = this._originalMappings[++index]
                }
              } else {
                var originalColumn = mapping.originalColumn

                // Iterate until either we run out of mappings, or we run into
                // a mapping for a different line than the one we were searching for.
                // Since mappings are sorted, this is guaranteed to find all mappings for
                // the line we are searching for.
                while (
                  mapping &&
                  mapping.originalLine === line &&
                  mapping.originalColumn == originalColumn
                ) {
                  mappings.push({
                    line: util.getArg(mapping, 'generatedLine', null),
                    column: util.getArg(mapping, 'generatedColumn', null),
                    lastColumn: util.getArg(
                      mapping,
                      'lastGeneratedColumn',
                      null
                    ),
                  })

                  mapping = this._originalMappings[++index]
                }
              }
            }

            return mappings
          }

          exports.SourceMapConsumer = SourceMapConsumer

          /**
           * A BasicSourceMapConsumer instance represents a parsed source map which we can
           * query for information about the original file positions by giving it a file
           * position in the generated source.
           *
           * The first parameter is the raw source map (either as a JSON string, or
           * already parsed to an object). According to the spec, source maps have the
           * following attributes:
           *
           *   - version: Which version of the source map spec this map is following.
           *   - sources: An array of URLs to the original source files.
           *   - names: An array of identifiers which can be referrenced by individual mappings.
           *   - sourceRoot: Optional. The URL root from which all sources are relative.
           *   - sourcesContent: Optional. An array of contents of the original source files.
           *   - mappings: A string of base64 VLQs which contain the actual mappings.
           *   - file: Optional. The generated file this source map is associated with.
           *
           * Here is an example source map, taken from the source map spec[0]:
           *
           *     {
           *       version : 3,
           *       file: "out.js",
           *       sourceRoot : "",
           *       sources: ["foo.js", "bar.js"],
           *       names: ["src", "maps", "are", "fun"],
           *       mappings: "AA,AB;;ABCDE;"
           *     }
           *
           * The second parameter, if given, is a string whose value is the URL
           * at which the source map was found.  This URL is used to compute the
           * sources array.
           *
           * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
           */
          function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
            var sourceMap = aSourceMap
            if (typeof aSourceMap === 'string') {
              sourceMap = util.parseSourceMapInput(aSourceMap)
            }

            var version = util.getArg(sourceMap, 'version')
            var sources = util.getArg(sourceMap, 'sources')
            // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
            // requires the array) to play nice here.
            var names = util.getArg(sourceMap, 'names', [])
            var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null)
            var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null)
            var mappings = util.getArg(sourceMap, 'mappings')
            var file = util.getArg(sourceMap, 'file', null)

            // Once again, Sass deviates from the spec and supplies the version as a
            // string rather than a number, so we use loose equality checking here.
            if (version != this._version) {
              throw new Error('Unsupported version: ' + version)
            }

            if (sourceRoot) {
              sourceRoot = util.normalize(sourceRoot)
            }

            sources = sources
              .map(String)
              // Some source maps produce relative source paths like "./foo.js" instead of
              // "foo.js".  Normalize these first so that future comparisons will succeed.
              // See bugzil.la/1090768.
              .map(util.normalize)
              // Always ensure that absolute sources are internally stored relative to
              // the source root, if the source root is absolute. Not doing this would
              // be particularly problematic when the source root is a prefix of the
              // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
              .map(function(source) {
                return sourceRoot &&
                  util.isAbsolute(sourceRoot) &&
                  util.isAbsolute(source)
                  ? util.relative(sourceRoot, source)
                  : source
              })

            // Pass `true` below to allow duplicate names and sources. While source maps
            // are intended to be compressed and deduplicated, the TypeScript compiler
            // sometimes generates source maps with duplicates in them. See Github issue
            // #72 and bugzil.la/889492.
            this._names = ArraySet.fromArray(names.map(String), true)
            this._sources = ArraySet.fromArray(sources, true)

            this._absoluteSources = this._sources.toArray().map(function(s) {
              return util.computeSourceURL(sourceRoot, s, aSourceMapURL)
            })

            this.sourceRoot = sourceRoot
            this.sourcesContent = sourcesContent
            this._mappings = mappings
            this._sourceMapURL = aSourceMapURL
            this.file = file
          }

          BasicSourceMapConsumer.prototype = Object.create(
            SourceMapConsumer.prototype
          )
          BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer

          /**
           * Utility function to find the index of a source.  Returns -1 if not
           * found.
           */
          BasicSourceMapConsumer.prototype._findSourceIndex = function(
            aSource
          ) {
            var relativeSource = aSource
            if (this.sourceRoot != null) {
              relativeSource = util.relative(this.sourceRoot, relativeSource)
            }

            if (this._sources.has(relativeSource)) {
              return this._sources.indexOf(relativeSource)
            }

            // Maybe aSource is an absolute URL as returned by |sources|.  In
            // this case we can't simply undo the transform.
            var i
            for (i = 0; i < this._absoluteSources.length; ++i) {
              if (this._absoluteSources[i] == aSource) {
                return i
              }
            }

            return -1
          }

          /**
           * Create a BasicSourceMapConsumer from a SourceMapGenerator.
           *
           * @param SourceMapGenerator aSourceMap
           *        The source map that will be consumed.
           * @param String aSourceMapURL
           *        The URL at which the source map can be found (optional)
           * @returns BasicSourceMapConsumer
           */
          BasicSourceMapConsumer.fromSourceMap = function SourceMapConsumer_fromSourceMap(
            aSourceMap,
            aSourceMapURL
          ) {
            var smc = Object.create(BasicSourceMapConsumer.prototype)

            var names = (smc._names = ArraySet.fromArray(
              aSourceMap._names.toArray(),
              true
            ))
            var sources = (smc._sources = ArraySet.fromArray(
              aSourceMap._sources.toArray(),
              true
            ))
            smc.sourceRoot = aSourceMap._sourceRoot
            smc.sourcesContent = aSourceMap._generateSourcesContent(
              smc._sources.toArray(),
              smc.sourceRoot
            )
            smc.file = aSourceMap._file
            smc._sourceMapURL = aSourceMapURL
            smc._absoluteSources = smc._sources.toArray().map(function(s) {
              return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL)
            })

            // Because we are modifying the entries (by converting string sources and
            // names to indices into the sources and names ArraySets), we have to make
            // a copy of the entry or else bad things happen. Shared mutable state
            // strikes again! See github issue #191.

            var generatedMappings = aSourceMap._mappings.toArray().slice()
            var destGeneratedMappings = (smc.__generatedMappings = [])
            var destOriginalMappings = (smc.__originalMappings = [])

            for (
              var i = 0, length = generatedMappings.length;
              i < length;
              i++
            ) {
              var srcMapping = generatedMappings[i]
              var destMapping = new Mapping()
              destMapping.generatedLine = srcMapping.generatedLine
              destMapping.generatedColumn = srcMapping.generatedColumn

              if (srcMapping.source) {
                destMapping.source = sources.indexOf(srcMapping.source)
                destMapping.originalLine = srcMapping.originalLine
                destMapping.originalColumn = srcMapping.originalColumn

                if (srcMapping.name) {
                  destMapping.name = names.indexOf(srcMapping.name)
                }

                destOriginalMappings.push(destMapping)
              }

              destGeneratedMappings.push(destMapping)
            }

            quickSort(smc.__originalMappings, util.compareByOriginalPositions)

            return smc
          }

          /**
           * The version of the source mapping spec that we are consuming.
           */
          BasicSourceMapConsumer.prototype._version = 3

          /**
           * The list of original sources.
           */
          Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
            get: function() {
              return this._absoluteSources.slice()
            },
          })

          /**
           * Provide the JIT with a nice shape / hidden class.
           */
          function Mapping() {
            this.generatedLine = 0
            this.generatedColumn = 0
            this.source = null
            this.originalLine = null
            this.originalColumn = null
            this.name = null
          }

          /**
           * Parse the mappings in a string in to a data structure which we can easily
           * query (the ordered arrays in the `this.__generatedMappings` and
           * `this.__originalMappings` properties).
           */
          BasicSourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(
            aStr,
            aSourceRoot
          ) {
            var generatedLine = 1
            var previousGeneratedColumn = 0
            var previousOriginalLine = 0
            var previousOriginalColumn = 0
            var previousSource = 0
            var previousName = 0
            var length = aStr.length
            var index = 0
            var cachedSegments = {}
            var temp = {}
            var originalMappings = []
            var generatedMappings = []
            var mapping, str, segment, end, value

            while (index < length) {
              if (aStr.charAt(index) === ';') {
                generatedLine++
                index++
                previousGeneratedColumn = 0
              } else if (aStr.charAt(index) === ',') {
                index++
              } else {
                mapping = new Mapping()
                mapping.generatedLine = generatedLine

                // Because each offset is encoded relative to the previous one,
                // many segments often have the same encoding. We can exploit this
                // fact by caching the parsed variable length fields of each segment,
                // allowing us to avoid a second parse if we encounter the same
                // segment again.
                for (end = index; end < length; end++) {
                  if (this._charIsMappingSeparator(aStr, end)) {
                    break
                  }
                }
                str = aStr.slice(index, end)

                segment = cachedSegments[str]
                if (segment) {
                  index += str.length
                } else {
                  segment = []
                  while (index < end) {
                    base64VLQ.decode(aStr, index, temp)
                    value = temp.value
                    index = temp.rest
                    segment.push(value)
                  }

                  if (segment.length === 2) {
                    throw new Error('Found a source, but no line and column')
                  }

                  if (segment.length === 3) {
                    throw new Error('Found a source and line, but no column')
                  }

                  cachedSegments[str] = segment
                }

                // Generated column.
                mapping.generatedColumn = previousGeneratedColumn + segment[0]
                previousGeneratedColumn = mapping.generatedColumn

                if (segment.length > 1) {
                  // Original source.
                  mapping.source = previousSource + segment[1]
                  previousSource += segment[1]

                  // Original line.
                  mapping.originalLine = previousOriginalLine + segment[2]
                  previousOriginalLine = mapping.originalLine
                  // Lines are stored 0-based
                  mapping.originalLine += 1

                  // Original column.
                  mapping.originalColumn = previousOriginalColumn + segment[3]
                  previousOriginalColumn = mapping.originalColumn

                  if (segment.length > 4) {
                    // Original name.
                    mapping.name = previousName + segment[4]
                    previousName += segment[4]
                  }
                }

                generatedMappings.push(mapping)
                if (typeof mapping.originalLine === 'number') {
                  originalMappings.push(mapping)
                }
              }
            }

            quickSort(
              generatedMappings,
              util.compareByGeneratedPositionsDeflated
            )
            this.__generatedMappings = generatedMappings

            quickSort(originalMappings, util.compareByOriginalPositions)
            this.__originalMappings = originalMappings
          }

          /**
           * Find the mapping that best matches the hypothetical "needle" mapping that
           * we are searching for in the given "haystack" of mappings.
           */
          BasicSourceMapConsumer.prototype._findMapping = function SourceMapConsumer_findMapping(
            aNeedle,
            aMappings,
            aLineName,
            aColumnName,
            aComparator,
            aBias
          ) {
            // To return the position we are searching for, we must first find the
            // mapping for the given position and then return the opposite position it
            // points to. Because the mappings are sorted, we can use binary search to
            // find the best mapping.

            if (aNeedle[aLineName] <= 0) {
              throw new TypeError(
                'Line must be greater than or equal to 1, got ' +
                  aNeedle[aLineName]
              )
            }
            if (aNeedle[aColumnName] < 0) {
              throw new TypeError(
                'Column must be greater than or equal to 0, got ' +
                  aNeedle[aColumnName]
              )
            }

            return binarySearch.search(aNeedle, aMappings, aComparator, aBias)
          }

          /**
           * Compute the last column for each generated mapping. The last column is
           * inclusive.
           */
          BasicSourceMapConsumer.prototype.computeColumnSpans = function SourceMapConsumer_computeColumnSpans() {
            for (
              var index = 0;
              index < this._generatedMappings.length;
              ++index
            ) {
              var mapping = this._generatedMappings[index]

              // Mappings do not contain a field for the last generated columnt. We
              // can come up with an optimistic estimate, however, by assuming that
              // mappings are contiguous (i.e. given two consecutive mappings, the
              // first mapping ends where the second one starts).
              if (index + 1 < this._generatedMappings.length) {
                var nextMapping = this._generatedMappings[index + 1]

                if (mapping.generatedLine === nextMapping.generatedLine) {
                  mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1
                  continue
                }
              }

              // The last mapping for each line spans the entire line.
              mapping.lastGeneratedColumn = Infinity
            }
          }

          /**
           * Returns the original source, line, and column information for the generated
           * source's line and column positions provided. The only argument is an object
           * with the following properties:
           *
           *   - line: The line number in the generated source.  The line number
           *     is 1-based.
           *   - column: The column number in the generated source.  The column
           *     number is 0-based.
           *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
           *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
           *     closest element that is smaller than or greater than the one we are
           *     searching for, respectively, if the exact element cannot be found.
           *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
           *
           * and an object is returned with the following properties:
           *
           *   - source: The original source file, or null.
           *   - line: The line number in the original source, or null.  The
           *     line number is 1-based.
           *   - column: The column number in the original source, or null.  The
           *     column number is 0-based.
           *   - name: The original identifier, or null.
           */
          BasicSourceMapConsumer.prototype.originalPositionFor = function SourceMapConsumer_originalPositionFor(
            aArgs
          ) {
            var needle = {
              generatedLine: util.getArg(aArgs, 'line'),
              generatedColumn: util.getArg(aArgs, 'column'),
            }

            var index = this._findMapping(
              needle,
              this._generatedMappings,
              'generatedLine',
              'generatedColumn',
              util.compareByGeneratedPositionsDeflated,
              util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
            )

            if (index >= 0) {
              var mapping = this._generatedMappings[index]

              if (mapping.generatedLine === needle.generatedLine) {
                var source = util.getArg(mapping, 'source', null)
                if (source !== null) {
                  source = this._sources.at(source)
                  source = util.computeSourceURL(
                    this.sourceRoot,
                    source,
                    this._sourceMapURL
                  )
                }
                var name = util.getArg(mapping, 'name', null)
                if (name !== null) {
                  name = this._names.at(name)
                }
                return {
                  source: source,
                  line: util.getArg(mapping, 'originalLine', null),
                  column: util.getArg(mapping, 'originalColumn', null),
                  name: name,
                }
              }
            }

            return {
              source: null,
              line: null,
              column: null,
              name: null,
            }
          }

          /**
           * Return true if we have the source content for every source in the source
           * map, false otherwise.
           */
          BasicSourceMapConsumer.prototype.hasContentsOfAllSources = function BasicSourceMapConsumer_hasContentsOfAllSources() {
            if (!this.sourcesContent) {
              return false
            }
            return (
              this.sourcesContent.length >= this._sources.size() &&
              !this.sourcesContent.some(function(sc) {
                return sc == null
              })
            )
          }

          /**
           * Returns the original source content. The only argument is the url of the
           * original source file. Returns null if no original source content is
           * available.
           */
          BasicSourceMapConsumer.prototype.sourceContentFor = function SourceMapConsumer_sourceContentFor(
            aSource,
            nullOnMissing
          ) {
            if (!this.sourcesContent) {
              return null
            }

            var index = this._findSourceIndex(aSource)
            if (index >= 0) {
              return this.sourcesContent[index]
            }

            var relativeSource = aSource
            if (this.sourceRoot != null) {
              relativeSource = util.relative(this.sourceRoot, relativeSource)
            }

            var url
            if (
              this.sourceRoot != null &&
              (url = util.urlParse(this.sourceRoot))
            ) {
              // XXX: file:// URIs and absolute paths lead to unexpected behavior for
              // many users. We can help them out when they expect file:// URIs to
              // behave like it would if they were running a local HTTP server. See
              // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
              var fileUriAbsPath = relativeSource.replace(/^file:\/\//, '')
              if (url.scheme == 'file' && this._sources.has(fileUriAbsPath)) {
                return this.sourcesContent[
                  this._sources.indexOf(fileUriAbsPath)
                ]
              }

              if (
                (!url.path || url.path == '/') &&
                this._sources.has('/' + relativeSource)
              ) {
                return this.sourcesContent[
                  this._sources.indexOf('/' + relativeSource)
                ]
              }
            }

            // This function is used recursively from
            // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
            // don't want to throw if we can't find the source - we just want to
            // return null, so we provide a flag to exit gracefully.
            if (nullOnMissing) {
              return null
            } else {
              throw new Error(
                '"' + relativeSource + '" is not in the SourceMap.'
              )
            }
          }

          /**
           * Returns the generated line and column information for the original source,
           * line, and column positions provided. The only argument is an object with
           * the following properties:
           *
           *   - source: The filename of the original source.
           *   - line: The line number in the original source.  The line number
           *     is 1-based.
           *   - column: The column number in the original source.  The column
           *     number is 0-based.
           *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
           *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
           *     closest element that is smaller than or greater than the one we are
           *     searching for, respectively, if the exact element cannot be found.
           *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
           *
           * and an object is returned with the following properties:
           *
           *   - line: The line number in the generated source, or null.  The
           *     line number is 1-based.
           *   - column: The column number in the generated source, or null.
           *     The column number is 0-based.
           */
          BasicSourceMapConsumer.prototype.generatedPositionFor = function SourceMapConsumer_generatedPositionFor(
            aArgs
          ) {
            var source = util.getArg(aArgs, 'source')
            source = this._findSourceIndex(source)
            if (source < 0) {
              return {
                line: null,
                column: null,
                lastColumn: null,
              }
            }

            var needle = {
              source: source,
              originalLine: util.getArg(aArgs, 'line'),
              originalColumn: util.getArg(aArgs, 'column'),
            }

            var index = this._findMapping(
              needle,
              this._originalMappings,
              'originalLine',
              'originalColumn',
              util.compareByOriginalPositions,
              util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
            )

            if (index >= 0) {
              var mapping = this._originalMappings[index]

              if (mapping.source === needle.source) {
                return {
                  line: util.getArg(mapping, 'generatedLine', null),
                  column: util.getArg(mapping, 'generatedColumn', null),
                  lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null),
                }
              }
            }

            return {
              line: null,
              column: null,
              lastColumn: null,
            }
          }

          exports.BasicSourceMapConsumer = BasicSourceMapConsumer

          /**
           * An IndexedSourceMapConsumer instance represents a parsed source map which
           * we can query for information. It differs from BasicSourceMapConsumer in
           * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
           * input.
           *
           * The first parameter is a raw source map (either as a JSON string, or already
           * parsed to an object). According to the spec for indexed source maps, they
           * have the following attributes:
           *
           *   - version: Which version of the source map spec this map is following.
           *   - file: Optional. The generated file this source map is associated with.
           *   - sections: A list of section definitions.
           *
           * Each value under the "sections" field has two fields:
           *   - offset: The offset into the original specified at which this section
           *       begins to apply, defined as an object with a "line" and "column"
           *       field.
           *   - map: A source map definition. This source map could also be indexed,
           *       but doesn't have to be.
           *
           * Instead of the "map" field, it's also possible to have a "url" field
           * specifying a URL to retrieve a source map from, but that's currently
           * unsupported.
           *
           * Here's an example source map, taken from the source map spec[0], but
           * modified to omit a section which uses the "url" field.
           *
           *  {
           *    version : 3,
           *    file: "app.js",
           *    sections: [{
           *      offset: {line:100, column:10},
           *      map: {
           *        version : 3,
           *        file: "section.js",
           *        sources: ["foo.js", "bar.js"],
           *        names: ["src", "maps", "are", "fun"],
           *        mappings: "AAAA,E;;ABCDE;"
           *      }
           *    }],
           *  }
           *
           * The second parameter, if given, is a string whose value is the URL
           * at which the source map was found.  This URL is used to compute the
           * sources array.
           *
           * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
           */
          function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
            var sourceMap = aSourceMap
            if (typeof aSourceMap === 'string') {
              sourceMap = util.parseSourceMapInput(aSourceMap)
            }

            var version = util.getArg(sourceMap, 'version')
            var sections = util.getArg(sourceMap, 'sections')

            if (version != this._version) {
              throw new Error('Unsupported version: ' + version)
            }

            this._sources = new ArraySet()
            this._names = new ArraySet()

            var lastOffset = {
              line: -1,
              column: 0,
            }
            this._sections = sections.map(function(s) {
              if (s.url) {
                // The url field will require support for asynchronicity.
                // See https://github.com/mozilla/source-map/issues/16
                throw new Error(
                  'Support for url field in sections not implemented.'
                )
              }
              var offset = util.getArg(s, 'offset')
              var offsetLine = util.getArg(offset, 'line')
              var offsetColumn = util.getArg(offset, 'column')

              if (
                offsetLine < lastOffset.line ||
                (offsetLine === lastOffset.line &&
                  offsetColumn < lastOffset.column)
              ) {
                throw new Error(
                  'Section offsets must be ordered and non-overlapping.'
                )
              }
              lastOffset = offset

              return {
                generatedOffset: {
                  // The offset fields are 0-based, but we use 1-based indices when
                  // encoding/decoding from VLQ.
                  generatedLine: offsetLine + 1,
                  generatedColumn: offsetColumn + 1,
                },
                consumer: new SourceMapConsumer(
                  util.getArg(s, 'map'),
                  aSourceMapURL
                ),
              }
            })
          }

          IndexedSourceMapConsumer.prototype = Object.create(
            SourceMapConsumer.prototype
          )
          IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer

          /**
           * The version of the source mapping spec that we are consuming.
           */
          IndexedSourceMapConsumer.prototype._version = 3

          /**
           * The list of original sources.
           */
          Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
            get: function() {
              var sources = []
              for (var i = 0; i < this._sections.length; i++) {
                for (
                  var j = 0;
                  j < this._sections[i].consumer.sources.length;
                  j++
                ) {
                  sources.push(this._sections[i].consumer.sources[j])
                }
              }
              return sources
            },
          })

          /**
           * Returns the original source, line, and column information for the generated
           * source's line and column positions provided. The only argument is an object
           * with the following properties:
           *
           *   - line: The line number in the generated source.  The line number
           *     is 1-based.
           *   - column: The column number in the generated source.  The column
           *     number is 0-based.
           *
           * and an object is returned with the following properties:
           *
           *   - source: The original source file, or null.
           *   - line: The line number in the original source, or null.  The
           *     line number is 1-based.
           *   - column: The column number in the original source, or null.  The
           *     column number is 0-based.
           *   - name: The original identifier, or null.
           */
          IndexedSourceMapConsumer.prototype.originalPositionFor = function IndexedSourceMapConsumer_originalPositionFor(
            aArgs
          ) {
            var needle = {
              generatedLine: util.getArg(aArgs, 'line'),
              generatedColumn: util.getArg(aArgs, 'column'),
            }

            // Find the section containing the generated position we're trying to map
            // to an original position.
            var sectionIndex = binarySearch.search(
              needle,
              this._sections,
              function(needle, section) {
                var cmp =
                  needle.generatedLine - section.generatedOffset.generatedLine
                if (cmp) {
                  return cmp
                }

                return (
                  needle.generatedColumn -
                  section.generatedOffset.generatedColumn
                )
              }
            )
            var section = this._sections[sectionIndex]

            if (!section) {
              return {
                source: null,
                line: null,
                column: null,
                name: null,
              }
            }

            return section.consumer.originalPositionFor({
              line:
                needle.generatedLine -
                (section.generatedOffset.generatedLine - 1),
              column:
                needle.generatedColumn -
                (section.generatedOffset.generatedLine === needle.generatedLine
                  ? section.generatedOffset.generatedColumn - 1
                  : 0),
              bias: aArgs.bias,
            })
          }

          /**
           * Return true if we have the source content for every source in the source
           * map, false otherwise.
           */
          IndexedSourceMapConsumer.prototype.hasContentsOfAllSources = function IndexedSourceMapConsumer_hasContentsOfAllSources() {
            return this._sections.every(function(s) {
              return s.consumer.hasContentsOfAllSources()
            })
          }

          /**
           * Returns the original source content. The only argument is the url of the
           * original source file. Returns null if no original source content is
           * available.
           */
          IndexedSourceMapConsumer.prototype.sourceContentFor = function IndexedSourceMapConsumer_sourceContentFor(
            aSource,
            nullOnMissing
          ) {
            for (var i = 0; i < this._sections.length; i++) {
              var section = this._sections[i]

              var content = section.consumer.sourceContentFor(aSource, true)
              if (content) {
                return content
              }
            }
            if (nullOnMissing) {
              return null
            } else {
              throw new Error('"' + aSource + '" is not in the SourceMap.')
            }
          }

          /**
           * Returns the generated line and column information for the original source,
           * line, and column positions provided. The only argument is an object with
           * the following properties:
           *
           *   - source: The filename of the original source.
           *   - line: The line number in the original source.  The line number
           *     is 1-based.
           *   - column: The column number in the original source.  The column
           *     number is 0-based.
           *
           * and an object is returned with the following properties:
           *
           *   - line: The line number in the generated source, or null.  The
           *     line number is 1-based.
           *   - column: The column number in the generated source, or null.
           *     The column number is 0-based.
           */
          IndexedSourceMapConsumer.prototype.generatedPositionFor = function IndexedSourceMapConsumer_generatedPositionFor(
            aArgs
          ) {
            for (var i = 0; i < this._sections.length; i++) {
              var section = this._sections[i]

              // Only consider this section if the requested source is in the list of
              // sources of the consumer.
              if (
                section.consumer._findSourceIndex(
                  util.getArg(aArgs, 'source')
                ) === -1
              ) {
                continue
              }
              var generatedPosition = section.consumer.generatedPositionFor(
                aArgs
              )
              if (generatedPosition) {
                var ret = {
                  line:
                    generatedPosition.line +
                    (section.generatedOffset.generatedLine - 1),
                  column:
                    generatedPosition.column +
                    (section.generatedOffset.generatedLine ===
                    generatedPosition.line
                      ? section.generatedOffset.generatedColumn - 1
                      : 0),
                }
                return ret
              }
            }

            return {
              line: null,
              column: null,
            }
          }

          /**
           * Parse the mappings in a string in to a data structure which we can easily
           * query (the ordered arrays in the `this.__generatedMappings` and
           * `this.__originalMappings` properties).
           */
          IndexedSourceMapConsumer.prototype._parseMappings = function IndexedSourceMapConsumer_parseMappings(
            aStr,
            aSourceRoot
          ) {
            this.__generatedMappings = []
            this.__originalMappings = []
            for (var i = 0; i < this._sections.length; i++) {
              var section = this._sections[i]
              var sectionMappings = section.consumer._generatedMappings
              for (var j = 0; j < sectionMappings.length; j++) {
                var mapping = sectionMappings[j]

                var source = section.consumer._sources.at(mapping.source)
                source = util.computeSourceURL(
                  section.consumer.sourceRoot,
                  source,
                  this._sourceMapURL
                )
                this._sources.add(source)
                source = this._sources.indexOf(source)

                var name = null
                if (mapping.name) {
                  name = section.consumer._names.at(mapping.name)
                  this._names.add(name)
                  name = this._names.indexOf(name)
                }

                // The mappings coming from the consumer for the section have
                // generated positions relative to the start of the section, so we
                // need to offset them to be relative to the start of the concatenated
                // generated file.
                var adjustedMapping = {
                  source: source,
                  generatedLine:
                    mapping.generatedLine +
                    (section.generatedOffset.generatedLine - 1),
                  generatedColumn:
                    mapping.generatedColumn +
                    (section.generatedOffset.generatedLine ===
                    mapping.generatedLine
                      ? section.generatedOffset.generatedColumn - 1
                      : 0),
                  originalLine: mapping.originalLine,
                  originalColumn: mapping.originalColumn,
                  name: name,
                }

                this.__generatedMappings.push(adjustedMapping)
                if (typeof adjustedMapping.originalLine === 'number') {
                  this.__originalMappings.push(adjustedMapping)
                }
              }
            }

            quickSort(
              this.__generatedMappings,
              util.compareByGeneratedPositionsDeflated
            )
            quickSort(this.__originalMappings, util.compareByOriginalPositions)
          }

          exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer

          /***/
        },

      /***/ './node_modules/sketch-utils/node_modules/source-map/lib/util.js':
        /*!***********************************************************************!*\
  !*** ./node_modules/sketch-utils/node_modules/source-map/lib/util.js ***!
  \***********************************************************************/
        /*! no static exports found */
        /***/ function(module, exports) {
          /* -*- Mode: js; js-indent-level: 2; -*- */
          /*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

          /**
           * This is a helper function for getting values from parameter/options
           * objects.
           *
           * @param args The object we are extracting values from
           * @param name The name of the property we are getting.
           * @param defaultValue An optional value to return if the property is missing
           * from the object. If this is not specified and the property is missing, an
           * error will be thrown.
           */
          function getArg(aArgs, aName, aDefaultValue) {
            if (aName in aArgs) {
              return aArgs[aName]
            } else if (arguments.length === 3) {
              return aDefaultValue
            } else {
              throw new Error('"' + aName + '" is a required argument.')
            }
          }
          exports.getArg = getArg

          var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/
          var dataUrlRegexp = /^data:.+\,.+$/

          function urlParse(aUrl) {
            var match = aUrl.match(urlRegexp)
            if (!match) {
              return null
            }
            return {
              scheme: match[1],
              auth: match[2],
              host: match[3],
              port: match[4],
              path: match[5],
            }
          }
          exports.urlParse = urlParse

          function urlGenerate(aParsedUrl) {
            var url = ''
            if (aParsedUrl.scheme) {
              url += aParsedUrl.scheme + ':'
            }
            url += '//'
            if (aParsedUrl.auth) {
              url += aParsedUrl.auth + '@'
            }
            if (aParsedUrl.host) {
              url += aParsedUrl.host
            }
            if (aParsedUrl.port) {
              url += ':' + aParsedUrl.port
            }
            if (aParsedUrl.path) {
              url += aParsedUrl.path
            }
            return url
          }
          exports.urlGenerate = urlGenerate

          /**
           * Normalizes a path, or the path portion of a URL:
           *
           * - Replaces consecutive slashes with one slash.
           * - Removes unnecessary '.' parts.
           * - Removes unnecessary '<dir>/..' parts.
           *
           * Based on code in the Node.js 'path' core module.
           *
           * @param aPath The path or url to normalize.
           */
          function normalize(aPath) {
            var path = aPath
            var url = urlParse(aPath)
            if (url) {
              if (!url.path) {
                return aPath
              }
              path = url.path
            }
            var isAbsolute = exports.isAbsolute(path)

            var parts = path.split(/\/+/)
            for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
              part = parts[i]
              if (part === '.') {
                parts.splice(i, 1)
              } else if (part === '..') {
                up++
              } else if (up > 0) {
                if (part === '') {
                  // The first part is blank if the path is absolute. Trying to go
                  // above the root is a no-op. Therefore we can remove all '..' parts
                  // directly after the root.
                  parts.splice(i + 1, up)
                  up = 0
                } else {
                  parts.splice(i, 2)
                  up--
                }
              }
            }
            path = parts.join('/')

            if (path === '') {
              path = isAbsolute ? '/' : '.'
            }

            if (url) {
              url.path = path
              return urlGenerate(url)
            }
            return path
          }
          exports.normalize = normalize

          /**
           * Joins two paths/URLs.
           *
           * @param aRoot The root path or URL.
           * @param aPath The path or URL to be joined with the root.
           *
           * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
           *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
           *   first.
           * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
           *   is updated with the result and aRoot is returned. Otherwise the result
           *   is returned.
           *   - If aPath is absolute, the result is aPath.
           *   - Otherwise the two paths are joined with a slash.
           * - Joining for example 'http://' and 'www.example.com' is also supported.
           */
          function join(aRoot, aPath) {
            if (aRoot === '') {
              aRoot = '.'
            }
            if (aPath === '') {
              aPath = '.'
            }
            var aPathUrl = urlParse(aPath)
            var aRootUrl = urlParse(aRoot)
            if (aRootUrl) {
              aRoot = aRootUrl.path || '/'
            }

            // `join(foo, '//www.example.org')`
            if (aPathUrl && !aPathUrl.scheme) {
              if (aRootUrl) {
                aPathUrl.scheme = aRootUrl.scheme
              }
              return urlGenerate(aPathUrl)
            }

            if (aPathUrl || aPath.match(dataUrlRegexp)) {
              return aPath
            }

            // `join('http://', 'www.example.com')`
            if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
              aRootUrl.host = aPath
              return urlGenerate(aRootUrl)
            }

            var joined =
              aPath.charAt(0) === '/'
                ? aPath
                : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath)

            if (aRootUrl) {
              aRootUrl.path = joined
              return urlGenerate(aRootUrl)
            }
            return joined
          }
          exports.join = join

          exports.isAbsolute = function(aPath) {
            return aPath.charAt(0) === '/' || urlRegexp.test(aPath)
          }

          /**
           * Make a path relative to a URL or another path.
           *
           * @param aRoot The root path or URL.
           * @param aPath The path or URL to be made relative to aRoot.
           */
          function relative(aRoot, aPath) {
            if (aRoot === '') {
              aRoot = '.'
            }

            aRoot = aRoot.replace(/\/$/, '')

            // It is possible for the path to be above the root. In this case, simply
            // checking whether the root is a prefix of the path won't work. Instead, we
            // need to remove components from the root one by one, until either we find
            // a prefix that fits, or we run out of components to remove.
            var level = 0
            while (aPath.indexOf(aRoot + '/') !== 0) {
              var index = aRoot.lastIndexOf('/')
              if (index < 0) {
                return aPath
              }

              // If the only part of the root that is left is the scheme (i.e. http://,
              // file:///, etc.), one or more slashes (/), or simply nothing at all, we
              // have exhausted all components, so the path is not relative to the root.
              aRoot = aRoot.slice(0, index)
              if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
                return aPath
              }

              ++level
            }

            // Make sure we add a "../" for each component we removed from the root.
            return Array(level + 1).join('../') + aPath.substr(aRoot.length + 1)
          }
          exports.relative = relative

          var supportsNullProto = (function() {
            var obj = Object.create(null)
            return !('__proto__' in obj)
          })()

          function identity(s) {
            return s
          }

          /**
           * Because behavior goes wacky when you set `__proto__` on objects, we
           * have to prefix all the strings in our set with an arbitrary character.
           *
           * See https://github.com/mozilla/source-map/pull/31 and
           * https://github.com/mozilla/source-map/issues/30
           *
           * @param String aStr
           */
          function toSetString(aStr) {
            if (isProtoString(aStr)) {
              return '$' + aStr
            }

            return aStr
          }
          exports.toSetString = supportsNullProto ? identity : toSetString

          function fromSetString(aStr) {
            if (isProtoString(aStr)) {
              return aStr.slice(1)
            }

            return aStr
          }
          exports.fromSetString = supportsNullProto ? identity : fromSetString

          function isProtoString(s) {
            if (!s) {
              return false
            }

            var length = s.length

            if (length < 9 /* "__proto__".length */) {
              return false
            }

            if (
              s.charCodeAt(length - 1) !== 95 /* '_' */ ||
              s.charCodeAt(length - 2) !== 95 /* '_' */ ||
              s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
              s.charCodeAt(length - 4) !== 116 /* 't' */ ||
              s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
              s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
              s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
              s.charCodeAt(length - 8) !== 95 /* '_' */ ||
              s.charCodeAt(length - 9) !== 95 /* '_' */
            ) {
              return false
            }

            for (var i = length - 10; i >= 0; i--) {
              if (s.charCodeAt(i) !== 36 /* '$' */) {
                return false
              }
            }

            return true
          }

          /**
           * Comparator between two mappings where the original positions are compared.
           *
           * Optionally pass in `true` as `onlyCompareGenerated` to consider two
           * mappings with the same original source/line/column, but different generated
           * line and column the same. Useful when searching for a mapping with a
           * stubbed out mapping.
           */
          function compareByOriginalPositions(
            mappingA,
            mappingB,
            onlyCompareOriginal
          ) {
            var cmp = strcmp(mappingA.source, mappingB.source)
            if (cmp !== 0) {
              return cmp
            }

            cmp = mappingA.originalLine - mappingB.originalLine
            if (cmp !== 0) {
              return cmp
            }

            cmp = mappingA.originalColumn - mappingB.originalColumn
            if (cmp !== 0 || onlyCompareOriginal) {
              return cmp
            }

            cmp = mappingA.generatedColumn - mappingB.generatedColumn
            if (cmp !== 0) {
              return cmp
            }

            cmp = mappingA.generatedLine - mappingB.generatedLine
            if (cmp !== 0) {
              return cmp
            }

            return strcmp(mappingA.name, mappingB.name)
          }
          exports.compareByOriginalPositions = compareByOriginalPositions

          /**
           * Comparator between two mappings with deflated source and name indices where
           * the generated positions are compared.
           *
           * Optionally pass in `true` as `onlyCompareGenerated` to consider two
           * mappings with the same generated line and column, but different
           * source/name/original line and column the same. Useful when searching for a
           * mapping with a stubbed out mapping.
           */
          function compareByGeneratedPositionsDeflated(
            mappingA,
            mappingB,
            onlyCompareGenerated
          ) {
            var cmp = mappingA.generatedLine - mappingB.generatedLine
            if (cmp !== 0) {
              return cmp
            }

            cmp = mappingA.generatedColumn - mappingB.generatedColumn
            if (cmp !== 0 || onlyCompareGenerated) {
              return cmp
            }

            cmp = strcmp(mappingA.source, mappingB.source)
            if (cmp !== 0) {
              return cmp
            }

            cmp = mappingA.originalLine - mappingB.originalLine
            if (cmp !== 0) {
              return cmp
            }

            cmp = mappingA.originalColumn - mappingB.originalColumn
            if (cmp !== 0) {
              return cmp
            }

            return strcmp(mappingA.name, mappingB.name)
          }
          exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated

          function strcmp(aStr1, aStr2) {
            if (aStr1 === aStr2) {
              return 0
            }

            if (aStr1 === null) {
              return 1 // aStr2 !== null
            }

            if (aStr2 === null) {
              return -1 // aStr1 !== null
            }

            if (aStr1 > aStr2) {
              return 1
            }

            return -1
          }

          /**
           * Comparator between two mappings with inflated source and name strings where
           * the generated positions are compared.
           */
          function compareByGeneratedPositionsInflated(mappingA, mappingB) {
            var cmp = mappingA.generatedLine - mappingB.generatedLine
            if (cmp !== 0) {
              return cmp
            }

            cmp = mappingA.generatedColumn - mappingB.generatedColumn
            if (cmp !== 0) {
              return cmp
            }

            cmp = strcmp(mappingA.source, mappingB.source)
            if (cmp !== 0) {
              return cmp
            }

            cmp = mappingA.originalLine - mappingB.originalLine
            if (cmp !== 0) {
              return cmp
            }

            cmp = mappingA.originalColumn - mappingB.originalColumn
            if (cmp !== 0) {
              return cmp
            }

            return strcmp(mappingA.name, mappingB.name)
          }
          exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated

          /**
           * Strip any JSON XSSI avoidance prefix from the string (as documented
           * in the source maps specification), and then parse the string as
           * JSON.
           */
          function parseSourceMapInput(str) {
            return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ''))
          }
          exports.parseSourceMapInput = parseSourceMapInput

          /**
           * Compute the URL of a source given the the source root, the source's
           * URL, and the source map's URL.
           */
          function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
            sourceURL = sourceURL || ''

            if (sourceRoot) {
              // This follows what Chrome does.
              if (
                sourceRoot[sourceRoot.length - 1] !== '/' &&
                sourceURL[0] !== '/'
              ) {
                sourceRoot += '/'
              }
              // The spec says:
              //   Line 4: An optional source root, useful for relocating source
              //   files on a server or removing repeated values in the
              //   “sources” entry.  This value is prepended to the individual
              //   entries in the “source” field.
              sourceURL = sourceRoot + sourceURL
            }

            // Historically, SourceMapConsumer did not take the sourceMapURL as
            // a parameter.  This mode is still somewhat supported, which is why
            // this code block is conditional.  However, it's preferable to pass
            // the source map URL to SourceMapConsumer, so that this function
            // can implement the source URL resolution algorithm as outlined in
            // the spec.  This block is basically the equivalent of:
            //    new URL(sourceURL, sourceMapURL).toString()
            // ... except it avoids using URL, which wasn't available in the
            // older releases of node still supported by this library.
            //
            // The spec says:
            //   If the sources are not absolute URLs after prepending of the
            //   “sourceRoot”, the sources are resolved relative to the
            //   SourceMap (like resolving script src in a html document).
            if (sourceMapURL) {
              var parsed = urlParse(sourceMapURL)
              if (!parsed) {
                throw new Error('sourceMapURL could not be parsed')
              }
              if (parsed.path) {
                // Strip the last path component, but keep the "/".
                var index = parsed.path.lastIndexOf('/')
                if (index >= 0) {
                  parsed.path = parsed.path.substring(0, index + 1)
                }
              }
              sourceURL = join(urlGenerate(parsed), sourceURL)
            }

            return normalize(sourceURL)
          }
          exports.computeSourceURL = computeSourceURL

          /***/
        },

      /***/ './node_modules/sketch-utils/prepare-stack-trace.js':
        /*!**********************************************************!*\
  !*** ./node_modules/sketch-utils/prepare-stack-trace.js ***!
  \**********************************************************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          /* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign, no-var, vars-on-top, prefer-template, prefer-arrow-callback, func-names, prefer-destructuring, object-shorthand */
          var sourcemap = __webpack_require__(
            /*! ./source-map-stack-trace */ './node_modules/sketch-utils/source-map-stack-trace.js'
          )

          module.exports = function prepareStackTrace(stackTrace, options) {
            var stack = stackTrace.split('\n')
            stack = stack.map(function(s) {
              return s.replace(/\sg/, '')
            })

            stack = stack.map(function(entry) {
              // entry is something like `functionName@path/to/my/file:line:column`
              // or `path/to/my/file:line:column`
              // or `path/to/my/file`
              // or `path/to/@my/file:line:column`
              var parts = entry.split('@')
              var fn = parts.shift()
              var filePath = parts.join('@') // the path can contain @

              if (fn.indexOf('/Users/') === 0) {
                // actually we didn't have a fn so just put it back in the filePath
                filePath = fn + (filePath ? '@' + filePath : '')
                fn = null
              }

              if (!filePath) {
                // we should always have a filePath, so if we don't have one here, it means that the function what actually anonymous and that it is the filePath instead
                filePath = entry
                fn = null
              }

              var filePathParts = filePath.split(':')
              filePath = filePathParts[0]

              // the file is the last part of the filePath
              var file = filePath.split('/')
              file = file[file.length - 1]

              return {
                fn: fn,
                file: file,
                filePath: filePath,
                line: filePathParts[1],
                column: filePathParts[2],
              }
            })

            if (options.sourcemaps) {
              return sourcemap(stack)
            }

            return stack
          }

          /***/
        },

      /***/ './node_modules/sketch-utils/prepare-value.js':
        /*!****************************************************!*\
  !*** ./node_modules/sketch-utils/prepare-value.js ***!
  \****************************************************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          /* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign, no-var, vars-on-top, prefer-template, prefer-arrow-callback, func-names, prefer-destructuring, object-shorthand */
          var util = __webpack_require__(/*! util */ 'util')
          var prepareStackTrace = __webpack_require__(
            /*! ./prepare-stack-trace */ './node_modules/sketch-utils/prepare-stack-trace.js'
          )

          var getNativeClass =
            util.getNativeClass ||
            function(arg) {
              try {
                return (
                  arg &&
                  arg.isKindOfClass &&
                  typeof arg.class === 'function' &&
                  String(arg.class())
                )
              } catch (err) {
                return undefined
              }
            }

          var isNativeObject =
            util.isNativeObject ||
            function(arg) {
              return !!getNativeClass(arg)
            }

          function prepareArray(array, options) {
            return array.map(function(i) {
              return prepareValue(i, options)
            })
          }

          function prepareObject(object, options) {
            const deep = {}
            Object.keys(object).forEach(function(key) {
              deep[key] = prepareValue(object[key], options)
            })
            return deep
          }

          function getName(x) {
            return {
              type: 'String',
              primitive: 'String',
              value: String(x.name()),
            }
          }

          function getSelector(x) {
            return {
              type: 'String',
              primitive: 'String',
              value: String(x.selector()),
            }
          }

          function introspectMochaObject(value, options) {
            options = options || {}
            var mocha = value.class().mocha()
            var introspection = {
              properties: {
                type: 'Array',
                primitive: 'Array',
                value: util
                  .toArray(
                    mocha[
                      'properties' +
                        (options.withAncestors ? 'WithAncestors' : '')
                    ]()
                  )
                  .map(getName),
              },
              classMethods: {
                type: 'Array',
                primitive: 'Array',
                value: util
                  .toArray(
                    mocha[
                      'classMethods' +
                        (options.withAncestors ? 'WithAncestors' : '')
                    ]()
                  )
                  .map(getSelector),
              },
              instanceMethods: {
                type: 'Array',
                primitive: 'Array',
                value: util
                  .toArray(
                    mocha[
                      'instanceMethods' +
                        (options.withAncestors ? 'WithAncestors' : '')
                    ]()
                  )
                  .map(getSelector),
              },
              protocols: {
                type: 'Array',
                primitive: 'Array',
                value: util
                  .toArray(
                    mocha[
                      'protocols' +
                        (options.withAncestors ? 'WithAncestors' : '')
                    ]()
                  )
                  .map(getName),
              },
            }
            if (mocha.treeAsDictionary && options.withTree) {
              introspection.treeAsDictionary = {
                type: 'Object',
                primitive: 'Object',
                value: prepareObject(mocha.treeAsDictionary()),
              }
            }
            return introspection
          }

          function prepareValue(value, options) {
            var type
            var primitive
            if (util.isArray(value)) {
              type = Array.isArray(value) ? 'Array' : String(value.class())
              primitive = 'Array'
              value = prepareArray(util.toArray(value), options)
            } else if (util.isBoolean(value)) {
              type =
                typeof value === 'boolean' ? 'Boolean' : String(value.class())
              primitive = 'Boolean'
              value = Boolean(Number(value))
            } else if (util.isNullOrUndefined(value) || Number.isNaN(value)) {
              type = 'Empty'
              primitive = 'Empty'
              value = String(value)
            } else if (util.isNumber(value)) {
              type =
                typeof value === 'number' ? 'Number' : String(value.class())
              primitive = 'Number'
              value = Number(value)
            } else if (util.isString(value)) {
              type =
                typeof value === 'string' ? 'String' : String(value.class())
              primitive = 'String'
              value = String(value)
            } else if (util.isSymbol(value)) {
              type = 'Symbol'
              primitive = 'Symbol'
            } else if (util.isRegExp(value)) {
              type = 'RegExp'
              primitive = 'RegExp'
            } else if (util.isDate(value)) {
              type = 'Date'
              primitive = 'Date'
            } else if (util.isFunction(value)) {
              type = 'Function'
              primitive = 'Function'
              value = String(value)
            } else if (util.isBuffer(value)) {
              type = 'Buffer'
              primitive = 'Buffer'
              value = String(value)
            } else if (util.isError(value)) {
              type = 'Error'
              primitive = 'Error'
              value = {
                message: value.message,
                name: value.name,
                stack: prepareStackTrace(value.stack, options),
              }
            } else if (util.isObject(value)) {
              var nativeClass = getNativeClass(value)
              type = nativeClass ? nativeClass : 'Object'
              primitive = 'Object'
              value = prepareObject(util.toObject(value), options)
            } else if (isNativeObject(value)) {
              type = getNativeClass(value)
              // special case for NSException
              if (type === 'NSException') {
                primitive = 'Error'
                var stack = ''
                var userInfo =
                  value.userInfo && value.userInfo() ? value.userInfo() : {}
                if (userInfo.stack) {
                  stack = String(userInfo.stack)
                }
                value = {
                  message: String(value.reason()),
                  name: String(value.name()),
                  stack: prepareStackTrace(stack, options),
                  userInfo: prepareObject(util.toObject(userInfo), options),
                }
              } else if (value.class().mocha) {
                primitive = 'Mocha'
                value = (options || {}).skipMocha
                  ? type
                  : introspectMochaObject(value, options)
              } else {
                primitive = 'Unknown'
                value = type
              }
            } else {
              type = 'Unknown'
              primitive = 'Unknown'
              value = type
            }

            return {
              value,
              type,
              primitive,
            }
          }

          module.exports = prepareValue
          module.exports.prepareObject = prepareObject
          module.exports.prepareArray = prepareArray

          /***/
        },

      /***/ './node_modules/sketch-utils/source-map-stack-trace.js':
        /*!*************************************************************!*\
  !*** ./node_modules/sketch-utils/source-map-stack-trace.js ***!
  \*************************************************************/
        /*! no static exports found */
        /***/ function(module, exports, __webpack_require__) {
          // taken for most part from https://github.com/evanw/node-source-map-support/blob/master/source-map-support.js

          var SourceMapConsumer = __webpack_require__(
            /*! source-map/lib/source-map-consumer */ './node_modules/sketch-utils/node_modules/source-map/lib/source-map-consumer.js'
          ).SourceMapConsumer
          var path = __webpack_require__(
            /*! @skpm/path */ './node_modules/@skpm/path/index.js'
          )
          var fs = __webpack_require__(
            /*! @skpm/fs */ './node_modules/@skpm/fs/index.js'
          )
          var Buffer = __webpack_require__(
            /*! @skpm/buffer */ './node_modules/@skpm/buffer/index.js'
          )

          // Regex for detecting source maps
          const reSourceMap = /^data:application\/json[^,]+base64,/

          function retrieveFile(filePath, caches) {
            // Trim the path to make sure there is no extra whitespace.
            filePath = filePath.trim() // eslint-disable-line
            if (filePath in caches.fileContents) {
              return caches.fileContents[filePath]
            }

            var contents = null
            try {
              contents = fs.readFileSync(filePath, 'utf8')
            } catch (err) {
              contents = ''
            }

            caches.fileContents[filePath] = contents

            return contents
          }

          // Support URLs relative to a directory, but be careful about a protocol prefix
          // in case we are in the browser (i.e. directories may start with "http://")
          var webpackSource = /^webpack:\/\/exports\//
          var externalSource = /^external/
          function supportRelativeURL(file, url) {
            if (!file) return url
            var webpackURL = url
            var webpackMatch = webpackSource.exec(webpackURL)
            if (webpackMatch) {
              webpackURL = webpackURL.slice(webpackMatch[0].length)
              if (externalSource.exec(webpackURL)) {
                return webpackURL
              }
              webpackURL = '../../../' + webpackURL
            }
            var dir = path.dirname(file)
            var match = /^\w+:\/\/[^/]*/.exec(dir)
            var protocol = match ? match[0] : ''
            return (
              protocol + path.resolve(dir.slice(protocol.length), webpackURL)
            )
          }

          function retrieveSourceMapURL(source, caches) {
            // Get the URL of the source map
            var fileData = retrieveFile(source, caches)

            var re = /(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"]+?)[ \t]*$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^*]+?)[ \t]*(?:\*\/)[ \t]*$)/gm
            // Keep executing the search to find the *last* sourceMappingURL to avoid
            // picking up sourceMappingURLs from comments, strings, etc.
            var lastMatch
            var match = re.exec(fileData)
            while (match) {
              lastMatch = match
              match = re.exec(fileData)
            }
            if (!lastMatch) return null
            return lastMatch[1]
          }

          // Can be overridden by the retrieveSourceMap option to install. Takes a
          // generated source filename; returns a {map, optional url} object, or null if
          // there is no source map.  The map field may be either a string or the parsed
          // JSON object (ie, it must be a valid argument to the SourceMapConsumer
          // constructor).
          function retrieveSourceMap(source, caches) {
            var sourceMappingURL = retrieveSourceMapURL(source, caches)
            if (!sourceMappingURL) return null

            // Read the contents of the source map
            var sourceMapData
            if (reSourceMap.test(sourceMappingURL)) {
              // Support source map URL as a data url
              var rawData = sourceMappingURL.slice(
                sourceMappingURL.indexOf(',') + 1
              )
              sourceMapData = Buffer.from(rawData, 'base64').toString()
              sourceMappingURL = source
            } else {
              // Support source map URLs relative to the source URL
              sourceMappingURL = supportRelativeURL(source, sourceMappingURL)
              sourceMapData = retrieveFile(sourceMappingURL, caches)
            }

            if (!sourceMapData) {
              return null
            }

            return {
              url: sourceMappingURL,
              map: sourceMapData,
            }
          }

          function mapSourcePosition(position, caches) {
            var sourceMap = caches.sourceMap[position.source]

            if (!sourceMap) {
              var urlAndMap = retrieveSourceMap(position.source, caches)
              if (urlAndMap) {
                var map = new SourceMapConsumer(urlAndMap.map)
                sourceMap = {
                  url: urlAndMap.url,
                  rawMap: urlAndMap.map,
                  map: map,
                }

                caches.sourceMap[position.source] = sourceMap

                // Load all sources stored inline with the source map into the file cache
                // to pretend like they are already loaded. They may not exist on disk.
                if (sourceMap.map.sourcesContent) {
                  sourceMap.map.sources.forEach((source, i) => {
                    const contents = sourceMap.map.sourcesContent[i]
                    if (contents) {
                      const url = supportRelativeURL(sourceMap.url, source)
                      caches.fileContents[url] = contents
                    }
                  })
                }
              } else {
                sourceMap = {
                  url: null,
                  rawMap: null,
                  map: null,
                }

                caches.sourceMap[position.source] = sourceMap
              }
            }

            // Resolve the source URL relative to the URL of the source map
            if (sourceMap && sourceMap.map) {
              const originalPosition = sourceMap.map.originalPositionFor(
                position
              )

              // Only return the original position if a matching line was found. If no
              // matching line is found then we return position instead, which will cause
              // the stack trace to print the path and line for the compiled file. It is
              // better to give a precise location in the compiled file than a vague
              // location in the original file.
              if (originalPosition.source !== null) {
                originalPosition.source =
                  supportRelativeURL(sourceMap.url, originalPosition.source) ||
                  originalPosition.source
                return originalPosition
              }
            }

            return position
          }

          module.exports = function(stack) {
            const caches = {
              // Maps a file path to a string containing the file contents
              fileContents: {},
              // Maps a file path to a source map for that file
              sourceMap: {},
            }

            var mappedStack = []

            for (let i = 0; i < stack.length; i += 1) {
              var frame = stack[i]
              if (
                typeof frame.line !== 'undefined' &&
                typeof frame.column !== 'undefined' &&
                frame.filePath
              ) {
                var mappedPosition = mapSourcePosition(
                  {
                    source: frame.filePath,
                    line: parseInt(frame.line, 10),
                    column: parseInt(frame.column, 10),
                  },
                  caches
                )
                var filePath = mappedPosition.source
                // the file is the last part of the filePath
                var file = filePath.split('/')
                file = file[file.length - 1]
                mappedStack.push(
                  Object.assign({}, frame, mappedPosition, {
                    filePath: filePath,
                    file: file,
                  })
                )
              } else {
                mappedStack.push(frame)
              }
            }

            return mappedStack
          }

          /***/
        },

      /***/ './resources/webview.html':
        /*!********************************!*\
  !*** ./resources/webview.html ***!
  \********************************/
        /*! no static exports found */
        /***/ function(module, exports) {
          module.exports =
            'file://' +
            context.plugin
              .urlForResourceNamed(
                '_webpack_resources/d5ae499521352841da79d9eb9280a7ac.html'
              )
              .path()

          /***/
        },

      /***/ './shared-actions.js':
        /*!***************************!*\
  !*** ./shared-actions.js ***!
  \***************************/
        /*! no static exports found */
        /***/ function(module, exports) {
          module.exports.SET_TREE = 'elements/SET_TREE'
          module.exports.SET_PAGE_METADATA = 'elements/SET_PAGE_METADATA'
          module.exports.SET_LAYER_METADATA = 'elements/SET_LAYER_METADATA'
          module.exports.ADD_LOG = 'logs/ADD_LOG'
          module.exports.CLEAR_LOGS = 'logs/CLEAR_LOGS'
          module.exports.GROUP = 'logs/GROUP'
          module.exports.GROUP_END = 'logs/GROUP_END'
          module.exports.TIMER_START = 'logs/TIMER_START'
          module.exports.TIMER_END = 'logs/TIMER_END'
          module.exports.ADD_REQUEST = 'network/ADD_REQUEST'
          module.exports.SET_RESPONSE = 'network/SET_RESPONSE'
          module.exports.ADD_ACTION = 'actions/ADD_ACTION'
          module.exports.SET_SCRIPT_RESULT = 'playground/SET_SCRIPT_RESULT'

          /***/
        },

      /***/ './src/get-sketch-state.js':
        /*!*********************************!*\
  !*** ./src/get-sketch-state.js ***!
  \*********************************/
        /*! exports provided: getPageMetadata, getLayerMetadata, default */
        /***/ function(module, __webpack_exports__, __webpack_require__) {
          'use strict'
          __webpack_require__.r(__webpack_exports__)
          /* harmony export (binding) */ __webpack_require__.d(
            __webpack_exports__,
            'getPageMetadata',
            function() {
              return getPageMetadata
            }
          )
          /* harmony export (binding) */ __webpack_require__.d(
            __webpack_exports__,
            'getLayerMetadata',
            function() {
              return getLayerMetadata
            }
          )
          /* harmony export (binding) */ __webpack_require__.d(
            __webpack_exports__,
            'default',
            function() {
              return getElementTree
            }
          )
          /* harmony import */ var sketch_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
            /*! sketch/dom */ 'sketch/dom'
          )
          /* harmony import */ var sketch_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
            sketch_dom__WEBPACK_IMPORTED_MODULE_0__
          )
          /* harmony import */ var sketch_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
            /*! sketch-utils */ './node_modules/sketch-utils/index.js'
          )
          /* harmony import */ var sketch_utils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(
            sketch_utils__WEBPACK_IMPORTED_MODULE_1__
          )
          /* globals NSPredicate */
          // eslint-disable-line

          function getLayerChildren(layer, pageId, docId) {
            if (!layer.children) {
              return []
            }

            var children = Object(
              sketch_utils__WEBPACK_IMPORTED_MODULE_1__['toArray']
            )(layer.children()).filter(function(child) {
              return child.objectID() !== layer.objectID()
            }) // eslint-disable-next-line

            return children.map(inspectLayer.bind(this, pageId, docId))
          }

          function inspectLayer(pageId, docId, layer, index) {
            return {
              type: 'layer',
              index: index,
              id: String(layer.objectID()),
              desc: String(layer.description()),
              class: String(layer.class()),
              name: String(layer.name()),
              fromPage: pageId,
              fromDoc: docId,
            }
          }

          function getPageLayers(page, docId) {
            return page.layers.map(function(layer) {
              return inspectLayer(page.id, docId, layer.sketchObject)
            })
          }

          function getDocumentPages(doc) {
            return doc.pages.map(function(page, index) {
              return {
                type: page.type,
                index: index,
                id: page.id,
                desc: String(page.sketchObject.description()),
                class: String(page.sketchObject.class()),
                name: page.name,
                fromDoc: doc.id,
              }
            })
          }

          function findPageById(pageId, docId) {
            var documents = sketch_dom__WEBPACK_IMPORTED_MODULE_0___default.a.Document.getDocuments()
            var page
            documents.forEach(function(doc) {
              if (page || doc.id !== docId) {
                return
              }

              doc.pages.forEach(function(p) {
                if (page) {
                  return
                }

                if (p.id === pageId) {
                  page = p
                }
              })
            })
            return page
          }

          function getPageMetadata(pageId, docId) {
            var page = findPageById(pageId, docId)

            if (!page) {
              return undefined
            }

            var dict = page.sketchObject.treeAsDictionary()
            delete dict.layers
            delete dict['<class>']
            delete dict.name
            return {
              meta: Object(
                sketch_utils__WEBPACK_IMPORTED_MODULE_1__['prepareObject']
              )(dict, {
                skipMocha: true,
              }),
              children: getPageLayers(page, docId),
            }
          }
          function getLayerMetadata(layerId, pageId, docId) {
            var page = findPageById(pageId, docId)

            if (!page) {
              return undefined
            }

            var predicate = NSPredicate.predicateWithFormat(
              'objectID CONTAINS[c] %@',
              layerId
            )
            var result = Object(
              sketch_utils__WEBPACK_IMPORTED_MODULE_1__['toArray']
            )(
              page.sketchObject
                .children()
                .filteredArrayUsingPredicate(predicate)
            )

            if (!result || !result.length) {
              return undefined
            }

            var layer = result[0]
            var dict = layer.treeAsDictionary()
            delete dict.children
            delete dict.layers
            delete dict['<class>']
            delete dict.name
            return {
              meta: Object(
                sketch_utils__WEBPACK_IMPORTED_MODULE_1__['prepareObject']
              )(dict, {
                skipMocha: true,
              }),
              children: getLayerChildren(layer, pageId, docId),
            }
          }
          function getElementTree() {
            var documents = sketch_dom__WEBPACK_IMPORTED_MODULE_0___default.a.Document.getDocuments()
            return documents.map(function(doc, index) {
              return {
                type: doc.type,
                index: index,
                id: doc.id,
                desc: String(doc.sketchObject.description()),
                class: String(doc.sketchObject.class()),
                meta: {},
                children: getDocumentPages(doc),
              }
            })
          }

          /***/
        },

      /***/ './src/run-script.js':
        /*!***************************!*\
  !*** ./src/run-script.js ***!
  \***************************/
        /*! exports provided: clearScriptsCache, runCommand, runScript */
        /***/ function(module, __webpack_exports__, __webpack_require__) {
          'use strict'
          __webpack_require__.r(__webpack_exports__)
          /* WEBPACK VAR INJECTION */ ;(function(Promise) {
            /* harmony export (binding) */ __webpack_require__.d(
              __webpack_exports__,
              'clearScriptsCache',
              function() {
                return clearScriptsCache
              }
            )
            /* harmony export (binding) */ __webpack_require__.d(
              __webpack_exports__,
              'runCommand',
              function() {
                return runCommand
              }
            )
            /* harmony export (binding) */ __webpack_require__.d(
              __webpack_exports__,
              'runScript',
              function() {
                return runScript
              }
            )
            /* harmony import */ var _skpm_child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
              /*! @skpm/child_process */ './node_modules/@skpm/child_process/index.js'
            )
            /* harmony import */ var _skpm_child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
              _skpm_child_process__WEBPACK_IMPORTED_MODULE_0__
            )
            /* harmony import */ var _skpm_fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
              /*! @skpm/fs */ './node_modules/@skpm/fs/index.js'
            )
            /* harmony import */ var _skpm_fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(
              _skpm_fs__WEBPACK_IMPORTED_MODULE_1__
            )
            /* globals NSString, context, MSPluginScript, MSPluginCommand, AppController, NSApp */

            var PATH_TO_BUNDLE = ''.concat(
              context.plugin.url().path(),
              '/Contents/Resources'
            )
            var SCRIPTS_PATH = ''.concat(PATH_TO_BUNDLE, '/.scripts')
            function clearScriptsCache() {
              var child = Object(
                _skpm_child_process__WEBPACK_IMPORTED_MODULE_0__['spawn']
              )('rm', ['-rf', SCRIPTS_PATH])
              child.on('close', function() {
                Object(
                  _skpm_child_process__WEBPACK_IMPORTED_MODULE_0__['spawn']
                )('mkdir', ['-r', SCRIPTS_PATH])
              })
            }
            function runCommand(command) {
              return new Promise(function(resolve, reject) {
                Object(
                  _skpm_child_process__WEBPACK_IMPORTED_MODULE_0__['exec']
                )(
                  command,
                  {
                    cwd: PATH_TO_BUNDLE,
                  },
                  function(err, stdout, stderr) {
                    if (err) {
                      return reject(err)
                    }

                    if (stderr) {
                      return reject(stderr)
                    }

                    return resolve(stdout)
                  }
                )
              })
            }
            function runScript(rawScript) {
              // BCDefaultsSetValueForKey([inputField string], ScriptEditorLastRunKey);
              // use a hash of the script to avoid rebundling every time
              var hash = NSString.stringWithString(rawScript).hash()
              var pathToRawFile = ''
                .concat(SCRIPTS_PATH, '/')
                .concat(hash, '.js')
              var pathToBundledFile = ''
                .concat(SCRIPTS_PATH, '/Contents/Sketch/')
                .concat(hash, '.js')

              try {
                if (
                  !_skpm_fs__WEBPACK_IMPORTED_MODULE_1__['existsSync'](
                    pathToBundledFile
                  )
                ) {
                  _skpm_fs__WEBPACK_IMPORTED_MODULE_1__['writeFileSync'](
                    pathToRawFile,
                    ''.concat(rawScript, '\n;export default function () {}'),
                    'utf8'
                  )
                  Object(
                    _skpm_child_process__WEBPACK_IMPORTED_MODULE_0__['execSync']
                  )('node ./build-script.js '.concat(hash, '.js'), {
                    cwd: PATH_TO_BUNDLE,
                  })
                }

                var bundledScript = _skpm_fs__WEBPACK_IMPORTED_MODULE_1__[
                  'readFileSync'
                ](pathToBundledFile, 'utf8')
                var pluginScript = MSPluginScript.alloc().initWithString_filename(
                  bundledScript,
                  'script.js'
                )
                var command = MSPluginCommand.alloc().initWithScript_identifier_name_runHandler_scope(
                  pluginScript,
                  'com.bohemiancoding.sketch.runscriptidentifier',
                  'test',
                  'onRun',
                  'document'
                )
                AppController.sharedInstance().runPluginCommand_fromMenu_context(
                  command,
                  true,
                  {}
                )
              } catch (err) {
                return err
              }

              NSApp.delegate().refreshCurrentDocument()
              return undefined
            }
            /* WEBPACK VAR INJECTION */
          }.call(
            this,
            __webpack_require__(
              /*! ./node_modules/promise-polyfill/lib/index.js */ './node_modules/promise-polyfill/lib/index.js'
            )
          ))

          /***/
        },

      /***/ './src/show-debugger.js':
        /*!******************************!*\
  !*** ./src/show-debugger.js ***!
  \******************************/
        /*! exports provided: default */
        /***/ function(module, __webpack_exports__, __webpack_require__) {
          'use strict'
          __webpack_require__.r(__webpack_exports__)
          /* harmony import */ var sketch_settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
            /*! sketch/settings */ 'sketch/settings'
          )
          /* harmony import */ var sketch_settings__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
            sketch_settings__WEBPACK_IMPORTED_MODULE_0__
          )
          /* harmony import */ var sketch_module_web_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
            /*! sketch-module-web-view */ './node_modules/sketch-module-web-view/lib/index.js'
          )
          /* harmony import */ var sketch_module_web_view__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(
            sketch_module_web_view__WEBPACK_IMPORTED_MODULE_1__
          )
          /* harmony import */ var sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
            /*! sketch-module-web-view/remote */ './node_modules/sketch-module-web-view/remote.js'
          )
          /* harmony import */ var sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/ __webpack_require__.n(
            sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_2__
          )
          /* harmony import */ var sketch_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
            /*! sketch-utils */ './node_modules/sketch-utils/index.js'
          )
          /* harmony import */ var sketch_utils__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/ __webpack_require__.n(
            sketch_utils__WEBPACK_IMPORTED_MODULE_3__
          )
          /* harmony import */ var _get_sketch_state__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
            /*! ./get-sketch-state */ './src/get-sketch-state.js'
          )
          /* harmony import */ var _shared_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
            /*! ../shared-actions */ './shared-actions.js'
          )
          /* harmony import */ var _shared_actions__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/ __webpack_require__.n(
            _shared_actions__WEBPACK_IMPORTED_MODULE_5__
          )
          /* harmony import */ var _debugger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
            /*! ../debugger */ './debugger.js'
          )
          /* harmony import */ var _debugger__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/ __webpack_require__.n(
            _debugger__WEBPACK_IMPORTED_MODULE_6__
          )
          /* harmony import */ var _run_script__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
            /*! ./run-script */ './src/run-script.js'
          )
          /* globals AppController, NSWorkspace, MSTheme */

          /* eslint-disable global-require */
          // eslint-disable-line

          /* harmony default export */ __webpack_exports__[
            'default'
          ] = function() {
            var existingWebview = Object(
              sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_2__[
                'getWebview'
              ]
            )(_debugger__WEBPACK_IMPORTED_MODULE_6__['identifier'])

            if (existingWebview) {
              if (existingWebview.isVisible()) {
                // close the devtool if it's open
                existingWebview.close()
              }

              return
            }

            var browserWindow = new sketch_module_web_view__WEBPACK_IMPORTED_MODULE_1___default.a(
              {
                identifier:
                  _debugger__WEBPACK_IMPORTED_MODULE_6__['identifier'],
                width: 830,
                height: 400,
                minWidth: 700,
                minHeight: 300,
                minimizable: false,
                maximizable: false,
                alwaysOnTop:
                  sketch_settings__WEBPACK_IMPORTED_MODULE_0___default.a.settingForKey(
                    'alwaysOnTop'
                  ) || false,
                fullscreenable: false,
                acceptFirstMouse: true,
                title: 'Sketch DevTools',
                resizable: true,
                show: false,
              }
            )
            browserWindow.loadURL(
              __webpack_require__(
                /*! ../resources/webview.html */ './resources/webview.html'
              )
            )
            var settings = {
              withAncestors:
                sketch_settings__WEBPACK_IMPORTED_MODULE_0___default.a.settingForKey(
                  'withAncestors'
                ) || false,
              alwaysOnTop:
                sketch_settings__WEBPACK_IMPORTED_MODULE_0___default.a.settingForKey(
                  'alwaysOnTop'
                ) || false,
              theme:
                typeof MSTheme !== 'undefined' && MSTheme.sharedTheme().isDark()
                  ? 'dark'
                  : 'light',
              showTimestamps:
                sketch_settings__WEBPACK_IMPORTED_MODULE_0___default.a.settingForKey(
                  'showTimestamps'
                ) || false,
              sourcemaps:
                typeof sketch_settings__WEBPACK_IMPORTED_MODULE_0___default.a.settingForKey(
                  'sourcemaps'
                ) !== 'undefined'
                  ? sketch_settings__WEBPACK_IMPORTED_MODULE_0___default.a.settingForKey(
                      'sourcemaps'
                    )
                  : true,
            }
            browserWindow.webContents.insertJS(
              'window.initialSettings = '.concat(JSON.stringify(settings))
            )
            browserWindow.once('ready-to-show', function() {
              browserWindow.show() // enabled listening to all the actions

              AppController.sharedInstance()
                .pluginManager()
                .setWilcardsEnabled(true)
            })
            browserWindow.on('closed', function() {
              AppController.sharedInstance()
                .pluginManager()
                .setWilcardsEnabled(false)
            })
            browserWindow.webContents.on('openFile', function(file) {
              NSWorkspace.sharedWorkspace().openFile(file)
            })
            browserWindow.webContents.on('getSketchState', function() {
              var state = Object(
                _get_sketch_state__WEBPACK_IMPORTED_MODULE_4__['default']
              )()
              browserWindow.webContents
                .executeJavaScript(
                  'sketchBridge('.concat(
                    JSON.stringify({
                      name:
                        _shared_actions__WEBPACK_IMPORTED_MODULE_5__[
                          'SET_TREE'
                        ],
                      payload: state,
                    }),
                    ')'
                  )
                )
                .catch(console.error)
            })
            browserWindow.webContents.on('setSetting', function(key, value) {
              sketch_settings__WEBPACK_IMPORTED_MODULE_0___default.a.setSettingForKey(
                key,
                value
              )

              if (String(key) === 'alwaysOnTop') {
                browserWindow.setAlwaysOnTop(value)
              }
            })
            browserWindow.webContents.on('getPageMetadata', function(
              pageId,
              docId
            ) {
              var state = Object(
                _get_sketch_state__WEBPACK_IMPORTED_MODULE_4__[
                  'getPageMetadata'
                ]
              )(pageId, docId)
              browserWindow.webContents
                .executeJavaScript(
                  'sketchBridge('.concat(
                    JSON.stringify({
                      name:
                        _shared_actions__WEBPACK_IMPORTED_MODULE_5__[
                          'SET_PAGE_METADATA'
                        ],
                      payload: {
                        pageId: pageId,
                        docId: docId,
                        state: state,
                      },
                    }),
                    ')'
                  )
                )
                .catch(console.error)
            })
            browserWindow.webContents.on('getLayerMetadata', function(
              layerId,
              pageId,
              docId
            ) {
              var state = Object(
                _get_sketch_state__WEBPACK_IMPORTED_MODULE_4__[
                  'getLayerMetadata'
                ]
              )(layerId, pageId, docId)
              browserWindow.webContents
                .executeJavaScript(
                  'sketchBridge('.concat(
                    JSON.stringify({
                      name:
                        _shared_actions__WEBPACK_IMPORTED_MODULE_5__[
                          'SET_LAYER_METADATA'
                        ],
                      payload: {
                        layerId: layerId,
                        pageId: pageId,
                        docId: docId,
                        state: state,
                      },
                    }),
                    ')'
                  )
                )
                .catch(console.error)
            })
            browserWindow.webContents.on('onRunScript', function(
              script,
              runId
            ) {
              var result = Object(
                _run_script__WEBPACK_IMPORTED_MODULE_7__['runScript']
              )(script)
              browserWindow.webContents
                .executeJavaScript(
                  'sketchBridge('.concat(
                    JSON.stringify({
                      name:
                        _shared_actions__WEBPACK_IMPORTED_MODULE_5__[
                          'SET_SCRIPT_RESULT'
                        ],
                      payload: {
                        result: Object(
                          sketch_utils__WEBPACK_IMPORTED_MODULE_3__[
                            'prepareValue'
                          ]
                        )(result),
                        id: runId,
                      },
                    }),
                    ')'
                  )
                )
                .catch(console.error)
            })
            browserWindow.webContents.on('onRunCommand', function(
              command,
              runId
            ) {
              Object(_run_script__WEBPACK_IMPORTED_MODULE_7__['runCommand'])(
                command
              )
                .catch(function(err) {
                  return err
                })
                .then(function(result) {
                  browserWindow.webContents
                    .executeJavaScript(
                      'sketchBridge('.concat(
                        JSON.stringify({
                          name:
                            _shared_actions__WEBPACK_IMPORTED_MODULE_5__[
                              'SET_SCRIPT_RESULT'
                            ],
                          payload: {
                            result: Object(
                              sketch_utils__WEBPACK_IMPORTED_MODULE_3__[
                                'prepareValue'
                              ]
                            )(result || 'done'),
                            id: runId,
                          },
                        }),
                        ')'
                      )
                    )
                    .catch(console.error)
                })
            })
            browserWindow.webContents.on('clearScriptsCache', function() {
              Object(
                _run_script__WEBPACK_IMPORTED_MODULE_7__['clearScriptsCache']
              )()
            })
          }

          /***/
        },

      /***/ buffer:
        /*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
        /*! no static exports found */
        /***/ function(module, exports) {
          module.exports = require('buffer')

          /***/
        },

      /***/ events:
        /*!*************************!*\
  !*** external "events" ***!
  \*************************/
        /*! no static exports found */
        /***/ function(module, exports) {
          module.exports = require('events')

          /***/
        },

      /***/ 'sketch/dom':
        /*!*****************************!*\
  !*** external "sketch/dom" ***!
  \*****************************/
        /*! no static exports found */
        /***/ function(module, exports) {
          module.exports = require('sketch/dom')

          /***/
        },

      /***/ 'sketch/settings':
        /*!**********************************!*\
  !*** external "sketch/settings" ***!
  \**********************************/
        /*! no static exports found */
        /***/ function(module, exports) {
          module.exports = require('sketch/settings')

          /***/
        },

      /***/ util:
        /*!***********************!*\
  !*** external "util" ***!
  \***********************/
        /*! no static exports found */
        /***/ function(module, exports) {
          module.exports = require('util')

          /***/
        },

      /******/
    }
  )
  if (key === 'default' && typeof exports === 'function') {
    exports(context)
  } else {
    exports[key](context)
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=show-debugger.js.map
