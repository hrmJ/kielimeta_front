import React from 'react';

import AutoCompleteField from '../../../../../../../ui/autocompletefield';
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
  if (code && names) {
    selectValue = { value: code, label: names[code] };
  }
  console.debug('RENDERING');
  console.debug(selectValue);

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
