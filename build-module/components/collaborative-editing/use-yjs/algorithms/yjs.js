/**
 * External dependencies
 */
import * as yjs from 'yjs';
import * as diff from 'lib0/diff';
import { isEqual } from 'lodash';

/**
 * Internal dependencies
 */
import { applyHTMLDelta, richTextMapToHTML } from './rich-text';
import sanitizeHTML from './sanitize-html';

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
export function updateBlocksDoc(yDocBlocks, blocks, richTextHint) {
  let clientId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  if (!yDocBlocks.has('order')) {
    yDocBlocks.set('order', new yjs.Map());
  }
  let order = yDocBlocks.get('order');
  if (!order.has(clientId)) order.set(clientId, new yjs.Array());
  order = order.get(clientId);
  if (!yDocBlocks.has('byClientId')) {
    yDocBlocks.set('byClientId', new yjs.Map());
  }
  const byClientId = yDocBlocks.get('byClientId');
  const currentOrder = order.toArray();
  const orderDiff = diff.simpleDiffArray(currentOrder, blocks.map(block => block.clientId));
  currentOrder.slice(orderDiff.index, orderDiff.remove).forEach(_clientId => !orderDiff.insert.includes(_clientId) && byClientId.delete(_clientId));
  order.delete(orderDiff.index, orderDiff.remove);
  order.insert(orderDiff.index, orderDiff.insert);
  if (!yDocBlocks.has('richTexts')) {
    yDocBlocks.set('richTexts', new yjs.Map());
  }
  for (const _block of blocks) {
    const {
      innerBlocks,
      ...block
    } = _block;
    const isPreexisting = byClientId.has(block.clientId);
    if (!isPreexisting || !isEqual(byClientId.get(block.clientId), block)) {
      const richTexts = yDocBlocks.get('richTexts');
      getKnownRichTextAttributes(block.clientId, richTextHint, richTexts).forEach(attributeKey => {
        updateRichText({
          newBlock: block,
          attributeKey,
          richTexts
        });
      });
      byClientId.set(block.clientId, block);
    }
    updateBlocksDoc(yDocBlocks, innerBlocks, richTextHint, block.clientId);
  }
}

/**
 * @param clientId
 * @param richTextHint
 * @param richTexts
 * @return {Set<string>}
 */
function getKnownRichTextAttributes(clientId, richTextHint, richTexts) {
  const knownRichTextAttributes = richTexts.has(clientId) && richTexts.get(clientId);
  const attributeSet = knownRichTextAttributes ? new Set(knownRichTextAttributes.keys()) : new Set();
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
export function updateRichText(_ref) {
  let {
    newBlock,
    attributeKey,
    richTexts
  } = _ref;
  const newText = newBlock.attributes[attributeKey];
  if (!richTexts.has(newBlock.clientId)) {
    richTexts.set(newBlock.clientId, new yjs.Map());
  }
  const blockWithRichTexts = richTexts.get(newBlock.clientId);
  if (!blockWithRichTexts.has(attributeKey)) {
    blockWithRichTexts.set(attributeKey, new yjs.Map([['xmlText', new yjs.XmlText()], ['multilineTag', undefined], ['replacements', new yjs.Array()], ['multilineWrapperReplacements', new yjs.Array()]]));
  }
  const richTextMap = blockWithRichTexts.get(attributeKey);
  const oldText = richTextMapToHTML(blockWithRichTexts.get(attributeKey));
  applyHTMLDelta(oldText, newText, richTextMap);
}

/**
 * Updates the comments doc with the local comments changes.
 *
 * @param {yjs.Map} commentsDoc  comments doc.
 * @param {Object[]}  comments     Updated comments.
 */
export function updateCommentsDoc(commentsDoc) {
  let comments = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  comments.forEach(comment => {
    let currentDoc = commentsDoc.get(comment._id);
    const isNewDoc = !currentDoc;
    if (!currentDoc) {
      commentsDoc.set(comment._id, new yjs.Map());
    }
    currentDoc = commentsDoc.get(comment._id);
    // Update regular fields
    ['type', 'content', 'createdAt', 'status', 'start', 'end', 'authorId', 'authorName'].forEach(field => {
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
export function updateCommentRepliesDoc(repliesDoc) {
  let replies = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  replies.forEach(reply => {
    let currentReplyDoc = repliesDoc.get(reply._id);
    const isNewDoc = !currentReplyDoc;
    if (!currentReplyDoc) {
      repliesDoc.set(reply._id, new yjs.Map());
    }
    currentReplyDoc = repliesDoc.get(reply._id);
    ['content', 'createdAt', 'authorId', 'authorName'].forEach(field => {
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
export function updatePostDoc(doc, newPost, richTextHint) {
  const postDoc = doc.getMap('post');
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
export function commentsDocToArray(commentsDoc) {
  if (!commentsDoc) {
    return [];
  }
  return Object.entries(commentsDoc.toJSON()).map(_ref2 => {
    let [id, commentDoc] = _ref2;
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
      replies: Object.entries(commentDoc.replies).map(_ref3 => {
        let [replyId, entryDoc] = _ref3;
        return {
          _id: replyId,
          content: entryDoc.content,
          createdAt: entryDoc.createdAt,
          authorId: entryDoc.authorId,
          authorName: entryDoc.authorName
        };
      }).sort((a, b) => a.createdAt - b.createdAt)
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
export function blocksDocToArray(yDocBlocks) {
  var _order$get;
  let {
    clientId = '',
    sanitize = false
  } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!yDocBlocks) {
    return [];
  }
  let order = yDocBlocks.get('order');
  order = (_order$get = order.get(clientId)) === null || _order$get === void 0 ? void 0 : _order$get.toArray();
  if (!order) return [];
  const byClientId = yDocBlocks.get('byClientId');
  return order.map(_clientId => {
    const richTextMap = yDocBlocks.get('richTexts').get(_clientId) || new yjs.Map();
    const richTextsAsStrings = Array.from(richTextMap.entries()).reduce((acc, _ref4) => {
      let [key, value] = _ref4;
      return {
        ...acc,
        [key]: richTextMapToHTML(value)
      };
    }, {});
    const attributes = {
      ...byClientId.get(_clientId).attributes,
      ...richTextsAsStrings
    };
    if (sanitize) {
      for (const key in attributes) {
        attributes[key] = sanitizeHTML(attributes[key]);
      }
    }
    return {
      ...byClientId.get(_clientId),
      attributes,
      innerBlocks: blocksDocToArray(yDocBlocks, {
        clientId: _clientId,
        sanitize
      })
    };
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
export function postDocToObject(doc) {
  let {
    sanitize = false
  } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const postDoc = doc.getMap('post');
  const blocks = blocksDocToArray(postDoc.get('blocks'), {
    sanitize
  });
  const comments = commentsDocToArray(postDoc.get('comments'));
  return {
    title: postDoc.get('title') || '',
    blocks,
    comments
  };
}
//# sourceMappingURL=yjs.js.map