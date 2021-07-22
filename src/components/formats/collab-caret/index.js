import memoize from 'memize';
import classnames from 'classnames';
import { applyFormat, registerFormatType } from '@wordpress/rich-text';
import './style.css';

const FORMAT_NAME = 'asblocks/caret';

/**
 * Applies given carets to the given record.
 *
 * @param {Object} record The record to apply carets to.
 * @param {Array} carets The carets to apply.
 * @return {Object} A record with the carets applied.
 */
export function applyCarets( record, carets = [] ) {
	carets.forEach( ( caret ) => {
		let { start, end, id } = caret;
		const isCollapsed = start === end;
		const isShifted = isCollapsed && end >= record.text.length;

		if ( isShifted ) {
			start = record.text.length - 1;
		}

		if ( isCollapsed ) {
			end = start + 1;
		}

		record = applyFormat(
			record,
			{
				type: FORMAT_NAME,
				attributes: {
					id: 'asblocks-caret-' + id,
					class: classnames( {
						'is-collapsed': isCollapsed,
						'is-shifted': isShifted,
					} ),
					title: id,
				},
			},
			start,
			end
		);
	} );

	return record;
}

const getCarets = memoize( ( peers, richTextIdentifier, blockClientId ) => {
	return Object.entries( peers )
		.filter( ( [ , peer ] ) => {
			return (
				peer?.start?.clientId === blockClientId &&
				peer?.end?.clientId === blockClientId &&
				peer.start.attributeKey === richTextIdentifier
			);
		} )
		.map( ( [ id, peer ] ) => ( {
			id,
			start: peer.start.offset,
			end: peer.end.offset,
		} ) );
} );

export const settings = {
	title: 'AsBlocks caret',
	tagName: 'mark',
	className: 'asblocks-caret',
	attributes: {
		id: 'id',
		className: 'class',
	},
	edit() {
		return null;
	},
	__experimentalGetPropsForEditableTreePreparation( select, { richTextIdentifier, blockClientId } ) {
		return {
			carets: getCarets( select( 'isolated/editor' ).getPeers(), richTextIdentifier, blockClientId ),
		};
	},
	__experimentalCreatePrepareEditableTree( { carets } ) {
		return ( formats, text ) => {
			if ( ! carets?.length ) {
				return formats;
			}

			let record = { formats, text };
			record = applyCarets( record, carets );
			return record.formats;
		};
	},
};

export const registerFormatCollabCaret = () => {
	registerFormatType( FORMAT_NAME, settings );
};
