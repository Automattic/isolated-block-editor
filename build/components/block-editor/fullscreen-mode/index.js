"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = FullscreenMode;

var _data = require("@wordpress/data");

var _element = require("@wordpress/element");

require("./style.scss");

/**
 * WordPress dependencies
 */

/**
 * Local dependencies
 */
var FULLSCREEN_MODE = 'is-fullscreen-mode';

function addFullscreen() {
  document.body.classList.add(FULLSCREEN_MODE); // @ts-ignore

  document.querySelector('html').classList.add(FULLSCREEN_MODE);
}

function removeFullscreen() {
  document.body.classList.remove(FULLSCREEN_MODE); // @ts-ignore

  document.querySelector('html').classList.remove(FULLSCREEN_MODE);
}

function FullscreenMode() {
  var _useSelect = (0, _data.useSelect)(function (select) {
    return {
      fullscreenMode: select('isolated/editor').isOptionActive('fullscreenMode')
    };
  }, []),
      fullscreenMode = _useSelect.fullscreenMode;

  (0, _element.useEffect)(function () {
    // Also do it on html as .com adds a top margin there
    if (fullscreenMode) {
      addFullscreen();
    } else {
      removeFullscreen();
    }

    return function () {
      // Remove any class when closing the editor
      removeFullscreen();
    };
  }, [fullscreenMode]);
  return null;
}
//# sourceMappingURL=index.js.map