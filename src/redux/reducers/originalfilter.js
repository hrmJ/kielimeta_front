export default (state = {}, action) => {
  const { type, ...rest } = action;
  if (type === 'ORIGINAL_FILTERVALUES_SUCCESS') {
    return rest.result;
  }

  return state;
};
