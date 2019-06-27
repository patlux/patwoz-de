(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  ['static/development/pages/index.js'],
  {
    /***/ './node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2F&absolutePagePath=%2FUsers%2Fpatrick.wozniak%2Fdev%2FPrivate%2Fpatwoz-de%2Fpages%2Findex.js!./':
      /*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2F&absolutePagePath=%2FUsers%2Fpatrick.wozniak%2Fdev%2FPrivate%2Fpatwoz-de%2Fpages%2Findex.js ***!
  \**************************************************************************************************************************************************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        (window.__NEXT_P = window.__NEXT_P || []).push([
          '/',
          function() {
            var page = __webpack_require__(
              /*! ./pages/index.js */ './pages/index.js'
            );
            if (true) {
              module.hot.accept(
                /*! ./pages/index.js */ './pages/index.js',
                function() {
                  if (!next.router.components['/']) return;
                  var updatedPage = __webpack_require__(
                    /*! ./pages/index.js */ './pages/index.js'
                  );
                  next.router.update('/', updatedPage.default || updatedPage);
                }
              );
            }
            return { page: page.default || page };
          },
        ]);

        /***/
      },

    /***/ './node_modules/react/index.js':
      /*!*******************************************************************************************!*\
  !*** delegated ./node_modules/react/index.js from dll-reference dll_7aff549c98b978433226 ***!
  \*******************************************************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(
          /*! dll-reference dll_7aff549c98b978433226 */ 'dll-reference dll_7aff549c98b978433226'
        )('./node_modules/react/index.js');

        /***/
      },

    /***/ './pages/index.js':
      /*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
      /*! exports provided: default */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict';
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js'
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

    /***/ 1:
      /*!******************************************************************************************************************************************!*\
  !*** multi next-client-pages-loader?page=%2F&absolutePagePath=%2FUsers%2Fpatrick.wozniak%2Fdev%2FPrivate%2Fpatwoz-de%2Fpages%2Findex.js ***!
  \******************************************************************************************************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(
          /*! next-client-pages-loader?page=%2F&absolutePagePath=%2FUsers%2Fpatrick.wozniak%2Fdev%2FPrivate%2Fpatwoz-de%2Fpages%2Findex.js! */ './node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2F&absolutePagePath=%2FUsers%2Fpatrick.wozniak%2Fdev%2FPrivate%2Fpatwoz-de%2Fpages%2Findex.js!./'
        );

        /***/
      },

    /***/ 'dll-reference dll_7aff549c98b978433226':
      /*!*******************************************!*\
  !*** external "dll_7aff549c98b978433226" ***!
  \*******************************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        module.exports = dll_7aff549c98b978433226;

        /***/
      },
  },
  [[1, 'static/runtime/webpack.js']],
]);
//# sourceMappingURL=index.js.map
