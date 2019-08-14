import { baseUrl, thunkCreator } from './utils';
import { getCookie } from '../../utils';

const getDatasetUsers = id => {
  const url = `${baseUrl}/datasets/${id}/users`;
  return thunkCreator({
    types: ['GETUSERS_REQUEST', 'GETUSERS_SUCCESS', 'GETUSERS_FAILURE'],
    promise: fetch(url, { mode: 'cors' })
      .then(response => response.json())
      .then(users => ({
        id,
        users: users.map(user => ({
          username: user.username,
          can_edit: user.can_edit,
          can_edit_permissions: user.can_edit_permissions,
          can_delete: user.can_delete
        }))
      }))
  });
};

const editDatasetUsers = (id, users) => {
  return { type: 'EDIT_DATASET_USERS', id, users };
};

const submitDatasetUsersRaw = (id, users) => {
  const url = `${baseUrl}/datasets/${id}/users`;
  const csrf = getCookie('csrftoken');
  return thunkCreator({
    types: ['SUBMITUSERS_REQUEST', 'SUBMITUSERS_SUCCESS', 'SUBMITUSERS_FAILURE'],
    promise: fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf
        // Authorization: 'Bearer ' + jwt.token,
      },
      body: JSON.stringify(users)
    }).then(response => response.json())
  });
};

const getUserDetails = username => {
  const url = `${baseUrl}/users/${username}`;
  return thunkCreator({
    types: ['USER_DETAILS_REQUEST', 'USER_DETAILS_SUCCESS', 'USER_DETAILS_FAILURE'],
    promise: fetch(url, {
      mode: 'cors'
    }).then(response => response.json())
  });
};

export { getDatasetUsers, editDatasetUsers, submitDatasetUsersRaw, getUserDetails };
