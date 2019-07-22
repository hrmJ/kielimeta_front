import { thunkCreator, getOriginalValuesForFilters } from './utils';
import filterReducer from '../reducers/datasetfilter';

let baseUrl = '%%API_SERVER_PROTOCOL%%://%%API_SERVER_HOST%%';
if (window.location.href.includes('istest')) {
  baseUrl = 'http://%%API_SERVER_HOST_TEST%%';
}

const setOriginalFilterValues = vals => {
  return {
    type: 'SET_ORIGINAL_FILTER_VALUES',
    vals
  };
};

const formQueryFromFilters = (filters, encode = true) => {
  let filterstrings = '?';
  if (filters) {
    filterstrings += Object.keys(filters)
      .map(key => {
        let thisfilter = `&${key}=`;
        if (Array.isArray(filters[key])) {
          if (encode) {
            thisfilter += filters[key].map(val => encodeURIComponent(val)).join(`&${key}=`);
          } else {
            thisfilter += filters[key].join(`&${key}=`);
          }
        } else {
          thisfilter += filters[key];
        }
        return thisfilter;
      })
      .join('&');
  }

  filterstrings = filterstrings.replace('?&', '?').replace('&&', '&');

  return filterstrings;
};

const filterDatasets = (filters = {}) => {
  const url = `${baseUrl}/datasets${formQueryFromFilters(filters)}`;
  return thunkCreator({
    types: ['FILTER_DATASETS_REQUEST', 'FILTER_DATASETS_SUCCESS', 'FILTER_DATASETS_ERROR'],
    promise: fetch(url, { mode: 'cors' }).then(response => response.json())
  });
};

/**
 * updateFilterVerbose
 *
 * Update a filter simply by replacing old vals with the vals given here
 *
 * @param key {String} the name of the filtered prop
 * @param vals {Array} the new values for this filter
 * @returns {undefined}
 */
const updateFilterVerbose = (key, vals) => {
  return {
    type: 'UPDATE_FILTER_VERBOSE',
    val: vals,
    key
  };
};

const updateFilter = (key, val, checked) => {
  return {
    type: 'UPDATE_FILTER',
    val,
    checked,
    key
  };
};

const updateAndFilter = (keyName, value, checked, filters, replacedVal) => dispatch => {
  let updatedFilters;

  if (!replacedVal) {
    const actualValue = filters[keyName]
      ? filters[keyName].find(thisval => thisval.replace(/§§.*/g, '') === value)
      : value;
    updatedFilters = filterReducer(filters, updateFilter(keyName, actualValue || value, checked));
    dispatch(updateFilter(keyName, actualValue || value, checked));
  } else {
    updatedFilters = {
      ...filters,
      [keyName]: filters[keyName].map(originalValue =>
        originalValue.replace(/§§.*/g, '') === replacedVal ? value : originalValue
      )
    };
    dispatch(updateFilterVerbose(keyName, updatedFilters[keyName]));
  }
  console.log(updatedFilters);
  return dispatch(filterDatasets(updatedFilters));
};

const resetOriginalValuesRaw = () => {
  const url = `${baseUrl}/datasets`;
  return fetch(url).then(res => res.json());
};

const filterByQuery = filters => {
  // CHECK if filters.query = '' and..
  return dispatch => {
    dispatch(filterDatasets(filters)).then(res => {
      dispatch(updateFilter('query', filters.query));
      if (filters.query === '') {
        resetOriginalValuesRaw().then(origRes =>
          dispatch(setOriginalFilterValues(getOriginalValuesForFilters(origRes)))
        );
      } else {
        dispatch(setOriginalFilterValues(getOriginalValuesForFilters(res)));
      }
    });
  };
};

const resetFilter = key => {
  return {
    type: 'RESET_FILTER',
    key
  };
};

const resetFilterAndRefresh = (keyName, filters) => {
  return dispatch => {
    const updatedFilters = filterReducer(filters, resetFilter(keyName));
    dispatch(resetFilter(keyName));
    dispatch(filterDatasets(updatedFilters));
  };
};

export {
  filterByQuery,
  updateFilter,
  formQueryFromFilters,
  filterDatasets,
  updateAndFilter,
  resetFilter,
  resetFilterAndRefresh,
  setOriginalFilterValues,
  updateFilterVerbose
};
