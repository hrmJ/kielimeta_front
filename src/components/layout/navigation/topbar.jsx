import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './nav_styles.scss';

export default () => (
  <div className={styles.topbar}>
    <div>
      <h1 className={styles.siteHeading}>Turun yliopiston kielianeistot</h1>
    </div>
  </div>
);
