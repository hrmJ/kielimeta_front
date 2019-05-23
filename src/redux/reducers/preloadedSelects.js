export default (state = {}, action) => {
  const { type, result = {} } = action;
  const { vals, key } = result;
  if (type.includes('SUCCESS') && key) {
    return { ...state, [key]: vals };
  }

  return state;
};
