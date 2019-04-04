/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ClosableBox from './index';

Enzyme.configure({ adapter: new Adapter() });

test('can nest children', () => {
  const div = (
    <section>
      test
      <ul>
        <li>list inside</li>
        <li>the test</li>
      </ul>
    </section>
  );
  const box = Enzyme.shallow(<ClosableBox>{div}</ClosableBox>);
  expect(box.html()).toMatch(/<div[^>]+>(<[^>]+>)*<section/);
});

test('can attach a function to be executed when closebutton is pressed', () => {
  const onClose = jest.fn();
  const box = Enzyme.mount(<ClosableBox onClose={onClose} />);
  box.find('svg').simulate('click');
  expect(onClose).toBeCalled();
});
