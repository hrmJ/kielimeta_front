export default (state = { activated: {}, all: {} }, action) => {
  const { type, ...rest } = action;
  const { activated, all } = state;
  switch (type) {
    case 'SET_VERSIONS':
      return { activated: { ...activated }, all: { ...all, ...rest.versions } };
    case 'SET_VERSION':
      return { ...state, [rest.dataset.id]: rest.dataset };
    default:
      return state;
  }
};
