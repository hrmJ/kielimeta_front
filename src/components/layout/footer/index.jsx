import { Link } from 'react-router-dom';
import React from 'react';

import Icon from '../../ui/icon';
import styles from './footer_styles.scss';

export default () => (
  <footer className={styles.sitefooter}>
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.footerContent}>
          <h1>
            <Icon iconName="faInfoCircle" /> Kieliaineistoportaali
          </h1>
          <p>
            Kieliaineistoportaalin tarkoituksena on koota tietoa Turun yliopiston kieliaineistoista
            yhteen paikkaan helposti selailtavaksi kokonaisuudeksi. Kieliaineisto on käsitteenä
            laaja: joukkoon kuuluu niin tekstikokoelmia, sanalistoja kuin esimerkiksi
            käännösprosessia kartottavia prosessiaineistojakin.
          </p>
          <p>
            <Link to="tietosuojaseloste">Tietosuojaseloste</Link>
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
          {/*
          <h2>Lisätietoja</h2>
          <p>Digilang-projektin yhteyshenkilönä toimii Tommi Kurki (etunimi.sukunimi@utu.fi)</p>
          */}
        </div>
      </div>
    </div>
  </footer>
);

// TODO: linkki Tommin  ym. artikkeliin?
//
// TODO ohjeita palvelun käyttöön
