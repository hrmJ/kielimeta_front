import React from 'react';

import AdditionalField from '../../../../../../../ui/additionalfield';
import AutoCompleteField from '../../../../../../../ui/autocompletefield';
import LabelledInput from '../../../../../../../ui/labelledinput';
import Variety from './variety';
import formstyles from '../../../../../datasetform.scss';
import Speaker from './speaker';

export default props => {
  const {
    onChange,
    details = {},
    varieties,
    idx,
    names,
    varietyTypes,
    dispatch,
    modality,
    speakerStatus
  } = props;
  const { language_code: code = '', variety = '', language_name } = details;
  let selectValue;
  let newlanguageCondition = false;
  if (language_name) {
    newlanguageCondition = true;
    selectValue = { value: code, label: language_name };
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
        </AdditionalField>
      </div>
      <Variety
        idx={idx}
        varieties={varieties}
        language_code={code}
        onChange={onChange}
        variety={details.variety}
        varietyType={details.variety_type}
        varietyTypes={varietyTypes}
        modality={modality}
        isNewLanguage={newlanguageCondition}
        dispatch={dispatch}
      />
      <Speaker
        idx={idx}
        dispatch={dispatch}
        languageCode={code}
        speakerStatus={speakerStatus}
        onChange={onChange}
      />
    </section>
  );
};
