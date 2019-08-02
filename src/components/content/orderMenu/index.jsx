import PropTypes from 'prop-types';
import React, { Component } from 'react';

import BasicButton from '../../ui/buttons/BasicButton';
import OrderCategory from './orderCategory';
import styles from './ordermenu.scss';

const orderCategories = [
  { label: 'Nimi', value: 'title' },
  { label: 'Viimeksi muokattu', value: 'date' },
  { label: 'Aineiston ajankohta', value: 'datayear' },
  { label: 'Koko (sanoja)', value: 'words' },
  { label: 'Koko (virkkeitä)', value: 'sentences' },
  { label: 'Koko (tekstejä)', value: 'texts' },
  { label: 'Koko (tunteja ääntä)', value: 'audiohours' },
  { label: 'Koko (tunteja videota)', value: 'videohours' }
];

class OrderMenu extends Component {
  state = { menuOpen: false };

  render() {
    const { menuOpen } = this.state;
    const {dispatch, filters} = this.props

    return (
      <div className={styles.orderContainer}>
        <BasicButton
          text="Järjestä"
          iconName="faSort"
          onClick={() => this.setState({ menuOpen: !menuOpen })}
        />
        {menuOpen && (
          <div className={styles.menuContainer}>
            <ul className={styles.menuList}>
              {orderCategories.map(cat => (
                <li key={cat.label}>
                  <OrderCategory {...cat} dispatch={dispatch}  filters={filters}/>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

OrderMenu.propTypes = {
  currentDirection: PropTypes.string,
  currentCategory: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  filters: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array])
  ).isRequired,
};

OrderMenu.defaultProps = {
  currentDirection: 'ascending',
  currentCategory: null
};

export default OrderMenu;
