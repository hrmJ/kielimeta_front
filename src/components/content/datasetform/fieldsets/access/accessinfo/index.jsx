import PropTypes from 'prop-types';
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
  { label: 'Muulla tavoin', value: 'other' }
];

export default class AccessInfo extends Component {
  state = { accessType: undefined };

  componentDidMount() {
    const { access_information, placeOfPublication } = this.props;
    if (access_information === 'contactperson') {
      this.setState({ accessType: access_information });
    } else if (placeOfPublication.location) {
      this.setState({ accessType: 'url' });
    } else if (access_information) {
      this.setState({ accessType: 'other' });
    }
  }

  selectType(selected) {
    const { dispatch } = this.props;
    if (selected.value === 'contactperson') {
      dispatch(updateField('access_information', selected.value));
    }
    this.setState({ accessType: selected.value });
  }

  render() {
    const { dispatch, placeOfPublication, access_information } = this.props;
    const { accessType } = this.state;
    return (
      <div className={formStyles.upperContainer}>
        <LabelledInput label="Miten aineistoa pääsee käyttämään?">
          <Select
            options={options}
            styles={selectStyle}
            onChange={selected => this.selectType(selected)}
            value={accessType && options.filter(o => o.value === accessType)}
          />
        </LabelledInput>
        <AdditionalField
          condition={accessType === 'url'}
          label="Anna osoite"
          type="text"
          value={placeOfPublication.location}
          handleChange={ev =>
            dispatch(
              updateField('place_of_publication', {
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
          value={access_information !== 'contactperson' ? access_information : ''}
        />
      </div>
    );
  }
}

AccessInfo.propTypes = {
  dispatch: PropTypes.func.isRequired,
  placeOfPublication: PropTypes.shape({ location: PropTypes.string }),
  access_information: PropTypes.string
};

AccessInfo.defaultProps = {
  placeOfPublication: { location: '' },
  access_information: ''
};
