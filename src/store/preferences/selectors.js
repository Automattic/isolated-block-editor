/**
 * Is the feature active?
 *
 * @param {Object} state - Current state
 * @param {string} feature - Feature name
 * @param {boolean} [defaultValue=false] - Default value
 */
export function isFeatureActive( state, feature, defaultValue = false ) {
	return state.preferences[ feature ] === undefined ? defaultValue : state.preferences[ feature ];
}
