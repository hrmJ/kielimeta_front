import React, { Component } from 'react';
import LanguageProp from './index';
import TimeLine from '../../../ui/timeline';
import formstyles from '../datasetform.scss';
import styles from '../languageselect/languageselect.scss';

export default class TemporalCoverage extends Component {
  updateYears(val, minormax) {
    minormax = minormax || false;
    const { languages, idx, updateLanguage } = this.props;
    const thisyear = val * 1;
    let years = languages[idx].years_covered || [];
    if (thisyear < 0) {
      const yearindex = years.indexOf(thisyear * -1);
      if (yearindex > -1) {
        years.splice(yearindex, 1);
        updateLanguage('years_covered', years);
        return years;
      }
    }
    if (thisyear >= 1000 && thisyear <= 2100) {
      if (years.length > 0) {
        const currentmin = Math.min(...years);
        const currentmax = Math.max(...years);
        if (!minormax) {
          years = [...new Set([...years, thisyear])];
        } else if (minormax == 'min') {
          if (years.length === 2 && thisyear == currentmax) {
            years = [currentmax];
          } else if (thisyear > currentmax) {
            years = [thisyear];
          } else if (currentmax > thisyear || currentmin === currentmax) {
            years.splice(years.indexOf(currentmin), 1);
            years = years.filter(year => year >= thisyear);
            years.push(thisyear);
          }
        } else if (minormax == 'max') {
          if (years.length === 1 && currentmax < thisyear) {
            years.push(thisyear);
          } else if (years.length === 1 && currentmax > thisyear) {
            years = years;
          } else if (years.length === 2 && thisyear == currentmin) {
            years = [currentmin];
          } else if (currentmin < thisyear || currentmin === currentmax) {
            years.splice(years.indexOf(currentmax), 1);
            years = years.filter(year => year <= thisyear);
            years.push(thisyear);
          }
        }
      } else {
        years = [thisyear];
      }
      updateLanguage('years_covered', years);
      // for testing purposes
      return years;
    }
  }

  render() {
    const { languages, idx } = this.props;
    const years = languages[idx].years_covered || [];

    return (
      <LanguageProp header="Ajanjakso">
        <p className={formstyles.description}>
          Mille ajanjaksolle tämän kielen / variantin aineistot sijoittuvat? Merkitse vähintään
          alkuvuosi, vaikka kyseessä ei olisikaan lähtökohtaisesti diakroninen aineisto. Ajanjakso
          voi olla myös pelkkä arvio.
          {/* TODO: käytä oletuksena ensimmäisen kielen valintaa tai lisää joku ruksi tms. */}
        </p>
        <div className={formstyles.fieldContainer}>
          <label htmlFor="startyear">vuodesta</label>
          <input
            type="number"
            defaultValue=""
            min="1000"
            max="2050"
            id="startyear"
            placeholder="vuosiluku"
            onChange={ev => this.updateYears(ev.target.value, 'min')}
          />
        </div>
        <div className={formstyles.fieldContainer}>
          <label htmlFor="startyear">vuoteen</label>
          <input
            type="number"
            defaultValue={years.length == 1 ? years[0] : ''}
            min="1000"
            max="2050"
            id="endyear"
            placeholder="vuosiluku"
            onChange={ev => this.updateYears(ev.target.value, 'max')}
          />
        </div>
        <div className={styles.propSection}>
          <LanguageProp header="Tarkempi määrittely">
            <p className={formstyles.description}>
              Jos kyseessä on diakroninen aineisto ja ajankohta on mahdollista tai mielekästä
              määrittää esimerkiksi teoskohtaisesti, voit antaa tarkemman määritelmän alla: rastita
              kaikki ne vuosiluvut, joille aineiston tekstejä / muita osia osuu.
            </p>
            <TimeLine
              onChange={ev =>
                ev.target.checked
                  ? this.updateYears(ev.target.value)
                  : this.updateYears(-ev.target.value)
              }
              range={[Math.min(...years), Math.max(...years)]}
              selectedYears={years}
            />
          </LanguageProp>
        </div>
      </LanguageProp>
    );
  }
}
