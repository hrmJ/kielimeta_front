export default (state = {}, action) => {
  const { type, id, users } = action;

  if (type === 'EDIT_DATASET_USERS') {
    return { ...state, [id]: users };
  }

  return state;
};
