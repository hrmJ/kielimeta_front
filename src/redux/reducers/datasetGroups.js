export default (state = { datasets: [] }, action) => {
  const { type, ...rest } = action;
  const { datasets } = state;

  switch (type) {
    case 'SUBMITGROUP_SUCCESS':
      return { ...state, id: rest.result.saved_id };
    case 'EDIT_ROLE_IN_GROUP':
      return {
        ...state,
        datasets: datasets.map(ds =>
          ds.dataset === rest.dataset ? { ...ds, role: rest.role } : ds
        )
      };
    case 'EDIT_GROUP_TITLE':
      return { ...state, name: rest.title };
    case 'ADD_TO_GROUP':
      if (rest.isAdded) {
        return { ...state, datasets: [...datasets, rest.dataset] };
      }
      return { ...state, datasets: datasets.filter(ds => ds.dataset !== rest.dataset.dataset) };
    case 'REPLACE_GROUP':
      return { ...rest.group };
    default:
      return state;
  }
};
