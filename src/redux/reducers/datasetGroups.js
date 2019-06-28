export default (state = { name: '', datasets: [] }, action) => {
  const { type, ...rest } = action;
  const { datasets, name } = state;

  switch (type) {
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
