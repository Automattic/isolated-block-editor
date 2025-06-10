import '@testing-library/jest-dom';

// Polyfill for window.requestIdleCallback, used in `@wordpress/priority-queue`
import '@shopify/polyfills/idle-callback.jest';
import crypto from 'crypto'
import { TextDecoder, TextEncoder } from 'node:util';
import ResizeObserver from 'resize-observer-polyfill';

Object.defineProperty( global, 'crypto', {
	value: {
		getRandomValues: ( arr ) => crypto.randomBytes( arr.length )
	}
} );

global.ResizeObserver = ResizeObserver;
global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;

jest.mock( '@wordpress/compose', () => {
	return {
		...jest.requireActual( '@wordpress/compose' ),
		useViewportMatch: jest.fn(),
	};
} );