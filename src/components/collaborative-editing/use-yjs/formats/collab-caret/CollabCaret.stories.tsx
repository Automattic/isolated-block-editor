/**
 * External dependencies
 */
import type { Story } from '@storybook/react';

/**
 * Internal dependencies
 */
import { applyCarets, settings } from '.';

export default {
	title: 'Collaboration/Components/Caret',
	component: CollabCaret,
};

const mockRecord = {
	formats: [],
	multiline: { checkOffset: () => ( {} ) },
};

function cssStringToObject( cssString ) {
	const keyValuePairs = cssString
		.split( ';' )
		.map( ( line ) => line.trim().split( ':' ) )
		.filter( ( pair ) => pair.length === 2 );
	return Object.fromEntries( keyValuePairs );
}

function CollabCaret( { label, color } ) {
	const { activeFormats } = applyCarets( { ...mockRecord, text: 'foo' }, [ { label, color, start: 0, end: 0 } ] );
	const { class: additionalClasses, style, ...attributes } = activeFormats[ 0 ].attributes;

	return (
		<p contentEditable style={ { padding: '8px' } }>
			Lorem ipsum dolor sit
			<mark
				className={ `${ settings.className } ${ additionalClasses }` }
				style={ cssStringToObject( style ) }
				{ ...attributes }
			/>{ ' ' }
			amet consectetur
		</p>
	);
}

function CollabCaretMultiLine( { label, color } ) {
	const { activeFormats } = applyCarets( { ...mockRecord, text: 'foo' }, [ { label, color, start: 21, end: 381 } ] );
	const { class: additionalClasses, style, ...attributes } = activeFormats[ 0 ].attributes;

	return (
		<p contentEditable style={ { padding: '8px' } }>
			Lorem ipsum dolor sit
			<mark
				className={ `${ settings.className } ${ additionalClasses }` }
				style={ cssStringToObject( style ) }
				{ ...attributes }
			>
				mmy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy
				text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
				specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
				remaining essentially unchanged. It was popularised
			</mark>{ ' ' }
			in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with
			desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
		</p>
	);
}

type Props = {
	label: string;
	color: string;
};

const Template: Story< Props > = ( props ) => {
	return <CollabCaret { ...props } />;
};

export const Default = Template.bind( {} );
Default.args = {
	label: 'Peery McPeerson',
	color: '#C3498D',
};

export const MultiLine: Story< Props > = CollabCaretMultiLine.bind( {} );
MultiLine.args = { ...Default.args };
