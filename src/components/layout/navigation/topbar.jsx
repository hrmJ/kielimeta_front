import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './nav_styles.scss';

export default () => (
  <nav className={styles.topbar}>
    <div className={styles.menulauncher}>Menu</div>
    <div>
      <input id="searchfield" type="text" placeholder="HAKU: TODO..." />
    </div>
  </nav>
);
