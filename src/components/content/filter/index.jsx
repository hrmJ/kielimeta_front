import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { updateAndFilter, resetFilterAndRefresh } from '../../../redux/actions/filters';
import Icon from '../../ui/icon';
import ToggleButton from '../../ui/buttons/toggleButton';
import styles from './filter.scss';

class Filter extends Component {
  state = {
    menuOpen: false
  };

  /**
   * Checks if the filter is in use
   *
   * @returns boolean based on wether or not meaningful filter values found
   * @memberof Filter
   */
  isInUse() {
    const { filters = {}, keyName } = this.props;
    if (keyName in filters) {
      if (Array.isArray(filters[keyName])) {
        if (filters[keyName].length) {
          return true;
        }
      }
    }
    // TODO: other types than arrays

    return false;
  }

  /**
   *
   * Resets the filter
   *
   * @param {*} ev the event that triggered the function
   * @memberof Filter
   */
  reset(ev) {
    ev.stopPropagation();
    const { dispatch, keyName, filters } = this.props;
    dispatch(resetFilterAndRefresh(keyName, filters));
  }

  render() {
    const { children, dispatch, keyName, id, filters = {} } = this.props;
    const { menuOpen } = this.state;

    let { items } = this.props;

    if (!Array.isArray(items)) {
      items = [];
    }

    // TODO: search field inside the filter in some cases?
    // TODO: X icon to reset the filter

    return (
      <div className={styles.container} id={id}>
        <button
          type="button"
          className={styles.filterButton}
          onClick={() => this.setState({ menuOpen: !menuOpen })}
        >
          <div>{children}</div>
          <div
            className={`${styles.closer} clearfilter`}
            style={{ display: this.isInUse() ? 'block' : 'none' }}
          >
            <Icon iconName="faTimesCircle" role="button" onClick={ev => this.reset(ev)} />
          </div>
        </button>
        <div
          className={styles.menu}
          style={{ display: menuOpen ? 'block' : 'none' }}
          id={`${id}_menu`}
        >
          <div>
            <ToggleButton
              options={['Samassa aineistossa', 'Koko tietokannassa']}
              customClass={styles.toggleContainer}
            />
          </div>
          <ul className={styles.menuList}>
            {items.map((item, itemIdx) => (
              <li key={itemIdx.toString()} className={styles.cbList}>
                <div>
                  <input
                    type="checkbox"
                    value={item.value}
                    checked={filters[keyName] ? filters[keyName].includes(item.value) : false}
                    onChange={ev =>
                      dispatch(updateAndFilter(keyName, item.value, ev.target.checked, filters))
                    }
                  />
                </div>
                <div>{item.label}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

Filter.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      label: PropTypes.string
    })
  ),
  keyName: PropTypes.string.isRequired,
  children: PropTypes.node,
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string,
  filters: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array])
  )
};

Filter.defaultProps = {
  items: [],
  children: null,
  id: '',
  filters: {}
};

export default Filter;
