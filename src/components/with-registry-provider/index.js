/**
 * WordPress dependencies
 */
import { useState, useEffect } from '@wordpress/element';
import { withRegistry, createRegistry, RegistryProvider, plugins } from '@wordpress/data';
import { createHigherOrderComponent } from '@wordpress/compose';
import { storeConfig as blockEditorStoreConfig } from '@wordpress/block-editor';
import { storeConfig as coreEditorStoreConfig } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import storeConfig from '../../store';
import reusableStore from './reusable-store';
import applyDefaultSettings from '../default-settings';
import decoratedEditor from '../../store/core-editor';
import interfaceStore from './interface-store';

// Keep track of the registries we create so we can release them after the editor instance is removed
let registries = [];

const STORE_NAME = 'isolated/editor';

/**
 * This is the core of having a multi-editor Gutenberg experience.
 *
 * We create a sub registry that contains copies of `core/block-editor`, `core/editor`, and STORE_NAME. These are specific to the editor instance and
 * provide the content for each editor, as well as overriding some core functions
 *
 * The key `persistenceKey` from the settings is used as the `localStorage` key to save Gutenberg preferences
 */
const withRegistryProvider = createHigherOrderComponent(
	/**
	 *
	 * @param {import("react").FC } WrappedComponent
	 */
	( WrappedComponent ) =>
		withRegistry( ( props ) => {
			const { registry, settings, ...additionalProps } = props;
			const defaultSettings = applyDefaultSettings( settings );
			const { persistenceKey, preferencesKey, defaultPreferences, customStores = [] } = defaultSettings.iso || {};
			const [ subRegistry, setSubRegistry ] = useState( null );

			useEffect( () => {
				// Create a new registry for this editor. We have the STORE_NAME for storing blocks and other data
				// and a duplicate of `core/block-editor` for storing block selections
				const newRegistry = createRegistry(
					{
						'core/reusable-blocks': reusableStore,
						'core/interface': interfaceStore,
					},
					registry
				);

				// Enable the persistence plugin so we use settings in `localStorage`
				if ( persistenceKey ) {
					// @ts-ignore
					newRegistry.use( plugins.persistence, {
						persistenceKey,
					} );
				}

				// Create our custom store
				const store = newRegistry.registerStore(
					STORE_NAME,
					storeConfig( preferencesKey, defaultPreferences )
				);

				// Create the core/block-editor store separatley as we need the persistence plugin to be active
				const blockEditorStore = newRegistry.registerStore( 'core/block-editor', {
					...blockEditorStoreConfig,
					persist: [ 'preferences' ],
				} );

				// Duplicate the core/editor store so we can decorate it
				const editorStore = newRegistry.registerStore( 'core/editor', {
					...coreEditorStoreConfig,
					selectors: {
						...coreEditorStoreConfig.selectors,
						...decoratedEditor( coreEditorStoreConfig.selectors, newRegistry.select ),
					},
					persist: [ 'preferences' ],
				} );

				// Create any custom stores inside our registry
				customStores.map( ( store ) => {
					registries.push( newRegistry.registerStore( store.name, store.config ) );
				} );

				registries.push( store );
				registries.push( blockEditorStore );
				registries.push( editorStore );

				// @ts-ignore
				setSubRegistry( newRegistry );

				return function cleanup() {
					registries = registries.filter( ( item ) => item !== store );
				};
			}, [ registry ] );

			if ( ! subRegistry ) {
				return null;
			}

			return (
				<RegistryProvider value={ subRegistry }>
					{ /* @ts-ignore */ }
					<WrappedComponent { ...additionalProps } settings={ defaultSettings } />
				</RegistryProvider>
			);
		} ),
	'withRegistryProvider'
);

export default withRegistryProvider;
