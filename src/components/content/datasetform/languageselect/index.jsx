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
import Annotations from '../languageprop/annotations';
import TemporalCoverage from '../languageprop/temporalcoverage';

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

  updateSize(key, val) {
    const { languages, idx } = this.props;
    const size = languages[idx].size || {};
    if (val === '') {
      delete size[key];
    } else {
      size[key] = val;
    }
    this.updateLanguage('size', size);
    return size;
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
    const { language_code = '', variety = '' } = details;

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
        <section className={styles.propSection}>
          <Annotations {...this.props} onChange={this.updateLanguage.bind(this)} />
          <TemporalCoverage {...this.props} updateLanguage={this.updateLanguage.bind(this)} />
          <LanguageProp header="Koko">
            <p className={formstyles.description}>
              Jos kyseessä on esimerkiksi korpusaineisto, ilmoita tämän kielen / variantin
              osakorpusten koot niin monella alla olevista mittareista kuin mahdollista, mutta täytä
              vain aineistosi kannalta relevantit kentät. Jos tarkkoja lukuja ei tiedetä, koot
              voivat olla vain arvioita.
            </p>
            <div className={formstyles.fieldContainer}>
              <label htmlFor="wordcount">Sanoja</label>
              <input
                type="number"
                id="wordcount"
                onChange={ev => this.updateSize('words', ev.target.value)}
              />
            </div>
            <div className={formstyles.fieldContainer}>
              <label htmlFor="tokencount">Saneita</label>
              <input
                type="number"
                id="tokencount"
                onChange={ev => this.updateSize('tokens', ev.target.value)}
              />
            </div>
            <div className={formstyles.fieldContainer}>
              <label htmlFor="sentencecount">Virkkeitä</label>
              <input
                type="number"
                id="sentencecount"
                onChange={ev => this.updateSize('sentences', ev.target.value)}
              />
            </div>
            <div className={formstyles.fieldContainer}>
              <label htmlFor="textcount">Tekstejä</label>
              <input
                type="number"
                id="textcount"
                onChange={ev => this.updateSize('texts', ev.target.value)}
              />
            </div>
          </LanguageProp>
        </section>
      </Closable>
    );
  }
}
