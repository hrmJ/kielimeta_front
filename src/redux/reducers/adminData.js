export default (state = { languages: [] }, action) => {
  const { type, result } = action;
  switch (type) {
    case 'FETCH_LANGUAGES_SUCCESS':
      return { ...state, languages: result };
    default:
      return state;
  }
};
