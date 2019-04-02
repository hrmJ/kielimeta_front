export default function loadingStateReducer(state = {}, action) {
  if (action.type.endsWith('_REQUEST')) {
    const requestName = action.type.replace('_REQUEST', '');
    const loadingState = state[requestName] || 0;
    return { ...state, [requestName]: loadingState + 1 };
  }
  if (action.type.endsWith('_SUCCESS') || action.type.endsWith('_FAILURE')) {
    const requestName = action.type.replace('_SUCCESS', '').replace('_FAILURE', '');
    const loadingState = state[requestName] || 0;
    return { ...state, [requestName]: loadingState - 1 };
  }

  return state;
}
