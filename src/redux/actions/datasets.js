import { getVarieties, updateLanguageName } from './languageactions';
import licenseOptions from '../../components/content/datasetform/fieldsets/administration/license/licenceOptions';
import { setOriginalFilterValues } from './filters';
import { thunkCreator, getOriginalValuesForFilters, baseUrl } from './utils';
import { updateField } from './datasetform';
import { getCookie } from '../../utils';

const removeDatasetFromStore = id => {
  return { type: 'REMOVE_DATASET_FROM_STORE', id };
};

const deleteDatasetRaw = id => {
  const url = `${baseUrl}/datasets/${id}`;
  const csrf = getCookie('csrftoken');
  return thunkCreator({
    types: ['DELETEDATASET_REQUEST', 'DELETEDATASET_SUCCESS', 'DELETEDATASET_FAILURE'],
    promise: fetch(url, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf
        // Authorization: 'Bearer ' + jwt.token,
      }
    }).then(response => response)
  });
};

const deleteDataset = id => dispatch => {
  dispatch(deleteDatasetRaw(id)).then(() => dispatch(removeDatasetFromStore(id)));
};

/**
 * parseDataset
 *
 * Parses the data  from the API in order to make the data
 * easy to represent on insert forms and when viewing details
 *
 * @param datasetRaw - the response that has been parsed from json
 * @returns {undefined}
 */
const parseDataset = datasetRaw => {
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
    if (!licenseOptions.map(o => o.val).includes(license)) {
      dataset.license = 'undefined';
      dataset.license_info = license;
    }
  }
  return dataset;
};

const updateLanguageNames = (dispatch, datasetRaw) => {
  const { languages = [] } = datasetRaw;
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
};

/**
 * fetchDataset
 *
 * Fetches a single dataset from the api
 *
 * @param id - the id of the dataset
 * @returns {object} the dataset in question as a js object
 */
const fetchDataset = id => {
  const url = `${baseUrl}/datasets/${id}`;
  return fetch(url, { mode: 'cors' })
    .then(response => response.json())
    .then(parseDataset);
};

const fetchDatasetForEditRaw = id => {
  return thunkCreator({
    types: [
      'DATASET_DETAILS_EDIT_REQUEST',
      'DATASET_DETAILS_EDIT_SUCCESS',
      'DATASET_DETAILS_EDIT_ERROR'
    ],
    promise: fetchDataset(id)
  });
};

const fetchDatasetForEdit = (id, mainVersion, isCopy) => dispatch => {
  console.log(`ID: ${id} mainVersion: ${mainVersion} isCopy: ${isCopy}`);
  fetchDatasetForEditRaw(id)(dispatch).then(datasetRaw => {
    updateLanguageNames(dispatch, datasetRaw);
    if (mainVersion) {
      dispatch(updateField('main_version_id', mainVersion));
    } else {
      dispatch(updateField('main_version_id', null));
    }
    if ((mainVersion && mainVersion === id) || isCopy) {
      // A copy or a new subversion --> reset id, 'cause it doesn't exist yet
      dispatch(updateField('id', null));
    }
    if (isCopy) {
      dispatch(updateField('isCopy', true));
    }
    return { ...datasetRaw };
  });
};

const listAllRaw = () => {
  const url = `${baseUrl}/datasets`;
  return thunkCreator({
    types: ['LIST_DATASETS_REQUEST', 'LIST_DATASETS_SUCCESS', 'LIST_DATASETS_ERROR'],
    promise: fetch(url, { mode: 'cors' }).then(response => response.json())
  });
};

const listAll = () => dispatch =>
  listAllRaw()(dispatch).then(res =>
    dispatch(setOriginalFilterValues(getOriginalValuesForFilters(res)))
  );

const setVersions = (mainId, versions) => {
  return { type: 'SET_VERSIONS', mainId, versions };
};

const setActiveVersion = (mainId, activeId) => ({ type: 'SET_ACTIVE_VERSION', mainId, activeId });

const fetchSubVersions = (mainId, subversionIds) => dispatch => {
  const promises = [mainId, ...subversionIds].map(fetchDataset);
  Promise.all(promises).then(datasets =>
    dispatch(
      setVersions(mainId, datasets.reduce((acc, cur) => ({ ...acc, [cur.id]: { ...cur } }), {}))
    )
  );
};

export {
  listAll,
  fetchDatasetForEdit,
  removeDatasetFromStore,
  deleteDataset,
  fetchSubVersions,
  setActiveVersion,
  fetchDataset,
  setVersions
};
