// https://gist.github.com/krambertech/76afec49d7508e89e028fce14894724c
import React, { Component } from 'react';

const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;

export default class DelayedSearchField extends Component {
  constructor(props) {
    super();
    this.state = {
      value: props.value
    };
  }

  componentWillMount() {
    this.timer = null;
  }

  handleChange(value) {
    clearTimeout(this.timer);
    this.setState({ value });
    this.timer = setTimeout(this.triggerChange.bind(this), WAIT_INTERVAL);
  }

  handleKeyDown(e) {
    if (e.keyCode === ENTER_KEY) {
      this.triggerChange.bind(this)();
    }
  }

  triggerChange() {
    const { value } = this.state;
    this.props.onChange(value);
  }

  render() {
    const { className, id, placeholder, defaultValue } = this.props;
    const { value } = this.state;

    return (
      <input
        id={id}
        type="text"
        className={className}
        placeholder={placeholder}
        onChange={e => this.handleChange(e.target.value)}
        onKeyDown={this.handleKeyDown.bind(this)}
        defaultValue={defaultValue}
      />
    );
  }
}
