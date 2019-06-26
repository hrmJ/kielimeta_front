import { getVarieties, updateLanguageName } from './languageactions';
import { licenseOptions } from '../../components/content/datasetform/fieldsets/administration/license';
import { thunkCreator, getOriginalValuesForFilters } from './utils';
import filterReducer from '../reducers/datasetfilter';

let baseUrl = '%%API_SERVER_PROTOCOL%%://%%API_SERVER_HOST%%';
if (window.location.href.includes('istest')) {
  baseUrl = 'http://%%API_SERVER_HOST_TEST%%';
}

/**
 *
 * A way to mock the url for jest tests
 *
 * @param {string} url the url to be set
 */
const setBaseUrl = url => {
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

const fetchDatasetForEditRaw = id => {
  const url = `${baseUrl}/datasets/${id}`;
  return thunkCreator({
    types: [
      'DATASET_DETAILS_EDIT_REQUEST',
      'DATASET_DETAILS_EDIT_SUCCESS',
      'DATASET_DETAILS_EDIT_ERROR'
    ],
    promise: fetch(url, { mode: 'cors' })
      .then(response => response.json())
      .then(datasetRaw => {
        const dataset = Object.assign({}, datasetRaw);
        const { authors, owner, connections, languages, license } = dataset;
        if (authors) {
          dataset.authors = JSON.parse(authors);
        }
        if (owner) {
          dataset.owner = owner.join(',');
        }
        if (connections) {
          const langIds = languages.map(lang => lang.id);
          const editedConnections = connections.map(con => ({
            sl: langIds.indexOf(con.source_language),
            tl: con.target_language.map(tl => langIds.indexOf(tl))
          }));
          dataset.connections = editedConnections;
        }
        if (license) {
          if (!licenseOptions.map(o => o.value).includes(license)) {
            dataset.license = 'undefined';
            dataset.license_info = license;
          }
        }
        return dataset;
      })
  });
};

const fetchDatasetForEdit = id => dispatch => {
  fetchDatasetForEditRaw(id)(dispatch).then(datasetRaw => {
    const dataset = Object.assign({}, datasetRaw);
    const { languages = [] } = dataset;
    const usedLanguages = [];
    languages.forEach(lang => {
      const {
        details: { language_name: name, language_code: code },
        speaker: { speaker_l1: speakerL1 = [] }
      } = lang;
      usedLanguages.push(code);
      dispatch(getVarieties(code));
      dispatch(updateLanguageName(code, name));
      speakerL1.forEach(sublang => {
        const { language_code: subcode, language_name: subname } = sublang;
        if (!usedLanguages.includes(subcode)) {
          usedLanguages.push(subcode);
          dispatch(updateLanguageName(subcode, subname));
        }
      });
    });
    return dataset;
  });
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
  listAll,
  filterByQuery,
  setBaseUrl,
  updateFilter,
  formQueryFromFilters,
  filterDatasets,
  updateAndFilter,
  resetFilter,
  resetFilterAndRefresh,
  baseUrl,
  fetchDatasetForEdit
};
