import React from 'react';

import AdditionalField from '../../../../../../../ui/additionalfield';
import AutoCompleteField from '../../../../../../../ui/autocompletefield';
import LabelledInput from '../../../../../../../ui/labelledinput';
import Variety from './variety';
import formstyles from '../../../../../datasetform.scss';

export const selectStyle = {
  container: provided => ({
    ...provided,
    width: '60%'
  })
};

export default props => {
  const { onChange, details = {}, varieties, idx, names } = props;
  const { language_code: code = '', variety = '' } = details;
  let selectValue;
  let newlanguageCondition = false;
  if (code && names) {
    selectValue = { value: code, label: names[code] || code };
  }
  if (code) {
    // TODO a more robust check?
    newlanguageCondition = code.length > 3;
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
        >
          Kieli
        </AutoCompleteField>
        <AdditionalField
          condition={newlanguageCondition}
          originalValues={Object.keys(names)}
          currentVal={code}
        >
          <LabelledInput label={'Kielikoodi tälle kielelle'} onChange={() => null} />
        </AdditionalField>
      </div>
      <Variety
        varieties={varieties}
        language_code={code}
        onChange={onChange}
        variety={details.variety}
      />
    </section>
  );
};
