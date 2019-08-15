export default (state = [], action) => {
  const { type, files } = action;

  if (type === 'EDIT_FILE_QUEUE') {
    return [...files];
  }

  return state;
};
