const defaultPayload = {
  title: '',
  description: '',
  languages: [],
  mediatype: ['text']
};

export default (state = defaultPayload, action) => {
  const { type, ...rest } = action;

  if (type === 'DATASET_FROM_JSON_INPUT') {
    return { ...rest.dataset };
  }

  if (type === 'RESET_FORM_DATA') {
    return { ...defaultPayload };
  }

  if (type === 'DATASET_DETAILS_EDIT_SUCCESS') {
    return rest.result;
  }

  if (type === 'UPDATE_DATASETFORM_FIELD') {
    return { ...state, ...{ [rest.name]: rest.val } };
  }
  return state;
};

export { defaultPayload };
