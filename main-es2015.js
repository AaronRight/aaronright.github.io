(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Victor\Documents\aaronright.github.io\white-noise\src\main.ts */"zUnb");


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
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


/***/ }),

/***/ "NIcn":
/*!**************************!*\
  !*** ./src/app/noise.ts ***!
  \**************************/
/*! exports provided: Noise */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Noise", function() { return Noise; });
class Noise {
    constructor() {
        // @ts-ignore
        this.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext();
    }
    // https://noisehack.com/generate-noise-web-audio-api/
    createNoise(track) {
        const bufferSize = 2 * this.audioContext.sampleRate;
        const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        track.audioSource.buffer = noiseBuffer;
    }
    stopNoise(track) {
        if (track.audioSource) {
            clearTimeout(this.fadeOutTimer);
            track.audioSource.stop();
        }
    }
    fadeNoise(track) {
        if (track.fadeOut) {
            track.fadeOut = (track.fadeOut >= 0) ? track.fadeOut : 0.5;
        }
        else {
            track.fadeOut = 0.5;
        }
        if (track.canFade) {
            track.gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + track.fadeOut);
            track.canFade = false;
            this.fadeOutTimer = setTimeout(() => {
                this.stopNoise(track);
            }, track.fadeOut * 1000);
        }
        else {
            this.stopNoise(track);
        }
    }
    buildTrack(track) {
        track.audioSource = this.audioContext.createBufferSource();
        track.gainNode = this.audioContext.createGain();
        track.audioSource.connect(track.gainNode);
        track.gainNode.connect(this.audioContext.destination);
        track.canFade = true; // used to prevent fadeOut firing twice
    }
    setGain(track) {
        track.volume = (track.volume >= 0) ? track.volume : 0.5;
        if (track.fadeIn) {
            track.fadeIn = (track.fadeIn >= 0) ? track.fadeIn : 0.5;
        }
        else {
            track.fadeIn = 0.5;
        }
        track.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        track.gainNode.gain.linearRampToValueAtTime(track.volume / 4, this.audioContext.currentTime + track.fadeIn / 2);
        track.gainNode.gain.linearRampToValueAtTime(track.volume, this.audioContext.currentTime + track.fadeIn);
    }
    playNoise(track) {
        console.log(this.audioContext);
        this.stopNoise(track);
        this.buildTrack(track);
        this.createNoise(track);
        this.setGain(track);
        track.audioSource.loop = true;
        track.audioSource.start();
    }
}
Noise.template = {
    volume: 0.05,
    fadeIn: 2.5,
    fadeOut: 1.3,
};


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _noise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./noise */ "NIcn");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");




class AppComponent {
    constructor() {
        this.play = false;
        this.title = 'White Noise';
    }
    ngAfterViewInit() {
        this.noise = new _noise__WEBPACK_IMPORTED_MODULE_1__["Noise"]();
    }
    perform() {
        if (this.play) {
            this.noise.stopNoise(_noise__WEBPACK_IMPORTED_MODULE_1__["Noise"].template);
        }
        else {
            this.noise.playNoise(_noise__WEBPACK_IMPORTED_MODULE_1__["Noise"].template);
        }
        this.play = !this.play;
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 3, vars: 1, consts: [[3, "ngClass", "click"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 10 10"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_div_click_0_listener() { return ctx.perform(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "svg", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "path");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.play ? "play" : "");
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgClass"]], styles: ["[_nghost-%COMP%]{\r\n    -ms-flex:1;\r\n        flex:1\r\n}\r\n\r\nsvg[_ngcontent-%COMP%]{\r\n    -ms-transform: rotate(90deg);\r\n        transform: rotate(90deg);  \r\n}\r\n\r\npath[_ngcontent-%COMP%]{\r\n    -ms-transform: rotate(0deg) translate(0%, 0%);\r\n        transform: rotate(0deg) translate(0%, 0%); \r\n    d:path('M 3.2723216,2 6.7276787,2 C 7.4325448,2 8,2.5674553 8,3.2723213 L 8, 6.7276787 C 8,7.4325447 7.4325448,8 6.7276787,8 L 3.2723216, 8 C 2.5674556,8 2,7.4325447 2,6.7276787 L 2, 3.2723213 C 2,2.5674553 2.5674556,2 3.2723216,2 Z');\r\n    -ms-transform-origin: center center;\r\n        transform-origin: center center;\r\n    transition: 1.5s;\r\n}\r\n\r\n.play[_ngcontent-%COMP%]   path[_ngcontent-%COMP%]{\r\n    -ms-transform: rotate(135deg) translate(10%, -10%);\r\n        transform: rotate(135deg) translate(10%, -10%);\r\n    d:path('M 3.6258562,2.3535346 5.0002355,3.7274432 C 5.4987364,4.2257735 5.7742266,4.5012636 6.2725568,4.9997645 L 7.6464652,6.3741439 C 8.1447953,6.8726449 7.4325448,8 6.7276787,8 L 3.2723216, 8 C 2.5674556,8 2,7.4325447 2,6.7276787 L 2,3.2723213 C 2,2.5674553 3.1273554,1.8552044 3.6258562,2.3535346 Z');\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxVQUFLO1FBQUw7QUFDSjs7QUFFQTtJQUNJLDRCQUF3QjtRQUF4Qix3QkFBd0I7QUFDNUI7O0FBRUE7SUFDSSw2Q0FBeUM7UUFBekMseUNBQXlDO0lBQ3pDLDBPQUEwTztJQUMxTyxtQ0FBK0I7UUFBL0IsK0JBQStCO0lBQy9CLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLGtEQUE4QztRQUE5Qyw4Q0FBOEM7SUFDOUMsZ1RBQWdUO0FBQ3BUIiwiZmlsZSI6InNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdHtcclxuICAgIGZsZXg6MVxyXG59XHJcblxyXG5zdmd7XHJcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7ICBcclxufVxyXG5cclxucGF0aHtcclxuICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpIHRyYW5zbGF0ZSgwJSwgMCUpOyBcclxuICAgIGQ6cGF0aCgnTSAzLjI3MjMyMTYsMiA2LjcyNzY3ODcsMiBDIDcuNDMyNTQ0OCwyIDgsMi41Njc0NTUzIDgsMy4yNzIzMjEzIEwgOCwgNi43Mjc2Nzg3IEMgOCw3LjQzMjU0NDcgNy40MzI1NDQ4LDggNi43Mjc2Nzg3LDggTCAzLjI3MjMyMTYsIDggQyAyLjU2NzQ1NTYsOCAyLDcuNDMyNTQ0NyAyLDYuNzI3Njc4NyBMIDIsIDMuMjcyMzIxMyBDIDIsMi41Njc0NTUzIDIuNTY3NDU1NiwyIDMuMjcyMzIxNiwyIFonKTtcclxuICAgIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBjZW50ZXI7XHJcbiAgICB0cmFuc2l0aW9uOiAxLjVzO1xyXG59XHJcblxyXG4ucGxheSBwYXRoe1xyXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMTM1ZGVnKSB0cmFuc2xhdGUoMTAlLCAtMTAlKTtcclxuICAgIGQ6cGF0aCgnTSAzLjYyNTg1NjIsMi4zNTM1MzQ2IDUuMDAwMjM1NSwzLjcyNzQ0MzIgQyA1LjQ5ODczNjQsNC4yMjU3NzM1IDUuNzc0MjI2Niw0LjUwMTI2MzYgNi4yNzI1NTY4LDQuOTk5NzY0NSBMIDcuNjQ2NDY1Miw2LjM3NDE0MzkgQyA4LjE0NDc5NTMsNi44NzI2NDQ5IDcuNDMyNTQ0OCw4IDYuNzI3Njc4Nyw4IEwgMy4yNzIzMjE2LCA4IEMgMi41Njc0NTU2LDggMiw3LjQzMjU0NDcgMiw2LjcyNzY3ODcgTCAyLDMuMjcyMzIxMyBDIDIsMi41Njc0NTUzIDMuMTI3MzU1NCwxLjg1NTIwNDQgMy42MjU4NTYyLDIuMzUzNTM0NiBaJyk7XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                template: `
    <div [ngClass]="play ? 'play' : ''" (click)="perform()">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
        <path></path>
    </svg>
    </div>
  `,
                styleUrls: ['app.component.css']
            }]
    }], null, null); })();


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "Sy1n");




class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"]
                ],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map