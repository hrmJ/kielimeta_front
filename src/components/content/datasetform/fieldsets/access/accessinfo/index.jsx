import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Select } from '../../../../../ui/localizedSelect';

import { selectStyle } from '../../../../../../general_styles/jsStyles';
import { updateField } from '../../../../../../redux/actions/datasetform';
import AdditionalField from '../../../../../ui/additionalfield';
import LabelledInput from '../../../../../ui/labelledinput';
import formStyles from '../../../datasetform.scss';

const options = [
  { label: 'Verkko-osoite', value: 'url' },
  { label: 'Yhteyshenkilön kautta', value: 'contactperson' },
  { label: 'Muulla tavoin', value: 'other' }
];

export default class AccessInfo extends Component {
  state = { accessType: undefined };

  componentDidMount() {
    const { accessInformation, placeOfPublication } = this.props;
    if (accessInformation === 'contactperson') {
      this.setState({ accessType: accessInformation });
    } else if (placeOfPublication.location) {
      this.setState({ accessType: 'url' });
    } else if (accessInformation) {
      this.setState({ accessType: 'other' });
    }
  }

  selectType(selected) {
    const { dispatch, placeOfPublication } = this.props;
    if (selected.value === 'contactperson') {
      dispatch(
        updateField('access_information', {
          placeOfPublication,
          access_information: selected.value
        })
      );
    }
    this.setState({ accessType: selected.value });
  }

  render() {
    const { dispatch, placeOfPublication, accessInformation } = this.props;
    const { accessType } = this.state;
    return (
      <div className={formStyles.upperContainer}>
        <LabelledInput
          label="Miten aineistoa pääsee käyttämään?"
          tooltip={`Jos
          aineisto on saatavilla esimerkiksi kielipankin korp-käyttöliittymän
          kautta, lisää tämä verkko-osoitteena. Jos aineiston käyttö tapahtuu
          ottamalla yhteyttä johonkin yhteyshenkilöistä, valitse keskimmäinen
          vaihtoehto tai tarvittaessa anna vapaasanainen kuvaus.`}
        >
          <Select
            options={options}
            styles={selectStyle}
            onChange={selected => this.selectType(selected)}
            value={accessType && options.filter(o => o.value === accessType)}
            isSearchable={false}
          />
        </LabelledInput>
        <AdditionalField
          condition={accessType === 'url'}
          label="Anna osoite"
          type="text"
          value={placeOfPublication.location}
          handleChange={ev =>
            dispatch(
              updateField('place_of_publication_location', {
                ...placeOfPublication,
                ...{ location: ev.target.value }
              })
            )
          }
        />
        <AdditionalField
          condition={accessType === 'other'}
          label="Ohjeet aineiston saamiseksi"
          handleChange={ev =>
            dispatch(
              updateField('access_information', {
                placeOfPublication,
                access_information: ev.target.value
              })
            )
          }
          value={accessInformation !== 'contactperson' ? accessInformation : ''}
        />
      </div>
    );
  }
}

AccessInfo.propTypes = {
  dispatch: PropTypes.func.isRequired,
  placeOfPublication: PropTypes.shape({ location: PropTypes.string }),
  accessInformation: PropTypes.string
};

AccessInfo.defaultProps = {
  placeOfPublication: { location: '' },
  accessInformation: ''
};
