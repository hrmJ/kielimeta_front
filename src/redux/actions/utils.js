import { addIfUnique } from '../../utils';
import { langReducer } from './filterReduces';

const baseUrlRaw = '%%API_SERVER_PROTOCOL%%://%%API_SERVER_HOST%%';
const protocol = window.location.protocol;
const baseUrl = protocol !== 'https:' ? baseUrlRaw.replace('https', 'http') : baseUrlRaw;

/**
 *
 * A way to mock the url for jest tests
 *
 * @param {string} url the url to be set
 */
const setBaseUrl = url => {
  // TOO
  // baseUrl = url;
  return url;
};

const thunkCreator = action => {
  const { types, promise, ...rest } = action;
  const [REQUESTED, RESOLVED, REJECTED] = types;

  return dispatch => {
    dispatch({ ...rest, type: REQUESTED });

    return promise
      .then(result => {
        if (result.ok !== undefined) {
          if (!result.ok) {
            throw new Error(result.statusText);
          }
        }
        if (result.error) throw new Error(result.error);
        dispatch({ ...rest, type: RESOLVED, result });
        return result;
      })
      .catch(error => {
        dispatch({ ...rest, type: REJECTED, error });
        throw error;
      });
  };
};

/**
 * Resets the values for all the filters by using a specific endpoint in
 * the API
 *
 * @param {*} datasets an array containing all the datasets
 * @returns {*} an object with default values for each of the filters availble on the dataset list page
 */
const getOriginalValuesForFilters = () => {
  const url = `${baseUrl}/original_values`;
  return thunkCreator({
    types: [
      'ORIGINAL_FILTERVALUES_REQUEST',
      'ORIGINAL_FILTERVALUES_SUCCESS',
      'ORIGINAL_FILTERVALUES_ERROR'
    ],
    promise: fetch(url, { mode: 'cors' }).then(response => response.json())
  });
};

/**
 * Resets the values for all the filters by scanning the curent datasets on
 * the client side
 *
 * @param {*} datasets an array containing all the datasets
 * @returns {*} an object with default values for each of the filters availble on the dataset list page
 */
const getOriginalValuesForFiltersClientSide = datasets =>
  datasets.reduce(
    (prev, ds) => {
      const { lang, annotations, resourcetype: existingRestypes, modality, speakerStatus } = prev;
      const { languages = [], resourcetype } = ds;
      return {
        ...languages.reduce(langReducer, { lang, annotations, modality, speakerStatus }),
        resourcetype: addIfUnique(existingRestypes, resourcetype)
      };
    },
    { lang: [], resourcetype: [], annotations: [], modality: [], speakerStatus: [] }
  );

const unSetActiveTitle = () => ({
  type: 'UNSET_ACTIVE_TITLE'
});

export { thunkCreator, getOriginalValuesForFilters, baseUrl, setBaseUrl, unSetActiveTitle };
