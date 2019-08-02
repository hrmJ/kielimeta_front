import PropTypes from 'prop-types';
import React from 'react';

import { setDirectionAndFilter } from '../../../../redux/actions/filters';
import BasicButton from '../../../ui/buttons/BasicButton';
import styles from './ordercategory.scss';

const orderCategory = props => {
  const { label, value, dispatch, filters, active, descending } = props;
  const newDirection = descending === 'true' ? 'ascending' : 'descending';

  return (
    <div className={styles.container}>
      <BasicButton
        noBackground
        text={label}
        customClass={styles.buttonClass}
        onClick={() => dispatch(setDirectionAndFilter(value, newDirection, filters))}
        iconName={active && `faCaret${descending === 'true' ? 'Up' : 'Down'}`}
      />
    </div>
  );
};

orderCategory.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  descending: PropTypes.string,
  active: PropTypes.bool,
  filters: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array])
  ).isRequired
};

orderCategory.defaultProps = {
  descending: 'false',
  active: false
};

export default orderCategory;
