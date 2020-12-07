(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Victor\Documents\aaronright.github.io\whiteNoise\src\main.ts */"zUnb");


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




function AppComponent__svg_ng_container_2__svg_path_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "path", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "animate", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "animateTransform", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "animateTransform", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function AppComponent__svg_ng_container_2__svg_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "g", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "path", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "animate", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "animateTransform", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "animateTransform", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function AppComponent__svg_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, AppComponent__svg_ng_container_2__svg_path_1_Template, 4, 0, "path", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, AppComponent__svg_ng_container_2__svg_ng_template_2_Template, 5, 0, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.play)("ngIfElse", _r4);
} }
function AppComponent__svg_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "path", 15);
} }
class AppComponent {
    constructor() {
        this.play = false;
        this.doubleClick = false;
        this.ios = false;
        this.title = 'White Noise';
    }
    ngAfterViewInit() {
        this.ios = /iPad|iPhone|iPod/.test(window.navigator.userAgent);
        this.noise = new _noise__WEBPACK_IMPORTED_MODULE_1__["Noise"]();
    }
    perform() {
        if (!this.doubleClick) {
            this.doubleClick = true;
            if (this.play) {
                this.noise.stopNoise(_noise__WEBPACK_IMPORTED_MODULE_1__["Noise"].template);
            }
            else {
                this.noise.playNoise(_noise__WEBPACK_IMPORTED_MODULE_1__["Noise"].template);
            }
            if (this.ios) {
                let animation = document.getElementById("animation");
                // @ts-ignore
                animation.beginElement();
            }
            setTimeout(() => { this.play = !this.play; this.doubleClick = false; }, 1000);
        }
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 5, vars: 3, consts: [[3, "ngClass", "click"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 10 10"], [4, "ngIf", "ngIfElse"], ["elseBlock", ""], ["class", "ios", "d", "M 3.2723216,2 6.7276787,2 C 7.4325448,2 8,2.5674553 8,3.2723213 \n            L 8, 6.7276787 C 8,7.4325447 7.4325448,8 6.7276787,8 L 3.2723216, 8 C 2.5674556,8 2,7.4325447 2,6.7276787 \n            L 2, 3.2723213 C 2,2.5674553 2.5674556,2 3.2723216,2 Z", 4, "ngIf", "ngIfElse"], ["elseIosBlock", ""], ["d", "M 3.2723216,2 6.7276787,2 C 7.4325448,2 8,2.5674553 8,3.2723213 \n            L 8, 6.7276787 C 8,7.4325447 7.4325448,8 6.7276787,8 L 3.2723216, 8 C 2.5674556,8 2,7.4325447 2,6.7276787 \n            L 2, 3.2723213 C 2,2.5674553 2.5674556,2 3.2723216,2 Z", 1, "ios"], ["id", "animation", "begin", "indefined", "fill", "freeze", "attributeName", "d", "dur", "1s", "values", "\n            M 3.2723216,2 6.7276787,2 C 7.4325448,2 8,2.5674553 8,3.2723213 \n            L 8, 6.7276787 C 8,7.4325447 7.4325448,8 6.7276787,8 L 3.2723216, 8 C 2.5674556,8 2,7.4325447 2,6.7276787 \n            L 2, 3.2723213 C 2,2.5674553 2.5674556,2 3.2723216,2 Z;\n\n            M 3.6258562,2.3535346 5.0002355,3.7274432 C 5.4987364,4.2257735 5.7742266,4.5012636 6.2725568,4.9997645 \n            L 7.6464652,6.3741439 C 8.1447953,6.8726449 7.4325448,8 6.7276787,8 L 3.2723216, 8 C 2.5674556,8 2,7.4325447 2,6.7276787 L 2,3.2723213 \n            C 2,2.5674553 3.1273554,1.8552044 3.6258562,2.3535346 Z\n            "], ["attributeName", "transform", "fill", "freeze", "begin", "animation.begin", "dur", "1s", "type", "rotate", "from", "90 5 5", "to", "225 5 5", "repeatCount", "1"], ["attributeName", "transform", "fill", "freeze", "begin", "animation.begin", "dur", "1s", "type", "translate", "values", "0,0; 1,-1", "repeatCount", "1", "additive", "sum"], [1, "ios", "rotate"], ["d", "M 3.6258562,2.3535346 5.0002355,3.7274432 C 5.4987364,4.2257735 5.7742266,4.5012636 6.2725568,4.9997645 \n                    L 7.6464652,6.3741439 C 8.1447953,6.8726449 7.4325448,8 6.7276787,8 L 3.2723216, 8 C 2.5674556,8 2,7.4325447 2,6.7276787 L 2,3.2723213 \n                    C 2,2.5674553 3.1273554,1.8552044 3.6258562,2.3535346 Z"], ["id", "animation", "begin", "indefined", "fill", "freeze", "attributeName", "d", "dur", "1s", "values", "\n                        M 3.6258562,2.3535346 5.0002355,3.7274432 C 5.4987364,4.2257735 5.7742266,4.5012636 6.2725568,4.9997645 \n                            L 7.6464652,6.3741439 C 8.1447953,6.8726449 7.4325448,8 6.7276787,8 L 3.2723216, 8 C 2.5674556,8 2,7.4325447 2,6.7276787 L 2,3.2723213 \n                            C 2,2.5674553 3.1273554,1.8552044 3.6258562,2.3535346 Z;\n            \n                            M 3.2723216,2 6.7276787,2 C 7.4325448,2 8,2.5674553 8,3.2723213 \n                            L 8, 6.7276787 C 8,7.4325447 7.4325448,8 6.7276787,8 L 3.2723216, 8 C 2.5674556,8 2,7.4325447 2,6.7276787 \n                            L 2, 3.2723213 C 2,2.5674553 2.5674556,2 3.2723216,2 Z\n                        "], ["attributeName", "transform", "fill", "freeze", "begin", "animation.begin", "dur", "1s", "type", "rotate", "from", "0 5 5", "to", "-135 5 5", "repeatCount", "1"], ["attributeName", "transform", "fill", "freeze", "begin", "animation.begin", "dur", "1s", "type", "translate", "values", "0,0; 0,-1.4", "repeatCount", "1", "additive", "sum"], [1, "common"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_div_click_0_listener() { return ctx.perform(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "svg", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, AppComponent__svg_ng_container_2_Template, 4, 2, "ng-container", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, AppComponent__svg_ng_template_3_Template, 1, 0, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.play ? "play" : "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.ios)("ngIfElse", _r1);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgClass"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"]], styles: ["[_nghost-%COMP%]{\r\n    -ms-flex:1;\r\n        flex:1\r\n}\r\n\r\nsvg[_ngcontent-%COMP%]{\r\n    height: 100%;\r\n}\r\n\r\n.play[_ngcontent-%COMP%]   .common[_ngcontent-%COMP%]{\r\n    -ms-transform: rotate(90deg) translate(0%, 0%);\r\n        transform: rotate(90deg) translate(0%, 0%); \r\n    d:path('M 3.2723216,2 6.7276787,2 C 7.4325448,2 8,2.5674553 8,3.2723213 L 8, 6.7276787 C 8,7.4325447 7.4325448,8 6.7276787,8 L 3.2723216, 8 C 2.5674556,8 2,7.4325447 2,6.7276787 L 2, 3.2723213 C 2,2.5674553 2.5674556,2 3.2723216,2 Z');\r\n}\r\n\r\n.rotate[_ngcontent-%COMP%]{\r\n    -ms-transform: rotate(225deg) translate(10%, -10%);\r\n        transform: rotate(225deg) translate(10%, -10%);\r\n    -ms-transform-origin: center center;\r\n        transform-origin: center center;\r\n}\r\n\r\n.common[_ngcontent-%COMP%]{\r\n    -ms-transform: rotate(225deg) translate(10%, -10%);\r\n        transform: rotate(225deg) translate(10%, -10%);\r\n    d:path('M 3.6258562,2.3535346 5.0002355,3.7274432 C 5.4987364,4.2257735 5.7742266,4.5012636 6.2725568,4.9997645 L 7.6464652,6.3741439 C 8.1447953,6.8726449 7.4325448,8 6.7276787,8 L 3.2723216, 8 C 2.5674556,8 2,7.4325447 2,6.7276787 L 2,3.2723213 C 2,2.5674553 3.1273554,1.8552044 3.6258562,2.3535346 Z');\r\n    transition: 1s;\r\n    -ms-transform-origin: center center;\r\n        transform-origin: center center;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxVQUFLO1FBQUw7QUFDSjs7QUFFQTtJQUNJLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSw4Q0FBMEM7UUFBMUMsMENBQTBDO0lBQzFDLDBPQUEwTztBQUM5Tzs7QUFFQTtJQUNJLGtEQUE4QztRQUE5Qyw4Q0FBOEM7SUFDOUMsbUNBQStCO1FBQS9CLCtCQUErQjtBQUNuQzs7QUFFQTtJQUNJLGtEQUE4QztRQUE5Qyw4Q0FBOEM7SUFDOUMsZ1RBQWdUO0lBQ2hULGNBQWM7SUFDZCxtQ0FBK0I7UUFBL0IsK0JBQStCO0FBQ25DIiwiZmlsZSI6InNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdHtcclxuICAgIGZsZXg6MVxyXG59XHJcblxyXG5zdmd7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbn1cclxuXHJcbi5wbGF5IC5jb21tb257XHJcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZykgdHJhbnNsYXRlKDAlLCAwJSk7IFxyXG4gICAgZDpwYXRoKCdNIDMuMjcyMzIxNiwyIDYuNzI3Njc4NywyIEMgNy40MzI1NDQ4LDIgOCwyLjU2NzQ1NTMgOCwzLjI3MjMyMTMgTCA4LCA2LjcyNzY3ODcgQyA4LDcuNDMyNTQ0NyA3LjQzMjU0NDgsOCA2LjcyNzY3ODcsOCBMIDMuMjcyMzIxNiwgOCBDIDIuNTY3NDU1Niw4IDIsNy40MzI1NDQ3IDIsNi43Mjc2Nzg3IEwgMiwgMy4yNzIzMjEzIEMgMiwyLjU2NzQ1NTMgMi41Njc0NTU2LDIgMy4yNzIzMjE2LDIgWicpO1xyXG59XHJcblxyXG4ucm90YXRle1xyXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMjI1ZGVnKSB0cmFuc2xhdGUoMTAlLCAtMTAlKTtcclxuICAgIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBjZW50ZXI7XHJcbn1cclxuXHJcbi5jb21tb257XHJcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgyMjVkZWcpIHRyYW5zbGF0ZSgxMCUsIC0xMCUpO1xyXG4gICAgZDpwYXRoKCdNIDMuNjI1ODU2MiwyLjM1MzUzNDYgNS4wMDAyMzU1LDMuNzI3NDQzMiBDIDUuNDk4NzM2NCw0LjIyNTc3MzUgNS43NzQyMjY2LDQuNTAxMjYzNiA2LjI3MjU1NjgsNC45OTk3NjQ1IEwgNy42NDY0NjUyLDYuMzc0MTQzOSBDIDguMTQ0Nzk1Myw2Ljg3MjY0NDkgNy40MzI1NDQ4LDggNi43Mjc2Nzg3LDggTCAzLjI3MjMyMTYsIDggQyAyLjU2NzQ1NTYsOCAyLDcuNDMyNTQ0NyAyLDYuNzI3Njc4NyBMIDIsMy4yNzIzMjEzIEMgMiwyLjU2NzQ1NTMgMy4xMjczNTU0LDEuODU1MjA0NCAzLjYyNTg1NjIsMi4zNTM1MzQ2IFonKTtcclxuICAgIHRyYW5zaXRpb246IDFzO1xyXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGNlbnRlcjtcclxufVxyXG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: 'app.component.html',
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