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
export function updateBlocksDoc(yDocBlocks: yjs.Map<any>, blocks: any[], richTextHint?: import("../..").RichTextHint | undefined, clientId?: string): void;
/**
 * Updates the RichText value in the richTexts yMap using index-based manipulation.
 *
 * @param {Object} args
 * @param {Object} args.newBlock
 * @param {string} args.attributeKey
 * @param {yjs.Map} args.richTexts
 */
export function updateRichText({ newBlock, attributeKey, richTexts }: {
    newBlock: any;
    attributeKey: string;
    richTexts: yjs.Map<any>;
}): void;
/**
 * Updates the comments doc with the local comments changes.
 *
 * @param {yjs.Map} commentsDoc  comments doc.
 * @param {Object[]}  comments     Updated comments.
 */
export function updateCommentsDoc(commentsDoc: yjs.Map<any>, comments?: any[]): void;
/**
 * Updates the replies doc with the local replies changes.
 *
 * @param {yjs.Map} repliesDoc  replies doc.
 * @param {Object[]}  replies     Updated replies.
 */
export function updateCommentRepliesDoc(repliesDoc: yjs.Map<any>, replies?: any[]): void;
/**
 * Updates the post doc with the local post changes.
 *
 * @param {yjs.Doc} doc     Shared doc.
 * @param {PostObject}  newPost Updated post.
 * @param {RichTextHint} [richTextHint]
 */
export function updatePostDoc(doc: yjs.Doc, newPost: PostObject, richTextHint?: import("../..").RichTextHint | undefined): void;
/**
 * Converts the comments doc into a comment list.
 *
 * @param {yjs.Map} commentsDoc Comments doc.
 * @return {Array} Comment list.
 */
export function commentsDocToArray(commentsDoc: yjs.Map<any>): any[];
/**
 * Converts the block doc into a block list.
 *
 * @param {yjs.Map} yDocBlocks Block doc.
 * @param {string}  clientId   Current block clientId.
 * @return {Array} Block list.
 */
export function blocksDocToArray(yDocBlocks: yjs.Map<any>, clientId?: string): any[];
/**
 * Converts the post doc into a post object.
 *
 * @param {yjs.Doc} doc Shared doc.
 * @return {PostObject} Post object.
 */
export function postDocToObject(doc: yjs.Doc): PostObject;
export type PostObject = {
    title: string;
    blocks: any[];
    comments: any[];
};
export type RichTextHint = import('../yjs-doc').RichTextHint;
import * as yjs from "yjs";
//# sourceMappingURL=yjs.d.ts.map