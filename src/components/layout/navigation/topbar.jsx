import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoginIdicator from '../../auth/indicator';
import styles from './nav_styles.scss';
import logo from '../../../images/digilang-logo.svg';

const TopBar = props => {
  const { toggleClusterTool } = props;

  return (
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
              <ul className={styles.linkList}>
                <li>
                  <Link to="/" id="fpLink">
                    Pääsivu
                  </Link>
                </li>
                <li>
                  <button type="button" onClick={toggleClusterTool}>
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
      </div>
    </div>
  );
};

TopBar.propTypes = {
  toggleClusterTool: PropTypes.func
};

TopBar.defaultProps = { toggleClusterTool: null };

export default TopBar;
