import React, { Component } from 'react';
import Select from 'react-select';

import { selectStyle } from '../../../../../../general_styles/jsStyles';
import { updateField } from '../../../../../../redux/actions/datasetform';
import AdditionalField from '../../../../../ui/additionalfield';
import LabelledInput from '../../../../../ui/labelledinput';
import formStyles from '../../../datasetform.scss';

const options = [
  { label: 'Verkko-osoite', value: 'url' },
  { label: 'Yhteyshenkilön kautta', value: 'contactperson' },
  { label: 'Muulla tavoin', value: 'other' },
];

export default class AccessInfo extends Component {
  state = { accessType: undefined };

  selectType(selected) {
    const { dispatch, placeOfPublication } = this.props;
    if (selected.value === 'contactperson') {
      dispatch(updateField('access_information', 'Yhteyshenkilöiden kautta'));
    }
    this.setState({ accessType: selected.value });
  }

  render() {
    const { dispatch, placeOfPublication } = this.props;
    const { accessType } = this.state;
    return (
      <div className={formStyles.upperContainer}>
        <LabelledInput label="Miten aineistoa pääsee käyttämään?">
          <Select
            options={options}
            styles={selectStyle}
            onChange={selected => this.selectType(selected)}
          />
        </LabelledInput>
        <AdditionalField
          condition={accessType === 'url'}
          label="Anna osoite"
          type="text"
          handleChange={ev => dispatch(
            updateField('place_of_publication', {
              ...placeOfPublication,
              ...{ location: ev.target.value },
            }),
          )
          }
        />
        <AdditionalField
          condition={accessType === 'other'}
          label="Ohjeet aineiston saamiseksi"
          handleChange={ev => dispatch(updateField('access_information', ev.target.value))}
        />
      </div>
    );
  }
}
