import React, { Component } from 'react';
import Select from 'react-select';

import { updateField } from '../../../../../../../redux/actions/datasetform';
import Closable from '../../../../../../ui/closablebox';
import TooltippedSelect from '../../../../../../ui/tooltippedSelect';
import formstyles from '../../../../datasetform.scss';
import styles from './annotationselect.scss';

export default class AnnotationSelect extends Component {
  removeAnnotation() {
    const {
      language_idx, idx, languages, dispatch,
    } = this.props;
    const updated = languages;
    updated[language_idx].annotations.splice(idx, 1);
    dispatch(updateField('languages', updated));
  }

  updateAnnotation(key, val) {
    const {
      dispatch, languages, idx, language_idx,
    } = this.props;
    const updated = languages;
    if (
      !languages[language_idx].annotations
      && (languages[language_idx].annotations.length - 1 >= idx
        || languages[language_idx].annotation.length === 0)
    ) {
      languages[languages_idx].annotations[idx] = {};
    }
    updated[language_idx].annotations[idx][key] = val;
    dispatch(updateField('languages', updated));
    // the return statement is for testing purposes
    return updated;
  }

  render() {
    const {
      idx, level = '', description, annotationLevels = [],
    } = this.props;

    return (
      <Closable className={styles.annotationSelect} onClose={() => this.removeAnnotation()}>
        <div className={formstyles.fieldContainer}>
          <div>Annotoitu kohde</div>
          <TooltippedSelect
            options={annotationLevels}
            valueName="level"
            tooltipName="definition"
            value={level ? { label: level, value: level } : null}
            onChange={selected => this.updateAnnotation('level', selected.value)}
            creatable={false}
          />
        </div>

        <div className={formstyles.fieldContainer}>
          <label htmlFor={`annoversion${idx}`}>Tarkempi kuvaus</label>
          <input
            type="text"
            value={description}
            onChange={ev => this.updateAnnotation('description', ev.target.value)}
            id={`annoversion${idx}`}
          />
        </div>
      </Closable>
    );
  }
}
