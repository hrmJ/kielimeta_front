import PropTypes from 'prop-types';
import React from 'react';

import CbItem from '../../../ui/checkboxlistitem';
import ClosableBox from '../../../ui/closablebox';
import LabelledInput from '../../../ui/labelledinput';
import formStyles from '../../datasetform/datasetform.scss';
import generalStyles from '../../../../general_styles/general_styles.scss';
import styles from './datasetuser.scss';

const availablePermissions = [
  { label: 'oikeus muokata', value: 'can_edit' },
  { label: 'oikeus poistaa', value: 'can_delete' },
  { label: 'oikeus antaa oikeuksia', value: 'can_edit_permissions' }
];

const datasetUser = props => {
  const { dispatch } = props;
  return (
    <ClosableBox onClose={() => null} additionalClass={styles.container}>
      <LabelledInput
        label="Käyttäjätunnus"
        tooltip="Käyttäjän utu-tunnus muodossa [tunnus]@utu.fi"
      />
      <div className={styles.rightsContainer}>
        <div className={formStyles.labelDiv}>Oikeudet</div>
        <div>
          <ul className={`${generalStyles.responsiveList} ${formStyles.mediatypeList}`}>
            {availablePermissions.map(perm => (
              <CbItem
                key={perm.value}
                value={perm.value}
                id={`permission_${perm.value}`}
                onChange={ev => dispatch()}
                // checked={mediaTypes.includes(key)}
              >
                {perm.label}
              </CbItem>
            ))}
          </ul>
        </div>
      </div>
    </ClosableBox>
  );
};

datasetUser.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default datasetUser;
