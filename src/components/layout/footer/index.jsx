import { Link } from 'react-router-dom';
import React from 'react';

import Icon from '../../ui/icon';
import styles from './footer_styles.scss';
import utulogo from '../../../images/UTU_log-FI-RGB.svg';

export default () => (
  <footer className={styles.sitefooter}>
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.logoContainer}>
          <img src={utulogo} alt="Turun yliopisto" />
        </div>
        <div className={styles.footerContent}>
          <h1 className={styles.footerH1}>
            <div>
              <Icon iconName="faInfoCircle" />
            </div>
            <div>Kieliaineistoportaali</div>
          </h1>
          <p>
            Kieliaineistoportaalin tarkoituksena on koota tietoa Turun yliopiston digitaalisista
            kieliaineistoista yhteen paikkaan helposti selailtavaksi kokonaisuudeksi. Digitaalinen
            kieliaineisto on käsitteenä laaja: joukkoon kuuluu niin tekstikokoelmia, sanalistoja
            kuin esimerkiksi käännösprosessia kartottavia prosessiaineistojakin.
          </p>
          <h2>Digilang</h2>
          <p>
            Turun yliopiston kieli- ja käännöstieteiden laitoksessa on erityisaloillaan
            kansallisesti ja kansainvälisesti ainutlaatuisia kieliaineistoja, joilla on jo
            entuudestaan oma kotimainen ja kansainvälinen käyttäjäkuntansa. Laitoksessa on
            koostettu, kehitetty ja ylläpidetty digitaalisia aineistoa tutkimuksen tarpeisiin
            vuosikymmeniä (esim. Lauseopin arkisto). Digilang on näiden aineistojen kehittämiseen
            tähtäävä hanke.
          </p>
          <p className={styles.bottomInfo}>
            <Link to="tietosuojaseloste">Tietosuojaseloste</Link>
          </p>
        </div>
      </div>
    </div>
  </footer>
);

// TODO: linkki Tommin  ym. artikkeliin?
//
// TODO ohjeita palvelun käyttöön
