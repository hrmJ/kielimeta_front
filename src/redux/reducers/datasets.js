export default function datasetReducer(state = [], action) {
  const { type, ...rest } = action;

  switch (type) {
    case 'REMOVE_DATASET_FROM_STORE':
      return [...state.filter(ds => ds.id !== rest.id)];
    case 'FILTER_DATASETS_REQUEST':
      break;
    case 'FILTER_DATASETS_SUCCESS':
      return rest.result;
    case 'FILTER_DATASETS_ERROR':
      break;
    case 'LIST_DATASETS_SUCCESS':
      return rest.result.map(ds => ({
        title: ds.title,
        languages: ds.languages.map(lang => ({
          details: {
            language_name: lang.details.language_name,
            language_code: lang.details.language_code
          }
        })),
        id: ds.id,
        subversion: ds.subversion
      }));
    case 'LIST_DATASETS_ERROR':
      break;
    case 'LIST_DATASETS':
      return rest.datasets;
    default:
      return state;
  }

  return state;
}
