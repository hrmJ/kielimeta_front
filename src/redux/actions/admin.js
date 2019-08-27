import { baseUrl, thunkCreator } from './utils';
import { getCookie } from '../../utils';

const fetchAdminData = category => {
  const url = `${baseUrl}/${category}/admin`;
  return thunkCreator({
    types: [
      `FETCH_${category.toUpperCase()}_REQUEST`,
      `FETCH_${category.toUpperCase()}_SUCCESS`,
      `FETCH_${category.toUpperCase()}_ERROR`
    ],
    promise: fetch(url, { mode: 'cors' }).then(res => res.json())
  });
};

const updateAdminDataRaw = (category, id, editedVals) => {
  const url = `${baseUrl}/${category}/admin`;
  const csrf = getCookie('csrftoken');
  return thunkCreator({
    types: [
      `UPDATE_${category.toUpperCase()}_REQUEST`,
      `UPDATE_${category.toUpperCase()}_SUCCESS`,
      `UPDATE_${category.toUpperCase()}_FAILURE`
    ],
    promise: fetch(url, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf
        // Authorization: 'Bearer ' + jwt.token,
      },
      body: JSON.stringify({ id, ...editedVals })
    }).then(response => response)
  });
};

const updateAdminData = (category, id, editedVals) => dispatch =>
  dispatch(updateAdminDataRaw(category, id, editedVals)).then(() =>
    dispatch(fetchAdminData(category))
  );

const deleteAdminDataRaw = (category, id) => {
  const url = `${baseUrl}/${category}/admin`;
  const csrf = getCookie('csrftoken');
  return thunkCreator({
    types: [
      `DELETE_${category.toUpperCase()}_REQUEST`,
      `DELETE_${category.toUpperCase()}_SUCCESS`,
      `DELETE_${category.toUpperCase()}_FAILURE`
    ],
    promise: fetch(url, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf
        // Authorization: 'Bearer ' + jwt.token,
      },
      body: JSON.stringify({ id })
    }).then(response => response.json())
  });
};

const deleteAdminData = (category, id) => dispatch =>
  dispatch(deleteAdminDataRaw(category, id)).then(() => dispatch(fetchAdminData(category)));

const addAdminDataRaw = (category, editedVals) => {
  const url = `${baseUrl}/${category}/admin`;
  const csrf = getCookie('csrftoken');
  return thunkCreator({
    types: [
      `POST_${category.toUpperCase()}_REQUEST`,
      `POST_${category.toUpperCase()}_SUCCESS`,
      `POST_${category.toUpperCase()}_FAILURE`
    ],
    promise: fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf
        // Authorization: 'Bearer ' + jwt.token,
      },
      body: JSON.stringify({ ...editedVals })
    }).then(response => response)
  });
};

const addAdminData = (category, editedVals) => dispatch =>
  dispatch(addAdminDataRaw(category, editedVals)).then(() => dispatch(fetchAdminData(category)));

export { fetchAdminData, updateAdminData, deleteAdminData, addAdminData };
