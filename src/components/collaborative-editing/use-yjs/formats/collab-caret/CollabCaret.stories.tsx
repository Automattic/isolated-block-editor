export default {
	title: 'Collaboration/Components/Caret',
	component: CollabCaret,
};

function CollabCaret( { label, color } ) {
	return (
		<p contentEditable style={ { padding: '8px' } }>
			Lorem ipsum dolor sit
			<mark
				className="iso-editor-collab-caret is-collapsed"
				title={ label }
				style={ { '--iso-editor-collab-caret-color': color } as React.CSSProperties }
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
