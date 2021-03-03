/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
/**
 * Local dependencies
 */

import './style.scss';
var FULLSCREEN_MODE = 'is-fullscreen-mode';

function addFullscreen() {
  document.body.classList.add(FULLSCREEN_MODE);
  document.querySelector('html').classList.add(FULLSCREEN_MODE);
}

function removeFullscreen() {
  document.body.classList.remove(FULLSCREEN_MODE);
  document.querySelector('html').classList.remove(FULLSCREEN_MODE);
}

export default function FullscreenMode() {
  var _useSelect = useSelect(function (select) {
    return {
      fullscreenMode: select('isolated/editor').isOptionActive('fullscreenMode')
    };
  }, []),
      fullscreenMode = _useSelect.fullscreenMode;

  useEffect(function () {
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