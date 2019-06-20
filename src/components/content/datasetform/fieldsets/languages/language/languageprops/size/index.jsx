import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LanguageProp from '../../languageprop';
import formstyles from '../../../../../datasetform.scss';
import generalStyles from '../../../../../../../../general_styles/general_styles.scss';
import styles from './size.scss';

class Size extends Component {
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
    const { fields, header, languagetotal, size } = this.props;
    return (
      <LanguageProp header={header}>
        <div>
          {fields.map(field => (
            <div className={formstyles.fieldContainer} key={field.key}>
              <label htmlFor={`${field.key}count`}>{field.label}</label>
              <input
                type="number"
                id={`${field.key}count`}
                onChange={ev => this.updateSize(field.key, ev.target.value)}
                value={size && size[field.key]}
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
            {/*
            <CbItem>Tämä kieli ei sisällä {notincludedname}</CbItem>
            */}
          </ul>
        ) : null}
      </LanguageProp>
    );
  }
}

Size.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.object).isRequired,
  idx: PropTypes.number.isRequired,
  updateLanguage: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })),
  header: PropTypes.string,
  languagetotal: PropTypes.number.isRequired,
  size: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any))
};

Size.defaultProps = {
  fields: [],
  header: '',
  size: []
};

export default Size;
