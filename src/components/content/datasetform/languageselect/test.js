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
  it('Correctly updates a new max for covered_years', () => {
    const languages = [
      {
        years_covered: [1972, 1974, 1980],
        annotations: [{ type: 'MORPH', version: 'basic' }]
      }
    ];
    const expected = [1972, 1974, 1985];
    const select = Enzyme.shallow(
      <LanguageSelect idx={0} languages={languages} dispatch={jest.fn()} />
    );
    expect(select.instance().updateYears(1985, 'max')).toMatchObject(expected);
  });

  it('Correctly updates a new min for covered_years', () => {
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

  it('Correctly updates a regular value covered_years', () => {
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
});
