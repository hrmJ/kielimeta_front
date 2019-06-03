import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Step from '../step';

class index extends Component {
  state = { currentStep: 0 };

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

  render() {
    const { steps } = this.props;
    const { currentStep } = this.state;
    console.log(currentStep);
    return (
      <div>
        {steps.map((step, stepIdx) => (
          <Step
            legend={step.legend}
            stepIdx={stepIdx + 1}
            active={stepIdx === currentStep}
            move={direction => this.move(direction)}
          >
            {step.component}
          </Step>
        ))}
      </div>
    );
  }
}

index.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      legend: PropTypes.string.isRequired,
      components: PropTypes.node.isRequired
    })
  ).isRequired
};

export default index;
