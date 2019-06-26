import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Edit from '../../../ui/buttons/edit';
import styles from './editmenu.scss';

class EditMenu extends Component {
  state = { open: false };

  open(ev) {
    const { open } = this.state;
    ev.stopPropagation();
    this.setState({ open: !open });
  }

  render() {
    const { editEvent } = this.props;
    const { open } = this.state;
    return (
      <div className={styles.outerContainer}>
        <Edit onClick={ev => this.open(ev)} text="Muokkaa tietoja" />
        {open && <div className={styles.menu}>moro</div>}
      </div>
    );
  }
}

EditMenu.propTypes = {
  editEvent: PropTypes.func.isRequired
};

export default EditMenu;
