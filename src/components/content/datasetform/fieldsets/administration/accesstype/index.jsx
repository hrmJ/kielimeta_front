import React from 'react';
import Select from 'react-select';

import { selectStyle } from '../../../../../../general_styles/jsStyles';
import { updateField } from '../../../../../../redux/actions/datasetform';
import AdditionalField from '../../../../../ui/additionalfield';
import LabelledInput from '../../../../../ui/labelledinput';
import formStryles from '../../../datasetform.scss';

const options = [
  { label: 'Avoin', value: 'open' },
  { label: 'Avoin utu-tunnuksille', value: 'open_for_utu' },
  { label: 'Ottamalla yhteyttä', value: 'contact' },
  { label: 'Ei käyttölupaa myönnettävissä', value: 'closed' },
  { label: 'Muu', value: 'other' },
];

export default (props) => {
  const { accessType, dispatch } = props;

  return (
    <div className={formStryles.upperContainer}>
      <LabelledInput label="Aineiston avoimuus">
        <Select
          options={options}
          onChange={selected => dispatch(updateField('access_type', selected.value))}
          styles={selectStyle}
        />
      </LabelledInput>
      <AdditionalField
        condition={
          accessType
          && !options
            .map(o => o.value)
            .filter(o => o !== 'other')
            .includes(accessType)
        }
        label="kuvaile tarkemmin aineiston käyttörajoitteita"
        handleChange={ev => dispatch(updateField('access_type', ev.target.value))}
      />
    </div>
  );
};
