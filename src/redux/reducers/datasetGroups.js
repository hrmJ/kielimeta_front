export default (state = { name: '', datasets: [] }, action) => {
  const { type, ...rest } = action;
  const { datasets, name } = state;

  switch (type) {
    case 'EDIT_ROLE_IN_GROUP':
      return Object.assign(
        {},
        {
          name,
          datasets: datasets.map(ds =>
            ds.dataset === rest.dataset ? { ...ds, role: rest.role } : ds
          )
        }
      );
    case 'EDIT_GROUP_TITLE':
      return { ...state, name: rest.title };
    case 'ADD_TO_GROUP':
      if (rest.isAdded) {
        return Object.assign({}, { name, datasets: [...datasets, rest.dataset] });
      }
      return Object.assign(
        {},
        { name, datasets: datasets.filter(ds => ds.dataset !== rest.dataset.dataset) }
      );
    default:
      return state;
  }
};
