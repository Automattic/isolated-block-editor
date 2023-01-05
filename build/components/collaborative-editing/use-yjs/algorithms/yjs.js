"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.blocksDocToArray = blocksDocToArray;
exports.commentsDocToArray = commentsDocToArray;
exports.postDocToObject = postDocToObject;
exports.updateBlocksDoc = updateBlocksDoc;
exports.updateCommentRepliesDoc = updateCommentRepliesDoc;
exports.updateCommentsDoc = updateCommentsDoc;
exports.updatePostDoc = updatePostDoc;
exports.updateRichText = updateRichText;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var yjs = _interopRequireWildcard(require("yjs"));
var diff = _interopRequireWildcard(require("lib0/diff"));
var _lodash = require("lodash");
var _richText = require("./rich-text");
var _sanitizeHtml = _interopRequireDefault(require("./sanitize-html"));
var _excluded = ["innerBlocks"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/**
 * @typedef {Object} PostObject
 * @property {string} title
 * @property {Object[]} blocks
 * @property {Object[]} comments
 */

/** @typedef {import('../yjs-doc').RichTextHint} RichTextHint */

/**
 * Updates the block doc with the local blocks block changes.
 *
 * @param {yjs.Map} yDocBlocks Blocks doc.
 * @param {Array}   blocks     Updated blocks.
 * @param {RichTextHint} [richTextHint] Indication that a certain block attribute is a RichText, inferred from the current editor selection.
 * @param {string}  clientId   Current clientId.
 */
function updateBlocksDoc(yDocBlocks, blocks, richTextHint) {
  var clientId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  if (!yDocBlocks.has('order')) {
    yDocBlocks.set('order', new yjs.Map());
  }
  var order = yDocBlocks.get('order');
  if (!order.has(clientId)) order.set(clientId, new yjs.Array());
  order = order.get(clientId);
  if (!yDocBlocks.has('byClientId')) {
    yDocBlocks.set('byClientId', new yjs.Map());
  }
  var byClientId = yDocBlocks.get('byClientId');
  var currentOrder = order.toArray();
  var orderDiff = diff.simpleDiffArray(currentOrder, blocks.map(function (block) {
    return block.clientId;
  }));
  currentOrder.slice(orderDiff.index, orderDiff.remove).forEach(function (_clientId) {
    return !orderDiff.insert.includes(_clientId) && byClientId["delete"](_clientId);
  });
  order["delete"](orderDiff.index, orderDiff.remove);
  order.insert(orderDiff.index, orderDiff.insert);
  if (!yDocBlocks.has('richTexts')) {
    yDocBlocks.set('richTexts', new yjs.Map());
  }
  var _iterator = _createForOfIteratorHelper(blocks),
    _step;
  try {
    var _loop = function _loop() {
      var _block = _step.value;
      var innerBlocks = _block.innerBlocks,
        block = (0, _objectWithoutProperties2["default"])(_block, _excluded);
      var isPreexisting = byClientId.has(block.clientId);
      if (!isPreexisting || !(0, _lodash.isEqual)(byClientId.get(block.clientId), block)) {
        var richTexts = yDocBlocks.get('richTexts');
        getKnownRichTextAttributes(block.clientId, richTextHint, richTexts).forEach(function (attributeKey) {
          updateRichText({
            newBlock: block,
            attributeKey: attributeKey,
            richTexts: richTexts
          });
        });
        byClientId.set(block.clientId, block);
      }
      updateBlocksDoc(yDocBlocks, innerBlocks, richTextHint, block.clientId);
    };
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

/**
 * @param clientId
 * @param richTextHint
 * @param richTexts
 * @return {Set<string>}
 */
function getKnownRichTextAttributes(clientId, richTextHint, richTexts) {
  var knownRichTextAttributes = richTexts.has(clientId) && richTexts.get(clientId);
  var attributeSet = knownRichTextAttributes ? new Set(knownRichTextAttributes.keys()) : new Set();
  if (richTextHint && clientId === richTextHint.clientId) {
    attributeSet.add(richTextHint.attributeKey);
  }
  return attributeSet;
}

/**
 * Updates the RichText value in the richTexts yMap using index-based manipulation.
 *
 * @param {Object} args
 * @param {Object} args.newBlock
 * @param {string} args.attributeKey
 * @param {yjs.Map} args.richTexts
 */
function updateRichText(_ref) {
  var newBlock = _ref.newBlock,
    attributeKey = _ref.attributeKey,
    richTexts = _ref.richTexts;
  var newText = newBlock.attributes[attributeKey];
  if (!richTexts.has(newBlock.clientId)) {
    richTexts.set(newBlock.clientId, new yjs.Map());
  }
  var blockWithRichTexts = richTexts.get(newBlock.clientId);
  if (!blockWithRichTexts.has(attributeKey)) {
    blockWithRichTexts.set(attributeKey, new yjs.Map([['xmlText', new yjs.XmlText()], ['multilineTag', undefined], ['replacements', new yjs.Array()], ['multilineWrapperReplacements', new yjs.Array()]]));
  }
  var richTextMap = blockWithRichTexts.get(attributeKey);
  var oldText = (0, _richText.richTextMapToHTML)(blockWithRichTexts.get(attributeKey));
  (0, _richText.applyHTMLDelta)(oldText, newText, richTextMap);
}

/**
 * Updates the comments doc with the local comments changes.
 *
 * @param {yjs.Map} commentsDoc  comments doc.
 * @param {Object[]}  comments     Updated comments.
 */
function updateCommentsDoc(commentsDoc) {
  var comments = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  comments.forEach(function (comment) {
    var currentDoc = commentsDoc.get(comment._id);
    var isNewDoc = !currentDoc;
    if (!currentDoc) {
      commentsDoc.set(comment._id, new yjs.Map());
    }
    currentDoc = commentsDoc.get(comment._id);
    // Update regular fields
    ['type', 'content', 'createdAt', 'status', 'start', 'end', 'authorId', 'authorName'].forEach(function (field) {
      if (isNewDoc || currentDoc.get(field) !== comment[field]) {
        currentDoc.set(field, comment[field]);
      }
    });
    if (isNewDoc) {
      currentDoc.set('replies', new yjs.Map());
    }
    updateCommentRepliesDoc(currentDoc.get('replies'), comment.replies);
  });
}

/**
 * Updates the replies doc with the local replies changes.
 *
 * @param {yjs.Map} repliesDoc  replies doc.
 * @param {Object[]}  replies     Updated replies.
 */
function updateCommentRepliesDoc(repliesDoc) {
  var replies = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  replies.forEach(function (reply) {
    var currentReplyDoc = repliesDoc.get(reply._id);
    var isNewDoc = !currentReplyDoc;
    if (!currentReplyDoc) {
      repliesDoc.set(reply._id, new yjs.Map());
    }
    currentReplyDoc = repliesDoc.get(reply._id);
    ['content', 'createdAt', 'authorId', 'authorName'].forEach(function (field) {
      if (isNewDoc || currentReplyDoc.get(field) !== reply[field]) {
        currentReplyDoc.set(field, reply[field]);
      }
    });
  });
}

/**
 * Updates the post doc with the local post changes.
 *
 * @param {yjs.Doc} doc     Shared doc.
 * @param {PostObject}  newPost Updated post.
 * @param {RichTextHint} [richTextHint]
 */
function updatePostDoc(doc, newPost, richTextHint) {
  var postDoc = doc.getMap('post');
  if (postDoc.get('title') !== newPost.title) {
    postDoc.set('title', newPost.title);
  }
  if (!postDoc.get('blocks')) {
    postDoc.set('blocks', new yjs.Map());
  }
  updateBlocksDoc(postDoc.get('blocks'), newPost.blocks || [], richTextHint);
  if (!postDoc.get('comments')) {
    postDoc.set('comments', new yjs.Map());
  }
  updateCommentsDoc(postDoc.get('comments'), newPost.comments);
}

/**
 * Converts the comments doc into a comment list.
 *
 * @param {yjs.Map} commentsDoc Comments doc.
 * @return {Array} Comment list.
 */
function commentsDocToArray(commentsDoc) {
  if (!commentsDoc) {
    return [];
  }
  return Object.entries(commentsDoc.toJSON()).map(function (_ref2) {
    var _ref3 = (0, _slicedToArray2["default"])(_ref2, 2),
      id = _ref3[0],
      commentDoc = _ref3[1];
    return {
      _id: id,
      type: commentDoc.type,
      content: commentDoc.content,
      createdAt: commentDoc.createdAt,
      status: commentDoc.status,
      start: commentDoc.start,
      end: commentDoc.end,
      authorId: commentDoc.authorId,
      authorName: commentDoc.authorName,
      replies: Object.entries(commentDoc.replies).map(function (_ref4) {
        var _ref5 = (0, _slicedToArray2["default"])(_ref4, 2),
          replyId = _ref5[0],
          entryDoc = _ref5[1];
        return {
          _id: replyId,
          content: entryDoc.content,
          createdAt: entryDoc.createdAt,
          authorId: entryDoc.authorId,
          authorName: entryDoc.authorName
        };
      }).sort(function (a, b) {
        return a.createdAt - b.createdAt;
      })
    };
  });
}

/**
 * Converts the block doc into a block list.
 *
 * @param {yjs.Map} yDocBlocks Block doc.
 * @param {Object} [opts]
 * @param {string}  [opts.clientId] Current block clientId.
 * @param {boolean}  [opts.sanitize] Whether to sanitize the block attribute values.
 *
 * @return {Array} Block list.
 */
// @ts-ignore
function blocksDocToArray(yDocBlocks) {
  var _order$get;
  var _ref6 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref6$clientId = _ref6.clientId,
    clientId = _ref6$clientId === void 0 ? '' : _ref6$clientId,
    _ref6$sanitize = _ref6.sanitize,
    sanitize = _ref6$sanitize === void 0 ? false : _ref6$sanitize;
  if (!yDocBlocks) {
    return [];
  }
  var order = yDocBlocks.get('order');
  order = (_order$get = order.get(clientId)) === null || _order$get === void 0 ? void 0 : _order$get.toArray();
  if (!order) return [];
  var byClientId = yDocBlocks.get('byClientId');
  return order.map(function (_clientId) {
    var richTextMap = yDocBlocks.get('richTexts').get(_clientId) || new yjs.Map();
    var richTextsAsStrings = Array.from(richTextMap.entries()).reduce(function (acc, _ref7) {
      var _ref8 = (0, _slicedToArray2["default"])(_ref7, 2),
        key = _ref8[0],
        value = _ref8[1];
      return _objectSpread(_objectSpread({}, acc), {}, (0, _defineProperty2["default"])({}, key, (0, _richText.richTextMapToHTML)(value)));
    }, {});
    var attributes = _objectSpread(_objectSpread({}, byClientId.get(_clientId).attributes), richTextsAsStrings);
    if (sanitize) {
      for (var key in attributes) {
        attributes[key] = (0, _sanitizeHtml["default"])(attributes[key]);
      }
    }
    return _objectSpread(_objectSpread({}, byClientId.get(_clientId)), {}, {
      attributes: attributes,
      innerBlocks: blocksDocToArray(yDocBlocks, {
        clientId: _clientId,
        sanitize: sanitize
      })
    });
  });
}

/**
 * Converts the post doc into a post object.
 *
 * @param {yjs.Doc} doc Shared doc.
 * @param {Object} [opts]
 * @param {boolean} [opts.sanitize]
 *
 * @return {PostObject} Post object.
 */
// @ts-ignore
function postDocToObject(doc) {
  var _ref9 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref9$sanitize = _ref9.sanitize,
    sanitize = _ref9$sanitize === void 0 ? false : _ref9$sanitize;
  var postDoc = doc.getMap('post');
  var blocks = blocksDocToArray(postDoc.get('blocks'), {
    sanitize: sanitize
  });
  var comments = commentsDocToArray(postDoc.get('comments'));
  return {
    title: postDoc.get('title') || '',
    blocks: blocks,
    comments: comments
  };
}
//# sourceMappingURL=yjs.js.map