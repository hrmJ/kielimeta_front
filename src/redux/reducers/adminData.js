export default (state = { languages: [], keywords: [], genre: [] }, action) => {
  const { type, result } = action;
  switch (type) {
    case 'FETCH_GENRE_SUCCESS':
      return { ...state, genre: result };
    case 'FETCH_LANGUAGES_SUCCESS':
      return { ...state, languages: result };
    case 'FETCH_KEYWORDS_SUCCESS':
      return { ...state, keywords: result };
    default:
      return state;
  }
};
