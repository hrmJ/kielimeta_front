const thunkCreator = (action) => {
  const { types, promise, ...rest } = action;
  const [REQUESTED, RESOLVED, REJECTED] = types;

  return (dispatch) => {
    dispatch({ ...rest, type: REQUESTED });

    return promise
      .then((result) => {
        if (result.ok !== undefined) {
          if (!result.ok) {
            throw new Error(result.statusText);
          }
        }
        if (result.error) throw new Error(result.error);
        dispatch({ ...rest, type: RESOLVED, result });
        return result;
      })
      .catch((error) => {
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
const getOriginalValuesForFilters = (datasets) => {
  const flags = {};
  const langObjList = [];
  for (const ds of datasets) {
    if (Object.keys(ds).includes('languages')) {
      for (const lang of ds.languages) {
        if (!flags[lang.details.code]) {
          flags[lang.details.code] = true;
          langObjList.push(lang.details);
        }
      }
    }
  }
  const langList = langObjList.map(obj => ({
    label: obj.name,
    value: obj.code,
  }));

  const restypes = [
    ...new Set(
      datasets.filter(ds => Object.keys(ds).includes('resourcetype')).map(ds => ds.resourcetype),
    ),
  ].map(restype => ({ label: restype, value: restype }));

  return { lang: langList, resourcetype: restypes };
};

export { thunkCreator, getOriginalValuesForFilters };
