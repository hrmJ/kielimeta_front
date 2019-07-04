import PropTypes from 'prop-types';
import React from 'react';
import { Select } from '../../../../ui/localizedSelect';

import { selectStyle } from '../../../../../general_styles/jsStyles';
import { updateField } from '../../../../../redux/actions/datasetform';
// import AdditionalInfoSelect from '../../../../ui/additionalInfoselect';
import AutoCompleteField from '../../../../ui/autocompletefield';
import LabelledInput from '../../../../ui/labelledinput';
import License from './license';
import sensitivityOptions from './sensitivityOptions';

const Administration = props => {
  const {
    dispatch,
    project,
    license,
    sensitivity,
    owner,
    dataLocation,
    licenseInfo,
    dataLocationStatus
  } = props;
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
      <License dispatch={dispatch} license={license} licenseInfo={licenseInfo} />
      <LabelledInput
        label="Suojaustarve tai sensitiivisyys"
        tooltip={`Ilmoita
        tässä, jos aineistoon liittyy esimerkiksi salassapidettäviä tietoja.`}
      >
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
        tooltip={`Tavallisesti yksinkertaisesti "Turun yliopisto"`}
        value={owner}
      />
      <LabelledInput
        label="Aineiston tallennuspaikka"
        id="dataLocation"
        handleChange={ev => dispatch(updateField('data_location', ev.target.value))}
        value={dataLocation}
        tooltip={`Sijaitseeko varsinainen data esim. verkkolevyllä,
            pilvipalvelussa, muistitikulla vai jossain muualla`}
      />
      <LabelledInput
        label="Nykyisen tallennusratkaisun toimivuus"
        value={dataLocation}
        tooltip={`Jos aineiston tallennuspaikka ei tällä hetkellä ole
          optimaalinen, ilmoita siitä tässä`}
      >
        <Select
          options={['Kunnossa', 'Vaatii parannusta'].map(o => ({ value: o, label: o }))}
          isSearchable={false}
          styles={selectStyle}
          value={dataLocationStatus && { label: dataLocationStatus, value: dataLocationStatus }}
          onChange={selected => dispatch(updateField('data_location_status', selected.value))}
        />
      </LabelledInput>
    </div>
  );
};

Administration.propTypes = {
  dispatch: PropTypes.func.isRequired,
  project: PropTypes.string,
  license: PropTypes.string,
  sensitivity: PropTypes.string,
  owner: PropTypes.string,
  dataLocation: PropTypes.string,
  dataLocationStatus: PropTypes.string,
  licenseInfo: PropTypes.string
};

Administration.defaultProps = {
  project: '',
  license: '',
  sensitivity: '',
  owner: '',
  dataLocation: '',
  dataLocationStatus: '',
  licenseInfo: ''
};

export default Administration;
