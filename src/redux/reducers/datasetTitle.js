export default (state = {}, action) => {
  const { type, results } = action;
  if (type === 'FETCH_DATASET_TITLES') {
    return { ...results };
  }
  return state;
};
