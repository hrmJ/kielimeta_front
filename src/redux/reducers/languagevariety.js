export function languageVarietyReducer(state = {}, action) {
  const { type, ...rest } = action;

  switch (type) {
    case 'VARIETIES_REQUEST':
      break;
    case 'VARIETIES_SUCCESS':
      const varieties = {};
      for (const res of rest.result) {
        const { language_code: code, variety, variety_type } = res;
        if (!varieties[code]) {
          varieties[code] = [];
        }
        varieties[code].push({ variety, variety_type });
      }
      return { ...state, ...varieties };
      break;
    case 'VARIETIES_ERROR':
      break;
  }

  return state;
}

export function languageVarietyTypeReducer(state = [], action) {
  const { type, ...rest } = action;

  switch (type) {
    case 'VARIETYTYPES_REQUEST':
      break;
    case 'VARIETYTYPES_SUCCESS':
      return rest.result;
      break;
    case 'VARIETYTYPES_ERROR':
      break;
  }

  return state;
}
