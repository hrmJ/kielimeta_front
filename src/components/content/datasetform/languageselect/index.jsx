/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import styles from './languageselect.scss';
import { updateField } from '../../../../redux/actions/datasetform';
import Closable from '../../../ui/closablebox';
import Annotations from '../languageprop/annotations';
import TemporalCoverage from '../languageprop/temporalcoverage';
import Size from '../languageprop/size';
import Details from '../languageprop/details';

export default class LanguageSelect extends Component {
  updateLanguage(key, val) {
    const { dispatch, languages, idx } = this.props;
    const updated = languages;
    if (!languages[idx] && (languages.length - 1 >= idx || languages.length === 0)) {
      languages[idx] = {};
    }
    if (['language_code', 'variety'].includes(key)) {
      // grouping certain keys under the "details"  prop
      updated[idx].details = { ...updated[idx].details, [key]: val };
    } else {
      updated[idx][key] = val;
    }
    dispatch(updateField('languages', updated));
    // for testing purposes
    return updated;
  }

  removeLanguage() {
    const { idx, languages, dispatch } = this.props;
    const updated = languages;
    updated.splice(idx, 1);
    updated.map(u => console.log(u.variety));
    dispatch(updateField('languages', updated));
  }

  render() {
    const { details } = this.props;

    return (
      <Closable className={styles.selectContainer} onClose={() => this.removeLanguage()}>
        <Details details={details} onChange={this.updateLanguage.bind(this)} />
        <section className={styles.propSection}>
          <Annotations {...this.props} onChange={this.updateLanguage.bind(this)} />
          <TemporalCoverage {...this.props} updateLanguage={this.updateLanguage.bind(this)} />
          <Size {...this.props} updateLanguage={this.updateLanguage.bind(this)} />
        </section>
      </Closable>
    );
  }
}
