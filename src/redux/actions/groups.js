import { getCookie } from '../../utils';
import { thunkCreator, baseUrl } from './utils';

const addToGroup = (dataset, isAdded) => {
  return { type: 'ADD_TO_GROUP', dataset, isAdded };
};

const editGroup = (id, groups) => {
  return {
    type: 'REPLACE_GROUP',
    group: groups.find(g => g.id === id) || { name: id, datasets: [] }
  };
};

const editGroupName = (name, group) => {
  return {
    type: 'REPLACE_GROUP',
    group: { ...group, name }
  };
};

const clearGroup = () => {
  return {
    type: 'REPLACE_GROUP',
    group: { datasets: [] }
  };
};

const submitGroupRaw = groups => {
  const url = groups.id ? `${baseUrl}/groups/${groups.id}` : `${baseUrl}/groups`;
  const csrf = getCookie('csrftoken');
  const validated = {
    ...groups,
    datasets: groups.datasets.map(ds => ({ dataset: ds.dataset, role: ds.role }))
  };
  return thunkCreator({
    types: ['SUBMITGROUP_REQUEST', 'SUBMITGROUP_SUCCESS', 'SUBMITGROUP_FAILURE'],
    promise: fetch(url, {
      method: groups.id ? 'PUT' : 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf
        // Authorization: 'Bearer ' + jwt.token,
      },
      body: JSON.stringify(validated)
    }).then(response => response.json())
  });
};

const deleteGroupRaw = id => {
  const url = `${baseUrl}/groups/${id}`;
  const csrf = getCookie('csrftoken');
  return thunkCreator({
    types: ['DELETEGROUP_REQUEST', 'DELETEGROUP_SUCCESS', 'DELETEGROUP_FAILURE'],
    promise: fetch(url, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf
        // Authorization: 'Bearer ' + jwt.token,
      }
    }).then(response => response)
  });
};

const listGroups = () => {
  const url = `${baseUrl}/groups`;
  return thunkCreator({
    types: ['LIST_GROUPS_REQUEST', 'LIST_GROUPS_SUCCESS', 'LIST_GROUPS_ERROR'],
    promise: fetch(url, { mode: 'cors' }).then(response => response.json())
  });
};

const submitGroup = groups => dispatch => {
  dispatch(submitGroupRaw(groups)).then(() => dispatch(listGroups()));
};

const deleteGroup = id => dispatch => {
  dispatch(clearGroup());
  dispatch(deleteGroupRaw(id)).then(() => dispatch(listGroups()));
};

const editRoleInGroup = (dataset, role) => {
  return { type: 'EDIT_ROLE_IN_GROUP', dataset, role };
};

export {
  addToGroup,
  editGroup,
  submitGroup,
  editRoleInGroup,
  listGroups,
  editGroupName,
  deleteGroup
};
