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
      .then(parseDataset)
  });
};

const fetchDatasetForEdit = (id, mainVersion, isCopy) => dispatch => {
  fetchDatasetForEditRaw(id)(dispatch).then(datasetRaw => {
    updateLanguageNames(dispatch, datasetRaw);
    if (mainVersion) {
      dispatch(updateField('main_version_id', mainVersion));
    } else {
      dispatch(updateField('main_version_id', null));
    }
    if (mainVersion || isCopy) {
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

export { listAll, fetchDatasetForEdit, removeDatasetFromStore, deleteDataset };
