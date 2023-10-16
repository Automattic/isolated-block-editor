"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _element = require("@wordpress/element");
var _data = require("@wordpress/data");
var _compose = require("@wordpress/compose");
var _blockEditor = require("@wordpress/block-editor");
var _editor = require("@wordpress/editor");
var _store = _interopRequireDefault(require("../../store"));
var _reusableStore = _interopRequireDefault(require("./reusable-store"));
var _defaultSettings = _interopRequireDefault(require("../default-settings"));
var _coreEditor = _interopRequireDefault(require("../../store/core-editor"));
var _interfaceStore = _interopRequireDefault(require("./interface-store"));
var _excluded = ["registry", "settings"];
/**
 * WordPress dependencies
 */
/**
 * Internal dependencies
 */
import { createElement } from "react";
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
// Keep track of the registries we create so we can release them after the editor instance is removed
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
var withRegistryProvider = (0, _compose.createHigherOrderComponent)(
/**
 *
 * @param {import("react").FC } WrappedComponent
 */
function (WrappedComponent) {
  return (0, _data.withRegistry)(function (props) {
    var registry = props.registry,
      settings = props.settings,
      additionalProps = (0, _objectWithoutProperties2["default"])(props, _excluded);
    var defaultSettings = (0, _defaultSettings["default"])(settings);
    var _ref = defaultSettings.iso || {},
      persistenceKey = _ref.persistenceKey,
      preferencesKey = _ref.preferencesKey,
      defaultPreferences = _ref.defaultPreferences,
      _ref$customStores = _ref.customStores,
      customStores = _ref$customStores === void 0 ? [] : _ref$customStores;
    var _useState = (0, _element.useState)(null),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      subRegistry = _useState2[0],
      setSubRegistry = _useState2[1];
    (0, _element.useEffect)(function () {
      // Create a new registry for this editor. We have the STORE_NAME for storing blocks and other data
      // and a duplicate of `core/block-editor` for storing block selections
      var newRegistry = (0, _data.createRegistry)({
        'core/reusable-blocks': _reusableStore["default"],
        'core/interface': _interfaceStore["default"]
      }, registry);

      // Enable the persistence plugin so we use settings in `localStorage`
      if (persistenceKey) {
        // @ts-ignore
        newRegistry.use(_data.plugins.persistence, {
          persistenceKey: persistenceKey
        });
      }

      // Create our custom store
      var store = newRegistry.registerStore(STORE_NAME, (0, _store["default"])(preferencesKey, defaultPreferences));

      // Create the core/block-editor store separatley as we need the persistence plugin to be active
      var blockEditorStore = newRegistry.registerStore('core/block-editor', _objectSpread(_objectSpread({}, _blockEditor.storeConfig), {}, {
        persist: ['preferences']
      }));

      // Duplicate the core/editor store so we can decorate it
      var editorStore = newRegistry.registerStore('core/editor', _objectSpread(_objectSpread({}, _editor.storeConfig), {}, {
        selectors: _objectSpread(_objectSpread({}, _editor.storeConfig.selectors), (0, _coreEditor["default"])(_editor.storeConfig.selectors, newRegistry.select)),
        persist: ['preferences']
      }));

      // Create any custom stores inside our registry
      customStores.map(function (store) {
        registries.push(newRegistry.registerStore(store.name, store.config));
      });
      registries.push(store);
      registries.push(blockEditorStore);
      registries.push(editorStore);

      // @ts-ignore
      setSubRegistry(newRegistry);
      return function cleanup() {
        registries = registries.filter(function (item) {
          return item !== store;
        });
      };
    }, [registry]);
    if (!subRegistry) {
      return null;
    }
    return createElement(_data.RegistryProvider, {
      value: subRegistry
    }, createElement(WrappedComponent, _objectSpread(_objectSpread({}, additionalProps), {}, {
      settings: defaultSettings
    })));
  });
}, 'withRegistryProvider');
var _default = exports["default"] = withRegistryProvider;
//# sourceMappingURL=index.js.map