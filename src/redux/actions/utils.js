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

const getOriginalValuesForFilters = datasets => {
  /**
   *
   * Resets the values for filters
   *
   */

  let langList = [
    ...new Set(
      [].concat(...datasets.map(ds => ds.languages.map(lang => lang.details.language_code)))
    )
  ];
  langList = langList.map(code => ({
    label: printLanguageName(code),
    value: code
  }));

  return { lang: langList };
};

export { thunkCreator, getOriginalValuesForFilters };
