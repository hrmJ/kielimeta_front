import React, { Component } from 'react';
import LanguageProp from '../languageprop';
import formstyles from '../../../../datasetform.scss';

export default class Size extends Component {
  updateSize(key, val) {
    const { languages, idx, updateLanguage } = this.props;
    const size = languages[idx].size || {};
    if (val === '') {
      delete size[key];
    } else {
      size[key] = val;
    }
    updateLanguage('size', size);
    return size;
  }

  render() {
    return (
      <LanguageProp header="Koko">
        <p className={formstyles.description}>
          Jos kyseessä on esimerkiksi korpusaineisto, ilmoita tämän kielen / variantin osakorpusten
          koot niin monella alla olevista mittareista kuin mahdollista, mutta täytä vain aineistosi
          kannalta relevantit kentät. Jos tarkkoja lukuja ei tiedetä, koot voivat olla vain
          arvioita.
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
    );
  }
}
