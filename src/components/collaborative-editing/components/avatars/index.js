/**
 * WordPress dependencies
 */
import { Popover, VisuallyHidden } from '@wordpress/components';
import { withSelect, useDispatch } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { store as blockEditorStore } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import './style.scss';

/**
 * @param {Object} props
 * @param {import("../..").AvailablePeer[]} props.peers
 */
export function CollaborativeEditingAvatars( { peers } ) {
	const MAX_AVATAR_COUNT = 4;
	const shouldOverflow = peers.length > MAX_AVATAR_COUNT;
	const actualAvatarCount = shouldOverflow ? MAX_AVATAR_COUNT - 1 : MAX_AVATAR_COUNT;

	return (
		<div className="iso-editor-collab-avatars">
			<VisuallyHidden>Currently editing:</VisuallyHidden>

			{ peers.slice( 0, actualAvatarCount ).map( ( peer ) => (
				<CollaborativeEditingAvatar key={ peer.id } peer={ peer } />
			) ) }

			{ shouldOverflow && <CollaborativeEditingAvatarsOverflow peers={ peers?.slice( actualAvatarCount ) } /> }
		</div>
	);
}

export function CollaborativeEditingAvatar( { peer } ) {
	const [ isVisible, setIsVisible ] = useState( false );
	const { selectBlock } = useDispatch( blockEditorStore );

	const focusPeerSelectedBlock = () => {
		if ( peer && peer.start && peer.start.clientId ) {
			selectBlock( peer.start.clientId );
		}
	};

	return (
		<div
			className="iso-editor-collab-avatars__avatar"
			aria-label={ peer.name }
			onMouseEnter={ () => setIsVisible( true ) }
			onMouseLeave={ () => setIsVisible( false ) }
			tabIndex={ -1 }
			role="button"
			onKeyDown={ () => {} }
			onClick={ focusPeerSelectedBlock }
			style={ {
				borderColor: peer.color,
				background: peer.color,
			} }
		>
			{ isVisible && (
				<Popover className="iso-editor-collab-avatars__popover" animate={ false }>
					{ peer.name }
				</Popover>
			) }
			{ peer.avatarUrl ? (
				<img className="iso-editor-collab-avatars__image" src={ peer.avatarUrl } alt="" />
			) : (
				<span className="iso-editor-collab-avatars__name-initial">{ peer.name.charAt( 0 ) }</span>
			) }
		</div>
	);
}

export function CollaborativeEditingAvatarsOverflow( { peers } ) {
	const MAX_NAME_COUNT = 20;
	const [ isVisible, setIsVisible ] = useState( false );

	const NameList = () => {
		return (
			<>
				<ul className="iso-editor-collab-avatars__overflow-list">
					{ peers.slice( 0, MAX_NAME_COUNT ).map( ( peer ) => (
						<li className="iso-editor-collab-avatars__overflow-list-item" key={ peer.id }>
							{ peer.name }
						</li>
					) ) }
				</ul>
				{ peers.length > MAX_NAME_COUNT && (
					<p className="iso-editor-collab-avatars__overflow-more">
						{ sprintf(
							/* translators: %s: number of how many more users there are */
							__( 'and %s more' ),
							peers.length - MAX_NAME_COUNT
						) }
					</p>
				) }
			</>
		);
	};

	return (
		<div className="iso-editor-collab-avatars__overflow">
			{ isVisible && (
				<Popover className="iso-editor-collab-avatars__popover" animate={ false }>
					<NameList />
				</Popover>
			) }
			<span
				aria-hidden="true"
				onMouseEnter={ () => setIsVisible( true ) }
				onMouseLeave={ () => setIsVisible( false ) }
			>
				{ `+${ peers.length }` }
			</span>
			<VisuallyHidden>
				<NameList />
			</VisuallyHidden>
		</div>
	);
}

export default withSelect( ( select ) => {
	const peers = select( 'isolated/editor' ).getPeers();

	return {
		peers: Object.keys( peers ).map( ( id ) => {
			return {
				id,
				...peers[ id ],
			};
		} ),
	};
} )( CollaborativeEditingAvatars );
