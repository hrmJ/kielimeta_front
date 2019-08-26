export default (state = '', action) => {
  const { type, title } = action;

  if (type === 'UNSET_ACTIVE_TITLE') {
    return 'ACTIVE_TITLE_RESET';
  }
  if (type === 'SET_ACTIVE_TITLE') {
    return title;
  }
  return state;
};
