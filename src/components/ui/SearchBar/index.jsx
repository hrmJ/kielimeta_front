// https://gist.github.com/krambertech/76afec49d7508e89e028fce14894724c
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { updateAndFilter } from '../../../redux/actions/filters';
import BasicButton from '../buttons/BasicButton';
import styles from './searchbar.scss';

const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;

class SearchBar extends Component {
  constructor(props) {
    super();
    const { value } = props;
    this.hasBeenReset = false;
    this.state = {
      value
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
    const { onChange } = this.props;
    onChange(value);
  }

  render() {
    const { id, placeholder, dispatch, filters } = this.props;
    const { value } = this.state;

    return (
      <section className={styles.searchBarContainer}>
        <input
          id={id}
          type="text"
          placeholder={placeholder}
          onChange={e => this.handleChange(e.target.value)}
          onKeyDown={this.handleKeyDown.bind(this)}
          value={value}
        />
        {'query' in filters && filters.query && (
          <BasicButton
            text="Tyhjennä"
            iconName="faTimesCircle"
            onClick={() => {
              dispatch(updateAndFilter('query', '', false, filters));
              this.setState({ value: '' });
            }}
          />
        )}
      </section>
    );
  }
}

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  id: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  filters: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array])
  ),
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

SearchBar.defaultProps = {
  placeholder: '',
  id: '',
  filters: {},
  value: ''
};

export default SearchBar;
