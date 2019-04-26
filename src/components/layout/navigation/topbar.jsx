import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './nav_styles.scss';
import LoginIdicator from '../../auth/indicator';

export default () => (
  <div className={styles.topbar}>
    <div>
      <h1 className={styles.siteHeading}>Turun yliopiston kielianeistot</h1>
      <ul className={styles.linkList}>
        <li>
          <a href="javascript:void(0);" id="fpLink">
            Pääsivu
          </a>
        </li>
        <li>
          <a href="javascript:void(0);" id="newdatasetLink">
            Syötä tietoja
          </a>
        </li>
        <li>
          <LoginIdicator />
        </li>
      </ul>
    </div>
  </div>
);
