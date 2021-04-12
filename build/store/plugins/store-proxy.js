"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function storeProxy(registry, pluginOptions) {
  var selectProxies = {};
  var dispatchProxies = {};

  function getProxy(original, proxied) {
    if (original === proxied) {
      throw new TypeError('You cannot proxy a store to itself');
    }

    var proxy = _objectSpread({}, original); // For each selector in the proxied one that exists in the original, replace it with a proxy function that first goes to the proxy selector and then
    // falls through to the original if it returns undefined


    Object.keys(proxied).forEach(function (selectorName) {
      if (original[selectorName]) {
        proxy[selectorName] = function () {
          var result = proxied[selectorName].apply(proxied, arguments);

          if (result !== undefined) {
            return result;
          } // Fall through to original


          return function () {
            return original[selectorName].apply(original, arguments);
          };
        };
      }
    });
    return proxy;
  }

  return {
    select: function select(storeKey) {
      if (selectProxies[storeKey]) {
        return selectProxies[storeKey];
      }

      return registry.select(storeKey);
    },
    dispatch: function dispatch(storeKey) {
      if (dispatchProxies[storeKey]) {
        return dispatchProxies[storeKey];
      }

      return registry.dispatch(storeKey);
    },
    addSelectProxy: function addSelectProxy(fromStore, toStore) {
      selectProxies[fromStore] = getProxy(registry.select(fromStore), registry.select(toStore));
    },
    addDispatchProxy: function addDispatchProxy(fromStore, toStore) {
      dispatchProxies[fromStore] = getProxy(registry.dispatch(fromStore), registry.dispatch(toStore));
    },
    removeSelectProxy: function removeSelectProxy(fromStore) {
      delete selectProxies[fromStore];
    },
    removeDispatchProxy: function removeDispatchProxy(fromStore) {
      delete dispatchProxies[fromStore];
    }
  };
}

var _default = storeProxy;
exports["default"] = _default;
//# sourceMappingURL=store-proxy.js.map