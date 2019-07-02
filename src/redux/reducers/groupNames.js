export default (state = [], action) => {
  const { type, ...rest } = action;
  if (type === 'LIST_GROUPS_SUCCESS') {
    return rest.result;
  }
  return state;
};
