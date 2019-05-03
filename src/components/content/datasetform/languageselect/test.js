/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LanguageSelect from './index';
import { defaultPayload } from '../../../../redux/reducers/datasetform';

Enzyme.configure({ adapter: new Adapter() });

test('Can update details of an already established language', () => {
  const languages = [
    {
      name: 'Finnish',
      variety: '',
      annotations: [{ type: 'MORPH', version: 'basic' }]
    },
    {
      name: 'Swedish',
      variety: '',
      annotations: [{ type: 'MORPH', version: 'basic' }]
    }
  ];
  const expected = { ...languages[1], name: 'testlang' };
  const dispatch = jest.fn();
  const select = Enzyme.shallow(
    <LanguageSelect idx={1} languages={languages} dispatch={dispatch} />
  );

  expect(select.instance().updateLanguage('name', 'testlang')[1]).toMatchObject(expected);
});

test('Can update new empty details', () => {
  const dispatch = jest.fn();
  const languages = [{}];
  const select = Enzyme.shallow(
    <LanguageSelect idx={0} languages={languages} dispatch={dispatch} />
  );
  expect(select.instance().updateLanguage('variety', 'testvariety')).toMatchObject([
    { details: { variety: 'testvariety' } }
  ]);
});

describe('updateYears', () => {
  it('Correctly updates a new min for an empty array', () => {
    const languages = [
      {
        years_covered: [],
        annotations: [{ type: 'MORPH', version: 'basic' }]
      }
    ];
    const expected = [1985];
    const select = Enzyme.shallow(
      <LanguageSelect idx={0} languages={languages} dispatch={jest.fn()} />
    );
    expect(select.instance().updateYears(1985, 'min')).toMatchObject(expected);
  });

  it('Correctly updates a new min for covered_years if only 1 val ', () => {
    const languages = [
      {
        years_covered: [1972],
        annotations: [{ type: 'MORPH', version: 'basic' }]
      }
    ];
    const expected = [1973];
    const select = Enzyme.shallow(
      <LanguageSelect idx={0} languages={languages} dispatch={jest.fn()} />
    );
    expect(select.instance().updateYears(1973, 'min')).toMatchObject(expected);
  });

  it('Correctly updates a new max for covered_years if only 1 val AND a min has been set', () => {
    const languages = [
      {
        years_covered: [1972],
        annotations: [{ type: 'MORPH', version: 'basic' }]
      }
    ];
    const select = Enzyme.shallow(
      <LanguageSelect idx={0} languages={languages} dispatch={jest.fn()} />
    );
    expect(select.instance().updateYears(1973, 'max')).toMatchObject([1972, 1973]);
  });

  it('Correctly updates a new min for covered_years if new min is higher than old max', () => {
    const languages = [
      {
        years_covered: [1800, 1820],
        annotations: [{ type: 'MORPH', version: 'basic' }]
      }
    ];
    const select = Enzyme.shallow(
      <LanguageSelect idx={0} languages={languages} dispatch={jest.fn()} />
    );
    expect(select.instance().updateYears(1900, 'min')).toMatchObject([1900]);
  });

  it('Correctly updates a new max for covered_years if new max is lower than old min', () => {
    const languages = [
      {
        years_covered: [1800, 1820],
        annotations: [{ type: 'MORPH', version: 'basic' }]
      }
    ];
    const select = Enzyme.shallow(
      <LanguageSelect idx={0} languages={languages} dispatch={jest.fn()} />
    );
    expect(select.instance().updateYears(1700, 'max')).toMatchObject([1800, 1820]);
  });

  it('Correctly updates a new max for covered_years if new max is lower than old min and  only 1 val in array', () => {
    const languages = [
      {
        years_covered: [1800],
        annotations: [{ type: 'MORPH', version: 'basic' }]
      }
    ];
    const select = Enzyme.shallow(
      <LanguageSelect idx={0} languages={languages} dispatch={jest.fn()} />
    );
    expect(select.instance().updateYears(1700, 'max')).toMatchObject([1800]);
  });

  it('removes all the values above max if a new max is given ', () => {
    const languages = [
      {
        years_covered: [1800, 1804, 1810, 1815, 1890],
        annotations: [{ type: 'MORPH', version: 'basic' }]
      }
    ];
    const select = Enzyme.shallow(
      <LanguageSelect idx={0} languages={languages} dispatch={jest.fn()} />
    );
    expect(select.instance().updateYears(1805, 'max')).toMatchObject([1800, 1804, 1805]);
  });

  it('correctly updates to [val] if new min the same number as the only other number ', () => {
    const languages = [
      {
        years_covered: [1800, 1801],
        annotations: [{ type: 'MORPH', version: 'basic' }]
      }
    ];
    const select = Enzyme.shallow(
      <LanguageSelect idx={0} languages={languages} dispatch={jest.fn()} />
    );
    expect(select.instance().updateYears(1801, 'min')).toMatchObject([1801]);
  });

  it('correctly updates to [val] if new max the same number as the only other number ', () => {
    const languages = [
      {
        years_covered: [1800, 1801],
        annotations: [{ type: 'MORPH', version: 'basic' }]
      }
    ];
    const select = Enzyme.shallow(
      <LanguageSelect idx={0} languages={languages} dispatch={jest.fn()} />
    );
    expect(select.instance().updateYears(1800, 'max')).toMatchObject([1800]);
  });

  it('removes the old max if only two vals when updating max', () => {
    const languages = [
      {
        years_covered: [1972, 1974],
        annotations: [{ type: 'MORPH', version: 'basic' }]
      }
    ];
    const select = Enzyme.shallow(
      <LanguageSelect idx={0} languages={languages} dispatch={jest.fn()} />
    );
    expect(select.instance().updateYears(1985, 'max')).toMatchObject([1972, 1985]);
  });

  it('removes the old max if more than two vals when updating max', () => {
    const languages = [
      {
        years_covered: [1972, 1974, 1980],
        annotations: [{ type: 'MORPH', version: 'basic' }]
      }
    ];
    const select = Enzyme.shallow(
      <LanguageSelect idx={0} languages={languages} dispatch={jest.fn()} />
    );
    expect(select.instance().updateYears(1985, 'max')).toMatchObject([1972, 1974, 1985]);
  });

  it('Correctly updates a new min for covered_years if multiple values', () => {
    const languages = [
      {
        years_covered: [1972, 1974, 1980],
        annotations: [{ type: 'MORPH', version: 'basic' }]
      }
    ];
    const expected = [1970, 1974, 1980];
    const select = Enzyme.shallow(
      <LanguageSelect idx={0} languages={languages} dispatch={jest.fn()} />
    );
    expect(select.instance().updateYears(1970, 'min')).toMatchObject(expected);
  });

  it('Correctly updates a regular value for covered_years', () => {
    const languages = [
      {
        years_covered: [1972],
        annotations: [{ type: 'MORPH', version: 'basic' }]
      }
    ];
    const expected = [1972, 1973];
    const select = Enzyme.shallow(
      <LanguageSelect idx={0} languages={languages} dispatch={jest.fn()} />
    );
    expect(select.instance().updateYears(1973)).toMatchObject(expected);
  });

  it('removes a value if the value was negative', () => {
    const languages = [
      {
        years_covered: [1972, 1973],
        annotations: [{ type: 'MORPH', version: 'basic' }]
      }
    ];
    const select = Enzyme.shallow(
      <LanguageSelect idx={0} languages={languages} dispatch={jest.fn()} />
    );
    expect(select.instance().updateYears(-1973)).toMatchObject([1972]);
  });
});
