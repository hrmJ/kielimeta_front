import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';

import { selectStyle } from '../../../../../general_styles/jsStyles';
import { updateField } from '../../../../../redux/actions/datasetform';
import AdditionalInfoSelect from '../../../../ui/additionalInfoselect';
import LabelledInput from '../../../../ui/labelledinput';
import License from './license';

const sensitivityOptions = [
  { label: 'ei suojaustarvetta', value: 'none' },
  { label: 'sisältää henkilötietoja', value: 'personal' },
  { label: 'sisältää arkaluontoisia henkilötietoja', value: 'sensitive_personal' },
  { label: 'sisältää salassapidettäviä tietoja', value: 'confidential' }
];

const index = props => {
  const { dispatch } = props;
  return (
    <div>
      <LabelledInput
        label="Projekti, johon aineisto kuuluu"
        handleChange={ev => dispatch(updateField('project', ev.target.value))}
      />
      <License dispatch={dispatch} />
      <LabelledInput label="Suojaustarve">
        <Select
          options={sensitivityOptions}
          onChange={selected => dispatch(updateField('sensitivity', selected.value))}
          styles={selectStyle}
        />
      </LabelledInput>
      <LabelledInput
        label="Aineiston omistaja(t)"
        handleChange={ev => dispatch(updateField('owner', ev.target.value))}
        placeholder="Jos useita, erota pilkulla"
      />
      {/* Erota pilkulla, jos useampia */}
      <LabelledInput
        label="Aineiston tallennuspaikka"
        handleChange={ev => dispatch(updateField('data_location', ev.target.value))}
      />
    </div>
  );
};

index.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default index;
