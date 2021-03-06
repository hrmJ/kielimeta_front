import { editFileQueue, updateField } from './datasetform';
import { filterDatasets, formQueryFromFilters } from './filters';
import { getCookie } from '../../utils';
import { getVarieties, updateLanguageName } from './languageactions';
import { thunkCreator, baseUrl } from './utils';
import licenseOptions from '../../components/content/datasetform/fieldsets/administration/license/licenceOptions';

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

/**
 * parseDataset
 *
 * Parses the data  from the API in order to make the data
 * easy to represent on insert forms and when viewing details
 *
 * @param datasetRaw - the response that has been parsed from json
 * @param fromHistory - wether or not the data is from version history
 * @returns {undefined}  the parsed dataset
 */
const parseDataset = (datasetRaw, fromHistory) => {
  const dataset = { ...datasetRaw };
  const {
    authors,
    owner,
    connections,
    languages,
    license,
    place_of_publication: placeOfPublication
  } = dataset;
  if (Array.isArray(placeOfPublication)) {
    const [placeOfPublicationSimple] = placeOfPublication;
    dataset.place_of_publication = placeOfPublicationSimple;
  }
  if (authors && typeof authors === 'string') {
    dataset.authors = JSON.parse(authors);
  } else {
    dataset.authors = [];
  }
  if (owner) {
    dataset.owner = owner.join(',');
  }
  if (connections) {
    if (!fromHistory) {
      const langIds = languages.map(lang => lang.id);
      const editedConnections = connections.map(con => ({
        sl: langIds.indexOf(con.source_language || con.sl),
        tl: con.target_language
          ? con.target_language.map(tl => langIds.indexOf(tl))
          : con.tl.map(tl => langIds.indexOf(tl))
      }));
      dataset.connections = editedConnections;
    }
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
 * fetchHistory
 *
 * Fetches a single dataset from the api
 *
 * @param id - the id of the dataset
 * @returns {object} the dataset in question as a js object
 */
const fetchHistory = id => {
  const url = `${baseUrl}/history/${id}`;
  return fetch(url, { mode: 'cors' })
    .then(response => response.json())
    .then(raw => parseDataset(raw, true));
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

const fetchDatasetTitlesRaw = datasets => {
  return {
    type: 'FETCH_DATASET_TITLES',
    results: datasets.reduce((prev, cur) => ({ ...prev, [cur.id]: cur.title }), {})
  };
};

const fetchDatasetTitles = ids => dispatch => {
  const url = `${baseUrl}/datasets?${formQueryFromFilters({ id: ids })}`;
  fetch(url, { mode: 'cors' })
    .then(response => response.json())
    .then(datasets => dispatch(fetchDatasetTitlesRaw(datasets)));
};

const fetchDatasetForEditRaw = (id, asHistory) => {
  return thunkCreator({
    types: [
      'DATASET_DETAILS_EDIT_REQUEST',
      'DATASET_DETAILS_EDIT_SUCCESS',
      'DATASET_DETAILS_EDIT_ERROR'
    ],
    promise: asHistory ? fetchHistory(id) : fetchDataset(id)
  });
};

const fetchDatasetForEdit = (
  id,
  mainVersion,
  isCopy,
  asHistory,
  subversionIdForHistory
) => dispatch => {
  fetchDatasetForEditRaw(id, asHistory)(dispatch).then(datasetRaw => {
    updateLanguageNames(dispatch, datasetRaw);
    if (mainVersion) {
      dispatch(updateField('main_version_id', mainVersion));
    } else {
      dispatch(updateField('main_version_id', null));
    }
    if ((mainVersion && mainVersion === id) || isCopy) {
      // A copy or a new subversion --> reset id, 'cause it doesn't exist yet
      dispatch(updateField('id', asHistory ? id : null));
    }
    if (isCopy) {
      dispatch(updateField('isCopy', true));
    }
    if (asHistory) {
      if (subversionIdForHistory) {
        dispatch(updateField('id', subversionIdForHistory));
      }
    }
    if (Array.isArray(datasetRaw.documents)) {
      dispatch(editFileQueue(datasetRaw.documents.map(doc => ({ ...doc, file: undefined }))));
    }
    return { ...datasetRaw };
  });
};

const startJsonBasedInsert = dataset => ({ type: 'DATASET_FROM_JSON_INPUT', dataset });

const fetchDatasetFromJson = rawString => dispatch => {
  const datasetRaw = JSON.parse(rawString);
  const { id, ...datasetUnParsed } = datasetRaw;
  const dataset = parseDataset(datasetUnParsed, true);
  updateLanguageNames(dispatch, dataset);
  dispatch(updateField('main_version_id', null));
  dispatch(startJsonBasedInsert(dataset));
  return { ...dataset };
};

const setActiveVersion = (mainId, activeId) => ({ type: 'SET_ACTIVE_VERSION', mainId, activeId });

const deleteDataset = (id, mainId) => dispatch => {
  if (mainId) {
    // if deleting a subversion, unset the active version
    dispatch(setActiveVersion(mainId, mainId));
  }
  dispatch(deleteDatasetRaw(id)).then(() => dispatch(filterDatasets({})));
};

const setVersions = (mainId, versions, activeId) => {
  return { type: 'SET_VERSIONS', mainId, versions, activeId };
};

const startVersionFetch = mainId => ({ type: 'START_VERSION_FETCH', mainId });

const fetchSubVersions = (mainId, subversionIds, activeId) => dispatch => {
  dispatch(startVersionFetch());
  const promises = [mainId, ...subversionIds].map(fetchDataset);
  Promise.all(promises).then(datasets =>
    dispatch(
      setVersions(
        mainId,
        datasets.reduce((acc, cur) => ({ ...acc, [cur.id]: { ...cur } }), {}),
        activeId
      )
    )
  );
};

const setActiveTitle = title => ({
  type: 'SET_ACTIVE_TITLE',
  title
});

export {
  setActiveTitle,
  fetchDatasetForEdit,
  fetchDatasetFromJson,
  removeDatasetFromStore,
  deleteDataset,
  fetchSubVersions,
  setActiveVersion,
  fetchDataset,
  setVersions,
  fetchDatasetTitles
};
