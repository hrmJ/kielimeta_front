import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';

import { selectStyle } from '../../../general_styles/jsStyles';
import AdditionalField from '../additionalfield';
import LabelledInput from '../labelledinput';
import formStyles from '../../content/datasetform/datasetform.scss';

const index = props => {
  const { options, condition, onChange, AdditionalFieldChange, label, additionalLabel } = props;

  return (
    <div className={formStyles.upperContainer}>
      <LabelledInput label={label}>
        <Select options={options} onChange={onChange} styles={selectStyle} />
      </LabelledInput>
      <AdditionalField
        condition={condition}
        label={additionalLabel}
        handleChange={AdditionalFieldChange}
      />
    </div>
  );
};

index.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }))
    .isRequired,
  condition: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  AdditionalFieldChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  additionalLabel: PropTypes.string
};

index.defaultProps = {
  additionalLabel: 'Tarkemmat tiedot',
  label: ''
};

export default index;
