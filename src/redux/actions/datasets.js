import { thunkCreator, getOriginalValuesForFilters } from './utils';
import filterReducer from '../reducers/datasetfilter';

let baseUrl = 'http://%%API_SERVER_HOST%%:%%API_SERVER_PORT%%';

const setBaseUrl = url => {
  /**
   * A way to mock the url for jest tests
   */
  baseUrl = url;
};

const updateFilter = (key, val, checked) => {
  return {
    type: 'UPDATE_FILTER',
    val,
    checked,
    key
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

const updateAndFilter = (keyName, value, checked, filters) => {
  return dispatch => {
    const updatedFilters = filterReducer(filters, updateFilter(keyName, value, checked));
    dispatch(updateFilter(keyName, value, checked));
    dispatch(filterDatasets(updatedFilters));
  };
};

const _resetOriginalValues = () => {
  const url = `${baseUrl}/datasets`;
  return fetch(url).then(res => res.json());
};

const filterByQuery = filters => {
  // CHECK if filters.query = '' and..
  return dispatch => {
    dispatch(filterDatasets(filters)).then(res => {
      dispatch(updateFilter('query', filters.query));
      if (filters.query === '') {
        _resetOriginalValues().then(res =>
          dispatch(setOriginalFilterValues(getOriginalValuesForFilters(res)))
        );
      } else {
        dispatch(setOriginalFilterValues(getOriginalValuesForFilters(res)));
      }
    });
  };
};

const _listAll = () => {
  const url = `${baseUrl}/datasets`;
  return thunkCreator({
    types: ['LIST_DATASETS_REQUEST', 'LIST_DATASETS_SUCCESS', 'LIST_DATASETS_ERROR'],
    promise: fetch(url, { mode: 'cors' }).then(response => response.json())
  });
};

const listAll = () => dispatch =>
  _listAll()(dispatch).then(res =>
    dispatch(setOriginalFilterValues(getOriginalValuesForFilters(res)))
  );

const setOriginalFilterValues = vals => {
  return {
    type: 'SET_ORIGINAL_FILTER_VALUES',
    vals
  };
};

export {
  listAll,
  filterByQuery,
  setBaseUrl,
  updateFilter,
  formQueryFromFilters,
  filterDatasets,
  updateAndFilter
};
