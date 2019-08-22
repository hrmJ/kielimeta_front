export default (state = {}, action) => {
  const { type, id, details } = action;
  if (type === 'PICK_USER') {
    return { ...state, [id]: details };
  }
  return state;
};
