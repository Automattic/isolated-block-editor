import '@testing-library/jest-dom';

// Polyfill for window.requestIdleCallback, used in `@wordpress/priority-queue`
import '@shopify/polyfills/idle-callback.jest';

global.ResizeObserver = require( 'resize-observer-polyfill' );

jest.mock( '@wordpress/compose', () => {
	return {
		...jest.requireActual( '@wordpress/compose' ),
		useViewportMatch: jest.fn(),
	};
} );