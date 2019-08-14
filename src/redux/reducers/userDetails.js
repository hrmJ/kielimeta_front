export default (state = {}, action) => {
  const { type, ...rest } = action;
  if (type === 'USER_DETAILS_SUCCESS') {
    return rest.result;
  }
  return state;
};
