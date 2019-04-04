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
      variant: '',
      annotations: [{ type: 'MORPH', version: 'basic' }],
    },
    {
      name: 'Swedish',
      variant: '',
      annotations: [{ type: 'MORPH', version: 'basic' }],
    },
  ];
  const expected = { ...languages[1], name: 'testlang' };
  const select = Enzyme.shallow(<LanguageSelect idx={1} languages={languages} />);
  expect(select.instance().updateLanguage('name', 'testlang')[1]).toMatchObject(expected);
});

test('Can update new empty details', () => {
  const select = Enzyme.shallow(<LanguageSelect idx={0} languages={[]} />);
  expect(select.instance().updateLanguage('name', 'testlang')).toMatchObject([
    { name: 'testlang' },
  ]);
  expect(select.instance().updateLanguage('variant', 'testvariant')).toMatchObject([
    { name: 'testlang', variant: 'testvariant' },
  ]);
});
