(function () {
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {
    /***/
    0:
    /*!***************************!*\
      !*** multi ./src/main.ts ***!
      \***************************/

    /*! no static exports found */

    /***/
    function _(module, exports, __webpack_require__) {
      module.exports = __webpack_require__(
      /*! C:\Users\Victor\Documents\aaronright.github.io\whiteNoise\src\main.ts */
      "zUnb");
      /***/
    },

    /***/
    "AytR":
    /*!*****************************************!*\
      !*** ./src/environments/environment.ts ***!
      \*****************************************/

    /*! exports provided: environment */

    /***/
    function AytR(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "environment", function () {
        return environment;
      }); // This file can be replaced during build by using the `fileReplacements` array.
      // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
      // The list of file replacements can be found in `angular.json`.


      var environment = {
        production: false
      };
      /*
       * For easier debugging in development mode, you can import the following file
       * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
       *
       * This import should be commented out in production mode because it will have a negative impact
       * on performance if an error is thrown.
       */
      // import 'zone.js/dist/zone-error';  // Included with Angular CLI.

      /***/
    },

    /***/
    "NIcn":
    /*!**************************!*\
      !*** ./src/app/noise.ts ***!
      \**************************/

    /*! exports provided: Noise */

    /***/
    function NIcn(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "Noise", function () {
        return Noise;
      });

      var Noise = /*#__PURE__*/function () {
        function Noise() {
          _classCallCheck(this, Noise);

          // @ts-ignore
          this.audioContext = new (window.AudioContext ? window.AudioContext : window.webkitAudioContext)();
        } // https://noisehack.com/generate-noise-web-audio-api/


        _createClass(Noise, [{
          key: "createNoise",
          value: function createNoise(track) {
            var bufferSize = 2 * this.audioContext.sampleRate;
            var noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
            var output = noiseBuffer.getChannelData(0);

            for (var i = 0; i < bufferSize; i++) {
              output[i] = Math.random() * 2 - 1;
            }

            track.audioSource.buffer = noiseBuffer;
          }
        }, {
          key: "stopNoise",
          value: function stopNoise(track) {
            if (track.audioSource) {
              clearTimeout(this.fadeOutTimer);

              try {
                track.audioSource.stop();
              } catch (err) {}
            }
          }
        }, {
          key: "fadeNoise",
          value: function fadeNoise(track) {
            var _this = this;

            if (track.fadeOut) {
              track.fadeOut = track.fadeOut >= 0 ? track.fadeOut : 0.5;
            } else {
              track.fadeOut = 0.5;
            }

            if (track.canFade) {
              track.gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + track.fadeOut);
              track.canFade = false;
              this.fadeOutTimer = setTimeout(function () {
                _this.stopNoise(track);
              }, track.fadeOut * 1000);
            } else {
              this.stopNoise(track);
            }
          }
        }, {
          key: "buildTrack",
          value: function buildTrack(track) {
            track.audioSource = this.audioContext.createBufferSource();
            track.gainNode = this.audioContext.createGain();
            track.audioSource.connect(track.gainNode);
            track.gainNode.connect(this.audioContext.destination);
            track.canFade = true; // used to prevent fadeOut firing twice
          }
        }, {
          key: "setGain",
          value: function setGain(track) {
            track.volume = track.volume >= 0 ? track.volume : 0.5;

            if (track.fadeIn) {
              track.fadeIn = track.fadeIn >= 0 ? track.fadeIn : 0.5;
            } else {
              track.fadeIn = 0.5;
            }

            track.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            track.gainNode.gain.linearRampToValueAtTime(track.volume / 4, this.audioContext.currentTime + track.fadeIn / 2);
            track.gainNode.gain.linearRampToValueAtTime(track.volume, this.audioContext.currentTime + track.fadeIn);
          }
        }, {
          key: "playNoise",
          value: function playNoise(track) {
            this.stopNoise(track);
            this.buildTrack(track);
            this.createNoise(track);
            this.setGain(track);
            track.audioSource.loop = true;
            console.log(123);
            track.audioSource.start();
            console.log(234);
          }
        }]);

        return Noise;
      }();

      Noise.template = {
        volume: 0.05,
        fadeIn: 2.5,
        fadeOut: 1.3
      };
      /***/
    },

    /***/
    "Sy1n":
    /*!**********************************!*\
      !*** ./src/app/app.component.ts ***!
      \**********************************/

    /*! exports provided: AppComponent */

    /***/
    function Sy1n(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppComponent", function () {
        return AppComponent;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _noise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./noise */
      "NIcn");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /*
      <path *ngIf="!play; else elseBlock" d="M 3.2723216,2 6.7276787,2 C 7.4325448,2 8,2.5674553 8,3.2723213
                L 8, 6.7276787 C 8,7.4325447 7.4325448,8 6.7276787,8 L 3.2723216, 8 C 2.5674556,8 2,7.4325447 2,6.7276787
                L 2, 3.2723213 C 2,2.5674553 2.5674556,2 3.2723216,2 Z">
              </path>
              <ng-template #elseBlock>
                <path style="transform-origin: center center; transform: rotate(-135deg) translate(10%, -10%);" *ngIf="play; else elseBlock" d="M 3.6258562,2.3535346 5.0002355,3.7274432 C 5.4987364,4.2257735 5.7742266,4.5012636 6.2725568,4.9997645
                  L 7.6464652,6.3741439 C 8.1447953,6.8726449 7.4325448,8 6.7276787,8 L 3.2723216, 8 C 2.5674556,8 2,7.4325447 2,6.7276787 L 2,3.2723213
                  C 2,2.5674553 3.1273554,1.8552044 3.6258562,2.3535346 Z">
                </path>
              </ng-template>
      */


      var AppComponent = /*#__PURE__*/function () {
        function AppComponent() {
          _classCallCheck(this, AppComponent);

          this.play = false;
          this.ios = false;
          this.title = 'White Noise';
        }

        _createClass(AppComponent, [{
          key: "ngAfterViewInit",
          value: function ngAfterViewInit() {
            this.ios = /iPad|iPhone|iPod/.test(window.navigator.userAgent);
            this.noise = new _noise__WEBPACK_IMPORTED_MODULE_1__["Noise"]();
          }
        }, {
          key: "perform",
          value: function perform() {
            if (this.play) {
              this.noise.stopNoise(_noise__WEBPACK_IMPORTED_MODULE_1__["Noise"].template);
            } else {
              this.noise.playNoise(_noise__WEBPACK_IMPORTED_MODULE_1__["Noise"].template);
            }

            this.play = !this.play;
          }
        }]);

        return AppComponent;
      }();

      AppComponent.ɵfac = function AppComponent_Factory(t) {
        return new (t || AppComponent)();
      };

      AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: AppComponent,
        selectors: [["app-root"]],
        decls: 5,
        vars: 2,
        consts: [[3, "ngClass", "click"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 10 10"]],
        template: function AppComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_div_click_0_listener() {
              return ctx.perform();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "svg", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "path");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "span");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.play ? "play" : "");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.ios, "");
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgClass"]],
        styles: ["[_nghost-%COMP%]{\r\n    -ms-flex:1;\r\n        flex:1\r\n}\r\n\r\nsvg[_ngcontent-%COMP%]{\r\n    height: 100%;\r\n    -ms-transform: rotate(90deg);\r\n        transform: rotate(90deg);  \r\n}\r\n\r\npath[_ngcontent-%COMP%]{\r\n    -ms-transform: rotate(0deg) translate(0%, 0%);\r\n        transform: rotate(0deg) translate(0%, 0%); \r\n    d:path('M 3.2723216,2 6.7276787,2 C 7.4325448,2 8,2.5674553 8,3.2723213 L 8, 6.7276787 C 8,7.4325447 7.4325448,8 6.7276787,8 L 3.2723216, 8 C 2.5674556,8 2,7.4325447 2,6.7276787 L 2, 3.2723213 C 2,2.5674553 2.5674556,2 3.2723216,2 Z');\r\n    -ms-transform-origin: center center;\r\n        transform-origin: center center;\r\n    transition: 1.5s;\r\n}\r\n\r\n.play[_ngcontent-%COMP%]   path[_ngcontent-%COMP%]{\r\n    -ms-transform: rotate(135deg) translate(10%, -10%);\r\n        transform: rotate(135deg) translate(10%, -10%);\r\n    d:path('M 3.6258562,2.3535346 5.0002355,3.7274432 C 5.4987364,4.2257735 5.7742266,4.5012636 6.2725568,4.9997645 L 7.6464652,6.3741439 C 8.1447953,6.8726449 7.4325448,8 6.7276787,8 L 3.2723216, 8 C 2.5674556,8 2,7.4325447 2,6.7276787 L 2,3.2723213 C 2,2.5674553 3.1273554,1.8552044 3.6258562,2.3535346 Z');\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxVQUFLO1FBQUw7QUFDSjs7QUFFQTtJQUNJLFlBQVk7SUFDWiw0QkFBd0I7UUFBeEIsd0JBQXdCO0FBQzVCOztBQUVBO0lBQ0ksNkNBQXlDO1FBQXpDLHlDQUF5QztJQUN6QywwT0FBME87SUFDMU8sbUNBQStCO1FBQS9CLCtCQUErQjtJQUMvQixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxrREFBOEM7UUFBOUMsOENBQThDO0lBQzlDLGdUQUFnVDtBQUNwVCIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3R7XHJcbiAgICBmbGV4OjFcclxufVxyXG5cclxuc3Zne1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpOyAgXHJcbn1cclxuXHJcbnBhdGh7XHJcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKSB0cmFuc2xhdGUoMCUsIDAlKTsgXHJcbiAgICBkOnBhdGgoJ00gMy4yNzIzMjE2LDIgNi43Mjc2Nzg3LDIgQyA3LjQzMjU0NDgsMiA4LDIuNTY3NDU1MyA4LDMuMjcyMzIxMyBMIDgsIDYuNzI3Njc4NyBDIDgsNy40MzI1NDQ3IDcuNDMyNTQ0OCw4IDYuNzI3Njc4Nyw4IEwgMy4yNzIzMjE2LCA4IEMgMi41Njc0NTU2LDggMiw3LjQzMjU0NDcgMiw2LjcyNzY3ODcgTCAyLCAzLjI3MjMyMTMgQyAyLDIuNTY3NDU1MyAyLjU2NzQ1NTYsMiAzLjI3MjMyMTYsMiBaJyk7XHJcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgY2VudGVyO1xyXG4gICAgdHJhbnNpdGlvbjogMS41cztcclxufVxyXG5cclxuLnBsYXkgcGF0aHtcclxuICAgIHRyYW5zZm9ybTogcm90YXRlKDEzNWRlZykgdHJhbnNsYXRlKDEwJSwgLTEwJSk7XHJcbiAgICBkOnBhdGgoJ00gMy42MjU4NTYyLDIuMzUzNTM0NiA1LjAwMDIzNTUsMy43Mjc0NDMyIEMgNS40OTg3MzY0LDQuMjI1NzczNSA1Ljc3NDIyNjYsNC41MDEyNjM2IDYuMjcyNTU2OCw0Ljk5OTc2NDUgTCA3LjY0NjQ2NTIsNi4zNzQxNDM5IEMgOC4xNDQ3OTUzLDYuODcyNjQ0OSA3LjQzMjU0NDgsOCA2LjcyNzY3ODcsOCBMIDMuMjcyMzIxNiwgOCBDIDIuNTY3NDU1Niw4IDIsNy40MzI1NDQ3IDIsNi43Mjc2Nzg3IEwgMiwzLjI3MjMyMTMgQyAyLDIuNTY3NDU1MyAzLjEyNzM1NTQsMS44NTUyMDQ0IDMuNjI1ODU2MiwyLjM1MzUzNDYgWicpO1xyXG59XHJcbiJdfQ== */"]
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
          args: [{
            selector: 'app-root',
            template: "\n    <div [ngClass]=\"play ? 'play' : ''\" (click)=\"perform()\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 10 10\">\n        <path></path>\n    </svg>\n\n    <span> {{ ios }}</span>\n    </div>\n  ",
            styleUrls: ['app.component.css']
          }]
        }], null, null);
      })();
      /***/

    },

    /***/
    "ZAI4":
    /*!*******************************!*\
      !*** ./src/app/app.module.ts ***!
      \*******************************/

    /*! exports provided: AppModule */

    /***/
    function ZAI4(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppModule", function () {
        return AppModule;
      });
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/platform-browser */
      "jhN1");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./app.component */
      "Sy1n");
      /* harmony import */


      var _angular_service_worker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/service-worker */
      "Jho9");
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../environments/environment */
      "AytR");

      var AppModule = function AppModule() {
        _classCallCheck(this, AppModule);
      };

      AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
        type: AppModule,
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
      });
      AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
        factory: function AppModule_Factory(t) {
          return new (t || AppModule)();
        },
        providers: [],
        imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _angular_service_worker__WEBPACK_IMPORTED_MODULE_3__["ServiceWorkerModule"].register('ngsw-worker.js', {
          enabled: _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production
        })]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, {
          declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]],
          imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _angular_service_worker__WEBPACK_IMPORTED_MODULE_3__["ServiceWorkerModule"]]
        });
      })();
      /*@__PURE__*/


      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
          args: [{
            declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]],
            imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _angular_service_worker__WEBPACK_IMPORTED_MODULE_3__["ServiceWorkerModule"].register('ngsw-worker.js', {
              enabled: _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production
            })],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
          }]
        }], null, null);
      })();
      /***/

    },

    /***/
    "zUnb":
    /*!*********************!*\
      !*** ./src/main.ts ***!
      \*********************/

    /*! no exports provided */

    /***/
    function zUnb(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./environments/environment */
      "AytR");
      /* harmony import */


      var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./app/app.module */
      "ZAI4");
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/platform-browser */
      "jhN1");

      if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
      }

      _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])["catch"](function (err) {
        return console.error(err);
      });
      /***/

    },

    /***/
    "zn8P":
    /*!******************************************************!*\
      !*** ./$$_lazy_route_resource lazy namespace object ***!
      \******************************************************/

    /*! no static exports found */

    /***/
    function zn8P(module, exports) {
      function webpackEmptyAsyncContext(req) {
        // Here Promise.resolve().then() is used instead of new Promise() to prevent
        // uncaught exception popping up in devtools
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + req + "'");
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        });
      }

      webpackEmptyAsyncContext.keys = function () {
        return [];
      };

      webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
      module.exports = webpackEmptyAsyncContext;
      webpackEmptyAsyncContext.id = "zn8P";
      /***/
    }
  }, [[0, "runtime", "vendor"]]]);
})();
//# sourceMappingURL=main-es5.js.map