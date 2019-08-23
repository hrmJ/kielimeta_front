import React from 'react';
import PropTypes from 'prop-types';

import AdditionalField from '../../../../../../../ui/additionalfield';
import AutoCompleteField from '../../../../../../../ui/autocompletefield';
import LabelledInput from '../../../../../../../ui/labelledinput';
import Variety from './variety';
import formstyles from '../../../../../datasetform.scss';
import Speaker from './speaker';
import styles from './detailstyles.scss';

const detailsComponent = props => {
  const {
    onChange,
    details = {},
    varieties,
    idx,
    names,
    varietyTypes,
    dispatch,
    modality,
    speaker
  } = props;
  const { language_code: code, variety, language_name: name, variety_type: varietyType } = details;
  let selectValue;
  let newlanguageCondition = false;
  if (name) {
    if (!Object.keys(names).includes(code)) {
      newlanguageCondition = true;
    }
    selectValue = { value: code, label: name };
  } else if (code && names) {
    selectValue = { value: code, label: names[code] || code };
    if (code === names[code]) {
      newlanguageCondition = true;
    }
  }
  return (
    <section>
      <div className={formstyles.upperContainer}>
        <AutoCompleteField
          onChange={selectedoption => onChange('language_code', selectedoption)}
          categoryName="code"
          maxEntries={700}
          labelName="name"
          path="languages"
          id={`lang_${idx}_langselect`}
          value={selectValue || ''}
          tooltip={`Aloita kirjoittamaan kielen suomenkielistä nimeä ja valitse
            listalta sille ilmestyvistä vaihtoehdoista. Ääritapauksissa myös
            uuden kielen lisääminen on mahdollista, mutta huomaa, että saman
            kielen eri variantit määritellään erikseen omassa kentässään. `}
        >
          Kieli
        </AutoCompleteField>
        <AdditionalField condition={newlanguageCondition}>
          <LabelledInput
            id={`lang_${idx}_newcode`}
            label="Kielikoodi tälle kielelle"
            handleChange={ev => onChange('new_language_code', ev.target.value)}
            value={code}
          />
          <div className={styles.codeTooltip}>
            Huom: etsi ensisijaisesti WALSin hausta (
            <a href="https://wals.info/languoid">wals.info/languoid</a>) ja käytä sieltä saatavaa
            ISO-6393-koodia, jos sellainen on annettu.
          </div>
        </AdditionalField>
      </div>
      <Variety
        idx={idx}
        varieties={varieties}
        code={code}
        name={name}
        onChange={onChange}
        variety={variety}
        varietyType={varietyType}
        varietyTypes={varietyTypes}
        modality={modality}
        isNewLanguage={newlanguageCondition}
        dispatch={dispatch}
      />
      <Speaker
        idx={idx}
        dispatch={dispatch}
        languageCode={code}
        speaker={speaker}
        onChange={onChange}
        names={names}
        dispath={dispatch}
      />
    </section>
  );
};

detailsComponent.propTypes = {
  onChange: PropTypes.func.isRequired,
  details: PropTypes.shape({
    language_code: PropTypes.string,
    variety: PropTypes.string,
    variety_type: PropTypes.string
  }),
  varieties: PropTypes.objectOf(PropTypes.any),
  idx: PropTypes.number.isRequired,
  names: PropTypes.objectOf(PropTypes.any),
  varietyTypes: PropTypes.arrayOf(PropTypes.string),
  dispatch: PropTypes.func.isRequired,
  modality: PropTypes.arrayOf(PropTypes.string),
  speakerStatus: PropTypes.string,
  speakerL1: PropTypes.arrayOf(
    PropTypes.shape({
      language_code: PropTypes.string,
      variety_type: PropTypes.string,
      variety: PropTypes.string
    })
  )
};

detailsComponent.defaultProps = {
  details: {},
  varietyTypes: [],
  names: {},
  varieties: {},
  modality: [],
  speakerStatus: '',
  speakerL1: []
};

export default detailsComponent;
