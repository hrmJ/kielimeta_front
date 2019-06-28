import React from 'react';
import { Link } from 'react-router-dom';
import LoginIdicator from '../../auth/indicator';
import BasicButton from '../../ui/buttons/BasicButton';
import styles from './nav_styles.scss';
import logo from '../../../images/digilang-logo.svg';

export default () => (
  <div className={styles.container}>
    <div className={styles.topbar}>
      <div>
        <div className={styles.siteHeading}>
          <div className={styles.logoContainer}>
            <img src={logo} alt="digilang-portaali" />
          </div>
          <div className={styles.headingText}>
            <h1>
              Turun yliopiston <br />
              kieliaineistot
            </h1>
          </div>
        </div>
      </div>
      <div className={styles.lowerTopBar}>
        <ul className={styles.linkList}>
          <li>
            <Link to="/" id="fpLink">
              Pääsivu
            </Link>
          </li>
          <li>
            <button type="button" onClick={() => null}>
              Ryhmittele aineistoja
            </button>
          </li>
          <li>
            <Link to="newdataset" id="newdatasetLink">
              Uusi aineisto
            </Link>
          </li>
          <li>
            <LoginIdicator />
          </li>
        </ul>
      </div>
    </div>
  </div>
);
