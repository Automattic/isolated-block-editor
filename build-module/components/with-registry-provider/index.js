import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import { createElement } from "@wordpress/element";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
import applyMiddlewares from '../../store/middlewares';
import applyBlockEditorMiddlewares from './middlewares';
import reusableStore from './reusable-store';
import applyDefaultSettings from '../default-settings';
import decoratedEditor from '../../store/core-editor'; // Keep track of the registries we create so we can release them after the editor instance is removed

var registries = [];
var STORE_NAME = 'isolated/editor';
/**
 * This is the core of having a multi-editor Gutenberg experience.
 *
 * We create a sub registry that contains copies of `core/block-editor`, `core/editor`, and STORE_NAME. These are specific to the editor instance and
 * provide the content for each editor, as well as overriding some core functions
 *
 * The key `persistenceKey` from the settings is used as the `localStorage` key to save Gutenberg preferences
 */

var withRegistryProvider = createHigherOrderComponent(function (WrappedComponent) {
  return withRegistry(function (props) {
    var registry = props.registry,
        settings = props.settings,
        additionalProps = _objectWithoutProperties(props, ["registry", "settings"]);

    var defaultSettings = applyDefaultSettings(settings);
    var _defaultSettings$iso = defaultSettings.iso,
        persistenceKey = _defaultSettings$iso.persistenceKey,
        preferencesKey = _defaultSettings$iso.preferencesKey,
        defaultPreferences = _defaultSettings$iso.defaultPreferences,
        _defaultSettings$iso$ = _defaultSettings$iso.customStores,
        customStores = _defaultSettings$iso$ === void 0 ? [] : _defaultSettings$iso$;

    var _useState = useState(null),
        _useState2 = _slicedToArray(_useState, 2),
        subRegistry = _useState2[0],
        setSubRegistry = _useState2[1];

    useEffect(function () {
      // Create a new registry for this editor. We have the STORE_NAME for storing blocks and other data
      // and a duplicate of `core/block-editor` for storing block selections
      var newRegistry = createRegistry({
        'core/reusable-blocks': reusableStore
      }, registry); // Enable the persistence plugin so we use settings in `localStorage`

      if (persistenceKey) {
        newRegistry.use(plugins.persistence, {
          persistenceKey: persistenceKey
        });
      } // Create our custom store


      var store = newRegistry.registerStore(STORE_NAME, storeConfig(preferencesKey, defaultPreferences)); // Create the core/block-editor store separatley as we need the persistence plugin to be active

      var blockEditorStore = newRegistry.registerStore('core/block-editor', _objectSpread(_objectSpread({}, blockEditorStoreConfig), {}, {
        persist: ['preferences']
      })); // Duplicate the core/editor store so we can decorate it

      var editorStore = newRegistry.registerStore('core/editor', _objectSpread(_objectSpread({}, coreEditorStoreConfig), {}, {
        selectors: _objectSpread(_objectSpread({}, coreEditorStoreConfig.selectors), decoratedEditor(coreEditorStoreConfig.selectors, newRegistry.select)),
        persist: ['preferences']
      })); // Create any custom stores inside our registry

      customStores.map(function (store) {
        registries.push(newRegistry.registerStore(store.name, store.config));
      });
      registries.push(store);
      registries.push(blockEditorStore);
      registries.push(editorStore); // This should be removed after the refactoring of the effects to controls.

      applyMiddlewares(store);
      setSubRegistry(newRegistry);
      applyBlockEditorMiddlewares(blockEditorStore);
      return function cleanup() {
        registries = registries.filter(function (item) {
          return item !== store;
        });
      };
    }, [registry]);

    if (!subRegistry) {
      return null;
    }

    return createElement(RegistryProvider, {
      value: subRegistry
    }, createElement(WrappedComponent, _extends({}, additionalProps, {
      settings: defaultSettings
    })));
  });
}, 'withRegistryProvider');
export default withRegistryProvider;
//# sourceMappingURL=index.js.map