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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/simplex-noise/simplex-noise.js":
/*!*****************************************************!*\
  !*** ./node_modules/simplex-noise/simplex-noise.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_RESULT__;/*\n * A fast javascript implementation of simplex noise by Jonas Wagner\n\nBased on a speed-improved simplex noise algorithm for 2D, 3D and 4D in Java.\nWhich is based on example code by Stefan Gustavson (stegu@itn.liu.se).\nWith Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).\nBetter rank ordering method by Stefan Gustavson in 2012.\n\n\n Copyright (c) 2018 Jonas Wagner\n\n Permission is hereby granted, free of charge, to any person obtaining a copy\n of this software and associated documentation files (the \"Software\"), to deal\n in the Software without restriction, including without limitation the rights\n to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n copies of the Software, and to permit persons to whom the Software is\n furnished to do so, subject to the following conditions:\n\n The above copyright notice and this permission notice shall be included in all\n copies or substantial portions of the Software.\n\n THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\n SOFTWARE.\n */\n(function() {\n  'use strict';\n\n  var F2 = 0.5 * (Math.sqrt(3.0) - 1.0);\n  var G2 = (3.0 - Math.sqrt(3.0)) / 6.0;\n  var F3 = 1.0 / 3.0;\n  var G3 = 1.0 / 6.0;\n  var F4 = (Math.sqrt(5.0) - 1.0) / 4.0;\n  var G4 = (5.0 - Math.sqrt(5.0)) / 20.0;\n\n  function SimplexNoise(randomOrSeed) {\n    var random;\n    if (typeof randomOrSeed == 'function') {\n      random = randomOrSeed;\n    }\n    else if (randomOrSeed) {\n      random = alea(randomOrSeed);\n    } else {\n      random = Math.random;\n    }\n    this.p = buildPermutationTable(random);\n    this.perm = new Uint8Array(512);\n    this.permMod12 = new Uint8Array(512);\n    for (var i = 0; i < 512; i++) {\n      this.perm[i] = this.p[i & 255];\n      this.permMod12[i] = this.perm[i] % 12;\n    }\n\n  }\n  SimplexNoise.prototype = {\n    grad3: new Float32Array([1, 1, 0,\n      -1, 1, 0,\n      1, -1, 0,\n\n      -1, -1, 0,\n      1, 0, 1,\n      -1, 0, 1,\n\n      1, 0, -1,\n      -1, 0, -1,\n      0, 1, 1,\n\n      0, -1, 1,\n      0, 1, -1,\n      0, -1, -1]),\n    grad4: new Float32Array([0, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1,\n      0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1,\n      1, 0, 1, 1, 1, 0, 1, -1, 1, 0, -1, 1, 1, 0, -1, -1,\n      -1, 0, 1, 1, -1, 0, 1, -1, -1, 0, -1, 1, -1, 0, -1, -1,\n      1, 1, 0, 1, 1, 1, 0, -1, 1, -1, 0, 1, 1, -1, 0, -1,\n      -1, 1, 0, 1, -1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, -1,\n      1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0,\n      -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 0]),\n    noise2D: function(xin, yin) {\n      var permMod12 = this.permMod12;\n      var perm = this.perm;\n      var grad3 = this.grad3;\n      var n0 = 0; // Noise contributions from the three corners\n      var n1 = 0;\n      var n2 = 0;\n      // Skew the input space to determine which simplex cell we're in\n      var s = (xin + yin) * F2; // Hairy factor for 2D\n      var i = Math.floor(xin + s);\n      var j = Math.floor(yin + s);\n      var t = (i + j) * G2;\n      var X0 = i - t; // Unskew the cell origin back to (x,y) space\n      var Y0 = j - t;\n      var x0 = xin - X0; // The x,y distances from the cell origin\n      var y0 = yin - Y0;\n      // For the 2D case, the simplex shape is an equilateral triangle.\n      // Determine which simplex we are in.\n      var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords\n      if (x0 > y0) {\n        i1 = 1;\n        j1 = 0;\n      } // lower triangle, XY order: (0,0)->(1,0)->(1,1)\n      else {\n        i1 = 0;\n        j1 = 1;\n      } // upper triangle, YX order: (0,0)->(0,1)->(1,1)\n      // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and\n      // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where\n      // c = (3-sqrt(3))/6\n      var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords\n      var y1 = y0 - j1 + G2;\n      var x2 = x0 - 1.0 + 2.0 * G2; // Offsets for last corner in (x,y) unskewed coords\n      var y2 = y0 - 1.0 + 2.0 * G2;\n      // Work out the hashed gradient indices of the three simplex corners\n      var ii = i & 255;\n      var jj = j & 255;\n      // Calculate the contribution from the three corners\n      var t0 = 0.5 - x0 * x0 - y0 * y0;\n      if (t0 >= 0) {\n        var gi0 = permMod12[ii + perm[jj]] * 3;\n        t0 *= t0;\n        n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0); // (x,y) of grad3 used for 2D gradient\n      }\n      var t1 = 0.5 - x1 * x1 - y1 * y1;\n      if (t1 >= 0) {\n        var gi1 = permMod12[ii + i1 + perm[jj + j1]] * 3;\n        t1 *= t1;\n        n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1);\n      }\n      var t2 = 0.5 - x2 * x2 - y2 * y2;\n      if (t2 >= 0) {\n        var gi2 = permMod12[ii + 1 + perm[jj + 1]] * 3;\n        t2 *= t2;\n        n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2);\n      }\n      // Add contributions from each corner to get the final noise value.\n      // The result is scaled to return values in the interval [-1,1].\n      return 70.0 * (n0 + n1 + n2);\n    },\n    // 3D simplex noise\n    noise3D: function(xin, yin, zin) {\n      var permMod12 = this.permMod12;\n      var perm = this.perm;\n      var grad3 = this.grad3;\n      var n0, n1, n2, n3; // Noise contributions from the four corners\n      // Skew the input space to determine which simplex cell we're in\n      var s = (xin + yin + zin) * F3; // Very nice and simple skew factor for 3D\n      var i = Math.floor(xin + s);\n      var j = Math.floor(yin + s);\n      var k = Math.floor(zin + s);\n      var t = (i + j + k) * G3;\n      var X0 = i - t; // Unskew the cell origin back to (x,y,z) space\n      var Y0 = j - t;\n      var Z0 = k - t;\n      var x0 = xin - X0; // The x,y,z distances from the cell origin\n      var y0 = yin - Y0;\n      var z0 = zin - Z0;\n      // For the 3D case, the simplex shape is a slightly irregular tetrahedron.\n      // Determine which simplex we are in.\n      var i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords\n      var i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords\n      if (x0 >= y0) {\n        if (y0 >= z0) {\n          i1 = 1;\n          j1 = 0;\n          k1 = 0;\n          i2 = 1;\n          j2 = 1;\n          k2 = 0;\n        } // X Y Z order\n        else if (x0 >= z0) {\n          i1 = 1;\n          j1 = 0;\n          k1 = 0;\n          i2 = 1;\n          j2 = 0;\n          k2 = 1;\n        } // X Z Y order\n        else {\n          i1 = 0;\n          j1 = 0;\n          k1 = 1;\n          i2 = 1;\n          j2 = 0;\n          k2 = 1;\n        } // Z X Y order\n      }\n      else { // x0<y0\n        if (y0 < z0) {\n          i1 = 0;\n          j1 = 0;\n          k1 = 1;\n          i2 = 0;\n          j2 = 1;\n          k2 = 1;\n        } // Z Y X order\n        else if (x0 < z0) {\n          i1 = 0;\n          j1 = 1;\n          k1 = 0;\n          i2 = 0;\n          j2 = 1;\n          k2 = 1;\n        } // Y Z X order\n        else {\n          i1 = 0;\n          j1 = 1;\n          k1 = 0;\n          i2 = 1;\n          j2 = 1;\n          k2 = 0;\n        } // Y X Z order\n      }\n      // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),\n      // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and\n      // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where\n      // c = 1/6.\n      var x1 = x0 - i1 + G3; // Offsets for second corner in (x,y,z) coords\n      var y1 = y0 - j1 + G3;\n      var z1 = z0 - k1 + G3;\n      var x2 = x0 - i2 + 2.0 * G3; // Offsets for third corner in (x,y,z) coords\n      var y2 = y0 - j2 + 2.0 * G3;\n      var z2 = z0 - k2 + 2.0 * G3;\n      var x3 = x0 - 1.0 + 3.0 * G3; // Offsets for last corner in (x,y,z) coords\n      var y3 = y0 - 1.0 + 3.0 * G3;\n      var z3 = z0 - 1.0 + 3.0 * G3;\n      // Work out the hashed gradient indices of the four simplex corners\n      var ii = i & 255;\n      var jj = j & 255;\n      var kk = k & 255;\n      // Calculate the contribution from the four corners\n      var t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;\n      if (t0 < 0) n0 = 0.0;\n      else {\n        var gi0 = permMod12[ii + perm[jj + perm[kk]]] * 3;\n        t0 *= t0;\n        n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0 + grad3[gi0 + 2] * z0);\n      }\n      var t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;\n      if (t1 < 0) n1 = 0.0;\n      else {\n        var gi1 = permMod12[ii + i1 + perm[jj + j1 + perm[kk + k1]]] * 3;\n        t1 *= t1;\n        n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1 + grad3[gi1 + 2] * z1);\n      }\n      var t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;\n      if (t2 < 0) n2 = 0.0;\n      else {\n        var gi2 = permMod12[ii + i2 + perm[jj + j2 + perm[kk + k2]]] * 3;\n        t2 *= t2;\n        n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2 + grad3[gi2 + 2] * z2);\n      }\n      var t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;\n      if (t3 < 0) n3 = 0.0;\n      else {\n        var gi3 = permMod12[ii + 1 + perm[jj + 1 + perm[kk + 1]]] * 3;\n        t3 *= t3;\n        n3 = t3 * t3 * (grad3[gi3] * x3 + grad3[gi3 + 1] * y3 + grad3[gi3 + 2] * z3);\n      }\n      // Add contributions from each corner to get the final noise value.\n      // The result is scaled to stay just inside [-1,1]\n      return 32.0 * (n0 + n1 + n2 + n3);\n    },\n    // 4D simplex noise, better simplex rank ordering method 2012-03-09\n    noise4D: function(x, y, z, w) {\n      var perm = this.perm;\n      var grad4 = this.grad4;\n\n      var n0, n1, n2, n3, n4; // Noise contributions from the five corners\n      // Skew the (x,y,z,w) space to determine which cell of 24 simplices we're in\n      var s = (x + y + z + w) * F4; // Factor for 4D skewing\n      var i = Math.floor(x + s);\n      var j = Math.floor(y + s);\n      var k = Math.floor(z + s);\n      var l = Math.floor(w + s);\n      var t = (i + j + k + l) * G4; // Factor for 4D unskewing\n      var X0 = i - t; // Unskew the cell origin back to (x,y,z,w) space\n      var Y0 = j - t;\n      var Z0 = k - t;\n      var W0 = l - t;\n      var x0 = x - X0; // The x,y,z,w distances from the cell origin\n      var y0 = y - Y0;\n      var z0 = z - Z0;\n      var w0 = w - W0;\n      // For the 4D case, the simplex is a 4D shape I won't even try to describe.\n      // To find out which of the 24 possible simplices we're in, we need to\n      // determine the magnitude ordering of x0, y0, z0 and w0.\n      // Six pair-wise comparisons are performed between each possible pair\n      // of the four coordinates, and the results are used to rank the numbers.\n      var rankx = 0;\n      var ranky = 0;\n      var rankz = 0;\n      var rankw = 0;\n      if (x0 > y0) rankx++;\n      else ranky++;\n      if (x0 > z0) rankx++;\n      else rankz++;\n      if (x0 > w0) rankx++;\n      else rankw++;\n      if (y0 > z0) ranky++;\n      else rankz++;\n      if (y0 > w0) ranky++;\n      else rankw++;\n      if (z0 > w0) rankz++;\n      else rankw++;\n      var i1, j1, k1, l1; // The integer offsets for the second simplex corner\n      var i2, j2, k2, l2; // The integer offsets for the third simplex corner\n      var i3, j3, k3, l3; // The integer offsets for the fourth simplex corner\n      // simplex[c] is a 4-vector with the numbers 0, 1, 2 and 3 in some order.\n      // Many values of c will never occur, since e.g. x>y>z>w makes x<z, y<w and x<w\n      // impossible. Only the 24 indices which have non-zero entries make any sense.\n      // We use a thresholding to set the coordinates in turn from the largest magnitude.\n      // Rank 3 denotes the largest coordinate.\n      i1 = rankx >= 3 ? 1 : 0;\n      j1 = ranky >= 3 ? 1 : 0;\n      k1 = rankz >= 3 ? 1 : 0;\n      l1 = rankw >= 3 ? 1 : 0;\n      // Rank 2 denotes the second largest coordinate.\n      i2 = rankx >= 2 ? 1 : 0;\n      j2 = ranky >= 2 ? 1 : 0;\n      k2 = rankz >= 2 ? 1 : 0;\n      l2 = rankw >= 2 ? 1 : 0;\n      // Rank 1 denotes the second smallest coordinate.\n      i3 = rankx >= 1 ? 1 : 0;\n      j3 = ranky >= 1 ? 1 : 0;\n      k3 = rankz >= 1 ? 1 : 0;\n      l3 = rankw >= 1 ? 1 : 0;\n      // The fifth corner has all coordinate offsets = 1, so no need to compute that.\n      var x1 = x0 - i1 + G4; // Offsets for second corner in (x,y,z,w) coords\n      var y1 = y0 - j1 + G4;\n      var z1 = z0 - k1 + G4;\n      var w1 = w0 - l1 + G4;\n      var x2 = x0 - i2 + 2.0 * G4; // Offsets for third corner in (x,y,z,w) coords\n      var y2 = y0 - j2 + 2.0 * G4;\n      var z2 = z0 - k2 + 2.0 * G4;\n      var w2 = w0 - l2 + 2.0 * G4;\n      var x3 = x0 - i3 + 3.0 * G4; // Offsets for fourth corner in (x,y,z,w) coords\n      var y3 = y0 - j3 + 3.0 * G4;\n      var z3 = z0 - k3 + 3.0 * G4;\n      var w3 = w0 - l3 + 3.0 * G4;\n      var x4 = x0 - 1.0 + 4.0 * G4; // Offsets for last corner in (x,y,z,w) coords\n      var y4 = y0 - 1.0 + 4.0 * G4;\n      var z4 = z0 - 1.0 + 4.0 * G4;\n      var w4 = w0 - 1.0 + 4.0 * G4;\n      // Work out the hashed gradient indices of the five simplex corners\n      var ii = i & 255;\n      var jj = j & 255;\n      var kk = k & 255;\n      var ll = l & 255;\n      // Calculate the contribution from the five corners\n      var t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0 - w0 * w0;\n      if (t0 < 0) n0 = 0.0;\n      else {\n        var gi0 = (perm[ii + perm[jj + perm[kk + perm[ll]]]] % 32) * 4;\n        t0 *= t0;\n        n0 = t0 * t0 * (grad4[gi0] * x0 + grad4[gi0 + 1] * y0 + grad4[gi0 + 2] * z0 + grad4[gi0 + 3] * w0);\n      }\n      var t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1 - w1 * w1;\n      if (t1 < 0) n1 = 0.0;\n      else {\n        var gi1 = (perm[ii + i1 + perm[jj + j1 + perm[kk + k1 + perm[ll + l1]]]] % 32) * 4;\n        t1 *= t1;\n        n1 = t1 * t1 * (grad4[gi1] * x1 + grad4[gi1 + 1] * y1 + grad4[gi1 + 2] * z1 + grad4[gi1 + 3] * w1);\n      }\n      var t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2 - w2 * w2;\n      if (t2 < 0) n2 = 0.0;\n      else {\n        var gi2 = (perm[ii + i2 + perm[jj + j2 + perm[kk + k2 + perm[ll + l2]]]] % 32) * 4;\n        t2 *= t2;\n        n2 = t2 * t2 * (grad4[gi2] * x2 + grad4[gi2 + 1] * y2 + grad4[gi2 + 2] * z2 + grad4[gi2 + 3] * w2);\n      }\n      var t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3 - w3 * w3;\n      if (t3 < 0) n3 = 0.0;\n      else {\n        var gi3 = (perm[ii + i3 + perm[jj + j3 + perm[kk + k3 + perm[ll + l3]]]] % 32) * 4;\n        t3 *= t3;\n        n3 = t3 * t3 * (grad4[gi3] * x3 + grad4[gi3 + 1] * y3 + grad4[gi3 + 2] * z3 + grad4[gi3 + 3] * w3);\n      }\n      var t4 = 0.6 - x4 * x4 - y4 * y4 - z4 * z4 - w4 * w4;\n      if (t4 < 0) n4 = 0.0;\n      else {\n        var gi4 = (perm[ii + 1 + perm[jj + 1 + perm[kk + 1 + perm[ll + 1]]]] % 32) * 4;\n        t4 *= t4;\n        n4 = t4 * t4 * (grad4[gi4] * x4 + grad4[gi4 + 1] * y4 + grad4[gi4 + 2] * z4 + grad4[gi4 + 3] * w4);\n      }\n      // Sum up and scale the result to cover the range [-1,1]\n      return 27.0 * (n0 + n1 + n2 + n3 + n4);\n    }\n  };\n\n  function buildPermutationTable(random) {\n    var i;\n    var p = new Uint8Array(256);\n    for (i = 0; i < 256; i++) {\n      p[i] = i;\n    }\n    for (i = 0; i < 255; i++) {\n      var r = i + ~~(random() * (256 - i));\n      var aux = p[i];\n      p[i] = p[r];\n      p[r] = aux;\n    }\n    return p;\n  }\n  SimplexNoise._buildPermutationTable = buildPermutationTable;\n\n  function alea() {\n    // Johannes Baagøe <baagoe@baagoe.com>, 2010\n    var s0 = 0;\n    var s1 = 0;\n    var s2 = 0;\n    var c = 1;\n\n    var mash = masher();\n    s0 = mash(' ');\n    s1 = mash(' ');\n    s2 = mash(' ');\n\n    for (var i = 0; i < arguments.length; i++) {\n      s0 -= mash(arguments[i]);\n      if (s0 < 0) {\n        s0 += 1;\n      }\n      s1 -= mash(arguments[i]);\n      if (s1 < 0) {\n        s1 += 1;\n      }\n      s2 -= mash(arguments[i]);\n      if (s2 < 0) {\n        s2 += 1;\n      }\n    }\n    mash = null;\n    return function() {\n      var t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32\n      s0 = s1;\n      s1 = s2;\n      return s2 = t - (c = t | 0);\n    };\n  }\n  function masher() {\n    var n = 0xefc8249d;\n    return function(data) {\n      data = data.toString();\n      for (var i = 0; i < data.length; i++) {\n        n += data.charCodeAt(i);\n        var h = 0.02519603282416938 * n;\n        n = h >>> 0;\n        h -= n;\n        h *= n;\n        n = h >>> 0;\n        h -= n;\n        n += h * 0x100000000; // 2^32\n      }\n      return (n >>> 0) * 2.3283064365386963e-10; // 2^-32\n    };\n  }\n\n  // amd\n  if (true) !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {return SimplexNoise;}).call(exports, __webpack_require__, exports, module),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  // common js\n  if (true) exports.SimplexNoise = SimplexNoise;\n  // browser\n  else {}\n  // nodejs\n  if (true) {\n    module.exports = SimplexNoise;\n  }\n\n})();\n\n\n//# sourceURL=webpack:///./node_modules/simplex-noise/simplex-noise.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./input */ \"./src/input.js\");\n/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map */ \"./src/map.js\");\n/* harmony import */ var _sprite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sprite */ \"./src/sprite.js\");\n\r\n\r\n\r\n\r\nclass App { }\r\n\r\nApp.prototype.init = function () {\r\n\r\n  // Scene\r\n  this.scene = new THREE.Scene();\r\n  this.textureloader = new THREE.TextureLoader();\r\n  this.scene.background = this.textureloader.load('./assets/ui/background.png');\r\n\r\n  var plane = new THREE.Mesh(\r\n    new THREE.PlaneGeometry(1193, 667, 32),\r\n    new THREE.MeshBasicMaterial({ map: this.textureloader.load('./assets/ui/background.png') }));\r\n  plane.rotateX(-Math.PI / 2);\r\n  plane.position.y -= 100;\r\n  this.scene.add(plane);\r\n\r\n  // Renderer\r\n  this.renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('canvas'), antialias: true });\r\n  this.renderer.shadowMap.enabled = true;\r\n  this.renderer.setSize(window.innerWidth, window.innerHeight);\r\n\r\n  this.raycaster = new THREE.Raycaster();\r\n  this.mouse = new THREE.Vector2();\r\n\r\n  var map = new _map__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.scene, 10);\r\n\r\n  var spr = new _sprite__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.textureloader);\r\n  this.scene.add(spr.mesh);\r\n\r\n  this.input = new _input__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this);\r\n\r\n  // Camera\r\n  this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);\r\n  this.camera.position.set(0, 100, -50);\r\n  this.camera.lookAt(0, 0, 0);\r\n\r\n  // Events\r\n  window.addEventListener('resize', (e) => this.input.onWindowResize(e), false);\r\n  window.addEventListener('mousemove', (e) => this.input.onMouseMove(e), false);\r\n  window.addEventListener('keyup', (e) => this.input.onKeyUp(e), false);\r\n  window.addEventListener('keydown', (e) => this.input.onKeyDown(e), false);\r\n  window.addEventListener('wheel', (e) => this.input.onWheel(e), false)\r\n\r\n}\r\n\r\nApp.prototype.render = function () {\r\n\r\n  this.raycast();\r\n  this.input.updateCamera();\r\n\r\n  this.renderer.render(this.scene, this.camera);\r\n\r\n}\r\n\r\nApp.prototype.animate = function () {\r\n\r\n  requestAnimationFrame(() => this.animate());\r\n  this.render();\r\n\r\n}\r\n\r\n\r\nApp.prototype.raycast = function () {\r\n\r\n  this.raycaster.setFromCamera(this.mouse, this.camera);\r\n  let intersects = this.raycaster.intersectObjects(this.scene.children);\r\n  // intersects.forEach(e => console.log(e))\r\n\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/input.js":
/*!**********************!*\
  !*** ./src/input.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Input { constructor(world) { this.constructor(world) } }\r\n\r\nInput.prototype.constructor = function (world) {\r\n\r\n  this.world = world;\r\n  this.keys = [];\r\n  this.cameraSpeed = 2;\r\n  this.zoom = 5;\r\n  this.zoomInLimit = 50;\r\n  this.zoomOutLimit = 150;\r\n\r\n}\r\n\r\n\r\nInput.prototype.updateCamera = function () {\r\n\r\n  if (this.keys[37]) this.world.camera.position.x += this.cameraSpeed;\r\n  if (this.keys[38]) this.world.camera.position.z += this.cameraSpeed;\r\n  if (this.keys[39]) this.world.camera.position.x -= this.cameraSpeed;\r\n  if (this.keys[40]) this.world.camera.position.z -= this.cameraSpeed;\r\n\r\n}\r\n\r\nInput.prototype.onWheel = function (event) {\r\n\r\n  let direction = this.world.camera.clone().getWorldDirection().multiplyScalar(this.zoom);\r\n  if (event.deltaY > 0) {\r\n    if (this.world.camera.position.y - direction.y > this.zoomOutLimit) return;\r\n    this.world.camera.translateZ(this.zoom)\r\n  } else {\r\n    if (this.world.camera.position.y + direction.y < this.zoomInLimit) return;\r\n    this.world.camera.translateZ(-this.zoom);\r\n  }\r\n\r\n}\r\n\r\nInput.prototype.onKeyUp = function (event) {\r\n\r\n  this.keys[event.keyCode] = false;\r\n\r\n}\r\n\r\nInput.prototype.onKeyDown = function (event) {\r\n\r\n  this.keys[event.keyCode] = true;\r\n\r\n}\r\n\r\nInput.prototype.onMouseMove = function (event) {\r\n\r\n  this.world.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;\r\n  this.world.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;\r\n\r\n}\r\n\r\nInput.prototype.onWindowResize = function () {\r\n\r\n  this.world.camera.aspect = window.innerWidth / window.innerHeight;\r\n  this.world.camera.updateProjectionMatrix();\r\n  this.world.renderer.setSize(window.innerWidth, window.innerHeight);\r\n\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Input);\n\n//# sourceURL=webpack:///./src/input.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ \"./src/app.js\");\n\r\n\r\nvar app = new _app__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\napp.init();\r\napp.animate()\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/map.js":
/*!********************!*\
  !*** ./src/map.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tile */ \"./src/tile.js\");\n/* harmony import */ var simplex_noise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! simplex-noise */ \"./node_modules/simplex-noise/simplex-noise.js\");\n/* harmony import */ var simplex_noise__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(simplex_noise__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\n\r\nconst grassland = new THREE.Color(0x3b5323);\r\nconst plains = new THREE.Color(0x7cfc00);\r\nconst desert = new THREE.Color(0xedc9af);\r\nconst tundra = new THREE.Color(0xc2b280);\r\nconst coast = new THREE.Color(0x74ccf4);\r\nconst lake = new THREE.Color(0x2389da);\r\nconst ocean = new THREE.Color(0x0f5e9c);\r\nconst snow = new THREE.Color(0xfffafa);\r\n\r\n\r\nclass Map { constructor(scene, hexlength) { this.constructor(scene, hexlength) } }\r\n\r\nMap.prototype.constructor = function (scene, hexlength) {\r\n\r\n  this.hexlength = hexlength;\r\n  this.hexheight = this.hexlength * Math.sin(Math.PI / 3) / Math.sin(Math.PI / 2);\r\n\r\n  this.hex = new THREE.Shape();\r\n  this.hex.moveTo(0, 0);\r\n  this.hex.lineTo(-this.hexlength / 2, this.hexheight);\r\n  this.hex.lineTo(0, this.hexheight * 2);\r\n  this.hex.lineTo(this.hexlength, this.hexheight * 2);\r\n  this.hex.lineTo(this.hexlength * 1.5, this.hexheight);\r\n  this.hex.lineTo(this.hexlength, 0);\r\n  this.hex.lineTo(0, 0);\r\n\r\n  this.geometry = new THREE.ShapeGeometry(this.hex);\r\n  this.geometry.rotateX(-Math.PI / 2);\r\n\r\n  // Todo change shape to get rid of Y rotation\r\n  this.geometry.rotateY(-Math.PI / 2);\r\n\r\n  this.mapWidth = 10;\r\n  this.mapHeight = 10;\r\n  var arr = Array(this.mapWidth).fill().map(() => Array(this.mapHeight).fill(0));\r\n  var noise = new simplex_noise__WEBPACK_IMPORTED_MODULE_1___default.a();\r\n\r\n  var tile;\r\n  for (var i = 0; i < this.mapHeight; i++) {\r\n    for (var j = 0; j < this.mapWidth * 3; j++) {\r\n      tile = new _tile__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.geometry, this.material);\r\n      tile.mesh.position.x = j * this.hexheight * 2;\r\n      tile.mesh.position.x += i % 2 == 0 ? this.hexheight : 0;\r\n      tile.mesh.position.z = i * this.hexlength * 1.5;\r\n      arr[i][j] = noise.noise2D(tile.mesh.position.x, tile.mesh.position.z);\r\n      let col = Math.floor(arr[i][j] * 100);\r\n      let hc;\r\n      if (col < -50) hc = ocean\r\n      else if (col >= -50 && col < -20) hc = coast;\r\n      else if (col >= -20 && col < 0) hc = grassland\r\n      else if (col >= 0 && col < 20) hc = plains;\r\n      else if (col >= 20 && col < 40) hc = desert\r\n      else if (col >= 40 && col < 60) hc = tundra;\r\n      else if (col >= 60 && col < 80) hc = snow;\r\n      else hc = lake;\r\n      tile.mesh.material.color = hc;\r\n      scene.add(tile.mesh);\r\n    }\r\n  }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Map);\n\n//# sourceURL=webpack:///./src/map.js?");

/***/ }),

/***/ "./src/sprite.js":
/*!***********************!*\
  !*** ./src/sprite.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Sprite { constructor(loader) { this.constructor(loader) } }\r\n\r\nSprite.prototype.constructor = function (loader) {\r\n\r\n  this.mesh = new THREE.Sprite(\r\n    new THREE.SpriteMaterial({\r\n      map: loader.load(\"./assets/sprites/copper.png\")\r\n    })\r\n  );\r\n  this.mesh.position.x += 10 / 2;\r\n  this.mesh.position.y += 1;\r\n  this.mesh.scale.set(5, 5, 5);\r\n\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Sprite);\n\n//# sourceURL=webpack:///./src/sprite.js?");

/***/ }),

/***/ "./src/tile.js":
/*!*********************!*\
  !*** ./src/tile.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Tile { constructor(geometry, material) { this.constructor(geometry, material) } }\r\n\r\nTile.prototype.constructor = function (geometry, material) {\r\n\r\n  this.mesh = new THREE.Mesh(geometry, material);\r\n\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Tile);\n\n//# sourceURL=webpack:///./src/tile.js?");

/***/ })

/******/ });