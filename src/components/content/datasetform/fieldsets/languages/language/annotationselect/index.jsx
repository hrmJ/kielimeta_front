import React, { Component } from 'react';

import { updateField } from '../../../../../../../redux/actions/datasetform';
import Closable from '../../../../../../ui/closablebox';
import LabelledInput from '../../../../../../ui/labelledinput';
import TooltippedSelect from '../../../../../../ui/tooltippedSelect';
import styles from './annotationselect.scss';

export default class AnnotationSelect extends Component {
  removeAnnotation() {
    const { language_idx, idx, languages, dispatch } = this.props;
    const updated = languages;
    updated[language_idx].annotations.splice(idx, 1);
    dispatch(updateField('languages', updated));
  }

  updateAnnotation(key, val) {
    const { dispatch, languages, idx, language_idx } = this.props;
    const updated = languages;
    if (
      !languages[language_idx].annotations &&
      (languages[language_idx].annotations.length - 1 >= idx ||
        languages[language_idx].annotation.length === 0)
    ) {
      languages[language_idx].annotations[idx] = {};
    }
    updated[language_idx].annotations[idx][key] = val;
    dispatch(updateField('languages', updated));
    // the return statement is for testing purposes
    return updated;
  }

  render() {
    const { idx, level = '', description, annotationLevels = [] } = this.props;

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
          id={`annoversion${idx}`}
          tooltip={`Esimerkiksi käytetyn lemmatisaattorin nimi, käytetty
            tagset, jäsentimen nimi ym.`}
        />
      </Closable>
    );
  }
}
