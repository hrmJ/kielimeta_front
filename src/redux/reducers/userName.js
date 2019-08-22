export default (state = [], action) => {
  const { type, result } = action;
  if (type === 'FILTER_USERNAMES_SUCCESS') {
    return result;
  }
  if (type === 'FILTER_USERNAMES_REQUEST' || type === 'FILTER_USERNAMES_FAILURE') {
    return [];
  }
  return state;
};
