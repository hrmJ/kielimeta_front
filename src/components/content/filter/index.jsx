import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {
  filterDatasets,
  resetFilter,
  resetFilterAndRefresh,
  updateAndFilter,
  updateFilterVerbose
} from '../../../redux/actions/filters';
import FilterCategory from './filterCategory';
import Icon from '../../ui/icon';
import ToggleButton from '../../ui/buttons/toggleButton';
import filterReducer from '../../../redux/reducers/datasetfilter';
import styles from './filter.scss';

class Filter extends Component {
  state = {
    menuOpen: false,
    insideOneDataset: true,
    offset: null
  };

  componentDidMount() {
    const { allowMulti } = this.props;
    this.setState({ offset: this.el && this.el.offsetTop });
    if (!allowMulti) {
      this.setState({ insideOneDataset: false });
    }
  }

  /**
   * toggleInOneDataset
   *
   * sets the switch controlling wether or not all the selected values
   * must be found in a single dataset. Also, run the current filter
   * as the toggled filter type
   *
   * @param idx
   * @returns {undefined}
   */
  toggleInOneDataset(idx) {
    const { dispatch, keyName, filters } = this.props;
    const { insideOneDataset } = this.state;
    const actualKeyName = insideOneDataset ? `${keyName}A` : keyName;
    this.setState({ insideOneDataset: idx === 0 });
    if (filters[actualKeyName]) {
      if (!insideOneDataset * 1 !== idx) {
        let updatedFilters = filterReducer(filters, resetFilter(actualKeyName));
        dispatch(resetFilter(actualKeyName));
        updatedFilters = filterReducer(
          updatedFilters,
          updateFilterVerbose(idx === 0 ? `${keyName}A` : keyName, filters[actualKeyName])
        );
        dispatch(updateFilterVerbose(idx === 0 ? `${keyName}A` : keyName, filters[actualKeyName]));
        dispatch(filterDatasets(updatedFilters));
      }
    }
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
    const { insideOneDataset } = this.state;
    const actualKeyName = insideOneDataset ? `${keyName}A` : keyName;
    dispatch(resetFilterAndRefresh(actualKeyName, filters));
  }

  /**
   * Checks if the filter is in use
   *
   * @returns boolean based on wether or not meaningful filter values found
   * @memberof Filter
   */
  isInUse() {
    const { filters = {}, keyName } = this.props;
    const { insideOneDataset } = this.state;
    const actualKeyName = insideOneDataset ? `${keyName}A` : keyName;
    if (actualKeyName in filters) {
      if (Array.isArray(filters[actualKeyName])) {
        if (filters[actualKeyName].length) {
          return true;
        }
      }
    }
    // TODO: other types than arrays

    return false;
  }

  render() {
    const {
      children,
      dispatch,
      keyName,
      id,
      filters = {},
      allowMulti,
      hasSubMenu,
      languageVarieties
    } = this.props;
    const { menuOpen, insideOneDataset, offset } = this.state;
    const actualKeyName = insideOneDataset ? `${keyName}A` : keyName;

    let { items } = this.props;

    if (!Array.isArray(items)) {
      items = [];
    }

    // TODO: search field inside the filter in some cases?
    // TODO: X icon to reset the filter

    return (
      <div className={styles.container} id={id} ref={el => (this.el = el)}>
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
          style={{
            display: menuOpen ? 'block' : 'none'
          }}
          id={`${id}_menu`}
        >
          <div>
            {allowMulti && (
              <ToggleButton
                options={['Samassa aineistossa', 'Koko tietokannassa']}
                customClass={styles.toggleContainer}
                onClick={idx => this.toggleInOneDataset(idx)}
              />
            )}
          </div>
          <div
            className={styles.menuInside}
            style={{
              maxHeight: `${offset && offset - 80}${offset && 'px'}`
            }}
          >
            <ul className={styles.menuList}>
              {items.map((item, itemIdx) => (
                <FilterCategory
                  key={itemIdx.toString()}
                  filters={filters}
                  dispatch={dispatch}
                  keyName={actualKeyName}
                  hasSubMenu={hasSubMenu}
                  languageVarieties={languageVarieties}
                  {...item}
                />
              ))}
            </ul>
          </div>
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
  ),
  allowMulti: PropTypes.bool,
  hasSubMenu: PropTypes.bool,
  languageVarieties: PropTypes.objectOf(PropTypes.any)
};

Filter.defaultProps = {
  items: [],
  children: null,
  id: '',
  filters: {},
  allowMulti: false,
  hasSubMenu: false,
  languageVarieties: {}
};

export default Filter;
