export default (state = { query: '' }, action) => {
  const { type, checked, key, val } = action;
  if (type === 'RESET_FILTER') {
    const { [key]: unused, ...rest } = state;
    return rest;
  }
  if (type === 'UPDATE_FILTER_VERBOSE') {
    return { ...state, [key]: val };
  }
  if (type === 'UPDATE_FILTER') {
    const oldvals = key in state ? state[key] : [];
    let newvals;
    const listFields = ['lang', 'resourcetype', 'annotations'];
    if ([...listFields, ...listFields.map(f => `${f}A`)].indexOf(key) > -1) {
      newvals = checked ? [...oldvals, val] : oldvals.filter(thisval => thisval !== val);
    } else {
      newvals = val;
    }
    return { ...state, [key]: [...new Set(newvals)] };
  }

  return state;
};
