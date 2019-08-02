import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { updateAndFilter } from '../../../../redux/actions/filters';
import BasicButton from '../../../ui/buttons/BasicButton';
import Icon from '../../../ui/icon';
import styles from './ordercategory.scss';

class orderCategory extends Component {
  state = { direction: '' };

  launch() {
    const { value, dispatch, filters } = this.props;
    dispatch(updateAndFilter('orderby', value, true, filters));
  }

  render() {
    const { label } = this.props;
    const { direction } = this.state;

    return (
      <div className={styles.container}>
        <BasicButton
          noBackground
          text={label}
          customClass={styles.buttonClass}
          onClick={() => this.launch()}
        />
        <div>
          <Icon iconName={direction === 'down' ? 'faCaretDown' : direction && 'faCaretUp'} />
        </div>
      </div>
    );
  }
}

orderCategory.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  filters: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array])
  ).isRequired
};

export default orderCategory;
