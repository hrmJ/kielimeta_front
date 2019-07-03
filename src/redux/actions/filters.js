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

const updateFilter = (key, val, checked) => {
  return {
    type: 'UPDATE_FILTER',
    val,
    checked,
    key
  };
};

const updateAndFilter = (keyName, value, checked, filters) => {
  return dispatch => {
    const updatedFilters = filterReducer(filters, updateFilter(keyName, value, checked));
    dispatch(updateFilter(keyName, value, checked));
    dispatch(filterDatasets(updatedFilters));
  };
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
  setOriginalFilterValues
};
