import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './stepper.scss';

import Step from '../step';

class index extends Component {
  state = { currentStep: 0 };

  componentDidUpdate() {
    const { returnStep } = this.props;
    if (returnStep) {
      this.setState({ currentStep: returnStep });
    }
  }

  move(direction) {
    const { currentStep } = this.state;
    const { steps } = this.props;
    if (direction === '<' && currentStep > 0) {
      this.setState({ currentStep: currentStep - 1 });
    }
    if (direction === '>' && currentStep < steps.length - 1) {
      this.setState({ currentStep: currentStep + 1 });
    }
  }

  moveTo(idx) {
    this.setState({ currentStep: idx });
  }

  render() {
    const { steps, errors } = this.props;
    const { currentStep } = this.state;
    // const allValid = steps.filter(s => s.isValid || s.doesNotPreventSave).length === steps.length;
    const criticalErrors = errors.filter(e => e.level === 'error');
    const otherErrors = errors.filter(e => e.level !== 'error');
    const hasErrors = criticalErrors.length > 0;
    return (
      <div>
        {steps.map((step, stepIdx) => (
          <Step
            legend={step.legend}
            stepIdx={stepIdx + 1}
            active={stepIdx === currentStep}
            move={direction => this.move(direction)}
            totalSteps={steps.length}
            moveTo={() => this.moveTo(stepIdx)}
            isValid={step.isValid}
            hasErrors={hasErrors}
          >
            {step.component}
          </Step>
        ))}
        {criticalErrors.length > 0 && currentStep === steps.length - 1 && (
          <div className={styles.errorList}>
            <p>Lomakkeelta puuttuu pakollisia tietoja:</p>
            <ol>
              {criticalErrors.map(e => (
                <li>
                  <button type="button" onClick={() => this.setState({ currentStep: e.step })}>
                    {e.msg}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        )}
        {otherErrors.length > 0 && currentStep === steps.length - 1 && (
          <div className={styles.warningList}>
            <p>Haluatko varmasti lähettää lomakkeen ilman seuraavia tietoja?</p>
            <ol>
              {otherErrors.map(e => (
                <li>
                  <button type="button" onClick={() => this.setState({ currentStep: e.step })}>
                    {e.msg}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    );
  }
}

index.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      legend: PropTypes.string,
      components: PropTypes.node
    })
  ).isRequired,
  errors: PropTypes.arrayOf(PropTypes.shape({ error: PropTypes.string, step: PropTypes.idx }))
};

index.defaultProps = {
  errors: []
};

export default index;
