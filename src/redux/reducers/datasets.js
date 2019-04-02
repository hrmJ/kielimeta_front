export default function datasetReducer(state = [], action) {
  const { type, ...rest } = action;

  switch (type) {
    case 'LIST_DATASETS_REQUEST':
      return state;
    case 'LIST_DATASETS_SUCCESS':
      return rest.result;
      break;
    case 'LIST_DATASETS_ERROR':
      break;
    case 'LIST_DATASETS':
      return rest.datasets;
      break;
    default:
      return state;
  }

  return state;
}
