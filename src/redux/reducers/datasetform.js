const defaultPayload = {
  title: '',
  description: '',
  languages: [],
  resourcetype: 'parallel corpus',
};

export default (state = defaultPayload, action) => {
  const { type, ...field } = action;
  if (type === 'UPDATE_DATASETFORM_FIELD') {
    return { ...state, ...{ [field.name]: field.val } };
  }
  return state;
};

export { defaultPayload };
