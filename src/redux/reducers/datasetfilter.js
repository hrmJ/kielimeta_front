export default (state = { query: '' }, action) => {
  const { type, checked, key, val } = action;
  if (type == 'RESET_FILTER') {
    const { [key]: unused, ...rest } = state;
    return rest;
  }
  if (type == 'UPDATE_FILTER') {
    const oldvals = key in state ? state[key] : [];
    let newvals;
    if (['lang', 'resourcetype', 'annotations'].indexOf(key) > -1) {
      newvals = checked ? [...oldvals, val] : oldvals.filter(thisval => thisval !== val);
    } else {
      newvals = val;
    }
    return { ...state, [key]: newvals };
  }

  return state;
};
