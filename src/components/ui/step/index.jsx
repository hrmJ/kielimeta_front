import PropTypes from 'prop-types';
import React from 'react';

import Move from '../buttons/move';
import styles from './step.scss';

const index = props => {
  const { children, legend, id, active, stepIdx, move, totalSteps } = props;
  return (
    <div className={styles.step}>
      <fieldset id={id} className={!active ? styles.inactive : ''}>
        <legend>
          {stepIdx}. {legend}
        </legend>
        {active && children}
      </fieldset>
      {active ? (
        <div className={styles.Navbuttons}>
          {stepIdx > 1 && <Move direction="<" onClick={() => move('<')} text="Palaa" />}
          {stepIdx < totalSteps && <Move direction=">" onClick={() => move('>')} text="Jatka" />}
        </div>
      ) : null}
    </div>
  );
};

index.propTypes = {
  children: PropTypes.node.isRequired,
  legend: PropTypes.string,
  id: PropTypes.string,
  active: PropTypes.bool,
  stepIdx: PropTypes.number.isRequired,
  move: PropTypes.func.isRequired,
  totalSteps: PropTypes.number.isRequired
};
index.defaultProps = {
  legend: '',
  id: '',
  active: false
};

export default index;
