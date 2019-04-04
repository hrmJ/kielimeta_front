import React, { Component } from 'react';
import Select from 'react-select';
import { selectStyle } from '../languageselect';
import formstyles from '../datasetform.scss';
import styles from './annotationselect.scss';
import Closable from '../../../ui/closablebox';
import { updateField } from '../../../../redux/actions/datasetform';

export default class AnnotationSelect extends Component {
  removeAnnotation() {
    const { language_idx, idx, languages, dispatch } = this.props;
    let updated = languages;
    updated[language_idx].annotations.splice(idx, 1);
    dispatch(updateField('languages', updated));
  }

  render() {
    const { idx } = this.props;
    const annotationLevels = [
      { value: 'SYNT', label: 'syntaksi' },
      { value: 'MORPH', label: 'morfologia' },
      { value: 'OTHER', label: 'muut' }
    ];

    return (
      <Closable className={styles.annotationSelect} onClose={() => this.removeAnnotation()}>
        <div className={formstyles.fieldContainer}>
          <div>Annotoitu kohde</div>
          <Select styles={selectStyle} options={annotationLevels} />
        </div>

        <div className={formstyles.fieldContainer}>
          <label htmlFor={`annoversion${idx}`}>Käytetty skeema / versio</label>
          <input
            type="text"
            defaultValue=""
            onChange={ev => this.updateLanguage('variant', ev.target.value)}
            placeholder="esim. 'universal dependencies'"
            id={`annoversion${idx}`}
          />
        </div>
      </Closable>
    );
  }
}
