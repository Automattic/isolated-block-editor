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

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var yjs = _interopRequireWildcard(require("yjs"));

var _lodash = require("lodash");

var _excluded = ["innerBlocks"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * @typedef {Object} PostObject
 * @property {string} title
 * @property {Object[]} blocks
 * @property {Object[]} comments
 */

/**
 * Returns information for splicing array `a` into array `b`,
 * by swapping the minimum slice of disagreement.
 *
 * @param {Array} a
 * @param {Array} b
 * @return {Object} diff.
 */
function simpleDiff(a, b) {
  var left = 0;
  var right = 0;

  while (left < a.length && left < b.length && a[left] === b[left]) {
    left++;
  }

  if (left !== a.length || left !== b.length) {
    while (right + left < a.length && right + left < b.length && a[a.length - right - 1] === b[b.length - right - 1]) {
      right++;
    }
  }

  return {
    index: left,
    remove: a.length - left - right,
    insert: b.slice(left, b.length - right)
  };
}
/**
 * Updates the block doc with the local blocks block changes.
 *
 * @param {yjs.Map} yDocBlocks Blocks doc.
 * @param {Array}   blocks     Updated blocks.
 * @param {string}  clientId   Current clientId.
 */


function updateBlocksDoc(yDocBlocks, blocks) {
  var clientId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

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
  var orderDiff = simpleDiff(currentOrder, blocks.map(function (block) {
    return block.clientId;
  }));
  currentOrder.slice(orderDiff.index, orderDiff.remove).forEach(function (_clientId) {
    return !orderDiff.insert.includes(_clientId) && byClientId["delete"](_clientId);
  });
  order["delete"](orderDiff.index, orderDiff.remove);
  order.insert(orderDiff.index, orderDiff.insert);

  var _iterator = _createForOfIteratorHelper(blocks),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _block = _step.value;
      var innerBlocks = _block.innerBlocks,
          block = (0, _objectWithoutProperties2["default"])(_block, _excluded);

      if (!byClientId.has(block.clientId) || !(0, _lodash.isEqual)(byClientId.get(block.clientId), block)) {
        byClientId.set(block.clientId, block);
      }

      updateBlocksDoc(yDocBlocks, innerBlocks, block.clientId);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
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

    currentDoc = commentsDoc.get(comment._id); // Update regular fields

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
 */


function updatePostDoc(doc, newPost) {
  var postDoc = doc.getMap('post');

  if (postDoc.get('title') !== newPost.title) {
    postDoc.set('title', newPost.title);
  }

  if (!postDoc.get('blocks')) {
    postDoc.set('blocks', new yjs.Map());
  }

  updateBlocksDoc(postDoc.get('blocks'), newPost.blocks || []);

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

  return Object.entries(commentsDoc.toJSON()).map(function (_ref) {
    var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
        id = _ref2[0],
        commentDoc = _ref2[1];

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
      replies: Object.entries(commentDoc.replies).map(function (_ref3) {
        var _ref4 = (0, _slicedToArray2["default"])(_ref3, 2),
            replyId = _ref4[0],
            entryDoc = _ref4[1];

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
 * @param {string}  clientId   Current block clientId.
 * @return {Array} Block list.
 */


function blocksDocToArray(yDocBlocks) {
  var _order$get;

  var clientId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (!yDocBlocks) {
    return [];
  }

  var order = yDocBlocks.get('order');
  order = (_order$get = order.get(clientId)) === null || _order$get === void 0 ? void 0 : _order$get.toArray();
  if (!order) return [];
  var byClientId = yDocBlocks.get('byClientId');
  return order.map(function (_clientId) {
    return _objectSpread(_objectSpread({}, byClientId.get(_clientId)), {}, {
      innerBlocks: blocksDocToArray(yDocBlocks, _clientId)
    });
  });
}
/**
 * Converts the post doc into a post object.
 *
 * @param {yjs.Doc} doc Shared doc.
 * @return {PostObject} Post object.
 */


function postDocToObject(doc) {
  var postDoc = doc.getMap('post');
  var blocks = blocksDocToArray(postDoc.get('blocks'));
  var comments = commentsDocToArray(postDoc.get('comments'));
  return {
    title: postDoc.get('title') || '',
    blocks: blocks,
    comments: comments
  };
}
//# sourceMappingURL=yjs.js.map