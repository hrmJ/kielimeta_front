/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import Select from 'react-select';
import styles from './languageselect.scss';
import formstyles from '../datasetform.scss';
import AnnotationSelect from '../annotationselect';
import { updateField } from '../../../../redux/actions/datasetform';
import Closable from '../../../ui/closablebox';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export const selectStyle = {
  container: provided => ({
    ...provided,
    width: '10em',
  }),
};

export default class LanguageSelect extends Component {
  updateLanguage(key, val) {
    const { dispatch, languages, idx } = this.props;
    const updated = languages;
    if (!languages[idx] && (languages.length - 1 >= idx || languages.length === 0)) {
      languages[idx] = {};
    }
    updated[idx][key] = val;
    dispatch(updateField('languages', updated));
    // for testing purposes
    return updated;
  }

  render() {
    const {
 name, variant, languages, idx, dispatch 
} = this.props;
    const annotations = languages[idx].annotations || [];
    return (
      <Closable className={styles.selectContainer}>
        <div className={formstyles.fieldContainer}>
          <div>Kieli</div>
          <Select
            styles={selectStyle}
            onChange={selectedoption => this.updateLanguage('name', selectedoption.value)}
            options={options}
          />
        </div>
        <div className={formstyles.fieldContainer}>
          <label htmlFor="resourcetype">Kielen variantti</label>
          <input
            type="text"
            defaultValue=""
            onChange={ev => this.updateLanguage('variant', ev.target.value)}
            placeholder="Jätä tyhjäksi, jos ei määritelty"
            id="langvar"
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
