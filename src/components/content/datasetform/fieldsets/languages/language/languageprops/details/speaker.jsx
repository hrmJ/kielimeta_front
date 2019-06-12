import PropTypes from 'prop-types';
import React from 'react';

import { Select } from '../../../../../../../ui/localizedSelect';
import { selectStyle } from '../../../../../../../../general_styles/jsStyles';
import AdditionalField from '../../../../../../../ui/additionalfield';
import AutoCompleteField from '../../../../../../../ui/autocompletefield';
import LabelledInput from '../../../../../../../ui/labelledinput';
import formStyles from '../../../../../datasetform.scss';

const speakerOptions = ['L1', 'L2', 'ei tiedossa'].map(s => ({ label: s, value: s }));

const speaker = props => {
  const { languageCode, speakerStatus, onChange } = props;
  if (!languageCode) {
    return null;
  }
  return (
    <div className={formStyles.upperContainer}>
      <LabelledInput label="Puhujien / kirjoittajien status">
        <Select
          options={speakerOptions}
          styles={selectStyle}
          value={speakerStatus && { label: speakerStatus, value: speakerStatus }}
          onChange={selected => onChange('speaker_status', selected.value)}
        />
      </LabelledInput>
      <AdditionalField condition={speakerStatus === 'L2'}>
        <AutoCompleteField
          onChange={selectedoption => onChange('speaker_l1', selectedoption)}
          categoryName="code"
          labelName="name"
          path="languages"
          isMulti
        >
          Puhujien äidinkielet, jos tiedossa
        </AutoCompleteField>
      </AdditionalField>
    </div>
  );
};

speaker.propTypes = {
  languageCode: PropTypes.string,
  speakerStatus: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

speaker.defaultProps = {
  languageCode: '',
  speakerStatus: ''
};

export default speaker;
