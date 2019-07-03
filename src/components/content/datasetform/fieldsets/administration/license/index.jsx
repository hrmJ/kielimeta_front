import React from 'react';
import PropTypes from 'prop-types';
import licenseOptions from './licenceOptions';

import { updateField } from '../../../../../../redux/actions/datasetform';
import AdditionalInfoSelect from '../../../../../ui/additionalInfoselect';

const License = props => {
  const { dispatch, license, licenseInfo } = props;

  return (
    <AdditionalInfoSelect
      id="license"
      labelName="name"
      tooltipName="description"
      valueName="val"
      options={licenseOptions}
      value={license && { label: license === 'undefined' ? 'Muu, mikä' : license, value: license }}
      onChange={selected => dispatch(updateField('license', selected.value))}
      additionalFieldChange={ev => dispatch(updateField('license_info', ev.target.value))}
      additionalFieldValue={licenseInfo}
      condition={license === 'undefined'}
      label="Käyttölisenssi"
      tooltip={`Jos tiedossa, ilmoita tässä lisenssi, jonka alla aineistoa saa
        käyttää. Voit valita tähän listatuista creative commons -lisensseistä
        tai määritellä omasi muu-vaihtoehdolla.`}
    />
  );
};

License.propTypes = {
  license: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  licenseInfo: PropTypes.string
};

License.defaultProps = {
  license: '',
  licenseInfo: ''
};

export default License;
