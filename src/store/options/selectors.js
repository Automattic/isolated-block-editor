/**
 * Get the option value
 *
 * @param {Object} state - Current state
 * @param {string} option - Option name
 * @return {boolean}
 */
export function isOptionActive( state, option ) {
	return state.options[ option ] ? state.options[ option ] : false;
}
