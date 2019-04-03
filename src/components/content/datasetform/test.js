/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import DatasetForm from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('DatasetForm', () => {
  it('Renders a #datasettitle input', () => {
    const wrapper = Enzyme.render(<DatasetForm />);
    expect(wrapper.find('#datasettitle')).toHaveLength(1);
  });

  it(`should have its handlechange triggered when the value of #datasettitle
  is changed`, () => {
    const wrapper = Enzyme.mount(<DatasetForm />);
    const spy = spyOn(wrapper.instance(), 'handleChange');
    wrapper.update();
    wrapper.instance().forceUpdate();
    wrapper.find('#datasettitle').simulate('change', { target: { value: 'blaa' } }, '10');
    expect(spy).toHaveBeenCalled();
    // wrapper.find('#datasettitle').props();
  });
});
