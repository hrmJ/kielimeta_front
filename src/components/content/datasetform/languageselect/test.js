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

describe('updateSize', () => {
  it('Adds a new key if doesnt exist', () => {
    const languages = [
      {
        annotations: [{ type: 'MORPH', version: 'basic' }]
      }
    ];
    const select = Enzyme.shallow(
      <LanguageSelect idx={0} languages={languages} dispatch={jest.fn()} />
    );
    expect(select.instance().updateSize('tokens', 500)).toMatchObject({ tokens: 500 });
  });

  it('Updates a key if exists', () => {
    const languages = [
      {
        size: { tokens: 9000, words: 8700 },
        annotations: [{ type: 'MORPH', version: 'basic' }]
      }
    ];
    const select = Enzyme.shallow(
      <LanguageSelect idx={0} languages={languages} dispatch={jest.fn()} />
    );
    expect(select.instance().updateSize('tokens', 500)).toMatchObject({ tokens: 500, words: 8700 });
  });

  it('delets a key if empty value provided', () => {
    const languages = [
      {
        size: { tokens: 9000, words: 8700 },
        annotations: [{ type: 'MORPH', version: 'basic' }]
      }
    ];
    const select = Enzyme.shallow(
      <LanguageSelect idx={0} languages={languages} dispatch={jest.fn()} />
    );
    expect(select.instance().updateSize('tokens', '')).toMatchObject({ words: 8700 });
  });
});
