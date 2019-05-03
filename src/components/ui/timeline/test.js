import { getRange } from './index';

describe('getRange', () => {
  it('returns a valid array with one value', () => {
    expect(getRange(2000)).toEqual([2000]);
  });

  it('returns a valid array with two values', () => {
    expect(getRange(2000, 2001)).toEqual([2000, 2001]);
  });

  it('returns a valid array with NaN values', () => {
    const years = [];
    const arr = [Math.min(...years), Math.max(...years)];
    expect(getRange(...arr)).toEqual([]);
  });
});
