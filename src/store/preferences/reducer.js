/**
 * WordPress dependencies
 */

const reducer = ( state, action ) => {
	switch ( action.type ) {
		case 'TOGGLE_FEATURE':
			const { preferencesKey, ...preferences } = state;
			const updatedPreferences = {
				...preferences,
				[ action.feature ]: state[ action.feature ] ? !state[ action.feature ] : true,
			};

			if ( preferencesKey && window.localStorage ) {
				localStorage.setItem( preferencesKey, JSON.stringify( updatedPreferences ) );
			}

			return {
				preferencesKey,
				...updatedPreferences,
			};
	}

	return state;
};

export default reducer;
