/**
 * WordPress dependencies
 */
import {
	DocumentOutline,
	WordCount,
	TimeToRead,
	CharacterCount,
} from '@wordpress/editor';
import {
	__experimentalText as Text
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function ListViewOutline() {
	return (
		<>
			<div className="editor-list-view-sidebar__outline">
				<div>
					<Text>{ __( 'Characters:' ) }</Text>
					<Text>
						<CharacterCount />
					</Text>
				</div>
				<div>
					<Text>{ __( 'Words:' ) }</Text>
					<WordCount />
				</div>
				<div>
					<Text>{ __( 'Time to read:' ) }</Text>
					<TimeToRead />
				</div>
			</div>
			<DocumentOutline />
		</>
	);
}
