import PropTypes from 'prop-types';
import React from 'react';
import { Select } from '../../../../ui/localizedSelect';

import { selectStyle } from '../../../../../general_styles/jsStyles';
import { updateField } from '../../../../../redux/actions/datasetform';
// import AdditionalInfoSelect from '../../../../ui/additionalInfoselect';
import AutoCompleteField from '../../../../ui/autocompletefield';
import LabelledInput from '../../../../ui/labelledinput';
import License from './license';

const sensitivityOptions = [
  { label: 'ei suojaustarvetta', value: 'none' },
  { label: 'sisältää henkilötietoja', value: 'personal' },
  { label: 'sisältää arkaluontoisia henkilötietoja', value: 'sensitive_personal' },
  { label: 'sisältää salassapidettäviä tietoja', value: 'confidential' }
];

const index = props => {
  const { dispatch, project, license, sensitivity, owner, data_location } = props;
  return (
    <div>
      <AutoCompleteField
        onChange={selected => dispatch(updateField('project', selected.value))}
        categoryName="flat"
        path="project_names"
        value={project && { value: project, label: project }}
      >
        Projekti, johon aineisto kuuluu
      </AutoCompleteField>
      <License dispatch={dispatch} license={license} />
      <LabelledInput label="Suojaustarve">
        <Select
          options={sensitivityOptions}
          onChange={selected => dispatch(updateField('sensitivity', selected.value))}
          styles={selectStyle}
          value={sensitivity && sensitivityOptions.filter(so => so.value === sensitivity)}
        />
      </LabelledInput>
      <LabelledInput
        label="Aineiston omistaja(t)"
        handleChange={ev => dispatch(updateField('owner', ev.target.value))}
        placeholder="Jos useita, erota pilkulla"
        value={owner}
      />
      <LabelledInput
        label="Aineiston tallennuspaikka"
        handleChange={ev => dispatch(updateField('data_location', ev.target.value))}
        value={data_location}
      />
    </div>
  );
};

index.propTypes = {
  dispatch: PropTypes.func.isRequired,
  project: PropTypes.string,
  license: PropTypes.string,
  sensitivity: PropTypes.string,
  owner: PropTypes.string,
  data_location: PropTypes.string
};

index.defaultProps = {
  project: '',
  license: '',
  sensitivity: '',
  owner: '',
  data_location: ''
};

export default index;

