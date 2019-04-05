/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import Select from 'react-select';
import uuid from 'cuid';
import styles from './languageselect.scss';
import formstyles from '../datasetform.scss';
import AnnotationSelect from '../annotationselect';
import { updateField } from '../../../../redux/actions/datasetform';
import Closable from '../../../ui/closablebox';
import langmap from 'langmap';

// NOTE: a temporary mock, to be replaced with database data
const langOptions = Object.keys(langmap)
  .filter(key => key.includes('-'))
  .map(code => ({
    value: code,
    label: langmap[code]['englishName']
  }));

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

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
        <div>
          <h4>Annotoinnit</h4>
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
        </div>
      </Closable>
    );
  }
}
