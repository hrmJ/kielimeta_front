import { getCookie } from '../../utils';
import { thunkCreator } from './utils';

const baseUrl = '%%API_SERVER_PROTOCOL%%://%%API_SERVER_HOST%%';

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

const editRoleInGroup = (dataset, role) => {
  return { type: 'EDIT_ROLE_IN_GROUP', dataset, role };
};

export { addToGroup, editGroup, submitGroup, editRoleInGroup, listGroups, editGroupName };
