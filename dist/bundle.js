/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\n/**\n * Human demo for browsers\n * @default Human Library\n * @summary <https://github.com/vladmandic/human>\n * @author <https://github.com/vladmandic>\n * @copyright <https://github.com/vladmandic>\n * @license MIT\n */\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst H = __importStar(__webpack_require__(/*! @vladmandic/human */ \"@vladmandic/human\")); // equivalent of @vladmandic/Human\nconst width = 1920; // used by webcam config as well as human maximum resultion // can be anything, but resolutions higher than 4k will disable internal optimizations\nconst humanConfig = {\n    // backend: 'webgpu',\n    modelBasePath: '../../models',\n    filter: { enabled: true, equalization: false, flip: false },\n    face: { enabled: true, detector: { rotation: true }, mesh: { enabled: true }, attention: { enabled: false }, iris: { enabled: true }, description: { enabled: true }, emotion: { enabled: true }, antispoof: { enabled: true }, liveness: { enabled: true } },\n    body: { enabled: true },\n    // hand: { enabled: true },\n    hand: { enabled: false },\n    object: { enabled: false },\n    segmentation: { enabled: false },\n    gesture: { enabled: true },\n};\nconst human = new H.Human(humanConfig); // create instance of human with overrides from user configuration\nhuman.env.perfadd = false; // is performance data showing instant or total values\nhuman.draw.options.font = 'small-caps 18px \"Lato\"'; // set font used to draw labels when using draw methods\nhuman.draw.options.lineHeight = 20;\n// human.draw.options.fillPolygons = true;\nconst dom = {\n    video: document.getElementById('video'),\n    canvas: document.getElementById('canvas'),\n    log: document.getElementById('log'),\n    fps: document.getElementById('status'),\n    perf: document.getElementById('performance'),\n};\nconst timestamp = { detect: 0, draw: 0, tensors: 0, start: 0 }; // holds information used to calculate performance and possible memory leaks\nconst fps = { detectFPS: 0, drawFPS: 0, frames: 0, averageMs: 0 }; // holds calculated fps information for both detect and screen refresh\nconst log = (...msg) => {\n    dom.log.innerText += msg.join(' ') + '\\n';\n    console.log(...msg); // eslint-disable-line no-console\n};\nconst status = (msg) => dom.fps.innerText = msg; // print status element\nconst perf = (msg) => dom.perf.innerText = 'tensors:' + human.tf.memory().numTensors.toString() + ' | performance: ' + JSON.stringify(msg).replace(/\"|{|}/g, '').replace(/,/g, ' | '); // print performance element\nfunction detectionLoop() {\n    return __awaiter(this, void 0, void 0, function* () {\n        if (!dom.video.paused) {\n            if (timestamp.start === 0)\n                timestamp.start = human.now();\n            // log('profiling data:', await human.profile(dom.video));\n            yield human.detect(dom.video); // actual detection; were not capturing output in a local variable as it can also be reached via human.result\n            const tensors = human.tf.memory().numTensors; // check current tensor usage for memory leaks\n            if (tensors - timestamp.tensors !== 0)\n                log('allocated tensors:', tensors - timestamp.tensors); // printed on start and each time there is a tensor leak\n            timestamp.tensors = tensors;\n            fps.detectFPS = Math.round(1000 * 1000 / (human.now() - timestamp.detect)) / 1000;\n            fps.frames++;\n            fps.averageMs = Math.round(1000 * (human.now() - timestamp.start) / fps.frames) / 1000;\n            if (fps.frames % 100 === 0 && !dom.video.paused)\n                log('performance', Object.assign(Object.assign({}, fps), { tensors: timestamp.tensors }));\n        }\n        timestamp.detect = human.now();\n        requestAnimationFrame(detectionLoop); // start new frame immediately\n    });\n}\nfunction drawLoop() {\n    var _a, _b, _c;\n    return __awaiter(this, void 0, void 0, function* () {\n        if (!dom.video.paused) {\n            const interpolated = human.next(human.result); // smoothen result using last-known results\n            const processed = yield human.image(dom.video); // get current video frame, but enhanced with human.filters\n            human.draw.canvas(processed.canvas, dom.canvas);\n            const opt = { bodyLabels: `person confidence [score] and ${(_c = (_b = (_a = human.result) === null || _a === void 0 ? void 0 : _a.body) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.keypoints.length} keypoints` };\n            yield human.draw.all(dom.canvas, interpolated, opt); // draw labels, boxes, lines, etc.\n            perf(interpolated.performance); // write performance data\n        }\n        const now = human.now();\n        fps.drawFPS = Math.round(1000 * 1000 / (now - timestamp.draw)) / 1000;\n        timestamp.draw = now;\n        status(dom.video.paused ? 'paused' : `fps: ${fps.detectFPS.toFixed(1).padStart(5, ' ')} detect | ${fps.drawFPS.toFixed(1).padStart(5, ' ')} draw`); // write status\n        setTimeout(drawLoop, 30); // use to slow down refresh from max refresh rate to target of 30 fps\n    });\n}\nfunction webCam() {\n    return __awaiter(this, void 0, void 0, function* () {\n        const devices = yield human.webcam.enumerate();\n        const id = devices[0].deviceId; // use first available video source\n        yield human.webcam.start({ element: dom.video, crop: false, width, id }); // use human webcam helper methods and associate webcam stream with a dom element\n        dom.canvas.width = human.webcam.width;\n        dom.canvas.height = human.webcam.height;\n        dom.canvas.onclick = () => __awaiter(this, void 0, void 0, function* () {\n            if (human.webcam.paused)\n                yield human.webcam.play();\n            else\n                human.webcam.pause();\n        });\n    });\n}\nfunction main() {\n    return __awaiter(this, void 0, void 0, function* () {\n        log('human version:', human.version, '| tfjs version:', human.tf.version['tfjs-core']);\n        log('platform:', human.env.platform, '| agent:', human.env.agent);\n        status('loading...');\n        yield human.load(); // preload all models\n        log('backend:', human.tf.getBackend(), '| available:', human.env.backends);\n        log('models stats:', human.models.stats());\n        log('models loaded:', human.models.loaded());\n        log('environment', human.env);\n        status('initializing...');\n        yield human.warmup(); // warmup function to initialize backend for future faster detection\n        yield webCam(); // start webcam\n        yield detectionLoop(); // start detection loop\n        yield drawLoop(); // start draw loop\n    });\n}\nwindow.onload = main;\n\n\n//# sourceURL=webpack://face-node/./src/index.ts?");

/***/ }),

/***/ "@vladmandic/human":
/*!************************************!*\
  !*** external "@vladmandic/human" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("@vladmandic/human");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;