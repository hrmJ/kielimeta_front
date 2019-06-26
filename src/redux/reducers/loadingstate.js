export default function loadingStateReducer(state = {}, action) {
  if (action.type.endsWith('_RESET')) {
    const requestName = action.type.replace('_RESET', '');
    return { ...state, [requestName]: 'reset' };
  }
  if (action.type.endsWith('_REQUEST')) {
    const requestName = action.type.replace('_REQUEST', '');
    return { ...state, [requestName]: 'requested' };
  }
  if (action.type.endsWith('_SUCCESS')) {
    const requestName = action.type.replace('_SUCCESS', '');
    return { ...state, [requestName]: 'success' };
  }

  if (action.type.endsWith('_FAILURE')) {
    const requestName = action.type.replace('_FAILURE', '');
    return { ...state, [requestName]: 'failure' };
  }

  return state;
}
