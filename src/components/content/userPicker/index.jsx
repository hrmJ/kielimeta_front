import PropTypes from 'prop-types';
import React, { Component } from 'react';
import shortid from 'shortid';

import { filterUserNames, pickUser } from '../../../redux/actions/users';
import BasicButton from '../../ui/buttons/BasicButton';
import Save from '../../ui/buttons/save';
import TooltippedSelect from '../../ui/tooltippedSelect';
import generalStyles from '../../../general_styles/general_styles.scss';
import styles from './userpicker.scss';

class UserPicker extends Component {
  pickerId = undefined;

  state = { query: '', ou: '', uid: '', mail: '', cn: '' };

  componentDidMount() {
    if (!this.pickerId) {
      this.pickerId = shortid.generate();
    }
  }

  submit(ev) {
    const { dispatch } = this.props;
    const { query, ...details } = this.state;
    ev.preventDefault();
    dispatch(pickUser(this.pickerId, details));
  }

  pickFromList(user) {
    const { userNames } = this.props;
    const pickedUser = userNames.find(thisUser => thisUser.uid === user.value);
    this.setState({ ...pickedUser });
  }

  render() {
    const { userNames, dispatch } = this.props;
    const { query } = this.state;

    return (
      <div className={styles.outerContainer}>
        <form onSubmit={event => this.submit(event)}>
          <section className={generalStyles.labelContainerStacked}>
            <div>Etsi käyttäjän nimellä</div>
            <div className={styles.container}>
              <div>
                <input type="text" onChange={ev => this.setState({ query: ev.target.value })} />
              </div>
              <div className={styles.buttonContainer}>
                <BasicButton text="Hae" onClick={() => dispatch(filterUserNames(query))} />
              </div>
            </div>
          </section>
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
          {Array.isArray(userNames) && userNames.length > 0 && (
            <section className={generalStyles.someTopMargin}>
              <Save text="Vahvista valinta" />
            </section>
          )}
        </form>
      </div>
    );
  }
}

UserPicker.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userNames: PropTypes.arrayOf(
    PropTypes.shape({ cn: PropTypes.string, mail: PropTypes.string, uid: PropTypes.string })
  ).isRequired
};

export default UserPicker;
