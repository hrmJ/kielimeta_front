import PropTypes from 'prop-types';
import React, { Component } from 'react';

import BasicButton from '../../../ui/buttons/BasicButton';
import styles from './filterCategory.scss';

class filterCategory extends Component {
  state = { submenuOpen: false };

  render() {
    const { isChecked, value, label, onCheck } = this.props;
    const { submenuOpen } = this.state;

    return (
      <li className={styles.categoryListItem}>
        <div className={styles.container}>
          <div className={styles.cbContainer}>
            <div>
              <input type="checkbox" value={value} checked={isChecked} onChange={onCheck} />
            </div>
            <div>{label}</div>
          </div>
          <div>
            <BasicButton
              iconName={!submenuOpen ? 'faCaretSquareUp' : 'faCaretSquareDown'}
              text=""
              customClass={`${styles.menuIcon} ${submenuOpen && styles.menuOpen}`}
              noBackground
              onClick={() => this.setState({ submenuOpen: !submenuOpen })}
            />
          </div>
        </div>
        {submenuOpen && <div className={styles.subMenuContainer}>moro</div>}
      </li>
    );
  }
}

filterCategory.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onCheck: PropTypes.func.isRequired
};

export default filterCategory;
