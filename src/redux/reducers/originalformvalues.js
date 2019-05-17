export default (state = {}, action) => {
  const { type, result } = action;
  switch (type) {
    case 'FETCH_ORIGINAL_FIELD_VALUES_REQUEST':
      break;
    case 'FETCH_ORIGINAL_FIELD_VALUES_FAILURE':
      break;
    case 'FETCH_ORIGINAL_FIELD_VALUES_SUCCESS':
      let vals = [];
      if (result.fieldname == 'resourcetypes') {
        vals = result.vals.map(val => val.name);
      }
      return { ...state, [result.fieldname]: vals };
      break;
  }

  return state;
};
