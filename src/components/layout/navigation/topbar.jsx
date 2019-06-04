import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './nav_styles.scss';
import LoginIdicator from '../../auth/indicator';
import { Link } from 'react-router-dom';

export default () => (
  <div className={styles.topbar}>
    <div>
      <h1 className={styles.siteHeading}>Turun yliopiston kieliaineistot</h1>
      <ul className={styles.linkList}>
        <li>
          <Link to="/" id="fpLink">
            Pääsivu
          </Link>
        </li>
        <li>
          <Link to="newdataset" id="newdatasetLink">
            Syötä tietoja
          </Link>
        </li>
        <li>
          <LoginIdicator />
        </li>
      </ul>
    </div>
  </div>
);
