export default (state = {}, action) => {
  const { type, ...rest } = action;

  if (type === 'FILTER_DATASETS_SUCCESS') {
    return { currentPage: rest.result.current_page, hasNext: rest.result.has_next };
  }

  return state;
};
