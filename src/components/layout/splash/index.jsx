import React from 'react';
import styles from './splash.scss';
import utilityStyles from '../../../general_styles/utilities.scss';
import logo from '../../../images/digilang-logo.svg';

const splash = props => {
  return (
    <div className={styles.container}>
      <div className={styles.centered}>
        <div>
          <img src={logo} alt="digilang-portaali" />
        </div>
        <div className={styles.info}>
          <div className={utilityStyles.loading}>Haetaan tietoja</div>
        </div>
      </div>
    </div>
  );
};

export default splash;
