export default (state = {}, action) => {
  /**
   * Lists the maximum number of possible values for a filter
   */
  const { type, vals } = action;
  if (type == 'SET_ORIGINAL_FILTER_VALUES') {
    return vals;
  }

  return state;
};
