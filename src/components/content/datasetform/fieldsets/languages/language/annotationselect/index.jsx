import React, { Component } from 'react';
import Select from 'react-select';

import { selectStyle } from '../../../../../../../general_styles/jsStyles';
import { updateField } from '../../../../../../../redux/actions/datasetform';
import Closable from '../../../../../../ui/closablebox';
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
    const { idx, level = '', description } = this.props;
    // TODO
    const annotationLevels = [
      { value: 'SYNT', label: 'syntaksi' },
      { value: 'MORPH', label: 'morfologia' },
      { value: 'OTHER', label: 'muut' },
    ];
    let annselectval;

    if (level) {
      const label = annotationLevels.filter(lev => lev.value === level).map(obj => obj.label);
      annselectval = { label, value: level };
    }

    return (
      <Closable className={styles.annotationSelect} onClose={() => this.removeAnnotation()}>
        <div className={formstyles.fieldContainer}>
          <div>Annotoitu kohde</div>
          <Select
            styles={selectStyle}
            options={annotationLevels}
            value={annselectval}
            onChange={selected => this.updateAnnotation('level', selected.value)}
          />
        </div>

        <div className={formstyles.fieldContainer}>
          <label htmlFor={`annoversion${idx}`}>Käytetty skeema / versio</label>
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
