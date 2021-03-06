import PropTypes from 'prop-types';
import React from 'react';

import Icon from '../icon';
import Move from '../buttons/move';
import Save from '../buttons/save';
import styles from './step.scss';

const stepComponent = props => {
  const {
    children,
    legend,
    id,
    active,
    stepIdx,
    move,
    totalSteps,
    moveTo,
    isValid,
    hasErrors
  } = props;
  return (
    <div className={styles.step} id={`step_${stepIdx}`}>
      <fieldset id={id} className={!active ? styles.inactive : ''}>
        <legend>
          <div
            className={styles.moveLauncher}
            role="button"
            tabIndex={0}
            onClick={moveTo}
            onKeyDown={moveTo}
          >
            {stepIdx}. {legend} &nbsp; {isValid && <Icon iconName="faCheck" />}
          </div>
        </legend>
        {active && children}
      </fieldset>
      {active ? (
        <div className={styles.Navbuttons}>
          {stepIdx > 1 && <Move direction="<" onClick={() => move('<')} text="Palaa" />}
          {stepIdx < totalSteps && <Move direction=">" onClick={() => move('>')} text="Jatka" />}
          {stepIdx === totalSteps && (
            <Save text="Tallenna lomake" id="datasetsubmit" disabled={hasErrors} />
          )}
        </div>
      ) : null}
    </div>
  );
};

stepComponent.propTypes = {
  children: PropTypes.node.isRequired,
  legend: PropTypes.string,
  id: PropTypes.string,
  active: PropTypes.bool,
  isValid: PropTypes.bool,
  stepIdx: PropTypes.number.isRequired,
  move: PropTypes.func.isRequired,
  moveTo: PropTypes.func.isRequired,
  totalSteps: PropTypes.number.isRequired,
  hasErrors: PropTypes.bool
};
stepComponent.defaultProps = {
  legend: '',
  id: '',
  active: false,
  isValid: false,
  hasErrors: false
};

export default stepComponent;
