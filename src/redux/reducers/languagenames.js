export default function languageNameReducer(state = {}, action) {
  const { type, ...rest } = action;

  switch (type) {
    case 'UPDATE_LANGUAGE_NAME':
      return { ...state, ...rest.value };
      break;
  }

  return state;
}
