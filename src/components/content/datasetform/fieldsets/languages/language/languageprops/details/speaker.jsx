import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Select } from '../../../../../../../ui/localizedSelect';
import { selectStyle } from '../../../../../../../../general_styles/jsStyles';
import { updateLanguageName } from '../../../../../../../../redux/actions/languageactions';
import AdditionalField from '../../../../../../../ui/additionalfield';
import AutoCompleteField from '../../../../../../../ui/autocompletefield';
import LabelledInput from '../../../../../../../ui/labelledinput';
import formStyles from '../../../../../datasetform.scss';

const speakerOptions = ['L1', 'L2', 'ei tiedossa'].map(s => ({ label: s, value: s }));

class Speaker extends Component {
  updateSpeakerL1(langs) {
    const { onChange, names, dispatch, speaker } = this.props;
    const newNames = langs.filter(lang => !Object.keys(names).includes(lang.value));
    const formattedLangs = langs.map(lang => ({
      language_code: lang.value,
      variety: 'generic',
      variety_type: 'generic'
    }));
    if (Array.isArray(newNames) && newNames[0]) {
      dispatch(updateLanguageName(newNames[0].value, newNames[0].label));
    }
    onChange('speaker', { ...speaker, speaker_l1: formattedLangs });
  }

  render() {
    const { languageCode, speaker, onChange, idx, names } = this.props;
    if (!languageCode) {
      return null;
    }

    const { speaker_status: speakerStatus, speaker_l1: speakerL1 = [] } = speaker;

    const speakerL1Value = speakerL1.map(s => ({
      value: s.language_code,
      label: names[s.language_code],
      tooltip: undefined
    }));

    return (
      <div className={formStyles.upperContainer}>
        <LabelledInput label="Puhujien / kirjoittajien status">
          <Select
            id={`speakerstatus_${idx}`}
            options={speakerOptions}
            styles={selectStyle}
            value={speakerStatus && { label: speakerStatus, value: speakerStatus }}
            onChange={selected =>
              onChange('speaker', { ...speaker, speaker_status: selected.value })
            }
          />
        </LabelledInput>
        <AdditionalField condition={speakerStatus === 'L2'}>
          <AutoCompleteField
            value={speakerL1Value}
            onChange={langs => this.updateSpeakerL1(langs)}
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
  }
}

Speaker.propTypes = {
  languageCode: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  idx: PropTypes.number,
  names: PropTypes.objectOf(PropTypes.any),
  speaker: PropTypes.shape({
    speaker_l1: PropTypes.arrayOf(
      PropTypes.shape({
        language_code: PropTypes.string,
        variety_type: PropTypes.string,
        variety: PropTypes.string
      })
    ),
    speaker_status: PropTypes.string
  }),
  dispatch: PropTypes.func.isRequired
};

Speaker.defaultProps = {
  languageCode: '',
  idx: 0,
  speaker: {},
  names: {}
};

export default Speaker;
