import React from 'react';
import PropTypes from 'prop-types';

import { updateField } from '../../../../../../redux/actions/datasetform';
import LabelledInput from '../../../../../ui/labelledinput';
import AdditionalInfoSelect from '../../../../../ui/additionalInfoselect';

const options = [
  {
    val: 'CC BY',
    name: 'Attribution (CC BY)',
    description: `This license lets others distribute, remix, tweak, and build upon your
    work, even commercially, as long as they credit you for the original
    creation. This is the most accommodating of licenses offered. Recommended
    for maximum dissemination and use of licensed materials.`
  },
  {
    val: 'CC BY-SA',
    name: 'Attribution-ShareAlike (CC BY-SA)',
    description: `This license lets others remix, tweak, and build upon your
    work even for commercial purposes, as long as they credit you and license
    their new creations under the identical terms. This license is often
    compared to “copyleft” free and open source software licenses. All new
    works based on yours will carry the same license, so any derivatives will
    also allow commercial use. This is the license used by Wikipedia, and is
    recommended for materials that would benefit from incorporating content
    from Wikipedia and similarly licensed projects.`
  },
  {
    val: 'CC BY-ND',
    name: 'Attribution-NoDerivs (CC BY-ND)',
    description: `This license lets others reuse the work for any purpose, including
    commercially; however, it cannot be shared with others in adapted form, and
    credit must be provided to you.`
  },
  {
    val: 'CC BY-NC',
    name: 'Attribution-NonCommercial (CC BY-NC)',
    description: `This license lets others remix, tweak, and build upon your
    work non-commercially, and although their new works must also acknowledge
    you and be non-commercial, they don’t have to license their derivative
    works on the same terms.`
  },
  {
    val: 'CC BY-NC-SA',
    name: 'Attribution-NonCommercial-ShareAlike (CC BY-NC-SA)',
    description: `This license lets others remix, tweak, and build upon your
    work non-commercially, as long as they credit you and license their new
    creations under the identical terms.`
  },
  {
    val: 'CC BY-NC-ND',
    name: 'Attribution-NonCommercial-NoDerivs (CC BY-NC-ND)',
    description: `This license is the most restrictive of our six main licenses, only
    allowing others to download your works and share them with others as long
    as they credit you, but they can’t change them in any way or use them
    commercially.`
  },
  {
    val: 'undefined',
    name: 'Ei määritetty / tiedossa',
    description: ''
  }
];

const index = props => {
  const { dispatch, license, license_info } = props;

  return (
    <AdditionalInfoSelect
      labelName="name"
      tooltipName="description"
      valueName="val"
      options={options}
      value={license && { label: license, value: license }}
      onChange={selected => dispatch(updateField('license', selected.value))}
      additionalFieldChange={ev => dispatch(updateField('license_info', ev.target.value))}
      additionalFieldValue={license_info}
      condition={license === 'undefined'}
      label="Käyttölisenssi"
    />
  );
};

index.propTypes = {
  license: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  license_info: PropTypes.string
};

index.defaultProps = {
  license: '',
  license_info: ''
};

export default index;
