export default function datasetReducer(state = { datasetList: 'idle' }, action) {
  const { type } = action;
  if (type === 'LIST_DATASETS_REQUEST') {
    return { ...state, datasetList: 'loading' };
  }
  if (type === 'LIST_DATASETS_SUCCESS') {
    return { ...state, datasetList: 'loaded' };
  }
  return state;
}
