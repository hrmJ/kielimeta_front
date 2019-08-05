import React from 'react';

const dataProtection = () => {
  return (
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
        Käyttäjätiedot saadaan kirjautumisen yhteydessä Turun yliopiston Single sign on -palvelun
        kautta.
      </p>

      <h3>7. Tietojen luovutus ja siirto EU:n tai ETA:n ulkopuolelle</h3>

      <p>
        Rekisterissä olevia tietoja ei luovuteta ulkopuolisille. Tietoja voidaan poikkeuksellisesti
        luovuttaa kolmansien osapuolien käyttöön lain tai viranomaisen vaatimuksesta. Tietoja ei
        luovuteta eikä siirretä EU:n tai Euroopan talousalueen ulkopuolelle.
      </p>

      <h3>8. Rekisterin suojaus</h3>

      <p>
        Rekisteritiedot säilytetään parhaiden käytäntöjen, hyvän tietoturvallisuuden ja
        lainsäädännön vaatimusten mukaisesti ulkopuolisilta suojattuina. Tiedot ovat ainoastaan
        Turun yliopiston digilang-sivuston ylläpitäjien saatavissa ja niiden käyttäminen edellyttää
        henkilökohtaista käyttäjätunnusta. Käyttäjätunnukseen liitetään vain käyttäjän kannalta
        tarpeelliset oikeudet rekisteritietoihin.
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
  );
};

export default dataProtection;
