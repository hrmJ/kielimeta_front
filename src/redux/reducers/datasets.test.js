import dataSetReducer from './datasets';
import { listAll } from '../actions/datasets';

describe('The dataset reducer', () => {
  it('should process action LIST_DATASETS_REQUEST', () => {
    const initialState = {
      datasets: [],
      loadingDatasets: false,
    };

    const initialJSON = JSON.stringify(initialState);

    expect(reducer(initialState, listAll())).toEqual({
      loadingDatasets: true,
      datasets: [],
    });

    expect(JSON.stringify(initialState)).toBe(initialJSON);
  });
});
