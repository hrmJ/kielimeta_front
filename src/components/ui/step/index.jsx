import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './step.scss';

const index = props => {
  const { children, legend, id, active, stepIdx, move } = props;
  console.log(`${legend} >> ${stepIdx}: ${active}`);
  return (
    <div>
      <fieldset id={id} className={!active ? styles.inactive : ''}>
        <legend>
          {stepIdx}. {legend}
        </legend>
        {active && children}
      </fieldset>
      {active ? (
        <div className={styles.Navbuttons}>
          <button type="button" onClick={() => move('<')}>
            Palaa
          </button>
          <button type="button" onClick={() => move('>')}>
            Jatka
          </button>
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
  move: PropTypes.func.isRequired
};
index.defaultProps = {
  legend: '',
  id: '',
  active: false
};

export default index;
