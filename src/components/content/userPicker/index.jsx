import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { filterUserNames, pickUser, resetUserNames } from '../../../redux/actions/users';
import BasicButton from '../../ui/buttons/BasicButton';
import Loader from '../../ui/loader';
import TooltippedSelect from '../../ui/tooltippedSelect';
import generalStyles from '../../../general_styles/general_styles.scss';
import styles from './userpicker.scss';

const ENTER_KEY = 13;

const handleKeyDown = e => {
  // Preventing a form submission by enter
  if (e.keyCode === ENTER_KEY) {
    e.stopPropagation();
    e.preventDefault();
  }
};

class UserPicker extends Component {
  state = { query: '', ou: '', uid: '', mail: '', cn: '' };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(resetUserNames());
  }

  submit() {
    const { onPick } = this.props;
    const { query, ...details } = this.state;
    onPick(details);
  }

  pickFromList(user) {
    const { userNames } = this.props;
    const pickedUser = userNames.find(thisUser => thisUser.uid === user.value);
    this.setState({ ...pickedUser });
  }

  render() {
    const { userNames, dispatch, cancel, loadingState, customCancelText } = this.props;
    const { query } = this.state;

    return (
      <div className={styles.outerContainer}>
        <section className={generalStyles.labelContainerStacked}>
          <div>Käyttäjätietojen haku nimen perusteella</div>
          <div className={styles.container}>
            <div>
              <input
                type="text"
                onChange={ev => this.setState({ query: ev.target.value })}
                onKeyDown={ev => handleKeyDown(ev)}
              />
            </div>
            <div className={styles.buttonContainer}>
              <BasicButton text="Hae" onClick={() => dispatch(filterUserNames(query))} />
            </div>
          </div>
        </section>
        {loadingState.FILTER_USERNAMES === 'requested' && (
          <div className={styles.loaderContainer}>
            <Loader />
          </div>
        )}
        {loadingState.FILTER_USERNAMES === 'success' && userNames.length === 0 && (
          <p>Käyttäjiä ei löytynyt.</p>
        )}
        {Array.isArray(userNames) && userNames.length > 0 && (
          <section className={generalStyles.labelContainerStacked}>
            <div>Löytyneet käyttäjät </div>
            <TooltippedSelect
              options={userNames.map(uname => ({
                label: `${uname.cn} (${uname.uid}@utu.fi)`,
                value: uname.uid,
                ou: uname.ou
              }))}
              tooltipName="ou"
              id="resourcetype"
              creatable
              onChange={selected => this.pickFromList(selected)}
              value={undefined}
            />
          </section>
        )}
        <section className={`${generalStyles.someTopMargin} ${styles.confirmContainer}`}>
          {Array.isArray(userNames) && userNames.length > 0 && (
            <BasicButton text="Vahvista valinta" onClick={() => this.submit()} iconName="faCheck" />
          )}
          <BasicButton
            text={customCancelText || 'Peruuta'}
            iconName="faWindowClose"
            onClick={cancel}
          />
        </section>
      </div>
    );
  }
}

UserPicker.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onPick: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  userNames: PropTypes.arrayOf(
    PropTypes.shape({ cn: PropTypes.string, mail: PropTypes.string, uid: PropTypes.string })
  ).isRequired,
  loadingState: PropTypes.objectOf(PropTypes.any).isRequired,
  customCancelText: PropTypes.string
};

UserPicker.defaultProps = {
  customCancelText: ''
};

export default UserPicker;
