import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Icon from '../../../ui/icon';
import styles from './filtercontainer.scss';

class FilterContainer extends Component {
  state = {
    menuOpen: false,
    offset: null
  };

  componentDidMount() {
    this.setState({ offset: this.el && this.el.offsetTop });
  }

  render() {
    const { menuOpen, offset } = this.state;
    const { label, children, filterMenuHeader, isInUse, resetFilter, customClass } = this.props;

    return (
      <div className={`${styles.container} ${customClass}`} ref={el => (this.el = el)}>
        <button
          type="button"
          className={styles.filterButton}
          onClick={() => this.setState({ menuOpen: !menuOpen })}
        >
          <div>{label}</div>
          <div
            className={`${styles.closer} clearfilter`}
            style={{ display: isInUse ? 'block' : 'none' }}
          >
            <Icon iconName="faTimesCircle" role="button" onClick={resetFilter} />
          </div>
        </button>
        <div
          className={styles.menu}
          style={{
            display: menuOpen ? 'block' : 'none'
          }}
        >
          <div>{filterMenuHeader}</div>
          <div
            className={styles.menuInside}
            style={{
              maxHeight: `${offset && offset - 80}${offset && 'px'}`
            }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
}

FilterContainer.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  filterMenuHeader: PropTypes.node,
  isInUse: PropTypes.bool,
  resetFilter: PropTypes.func.isRequired,
  customClass: PropTypes.string
};

FilterContainer.defaultProps = {
  filterMenuHeader: null,
  isInUse: false,
  customClass: ''
};

export default FilterContainer;
