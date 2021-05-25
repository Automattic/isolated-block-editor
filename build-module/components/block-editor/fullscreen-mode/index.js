/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
/**
 * Local dependencies
 */

import './style.scss';
const FULLSCREEN_MODE = 'is-fullscreen-mode';

function addFullscreen() {
  document.body.classList.add(FULLSCREEN_MODE);
  document.querySelector('html').classList.add(FULLSCREEN_MODE);
}

function removeFullscreen() {
  document.body.classList.remove(FULLSCREEN_MODE);
  document.querySelector('html').classList.remove(FULLSCREEN_MODE);
}

export default function FullscreenMode() {
  const {
    fullscreenMode
  } = useSelect(select => ({
    fullscreenMode: select('isolated/editor').isOptionActive('fullscreenMode')
  }), []);
  useEffect(() => {
    // Also do it on html as .com adds a top margin there
    if (fullscreenMode) {
      addFullscreen();
    } else {
      removeFullscreen();
    }

    return () => {
      // Remove any class when closing the editor
      removeFullscreen();
    };
  }, [fullscreenMode]);
  return null;
}
//# sourceMappingURL=index.js.map