export default (state = null, action) => {
  const { type, ...rest } = action;

  if (type === 'SET_EDITED_ID') {
    return rest.newId * 1;
  }

  return state;
};
