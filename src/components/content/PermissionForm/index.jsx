import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { updateField } from '../../../redux/actions/datasetform';
import Add from '../../ui/buttons/add';
import DatasetUser from './DatasetUser';
import generalStyles from '../../../general_styles/general_styles.scss';
import styles from './permissionform.scss';

class permissionForm extends Component {
  submit(event) {
    const { dispatch } = this.props;
    event.preventDefault();
  }

  addUser(event) {
    const { dispatch, datasetUsers } = this.props;
    event.stopPropagation();
    dispatch(updateField('datasetUsers', [...datasetUsers, {}]));
  }

  render() {
    const { dispatch, datasetUsers, id } = this.props;
    return (
      <div className={styles.container}>
        <form onSubmit={event => this.submit(event)}>
          <section className={generalStyles.someTopMargin}>
            {datasetUsers.map(user => (
              <DatasetUser {...user} dispatch={dispatch} />
            ))}
          </section>
          <section className={generalStyles.someTopMargin}>
            <Add id={`adduser${id}`} onClick={event => this.addUser(event)} text="Lisää käyttäjä" />
          </section>
        </form>
      </div>
    );
  }
}

permissionForm.propTypes = {
  id: PropTypes.number.isRequired,
  datasetUsers: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string,
      can_edit: PropTypes.bool,
      can_delete: PropTypes.bool,
      can_edit_permissions: PropTypes.bool
    })
  ),
  dispatch: PropTypes.func.isRequired
};

permissionForm.defaultProps = {
  datasetUsers: []
};

export default permissionForm;
