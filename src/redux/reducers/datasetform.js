const defaultPayload = {
  title: '',
  description: 'no description',
  languages: [],
  mediatype: ['text']
};

export default (state = defaultPayload, action) => {
  const { type, ...field } = action;
  if (type === 'UPDATE_DATASETFORM_FIELD') {
    return { ...state, ...{ [field.name]: field.val } };
  }
  return state;
};

export { defaultPayload };
