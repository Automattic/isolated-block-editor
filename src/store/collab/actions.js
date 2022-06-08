export function setYDoc( doc ) {
	return {
		type: 'SET_COLLAB_YJS_DOC',
		doc,
	};
}
export function setUndoManager( undoManager ) {
	return {
		type: 'SET_COLLAB_UNDO_MANAGER',
		undoManager,
	};
}
