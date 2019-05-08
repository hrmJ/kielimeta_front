import React, { Component } from 'react';
import LanguageProp from '../../languageprop';
import formstyles from '../../../../../datasetform.scss';

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
    const { fields, header } = this.props;
    return (
      <LanguageProp header={header}>
        {fields.map(field => (
          <div className={formstyles.fieldContainer}>
            <label htmlFor={`${field.key}count`}>{field.label}</label>
            <input
              type="number"
              id={`${field.key}count`}
              onChange={ev => this.updateSize(field.key, ev.target.value)}
            />
          </div>
        ))}
      </LanguageProp>
    );
  }
}
