import { applyCarets, settings } from '.';

export default {
	title: 'Collaboration/Components/Caret',
	component: CollabCaret,
};

function cssStringToObject( cssString ) {
	const keyValuePairs = cssString
		.split( ';' )
		.map( ( line ) => line.trim().split( ':' ) )
		.filter( ( pair ) => pair.length === 2 );
	return Object.fromEntries( keyValuePairs );
}

function CollabCaret( { label, color } ) {
	const { activeFormats } = applyCarets( { formats: [], text: 'foo' }, [ { label, color, start: 0, end: 0 } ] );
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

const Template = ( props ) => {
	return <CollabCaret { ...props } />;
};

export const Default = Template.bind( {} );
Default.args = {
	label: 'Peery McPeerson',
	color: '#C3498D',
};
