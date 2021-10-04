/**
 * External dependencies
 */
import { sample } from 'lodash';

/**
 * Internal dependencies
 */
import { CollaborativeEditingAvatars, CollaborativeEditingAvatar } from '.';
import { defaultColors } from '../../use-yjs';

import type { Story } from '@storybook/react';

export default {
	title: 'Collaboration/Components/Avatars',
	component: CollaborativeEditingAvatars,
};

const generateRandomPeers = ( count ) => {
	return count
		? [ ...Array( count ) ].map( ( peer, index ) => ( {
				id: index.toString(),
				name: `Peery Collabson ${ index }`,
				avatarUrl: `https://i.pravatar.cc/64?cacheBust=${ Math.random() }`,
				color: sample( defaultColors ) as string,
		  } ) )
		: [];
};

type Props = {
	peerCount: number;
};

const Template: Story< Props > = ( { peerCount } ) => {
	return <CollaborativeEditingAvatars peers={ generateRandomPeers( peerCount ) } />;
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
	return <CollaborativeEditingAvatar peer={ args } />;
};
NoImage.args = {
	id: 0,
	name: 'Peery Collabson',
	color: sample( defaultColors ),
};
