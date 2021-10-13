"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerCollabFormats = void 0;

var _collabCaret = require("./collab-caret");

/**
 * Internal dependencies
 */
var registerCollabFormats = function registerCollabFormats(getFormatType) {
  if (!getFormatType(_collabCaret.FORMAT_NAME)) {
    (0, _collabCaret.registerFormatCollabCaret)();
  }
};

exports.registerCollabFormats = registerCollabFormats;
//# sourceMappingURL=index.js.map