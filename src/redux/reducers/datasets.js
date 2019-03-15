export default function datasetReducer(state = {}, action) {
  const { type, ...rest } = action;

  switch (type) {
    case "LIST_DATASETS":
      return rest.datasets;
      break;
    default:
      return state;
  }

  return state;
}
