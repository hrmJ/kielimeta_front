import React from 'react';
import PropTypes from 'prop-types';
import styles from './dataprotection.scss';

const dataProtection = props => {
  const { lang } = props;
  return (
    <section className={styles.container}>
      {lang === 'fi' ? (
        <div>
          <h2>Tietosuojaseloste</h2>
          <h3>1. Rekisterinpitäjä</h3>

          <p>
            %%REGISTER_MAINTAINER1%% <br />
            %%REGISTER_MAINTAINER2%% <br />
            %%REGISTER_MAINTAINER_ADDRESS%%
          </p>

          <h3>2. Rekisterin yhteyshenkilö</h3>

          <p>%%REGISTER_CONTACTPERSON%% (%%REGISTER_CONTACTPERSON_EMAIL%%) </p>

          <h3>3. Rekisterin nimi</h3>

          <p>Digilang-kieliaineistoportaalin rekisteri</p>

          <h3>4. Rekisterin käyttötarkoitus</h3>

          <p>
            Rekisteri toimii Digilang-portaalin käyttäjien hallinnan tarvitsemien tietojen
            tietovarastona.
          </p>

          <h3>5. Rekisterin tietosisältö</h3>

          <p>Käyttäjätunnus, etunimi, sukunimi, sähköpostiosoite, kieli.</p>

          <h3>6. Säännönmukaiset tietolähteet</h3>

          <p>
            Käyttäjätiedot saadaan kirjautumisen yhteydessä Turun yliopiston Single sign on
            -palvelun kautta.
          </p>

          <h3>7. Tietojen luovutus ja siirto EU:n tai ETA:n ulkopuolelle</h3>

          <p>
            Rekisterissä olevia tietoja ei luovuteta ulkopuolisille. Tietoja voidaan
            poikkeuksellisesti luovuttaa kolmansien osapuolien käyttöön lain tai viranomaisen
            vaatimuksesta. Tietoja ei luovuteta eikä siirretä EU:n tai Euroopan talousalueen
            ulkopuolelle.
          </p>

          <h3>8. Rekisterin suojaus</h3>

          <p>
            Rekisteritiedot säilytetään parhaiden käytäntöjen, hyvän tietoturvallisuuden ja
            lainsäädännön vaatimusten mukaisesti ulkopuolisilta suojattuina. Tiedot ovat ainoastaan
            Turun yliopiston digilang-sivuston ylläpitäjien saatavissa ja niiden käyttäminen
            edellyttää henkilökohtaista käyttäjätunnusta. Käyttäjätunnukseen liitetään vain
            käyttäjän kannalta tarpeelliset oikeudet rekisteritietoihin.
          </p>

          <h3>9. Rekisteröidyn oikeudet</h3>

          <p>
            Jokaisella rekisteriin liitetyllä henkilöllä on tarkastusoikeus omiin tietoihinsa.
            Jokaisella rekisteriin liitetyllä henkilöllä on oikeus vaatia virheellisen tiedon
            korjaamista tai tietojensa poistamista. Korjauspyyntö tulee toimittaa rekisterin
            yhteyshenkilölle.
          </p>

          <h3>10. Tietojen aikaväli ja päivitystiheys</h3>

          <p>Tietoja on kerätty vuodesta 2019.</p>

          <h3>11. Julkiset ja salassa pidettävät tiedot</h3>

          <p>Kaikki rekisterissä olevat tiedot ovat salaisia.</p>
        </div>
      ) : (
        <div>
          <h2>Data protection policy</h2>
          <h3>1. Controller</h3>

          <p>
            %%REGISTER_MAINTAINER1%% <br />
            %%REGISTER_MAINTAINER2%% <br />
            %%REGISTER_MAINTAINER_ADDRESS%%
          </p>

          <h3>2. Contact person</h3>

          <p>%%REGISTER_CONTACTPERSON%% (%%REGISTER_CONTACTPERSON_EMAIL%%) </p>

          <h3>3. Name of the register</h3>

          <p>Register of the Digilang metadata portal</p>

          <h3>4. Purpose of processing</h3>

          <p>
            The register provides the information needed for managing users in the Digilang metadata
            portal.
          </p>

          <h3>5. Categories of personal data</h3>

          <p>User name, given name, surname, email address, language.</p>

          <h3>6. Regular sources of information</h3>

          <p>
            The user details are acquired when the user signs in via the Single sign on service
            provided by the university of Turku.
          </p>

          <h3>7. Transfer of information outside the EU or EEA</h3>

          <p>
            The information in the register will not be disclosed to third parties. As an exception,
            information may be provided if demanded by the law or a competent authority. Data will
            not be transferred outside the EU or EEA.
          </p>

          <h3>8. Protecting the register</h3>

          <p>
            The information in the register is stored in a manner that follows the best practices
            and ensures appropriate security of the personal data, including protection against
            unauthorised or unlawful access. The data is available only to the maintainers of the
            Digilang metadata service and cannot be accessed without a personal user account. Users
            are only provided with the information that is necessary for him/her in using the
            service.
          </p>

          <h3>9. Rights of the data subject</h3>

          <p>
            Each person included in the register has the right to verify his / her personal
            information. Each person included in the register has the right to demand the fixing of
            erroneous information or the removal of information. Requests for correction shall be
            addressed to the contact person mentioned above.
          </p>

          <h3>10. Intervals of update</h3>

          <p>Data has been collected from 2019 onwards.</p>

          <h3>11. Confidentiality</h3>

          <p>The register contains only confidential data.</p>
        </div>
      )}
    </section>
  );
};

dataProtection.propTypes = {
  lang: PropTypes.string.isRequired
};

export default dataProtection;
