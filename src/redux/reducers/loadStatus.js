export default function datasetReducer(state = { datasetList: 'idle' }, action) {
  const { type } = action;
  switch (type) {
    case 'DATASET_DETAILS_EDIT_REQUEST':
      return { ...state, datasetDetails: 'loading' };
    case 'DATASET_DETAILS_EDIT_SUCCESS':
      return { ...state, datasetDetails: 'loaded' };
    case 'LIST_DATASETS_REQUEST':
      return { ...state, datasetList: 'loading' };
    case 'LIST_DATASETS_SUCCESS':
      return { ...state, datasetList: 'loaded' };
    default:
      return state;
  }
}
