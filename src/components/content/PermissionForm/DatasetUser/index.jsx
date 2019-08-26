import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { editDatasetUsers } from '../../../../redux/actions/users';
import BasicButton from '../../../ui/buttons/BasicButton';
import CbItem from '../../../ui/checkboxlistitem';
import ClosableBox from '../../../ui/closablebox';
import LabelledInput from '../../../ui/labelledinput';
import UserPicker from '../../userPicker';
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

class datasetUser extends Component {
  state = { modalOpen: false };

  setUserName(newval) {
    const { dispatch, users, idx, datasetId } = this.props;
    const { modalOpen } = this.state;
    dispatch(
      editDatasetUsers(
        datasetId,
        users.map((user, userId) => (userId === idx ? { ...user, username: newval } : user))
      )
    );
    if (modalOpen) {
      this.setState({ modalOpen: false });
    }
  }

  render() {
    const { dispatch, idx, users, datasetId, username, userNames, loadingState } = this.props;
    const { modalOpen } = this.state;

    return (
      <ClosableBox
        onClose={() =>
          users.length > 1 && dispatch(editDatasetUsers(datasetId, removeThisUser(users, idx)))
        }
        additionalClass={styles.container}
      >
        {!username && !modalOpen && (
          <p className={styles.info}>
            Kirjoita käyttäjätunnus suoraan oheiseen kenttään tai etsi nimen perusteella painamalla
            alla olevasta napista.
          </p>
        )}
        {modalOpen ? (
          <section className={generalStyles.someTopMargin}>
            <UserPicker
              userNames={userNames}
              dispatch={dispatch}
              onPick={picked => this.setUserName(`${picked.uid}@utu.fi`)}
              cancel={() => this.setState({ modalOpen: false })}
              loadingState={loadingState}
            />
          </section>
        ) : (
          <section>
            <LabelledInput
              label="Käyttäjätunnus"
              tooltip="Käyttäjän utu-tunnus muodossa [tunnus]@utu.fi"
            >
              <input
                type="text"
                value={username}
                required
                onChange={ev => this.setUserName(ev.target.value)}
              />
            </LabelledInput>
            <div className={generalStyles.someTopMargin}>
              <BasicButton
                text="Etsi käyttäjiä"
                onClick={() => this.setState({ modalOpen: true })}
              />
            </div>
          </section>
        )}
        <div className={styles.rightsContainer}>
          <div className={formStyles.labelDiv}>Oikeudet</div>
          <div>
            <ul className={`${generalStyles.responsiveList} ${formStyles.mediatypeList}`}>
              {availablePermissions.map(perm => (
                <CbItem
                  key={perm.value}
                  value={perm.value}
                  id={`permission_${perm.value}`}
                  onChange={ev =>
                    dispatch(
                      editDatasetUsers(
                        datasetId,
                        users.map((user, userId) =>
                          userId === idx ? { ...user, [perm.value]: ev.target.checked } : user
                        )
                      )
                    )
                  }
                  checked={this.props[perm.value]}
                >
                  {perm.label}
                </CbItem>
              ))}
            </ul>
          </div>
        </div>
      </ClosableBox>
    );
  }
}

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
  datasetId: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  userNames: PropTypes.arrayOf(
    PropTypes.shape({ cn: PropTypes.string, mail: PropTypes.string, uid: PropTypes.string })
  ).isRequired,
  loadingState: PropTypes.objectOf(PropTypes.any).isRequired
};

datasetUser.defaultProps = {
  users: []
};

export default datasetUser;
