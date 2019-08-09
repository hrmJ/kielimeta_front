import PropTypes from 'prop-types';
import React from 'react';

import { editDatasetUsers } from '../../../../redux/actions/datasets';
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

const removeThisUser = (users, idx) => {
  const updated = users;
  updated.splice(idx, 1);
  return updated;
};

const datasetUser = props => {
  const { dispatch, idx, users, datasetId } = props;

  return (
    <ClosableBox
      onClose={() => dispatch(editDatasetUsers(datasetId, removeThisUser(users, idx)))}
      additionalClass={styles.container}
    >
      <LabelledInput
        label="Käyttäjätunnus"
        tooltip="Käyttäjän utu-tunnus muodossa [tunnus]@utu.fi"
        value="testi"
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
  users: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string,
      can_edit: PropTypes.bool,
      can_delete: PropTypes.bool,
      can_edit_permissions: PropTypes.bool
    })
  ),
  dispatch: PropTypes.func.isRequired,
  idx: PropTypes.number.isRequired,
  datasetId: PropTypes.number.isRequired
};

datasetUser.defaultProps = {
  users: []
};

export default datasetUser;
