const defaultPayload = {
  title: '',
  description: 'no description', // TODO: accept empty description in the API?
  languages: [],
  resourcetype: 'unknown',
  mediatypes: ['text']
};

export default (state = defaultPayload, action) => {
  const { type, ...field } = action;
  if (type === 'UPDATE_DATASETFORM_FIELD') {
    return { ...state, ...{ [field.name]: field.val } };
  }
  return state;
};

export { defaultPayload };
