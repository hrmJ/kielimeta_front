import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './nav_styles.scss';

export default () => (
  <nav className={styles.topbar}>
    <div className={styles.menulauncher} />
    <h1 className={styles.siteHeading}>Kieliaineistoportaali</h1>
  </nav>
);
