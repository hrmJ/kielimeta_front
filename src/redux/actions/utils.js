import { addIfUnique } from '../../utils';
import { langReducer } from './filterReduces';

const baseUrl = window.location.href.includes('istest')
  ? 'http://%%API_SERVER_HOST_TEST%%'
  : '%%API_SERVER_PROTOCOL%%://%%API_SERVER_HOST%%';

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
 * Resets the values for all the filters
 *
 * @param {*} datasets an array containing all the datasets
 * @returns {*} an object with default values for each of the filters availble on the dataset list page
 */
const getOriginalValuesForFilters = datasets =>
  datasets.reduce(
    (prev, ds) => {
      const { lang, annotations, resourcetype: existingRestypes } = prev;
      const { languages = [], resourcetype } = ds;
      return {
        ...languages.reduce(langReducer, { lang, annotations }),
        resourcetype: addIfUnique(existingRestypes, resourcetype)
      };
    },
    { lang: [], resourcetype: [], annotations: [] }
  );

export { thunkCreator, getOriginalValuesForFilters, baseUrl, setBaseUrl };
