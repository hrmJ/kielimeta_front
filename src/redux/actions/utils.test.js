/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import { getOriginalValuesForFilters } from './utils';

describe('getOriginalValuesForFilters', () => {
  it("should return a language list of type [{value:'',label:''}]", () => {
    const dispatch = jest.fn();
    const languages = [{}];
    const datasets = [
      {
        title: 'test',
        languages: [{ details: { language_code: 'fi' } }, { details: { language_code: 'en-GB' } }]
      }
    ];
    expect(getOriginalValuesForFilters(datasets)).toMatchObject({
      lang: [{ label: 'Finnish', value: 'fi' }, { label: 'English (UK)', value: 'en-GB' }]
    });
  });

  it('it should not return duplicate languages', () => {
    const dispatch = jest.fn();
    const datasets = [
      {
        title: 'test',
        languages: [{ details: { language_code: 'fi' } }, { details: { language_code: 'fi' } }]
      }
    ];
    expect(getOriginalValuesForFilters(datasets)).toMatchObject({
      lang: [{ label: 'Finnish', value: 'fi' }]
    });
  });
});
