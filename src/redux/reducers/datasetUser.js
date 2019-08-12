export default (state = {}, action) => {
  const { type, id, users, result } = action;

  if (type === 'EDIT_DATASET_USERS') {
    return { ...state, [id]: users };
  }

  if (type === 'GETUSERS_SUCCESS') {
    return { ...state, [result.id]: result.users };
  }

  return state;
};
