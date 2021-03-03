var actions = {
  /**
   * Toggle the feature
   * @param {string} feature - Feature name
   */
  toggleFeature: function toggleFeature(feature) {
    return {
      type: 'TOGGLE_FEATURE',
      feature: feature
    };
  }
};
export default actions;
//# sourceMappingURL=actions.js.map