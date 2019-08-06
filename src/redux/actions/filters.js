import { thunkCreator, getOriginalValuesForFilters } from './utils';
import filterReducer from '../reducers/datasetfilter';

let baseUrl = '%%API_SERVER_PROTOCOL%%://%%API_SERVER_HOST%%';
if (window.location.href.includes('istest')) {
  baseUrl = 'http://%%API_SERVER_HOST_TEST%%';
}

const startFilter = () => ({
  type: 'FILTER_DATASETS_REQUEST'
});

const setOriginalFilterValues = vals => {
  return {
    type: 'SET_ORIGINAL_FILTER_VALUES',
    vals
  };
};

const formQueryFromFilters = (filters, encode = true) => {
  let filterstrings = '&';
  if ('query' in filters) {
    filterstrings += `query=${filters.query}`;
  }
  if (filters) {
    const params = Object.keys(filters)
      .filter(key => key !== 'query')
      .map(key => {
        let thisfilter = `&${key}=`;
        if (Array.isArray(filters[key])) {
          // Note: loaded front end clients might accidentally produce the same
          // value multiple times, which, in turn, causes trouble on the backend
          // just in case: make each filter only contain unique values
          const valuesOfFilter = [...new Set(filters[key])];
          if (encode) {
            thisfilter += valuesOfFilter.map(val => encodeURIComponent(val)).join(`&${key}=`);
          } else {
            thisfilter += valuesOfFilter.join(`&${key}=`);
          }
        } else {
          thisfilter += filters[key];
        }
        return thisfilter;
      });
    filterstrings += params.join('&');
  }

  filterstrings = filterstrings.replace('?&', '?').replace('&&', '&');

  return filterstrings;
};

const filterDatasets = (filters = {}, page = 1) => {
  const url = `${baseUrl}/datasets?page=${page}${formQueryFromFilters(filters)}`;
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
    const actualValue =
      filters[keyName] && Array.isArray(filters[keyName])
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
    dispatch(updateFilterVerbose(keyName, [...new Set(updatedFilters[keyName])]));
  }
  return dispatch(filterDatasets(updatedFilters));
};

const setDirectionAndFilter = (category, direction, filters) => dispatch => {
  dispatch(updateFilter('descending', direction === 'descending' ? 'true' : 'false', true));
  dispatch(updateAndFilter('orderby', category, true, filters));
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
  updateFilter,
  formQueryFromFilters,
  filterDatasets,
  updateAndFilter,
  resetFilter,
  resetFilterAndRefresh,
  setOriginalFilterValues,
  updateFilterVerbose,
  startFilter,
  setDirectionAndFilter
};
