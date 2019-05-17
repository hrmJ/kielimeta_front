import React, { Component } from 'react';
import Select from 'react-select';
import langmap from 'langmap';
import uuid from 'cuid';
import Variety from './variety';

import AdditionalField from '../../../../../../../ui/additionalfield';
import AutoCompleteField from '../../../../../../../ui/autocompletefield';
import LabelledInput from '../../../../../../../ui/labelledinput';
import formstyles from '../../../../../datasetform.scss';

export const selectStyle = {
  container: provided => ({
    ...provided,
    width: '60%',
  }),
};

export default class Details extends Component {
  componentDidMount() {
    const { dispatch, details = {} } = this.props;
    const { language_code = '', variety = '' } = details;
    // dispatch(getVarieties(language_code));
  }

  render() {
    const {
      onChange, details = {}, varieties, idx,
    } = this.props;
    const { language_code = '', variety = '' } = details;

    return (
      <section>
        <div className={formstyles.upperContainer}>
          <AutoCompleteField
            onChange={selectedoption => onChange('language_code', selectedoption.value)}
            categoryName="code"
            labelName="name"
            path="languages"
            id={`lang_${idx}_langselect`}
          >
            Kieli
          </AutoCompleteField>
        </div>
        <Variety
          varieties={varieties}
          language_code={language_code}
          onChange={onChange}
          variety={details.variety}
        />
      </section>
    );
  }
}
