/**
 * Is the feature active?
 *
 * @param {Object} state - Current state
 * @param {string} feature - Feature name
 */
export function isFeatureActive( state, feature ) {
	return state.preferences[ feature ] ? state.preferences[ feature ] : false;
}
