"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withProxiedSelect = exports.withProxiedDispatch = void 0;

var _data = require("@wordpress/data");

var _element = require("@wordpress/element");

import { createElement } from "@wordpress/element";

var withProxiedDispatch = function withProxiedDispatch(WrappedComponent, from, to) {
  return function (props) {
    var registry = (0, _data.useRegistry)();
    (0, _element.useEffect)(function () {
      registry.addDispatchProxy(from, to);
      return function () {
        registry.removeDispatchProxy(from);
      };
    }, []);
    return createElement(WrappedComponent, props);
  };
};

exports.withProxiedDispatch = withProxiedDispatch;

var withProxiedSelect = function withProxiedSelect(WrappedComponent, from, to) {
  return function (props) {
    var registry = (0, _data.useRegistry)();
    (0, _element.useEffect)(function () {
      registry.addSelectProxy(from, to);
      return function () {
        registry.removeSelectProxy(from);
      };
    }, []);
    return createElement(WrappedComponent, props);
  };
};

exports.withProxiedSelect = withProxiedSelect;
//# sourceMappingURL=index.js.map