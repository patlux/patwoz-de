module.exports = /******/ (function(modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = require('../../../ssr-module-cache.js'); // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {},
      /******/
    }); // Execute the module function
    /******/
    /******/ /******/ var threw = true;
    /******/ try {
      /******/ modules[moduleId].call(
        module.exports,
        module,
        module.exports,
        __webpack_require__
      );
      /******/ threw = false;
      /******/
    } finally {
      /******/ if (threw) delete installedModules[moduleId];
      /******/
    } // Flag the module as loaded
    /******/
    /******/ /******/ module.l = true; // Return the exports of the module
    /******/
    /******/ /******/ return module.exports;
    /******/
  } // expose the modules object (__webpack_modules__)
  /******/
  /******/
  /******/ /******/ __webpack_require__.m = modules; // expose the module cache
  /******/
  /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
  /******/
  /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter,
      });
      /******/
    }
    /******/
  }; // define __esModule on exports
  /******/
  /******/ /******/ __webpack_require__.r = function(exports) {
    /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /******/ Object.defineProperty(exports, Symbol.toStringTag, {
        value: 'Module',
      });
      /******/
    }
    /******/ Object.defineProperty(exports, '__esModule', { value: true });
    /******/
  }; // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
  /******/
  /******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function(
    value,
    mode
  ) {
    /******/ if (mode & 1) value = __webpack_require__(value);
    /******/ if (mode & 8) return value;
    /******/ if (
      mode & 4 &&
      typeof value === 'object' &&
      value &&
      value.__esModule
    )
      return value;
    /******/ var ns = Object.create(null);
    /******/ __webpack_require__.r(ns);
    /******/ Object.defineProperty(ns, 'default', {
      enumerable: true,
      value: value,
    });
    /******/ if (mode & 2 && typeof value != 'string')
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function(key) {
            return value[key];
          }.bind(null, key)
        );
    /******/ return ns;
    /******/
  }; // getDefaultExport function for compatibility with non-harmony modules
  /******/
  /******/ /******/ __webpack_require__.n = function(module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module['default'];
          }
        : /******/ function getModuleExports() {
            return module;
          };
    /******/ __webpack_require__.d(getter, 'a', getter);
    /******/ return getter;
    /******/
  }; // Object.prototype.hasOwnProperty.call
  /******/
  /******/ /******/ __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }; // __webpack_public_path__
  /******/
  /******/ /******/ __webpack_require__.p = ''; // Load entry module and return exports
  /******/
  /******/
  /******/ /******/ return __webpack_require__((__webpack_require__.s = 4));
  /******/
})(
  /************************************************************************/
  /******/ {
    /***/ './pages/index.js':
      /*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
      /*! exports provided: default */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict';
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! react */ 'react'
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
          react__WEBPACK_IMPORTED_MODULE_0__
        );
        var _jsxFileName =
          '/Users/patrick.wozniak/dev/Private/patwoz-de/pages/index.js';

        var IndexPage = function IndexPage(_ref) {
          var listOfAddresses = _ref.listOfAddresses;
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,
            null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'h1',
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 5,
                },
                __self: this,
              },
              "Hi, I'm Patrick Wozniak"
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'p',
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 6,
                },
                __self: this,
              },
              'I live in Nuremberg with my lovely girlfriend. I build amazing stuff at',
              ' ',
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'a',
                {
                  href: 'https://www.cegeka.com/',
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 8,
                  },
                  __self: this,
                },
                'Cegeka Deutschland GmbH'
              ),
              '. When it comes to building things, I like to move rapidly. I utilize technologies such as ',
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'a',
                {
                  href: 'https://reactjs.org/',
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 10,
                  },
                  __self: this,
                },
                'React'
              ),
              ' (',
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'a',
                {
                  href: 'https://facebook.github.io/react-native/',
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 11,
                  },
                  __self: this,
                },
                'Native'
              ),
              '), ',
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'a',
                {
                  href: 'https://expo.io/snacks/@patwoz',
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 12,
                  },
                  __self: this,
                },
                'Expo'
              ),
              ',',
              ' ',
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'a',
                {
                  href: 'https://zeit.co/now',
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 13,
                  },
                  __self: this,
                },
                'Now'
              ),
              ',',
              ' ',
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'a',
                {
                  href:
                    'https://about.gitlab.com/product/continuous-integration/',
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 14,
                  },
                  __self: this,
                },
                'Gitlab Ci'
              ),
              '.'
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'p',
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 19,
                },
                __self: this,
              },
              'You can find me on the internet at:'
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'ul',
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 20,
                },
                __self: this,
              },
              listOfAddresses.map(function(Address) {
                return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                  'li',
                  {
                    key: Address.link,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 22,
                    },
                    __self: this,
                  },
                  react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    'a',
                    {
                      href: Address.link,
                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 23,
                      },
                      __self: this,
                    },
                    Address.description
                  )
                );
              })
            )
          );
        };

        IndexPage.defaultProps = {
          listOfAddresses: [
            {
              link: 'mailto:email@patwoz.de',
              description: 'email@patwoz.de',
            },
            {
              link: 'https://twitter.com/de_patwoz',
              description: 'Twitter: @de_patwoz',
            },
            {
              link: 'https://github.com/patlux',
              description: 'Github: patlux',
            },
            {
              link: 'https://stackoverflow.com/users/6300994/patrick-wozniak',
              description: ' Stack Overflow',
            },
          ],
        };
        /* harmony default export */ __webpack_exports__['default'] = IndexPage;

        /***/
      },

    /***/ 4:
      /*!******************************!*\
  !*** multi ./pages/index.js ***!
  \******************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(
          /*! /Users/patrick.wozniak/dev/Private/patwoz-de/pages/index.js */ './pages/index.js'
        );

        /***/
      },

    /***/ react:
      /*!************************!*\
  !*** external "react" ***!
  \************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        module.exports = require('react');

        /***/
      },

    /******/
  }
);
//# sourceMappingURL=index.js.map
