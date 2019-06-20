import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { updateField } from '../../../../../../../redux/actions/datasetform';
import Closable from '../../../../../../ui/closablebox';
import LabelledInput from '../../../../../../ui/labelledinput';
import TooltippedSelect from '../../../../../../ui/tooltippedSelect';
import styles from './annotationselect.scss';

class AnnotationSelect extends Component {
  removeAnnotation() {
    const { languageIdx, idx, languages, dispatch } = this.props;
    const updated = languages;
    updated[languageIdx].annotations.splice(idx, 1);
    dispatch(updateField('languages', updated));
  }

  updateAnnotation(key, val) {
    const { dispatch, languages, idx, languageIdx } = this.props;
    const updated = languages;
    if (
      !languages[languageIdx].annotations &&
      (languages[languageIdx].annotations.length - 1 >= idx ||
        languages[languageIdx].annotation.length === 0)
    ) {
      languages[languageIdx].annotations[idx] = {};
    }
    updated[languageIdx].annotations[idx][key] = val;
    dispatch(updateField('languages', updated));
    // the return statement is for testing purposes
    return updated;
  }

  render() {
    const { languageIdx, idx, level, description, annotationLevels } = this.props;

    return (
      <Closable className={styles.annotationSelect} onClose={() => this.removeAnnotation()}>
        <LabelledInput
          label="Annotoitu kohde"
          tooltip={`Lisää omina
          annotointeinaan morfologian kuvaukset, lemmatisointi ym. Voit käyttää
          tätä kenttää myös luovasti kertomaan aineistoon lisätyistä
          merkinnöistä laajemmin, jos listassa ei ole sopivaa tasoa (valitse
          tällöin kohta 'muu')`}
        >
          <TooltippedSelect
            options={annotationLevels}
            valueName="level"
            id={`annolevel_${languageIdx}_${idx}`}
            tooltipName="definition"
            value={level ? { label: level, value: level } : null}
            onChange={selected => this.updateAnnotation('level', selected.value)}
            creatable={false}
          />
        </LabelledInput>
        <LabelledInput
          label="Tarkempi kuvaus"
          handleChange={ev => this.updateAnnotation('description', ev.target.value)}
          value={description || ''}
          id={`annoversion_${languageIdx}_${idx}`}
          tooltip={`Esimerkiksi käytetyn lemmatisaattorin nimi, käytetty
            tagset, jäsentimen nimi ym.`}
        />
      </Closable>
    );
  }
}

AnnotationSelect.propTypes = {
  languageIdx: PropTypes.number.isRequired,
  idx: PropTypes.number.isRequired,
  level: PropTypes.string,
  description: PropTypes.string,
  annotationLevels: PropTypes.arrayOf(
    PropTypes.shape({ level: PropTypes.string, definition: PropTypes.string })
  ),
  languages: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired
};

AnnotationSelect.defaultProps = {
  level: '',
  description: '',
  annotationLevels: []
};

export default AnnotationSelect;
