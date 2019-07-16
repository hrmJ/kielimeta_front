export default (state = { activated: {}, all: {} }, action) => {
  const { type, ...rest } = action;
  const { activated, all } = state;
  switch (type) {
    case 'SET_VERSIONS':
      return {
        activated: { ...activated, [rest.mainId]: rest.activeId || rest.mainId },
        all: { ...all, [rest.mainId]: { ...rest.versions } }
      };
    case 'SET_ACTIVE_VERSION':
      return {
        activated: { ...activated, [rest.mainId]: rest.activeId },
        all: { ...all }
      };
    default:
      return state;
  }
};
