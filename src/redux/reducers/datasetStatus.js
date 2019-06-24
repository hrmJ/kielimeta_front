export default function datasetReducer(state = 'idle', action) {
  const { type } = action;
  if (type === 'LIST_DATASETS_REQUEST') {
    return 'loading';
  }
  if (type === 'LIST_DATASETS_SUCCESS') {
    return 'loaded';
  }
  return state;
}
