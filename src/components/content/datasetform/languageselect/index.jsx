/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datetime';
import uuid from 'cuid';
import styles from './languageselect.scss';
import formstyles from '../datasetform.scss';
import AnnotationSelect from '../annotationselect';
import { updateField } from '../../../../redux/actions/datasetform';
import Closable from '../../../ui/closablebox';
import langmap from 'langmap';
import LanguageProp from '../languageprop';
import TimeLine from '../../../ui/timeline';

// NOTE: a temporary mock, to be replaced with database data
const langOptions = Object.keys(langmap)
  .filter(key => key.includes('-'))
  .map(code => ({
    value: code,
    label: langmap[code]['englishName']
  }));

export const selectStyle = {
  container: provided => ({
    ...provided,
    width: '10em'
  })
};

export default class LanguageSelect extends Component {
  updateLanguage(key, val) {
    const { dispatch, languages, idx } = this.props;
    const updated = languages;
    if (!languages[idx] && (languages.length - 1 >= idx || languages.length === 0)) {
      languages[idx] = {};
    }
    if (['language_code', 'variety'].includes(key)) {
      // grouping certain keys under the "details"  prop
      updated[idx].details = { ...updated[idx].details, [key]: val };
    } else {
      updated[idx][key] = val;
    }
    dispatch(updateField('languages', updated));
    // for testing purposes
    return updated;
  }

  updateYears(val, minormax) {
    minormax = minormax || false;
    const { languages, idx } = this.props;
    const thisyear = val * 1;
    let years = languages[idx].years_covered || [];
    if (thisyear < 0) {
      const yearindex = years.indexOf(thisyear * -1);
      if (yearindex > -1) {
        years.splice(yearindex, 1);
        this.updateLanguage('years_covered', years);
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
      this.updateLanguage('years_covered', years);
      // for testing purposes
      return years;
    }
  }

  removeLanguage() {
    const { idx, languages, dispatch } = this.props;
    const updated = languages;
    updated.splice(idx, 1);
    updated.map(u => console.log(u.variety));
    dispatch(updateField('languages', updated));
  }

  render() {
    const { details = {}, languages, idx, dispatch } = this.props;
    const annotations = languages[idx].annotations || [];
    const { language_code = '', variety = '' } = details;
    const years = languages[idx].years_covered || [];

    let langselectval;

    if (language_code) {
      const label = langOptions.filter(lev => lev.value === language_code).map(obj => obj.label);
      langselectval = { label: label, value: language_code };
    }

    return (
      <Closable className={styles.selectContainer} onClose={() => this.removeLanguage()}>
        <div className={formstyles.fieldContainer}>
          <div>Kieli</div>
          <Select
            styles={selectStyle}
            onChange={selectedoption => this.updateLanguage('language_code', selectedoption.value)}
            options={langOptions}
            value={langselectval}
          />
        </div>
        <div className={formstyles.fieldContainer}>
          <label htmlFor={`langvar_${uuid()}`}>Tarkempi variantti</label>
          <input
            type="text"
            value={variety}
            onChange={ev => this.updateLanguage('variety', ev.target.value)}
            placeholder="Jätä tyhjäksi, jos ei määritelty"
            id={`langvar_${uuid()}`}
          />
        </div>
        <LanguageProp header="Annotoinnit">
          {annotations.map((annotation, annotationIdx) => (
            <AnnotationSelect
              key={annotationIdx.toString()}
              idx={annotationIdx}
              language_idx={idx}
              languages={languages}
              dispatch={dispatch}
              {...annotation}
            />
          ))}

          <button
            type="button"
            className={formstyles.someTopMargin}
            onClick={() => this.updateLanguage('annotations', [...annotations, {}])}
          >
            Lisää uusi
          </button>
        </LanguageProp>
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
            <label htmlFor="startyear"> vuoteen</label>
            <input
              type="number"
              defaultValue={years.length == 1 ? years[0] : ''}
              min="1000"
              max="2050"
              id="startyear"
              placeholder="vuosiluku"
              onChange={ev => this.updateYears(ev.target.value, 'max')}
            />
          </div>
          <LanguageProp header="Tarkempi määrittely">
            <p className={formstyles.description}>
              Jos kyseessä on diakroninen aineisto ja ajankohta on mahdollista tai mielekstä
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
        </LanguageProp>
      </Closable>
    );
  }
}
