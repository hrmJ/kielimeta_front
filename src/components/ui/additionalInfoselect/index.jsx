import PropTypes from 'prop-types';
import React from 'react';
import { Select } from '../localizedSelect';
import TooltippedSelect from '../tooltippedSelect';
import { selectStyle } from '../../../general_styles/jsStyles';
import AdditionalField from '../additionalfield';
import LabelledInput from '../labelledinput';
import formStyles from '../../content/datasetform/datasetform.scss';

const AdditionalInfoSelect = props => {
  const {
    options,
    condition,
    onChange,
    additionalFieldChange,
    label,
    additionalLabel,
    tooltipName,
    valueName,
    labelName,
    additionalFieldValue,
    tooltip,
    value,
    id
  } = props;

  const basicProps = { options, onChange, styles: selectStyle, id };
  const tooltipProps = { tooltipName, valueName, labelName };

  if (value) {
    if (!(tooltipName in value)) {
      const matchedOptions = options.filter(
        o => o[valueName] === value[valueName] || o[valueName] === value.value
      );
      if (matchedOptions.length > 0) {
        value[tooltipName] = matchedOptions[0][tooltipName];
        basicProps.value = value;
      }
    }
  }

  return (
    <div className={formStyles.upperContainer}>
      <LabelledInput label={label} tooltip={tooltip}>
        {tooltipName ? (
          <TooltippedSelect {...basicProps} {...tooltipProps} />
        ) : (
          <Select {...basicProps} />
        )}
      </LabelledInput>
      <AdditionalField
        condition={condition}
        label={additionalLabel}
        handleChange={additionalFieldChange}
        value={additionalFieldValue}
      />
    </div>
  );
};

AdditionalInfoSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }))
    .isRequired,
  condition: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  additionalFieldChange: PropTypes.func.isRequired,
  additionalFieldValue: PropTypes.string,
  label: PropTypes.string,
  additionalLabel: PropTypes.string,
  tooltipName: PropTypes.string,
  labelName: PropTypes.string,
  valueName: PropTypes.string,
  tooltip: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })
};

AdditionalInfoSelect.defaultProps = {
  additionalLabel: 'Tarkemmat tiedot',
  label: '',
  tooltipName: '',
  labelName: '',
  valueName: '',
  additionalFieldValue: '',
  tooltip: '',
  id: '',
  value: undefined
};

export default AdditionalInfoSelect;
