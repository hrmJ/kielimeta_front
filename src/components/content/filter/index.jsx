import React, { Component } from 'react';
import styles from './filter.scss';
import { updateFilter, filterDatasets, updateAndFilter } from '../../../redux/actions/datasets';
import { filter } from 'rsvp';
import cuid from 'cuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export default class Filter extends Component {
  state = {
    menuOpen: false
  };

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
            style={{ display: keyName in filters ? 'block' : 'none' }}
          >
            <FontAwesomeIcon icon={faTimesCircle} onClick={() => null} />
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
