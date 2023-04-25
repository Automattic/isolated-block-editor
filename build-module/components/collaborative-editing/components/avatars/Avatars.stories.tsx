/**
 * External dependencies
 */
import { sample } from 'lodash';

/**
 * Internal dependencies
 */
import { CollaborativeEditingAvatars, CollaborativeEditingAvatar } from '.';
import { defaultColors } from '../../use-yjs';

import { Story } from '@storybook/react';

export default {
	title: 'Collaboration/Components/Avatars',
	component: CollaborativeEditingAvatars,
};

const generateRandomPeers = ( count ) => {
	return count
		? [ ...Array( count ) ].map( ( peer, index ) => ( {
				id: index.toString(),
				name: `Peery Collabson ${ index }`,
				// eslint-disable-next-line no-restricted-syntax
				avatarUrl: `https://i.pravatar.cc/64?cacheBust=${ Math.random() }`,
				color: sample( defaultColors ),
		  } ) )
		: [];
};

const onAvatarClickMock = () => {};

type Props = {
	peerCount: number;
};

const Template: Story< Props > = ( { peerCount } ) => {
	// @ts-ignore
	return <CollaborativeEditingAvatars peers={ generateRandomPeers( peerCount ) } onAvatarClick={ onAvatarClickMock } />;
};

export const Default = Template.bind( {} );
Default.args = {
	peerCount: 25,
};

export const Empty = Template.bind( {} );
Empty.args = {
	peerCount: 0,
};

export const NoImage = ( args ) => {
	return <CollaborativeEditingAvatar peer={ args } onAvatarClick={ onAvatarClickMock } />;
};
NoImage.args = {
	id: 0,
	name: 'Peery Collabson',
	color: sample( defaultColors ),
};
