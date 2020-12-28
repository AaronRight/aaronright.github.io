(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Victor\Documents\aaronright.github.io\whiteNoise\src\main.ts */"zUnb");


/***/ }),

/***/ "8GPs":
/*!**************************!*\
  !*** ./src/app/angle.ts ***!
  \**************************/
/*! exports provided: Angle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Angle", function() { return Angle; });
class Angle {
    constructor() {
        this.value = 0;
        this.target = 0;
        this.direction = true;
    }
}


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
        this.audioContext = new (window.AudioContext ? window.AudioContext : window.webkitAudioContext)();
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
            try {
                track.audioSource.stop();
            }
            catch (err) { }
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
        this.stopNoise(track);
        this.buildTrack(track);
        this.createNoise(track);
        this.setGain(track);
        track.audioSource.loop = true;
        track.audioSource.start();
    }
    unlock(element) {
        // https://stackoverflow.com/questions/21122418/ios-webaudio-only-works-on-headphones
        /*
           The mute toggle switch does mute WebAudio, but it does not mute HTML5 tags.
           In order to play WebAudio you must also play at least one WebAudio sound source node and one HTML5 tag during a user action.
           It is fine if these sounds are short bits of silence
        */
        var buffer = this.audioContext.createBuffer(1, 1, 22050); // 1/10th of a second of silence
        var source = this.audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(this.audioContext.destination);
        source.start();
        var silenceDataURL = "data:audio/mp3;base64,//MkxAAHiAICWABElBeKPL/RANb2w+yiT1g/gTok//lP/W/l3h8QO/OCdCqCW2Cw//MkxAQHkAIWUAhEmAQXWUO" +
            "FW2dxPu//9mr60ElY5sseQ+xxesmHKtZr7bsqqX2L//MkxAgFwAYiQAhEAC2hq22d3///9FTV6tA36JdgBJoOGgc+7qvqej5Zu7/7uI9l//MkxBQHAAYi8AhEAO193vt9K" +
            "GOq+6qcT7hhfN5FTInmwk8RkqKImTM55pRQHQSq//MkxBsGkgoIAABHhTACIJLf99nVI///yuW1uBqWfEu7CgNPWGpUadBmZ////4sL//MkxCMHMAH9iABEmAsKioqKigs" +
            "LCwtVTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVV//MkxCkECAUYCAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";
        element.loop = false;
        element.src = silenceDataURL;
        element.play();
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
/* harmony import */ var _angle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./angle */ "8GPs");
/* harmony import */ var _noise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./noise */ "NIcn");




const _c0 = ["canvas"];
const _c1 = ["audio"];
/*
  var canvas1 = document.getElementById("canvas");
  var template = document.getElementById("template").getAttribute("d").split(/[\s,]+/);

  let M = x => y => ctx.moveTo(x, y);
  let L = x => y => ctx.lineTo(x, y);
  let C = x1 => y1 => cx => cy => x2 => y2 => ctx.bezierCurveTo(x1, y1, cx, cy, x2, y2);

  var ctx = canvas1.getContext("2d");
  ctx.clearRect(0, 0, canvas1.width, canvas1.height);

  ctx.beginPath();

  for (let i = 0, f = undefined; i < template.length; i++) {
    if (f === undefined) switch (template[i]) {
      case "M": { f = M; break; }
      case "L": { f = L; break; }
      case "C": { f = C; break; }
      default: break;
    }
    else { f = f(template[i]) }
  }
  ctx.fill();
*/
class AppComponent {
    constructor() {
        this.play = false;
        this.unlockIOSAudio = true;
        this.rotation = 15;
        this.doubleClick = false;
        this.square = "M 410.03327687898815,834.2973455909166  165.70263319587986,589.9667019078083" +
            " C 115.86107328202843,540.1251419939568  115.86108035309621,459.87485093497526  165.7026331958799,410.03329809219156 " +
            " L 410.03329809219167,165.70263319587986 " +
            " C 459.87485093497537,115.86108035309621  540.125141993957,115.86107328202843  589.9667019078083,165.70263319587986 " +
            " L 834.2973455909166,410.0332768789882 " +
            " C 884.1388984337004,459.8748297217719  884.1389196469038,540.1251490650247  834.2973668041202,589.9667019078083 " +
            " L 589.9667019078083,834.2973668041201 " +
            " C 540.1251490650246,884.1389196469038  459.8748297217719,884.1388984337004  410.03327687898815,834.2973455909166 Z";
        this.triangle = "M 268.6119206416787,784.3000029821019  268.5786371254883,589.9667019078083 " +
            " C 268.5665738838012,519.4800917859759  268.5665668127334,480.5199011429562  268.5786371254882,410.03329809219167 " +
            " L 268.61194185488216,215.70000408896578 " +
            " C 268.62402630977266,145.21340103820125  398.70378575664745,115.86107328202843  448.5453456704989,165.70263319587986 " +
            " L 692.8759893536072,410.0332768789882 " +
            " C 742.7175421963909,459.8748297217719  742.7175634095943,540.1251490650247  692.8760105668107,589.9667019078083 " +
            " L 448.5453456704988,834.2973668041202 " +
            " C 398.7037928277151,884.1389196469038  268.62398388336567,854.7865989617987  268.6119206416787,784.3000029821019 Z";
        this.title = 'White Noise';
    }
    isDarkMode() {
        return (window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    rotate(angle_radians, x, y, x_pivot, y_pivot) {
        let s = Math.sin(angle_radians * Math.PI / 180);
        let c = Math.cos(angle_radians * Math.PI / 180);
        x -= x_pivot;
        y -= y_pivot;
        let x_new = x * c - y * s;
        let y_new = x * s + y * c;
        return { x: x_new + x_pivot, y: y_new + x_pivot };
    }
    calculateSvg() {
        let template1 = this.triangle.split(/[\s,]+/);
        let template2 = this.square.split(/[\s,]+/);
        let n = 135;
        let diff = new Array(template1.length + 1);
        let result = new Array(n + 1);
        for (let j = 0; j < template1.length; j++) {
            if (template1[j] !== template2[j])
                diff[j] = (Number(template2[j]) - Number(template1[j])) / n;
        }
        for (let i = 0; i < result.length; i++) {
            result[i] = new Array(diff.length);
            for (let j = 0; j < diff.length; j++) {
                result[i][j] = diff[j] ? (Number(template1[j]) + diff[j] * i) : template1[j];
            }
        }
        return result;
    }
    ngAfterViewInit() {
        const theme = this.isDarkMode() ? { color: "#777 " } : { color: "#000" };
        this.context = this.canvas.nativeElement.getContext("2d");
        this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
        this.context.fillStyle = theme.color;
        this.context.fill(new Path2D(this.triangle));
        this.angle = new _angle__WEBPACK_IMPORTED_MODULE_1__["Angle"]();
        this.variants = this.calculateSvg();
        this.noise = new _noise__WEBPACK_IMPORTED_MODULE_2__["Noise"]();
        this.rotateIcon = this.rotateIcon.bind(this);
    }
    perform() {
        if (!this.doubleClick) {
            // prevent doubleclicks
            setTimeout(() => { this.play = !this.play; this.doubleClick = false; }, 400);
            if (this.unlockIOSAudio) {
                this.noise.unlock(this.audio.nativeElement);
                this.unlockIOSAudio = false;
            }
            // sound
            this.doubleClick = true;
            if (this.play) {
                this.noise.stopNoise(_noise__WEBPACK_IMPORTED_MODULE_2__["Noise"].template);
            }
            else {
                this.noise.playNoise(_noise__WEBPACK_IMPORTED_MODULE_2__["Noise"].template);
            }
            // animation
            if (this.angle.target == this.angle.value) {
                this.angle.direction = !this.angle.direction;
                this.angle.target = 135;
                this.angle.value = 0;
                this.rotateIcon();
            }
            else {
                this.angle.direction = !this.angle.direction;
                this.angle.target = 135 + (this.angle.value - 135);
                this.angle.value = 0;
            }
        }
    }
    rotateIcon() {
        this.angle.value += this.rotation;
        this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
        this.context.translate(this.canvas.nativeElement.width / 2, this.canvas.nativeElement.height / 2);
        this.context.rotate((this.angle.direction ? 1 : -1) * (this.rotation * Math.PI) / 180);
        this.context.translate(-this.canvas.nativeElement.width / 2, -this.canvas.nativeElement.height / 2);
        this.context.fill(new Path2D(this.variants[this.angle.direction ? 135 - this.angle.value : this.angle.value].join(" ")));
        if (this.angle.target > this.angle.value) {
            requestAnimationFrame(this.rotateIcon);
        }
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], viewQuery: function AppComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c1, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.canvas = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.audio = _t.first);
    } }, decls: 4, vars: 0, consts: [["width", "1000", "height", "1000", 3, "click"], ["canvas", ""], ["audio", ""]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "canvas", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_canvas_click_0_listener() { return ctx.perform(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "audio", null, 2);
    } }, styles: ["[_nghost-%COMP%]{ flex:1 }"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                template: `<canvas #canvas width="1000" height="1000" (click)="perform()"></canvas>
  <audio #audio></audio>`,
                styles: [
                    `:host{ flex:1 }`,
                ]
            }]
    }], null, { canvas: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ["canvas"]
        }], audio: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ["audio"]
        }] }); })();


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
/* harmony import */ var _angular_service_worker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/service-worker */ "Jho9");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../environments/environment */ "AytR");







class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _angular_service_worker__WEBPACK_IMPORTED_MODULE_3__["ServiceWorkerModule"].register('ngsw-worker.js', { enabled: _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production })
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _angular_service_worker__WEBPACK_IMPORTED_MODULE_3__["ServiceWorkerModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _angular_service_worker__WEBPACK_IMPORTED_MODULE_3__["ServiceWorkerModule"].register('ngsw-worker.js', { enabled: _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production })
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