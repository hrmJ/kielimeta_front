import React, { Component } from 'react';
import LanguageProp from '../../languageprop';
import formstyles from '../../../../../datasetform.scss';
import generalStyles from '../../../../../../../../general_styles/general_styles.scss';
import styles from './size.scss';
import CbItem from '../../../../../../../ui/checkboxlistitem';

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
    const { fields, header, notincludedname, languagetotal } = this.props;
    return (
      <LanguageProp header={header}>
        <div>
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
        </div>
        {languagetotal > 1 ? (
          <ul
            className={`${generalStyles.responsiveList} ${styles.disclaimer} ${
              generalStyles.largeTopMargin
            }`}
          >
            <CbItem>Tämä kieli ei sisällä {notincludedname}</CbItem>
          </ul>
        ) : null}
      </LanguageProp>
    );
  }
}
