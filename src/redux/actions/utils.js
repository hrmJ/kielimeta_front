import { printLanguageName } from '../../components/content/languagebadge';

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
 * Resets the values for the filters
 *
 * @param {*} datasets an array containing all the datasets
 * @returns an object with default values for each of the filters availble on the dataset list page
 */
const getOriginalValuesForFilters = datasets => {
  const langList = [
    ...new Set(
      [].concat(
        ...datasets
          .filter(ds => Object.keys(ds).includes('languages'))
          .map(ds => ds.languages.map(lang => lang.details.language_code))
      )
    )
  ].map(code => ({
    label: printLanguageName(code),
    value: code
  }));

  const restypes = [
    ...new Set(
      datasets.filter(ds => Object.keys(ds).includes('resourcetype')).map(ds => ds.resourcetype)
    )
  ].map(restype => ({ label: restype, value: restype }));

  return { lang: langList, resourcetype: restypes };
};

export { thunkCreator, getOriginalValuesForFilters };
