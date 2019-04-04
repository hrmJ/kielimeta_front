import React, { Component } from 'react';
import Select from 'react-select';
import { selectStyle } from '../languageselect';
import formstyles from '../datasetform.scss';
import styles from './annotationselect.scss';

export default class AnnotaionSelect extends Component {
  render() {
    const { idx, languages } = this.props;
    const annotationLevels = [
      { value: 'SYNT', label: 'syntaksi' },
      { value: 'MORPH', label: 'morfologia' },
      { value: 'OTHER', label: 'muut' }
    ];

    return (
      <section className={styles.annotationSelect}>
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
      </section>
    );
  }
}
