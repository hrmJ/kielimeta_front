import { getCookie } from '../../utils';
import { thunkCreator } from './utils';

const addToGroup = (dataset, isAdded) => {
  return { type: 'ADD_TO_GROUP', dataset, isAdded };
};

const editGroupTitle = title => {
  return { type: 'EDIT_GROUP_TITLE', title };
};

const submitGroup = groups => {
  const url = '%%API_SERVER_PROTOCOL%%://%%API_SERVER_HOST%%/groups';
  const csrf = getCookie('csrftoken');
  const validated = {
    ...groups,
    datasets: groups.datasets.map(ds => ({ dataset: ds.dataset, role: ds.role }))
  };
  return thunkCreator({
    types: ['SUBMITGROUP_REQUEST', 'SUBMITGROUP_SUCCESS', 'SUBMITGROUP_FAILURE'],
    promise: fetch(url, {
      method: 'POST',
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

const editRoleInGroup = (dataset, role) => {
  return { type: 'EDIT_ROLE_IN_GROUP', dataset, role };
};

export { addToGroup, editGroupTitle, submitGroup, editRoleInGroup };
