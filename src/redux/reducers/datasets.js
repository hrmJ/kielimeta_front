export default function datasetReducer(state = [], action) {
  const { type, ...rest } = action;

  switch (type) {
    case 'FILTER_DATASETS_REQUEST':
      break;
    case 'FILTER_DATASETS_SUCCESS':
      return rest.result;
      break;
    case 'FILTER_DATASETS_ERROR':
      break;
    case 'LIST_DATASETS_REQUEST':
      return state;
    case 'LIST_DATASETS_SUCCESS':
      return rest.result;
    case 'LIST_DATASETS_ERROR':
      break;
    case 'LIST_DATASETS':
      return rest.datasets;
    default:
      return state;
  }

  return state;
}
