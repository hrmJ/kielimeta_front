import React, { Component } from 'react';
import styles from './filter.scss';
import { updateAndFilter, resetFilterAndRefresh } from '../../../redux/actions/datasets';
import { filter } from 'rsvp';
import cuid from 'cuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export default class Filter extends Component {
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
          className={styles.filterButton}
          onClick={() => this.setState({ menuOpen: !menuOpen })}
        >
          <div>{children}</div>
          <div
            className={`${styles.closer} .clearfilter`}
            style={{ display: this.isInUse() ? 'block' : 'none' }}
          >
            <FontAwesomeIcon icon={faTimesCircle} onClick={ev => this.reset(ev)} />
          </div>
        </button>
        <div
          className={styles.menu}
          style={{ display: menuOpen ? 'block' : 'none' }}
          id={`${id}_menu`}
        >
          <ul className={styles.menuList}>
            {items.map((item, itemIdx) => (
              <li key={itemIdx.toString()} className={styles.cbList}>
                <div>
                  <input
                    type="checkbox"
                    value={item.value}
                    checked={filters[keyName] ? filters[keyName].includes(item.value) : false}
                    onClick={ev =>
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
