/**
 * Returns an action object used in signalling that a feature should be toggled.
 *
 * @param {string} scope       The feature scope (e.g. core/edit-post).
 * @param {string} featureName The feature name.
 */
export function toggleFeature(scope: string, featureName: string): ({ registry }: {
    registry: any;
}) => void;
/**
 * Returns an action object used in signalling that a feature should be set to
 * a true or false value
 *
 * @param {string}  scope       The feature scope (e.g. core/edit-post).
 * @param {string}  featureName The feature name.
 * @param {boolean} value       The value to set.
 *
 * @return {Object} Action object.
 */
export function setFeatureValue(scope: string, featureName: string, value: boolean): any;
/**
 * Returns an action object used in signalling that defaults should be set for features.
 *
 * @param {string}                  scope    The feature scope (e.g. core/edit-post).
 * @param {Object<string, boolean>} defaults A key/value map of feature names to values.
 *
 * @return {Object} Action object.
 */
export function setFeatureDefaults(scope: string, defaults: {
    [x: string]: boolean;
}): any;
export function enableComplementaryArea(scope: string, area: string): ({ registry }: {
    registry: any;
}) => void;
export function disableComplementaryArea(scope: string): ({ registry }: {
    registry: any;
}) => void;
export function pinItem(scope: string, item: string): any;
export function unpinItem(scope: string, item: string): ({ registry }: {
    registry: any;
}) => void;
//# sourceMappingURL=actions.d.ts.map