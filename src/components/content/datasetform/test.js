import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import DatasetForm from './index.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('DatasetForm', () => {
  it('Renders a #datasettitle input', () => {
    const wrapper = Enzyme.render(<DatasetForm />);
    expect(wrapper.find('#datasettitle')).toHaveLength(1);
  });
});
