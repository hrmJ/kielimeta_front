/* eslint-disable no-undef */
import { formQueryFromFilters } from './filters';

describe('formQueryFromFilters', () => {
  it('Should return a string', () => {
    expect(typeof formQueryFromFilters()).toBe('string');
  });

  it('Should turn an array into to a query string with values separated by &=', () => {
    expect(formQueryFromFilters({ lang: ['fi-FI', 'en-GB'] }, false)).toEqual(
      '?lang=fi-FI&lang=en-GB'
    );
  });

  it('Should take care of url encoding', () => {
    expect(formQueryFromFilters({ lang: ['fi-FI', 'en-GB'] })).toEqual(
      `?lang=${encodeURIComponent('fi-FI')}&lang=${encodeURIComponent('en-GB')}`
    );
  });

  it('Should handle parametres "lang" and "query"', () => {
    expect(formQueryFromFilters({ query: 'searchme', lang: ['fi-FI', 'en-GB'] }, false)).toEqual(
      '?query=searchme&lang=fi-FI&lang=en-GB'
    );
  });
});
