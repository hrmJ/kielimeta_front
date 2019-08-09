import { uid } from 'react-uid';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { editDatasetUsers } from '../../../redux/actions/datasets';
import Add from '../../ui/buttons/add';
import DatasetUser from './DatasetUser';
import Save from '../../ui/buttons/save';
import generalStyles from '../../../general_styles/general_styles.scss';
import styles from './permissionform.scss';

class permissionForm extends Component {
  submit(event) {
    const { dispatch } = this.props;
    event.preventDefault();
  }

  addUser(event) {
    const { dispatch, datasetUsers, id } = this.props;
    const theseUsers = datasetUsers[id] || [];
    event.stopPropagation();
    dispatch(
      editDatasetUsers(id, [...theseUsers, { can_edit: false, can_delete: false, username: '' }])
    );
  }

  render() {
    const { dispatch, datasetUsers, id } = this.props;
    const theseUsers = datasetUsers[id] || [];

    return (
      <div className={styles.container}>
        <form onSubmit={event => this.submit(event)}>
          <section className={generalStyles.someTopMargin}>
            {theseUsers.map((user, idx) => (
              <DatasetUser
                key={`user_${idx}`}
                {...user}
                dispatch={dispatch}
                idx={idx}
                datasetId={id}
                users={theseUsers}
              />
            ))}
          </section>
          <section className={generalStyles.someTopMargin}>
            <Add id={`adduser${id}`} onClick={event => this.addUser(event)} text="Lisää käyttäjä" />
          </section>
          {theseUsers.length > 0 && (
            <section className={styles.saveButtonContainer}>
              <Save text="Tallenna tiedot" />
            </section>
          )}
        </form>
      </div>
    );
  }
}

permissionForm.propTypes = {
  id: PropTypes.number.isRequired,
  datasetUsers: PropTypes.shape({
    [PropTypes.number]: PropTypes.arrayOf({
      username: PropTypes.string,
      can_edit: PropTypes.bool,
      can_delete: PropTypes.bool,
      can_edit_permissions: PropTypes.bool
    })
  }),
  dispatch: PropTypes.func.isRequired
};

permissionForm.defaultProps = {
  datasetUsers: {}
};

export default permissionForm;
