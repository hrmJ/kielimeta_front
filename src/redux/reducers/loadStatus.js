export default function datasetReducer(state = { datasetList: 'idle' }, action) {
  const { type } = action;
  switch (type) {
    case 'LIST_DATASETS_REQUEST':
      return { ...state, datasetList: 'loading' };
    case 'LIST_DATASETS_SUCCESS':
      return { ...state, datasetList: 'loaded' };
    default:
      return state;
  }
}
