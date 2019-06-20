import PropTypes from 'prop-types';
import React, { Component } from 'react';

import LabelledInput from '../../../../../../ui/labelledinput';
import LanguageProp from '../languageprop';
import TimeLine from '../../../../../../ui/timeline';
import formstyles from '../../../../datasetform.scss';
import styles from '../language.scss';

class TemporalCoverage extends Component {
  state = { min: undefined, max: undefined };

  recievedprops = false;

  componentWillReceiveProps() {
    this.recievedprops = true;
  }

  updateYears(val, minormax) {
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
    if (years.length > 0) {
      const currentmin = Math.min(...years);
      const currentmax = Math.max(...years);
      if (!minormax) {
        years = [...new Set([...years, thisyear])];
      } else if (minormax === 'min') {
        if (years.length === 2 && thisyear === currentmax) {
          years = [currentmax];
        } else if (thisyear > currentmax) {
          years = [thisyear];
        } else if (currentmax > thisyear || currentmin === currentmax) {
          years.splice(years.indexOf(currentmin), 1);
          years = years.filter(year => year >= thisyear);
          years.push(thisyear);
        }
      } else if (minormax === 'max') {
        if (years.length === 1 && currentmax < thisyear) {
          years.push(thisyear);
        } else if (!(years.length === 1 && currentmax > thisyear)) {
          if (years.length === 2 && thisyear === currentmin) {
            years = [currentmin];
          } else if (currentmin < thisyear || currentmin === currentmax) {
            years.splice(years.indexOf(currentmax), 1);
            years = years.filter(year => year <= thisyear);
            years.push(thisyear);
          }
        }
      }
    } else {
      years = [thisyear];
    }
    updateLanguage('years_covered', years);
    // for testing purposes
    return years;
  }

  textfieldUpdate(key, val) {
    this.setState({ [key]: val });
    this.updateYears(val, key);
    // const { min, max } = this.state;
    // if (min) {
    //   this.updateYears(min, 'min');
    // }
    // if (max) {
    //   this.updateYears(max, 'max');
    // }
  }

  render() {
    const { languages, idx } = this.props;
    const years = languages[idx].years_covered || [];
    const { min, max } = this.state;

    if (!this.recievedprops && years.length > 0) {
      this.recievedprops = true;
      this.setState({ min: Math.min(...years), max: Math.max(...years) });
    }

    return (
      <LanguageProp header="Ajanjakso">
        <p className={formstyles.description}>
          Mille ajanjaksolle tämän kielen / variantin aineistot sijoittuvat? Merkitse vähintään
          alkuvuosi, vaikka kyseessä ei olisikaan lähtökohtaisesti diakroninen aineisto. Ajanjakso
          voi olla myös pelkkä arvio.
          {/* TODO: käytä oletuksena ensimmäisen kielen valintaa tai lisää joku ruksi tms. */}
        </p>
        <LabelledInput label="vuodesta">
          <input
            type="number"
            id="startyear"
            placeholder="vuosiluku"
            value={min}
            onChange={ev => this.textfieldUpdate('min', ev.target.value)}
          />
        </LabelledInput>
        <LabelledInput label="vuoteen">
          <input
            value={max}
            type="number"
            id="endyear"
            placeholder="vuosiluku"
            onChange={ev => this.textfieldUpdate('max', ev.target.value)}
          />
        </LabelledInput>
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

TemporalCoverage.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.object).isRequired,
  idx: PropTypes.number.isRequired,
  updateLanguage: PropTypes.func.isRequired
};

TemporalCoverage.defaultProps = {};

export default TemporalCoverage;
