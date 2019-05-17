/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import styles from './language.scss';
import { updateField } from '../../../../../../redux/actions/datasetform';
import Closable from '../../../../../ui/closablebox';
import Annotations from './languageprops/annotations';
import TemporalCoverage from './languageprops/temporalcoverage';
import Size from './languageprops/size/index';
import Details from './languageprops/details';

export default class LanguageSelect extends Component {
  updateLanguage(key, val) {
    const { dispatch, languages, idx } = this.props;
    const updated = languages;
    if (!languages[idx] && (languages.length - 1 >= idx || languages.length === 0)) {
      languages[idx] = {};
    }
    if (key === 'language_code') {
      updated[idx].details = { ...updated[idx].details, [key]: val.value };
      dispatch(updateField('languages', updated, val));
      return updated;
    }
    if (key === 'variety') {
      updated[idx].details = { ...updated[idx].details, [key]: val };
    } else {
      updated[idx][key] = val;
    }
    dispatch(updateField('languages', updated));
    return updated;
  }

  removeLanguage() {
    const { idx, languages, dispatch } = this.props;
    const updated = languages;
    updated.splice(idx, 1);
    dispatch(updateField('languages', updated));
  }

  render() {
    const {
      details, mediaTypes = [], languages, dispatch, varieties, idx,
    } = this.props;
    const langprops = {
      annotations: null,
      size: [],
      temporalCoverage: (
        <TemporalCoverage {...this.props} updateLanguage={this.updateLanguage.bind(this)} />
      ),
    };
    // Conditionally hiding language-specific props based on madia types
    if (mediaTypes.includes('text')) {
      langprops.annotations = (
        <Annotations {...this.props} onChange={this.updateLanguage.bind(this)} />
      );
      langprops.size.push(
        <Size
          {...this.props}
          header="Tekstiaineistojen laajuus"
          updateLanguage={this.updateLanguage.bind(this)}
          fields={[
            { key: 'words', label: 'Sanoja' },
            { key: 'tokens', label: 'Saneita' },
            { key: 'sentences', label: 'Virkkeitä' },
            { key: 'texts', label: 'Tekstejä' },
          ]}
          notincludedname="tekstiaineistoja"
          languagetotal={languages.length}
        />,
      );
    }
    if (mediaTypes.includes('audio')) {
      langprops.size.push(
        <Size
          {...this.props}
          header="Ääniaineistojen laajuus"
          updateLanguage={this.updateLanguage.bind(this)}
          fields={[{ key: 'audiohours', label: 'Tuntia' }]}
          notincludedname="äänitteitä"
          languagetotal={languages.length}
        />,
      );
    }
    if (mediaTypes.includes('video')) {
      langprops.size.push(
        <Size
          {...this.props}
          header="Videoaineistojen laajuus"
          updateLanguage={this.updateLanguage.bind(this)}
          fields={[{ key: 'videohours', label: 'Tuntia' }]}
          notincludedname="videoita"
          languagetotal={languages.length}
        />,
      );
    }

    // ATTENTION! ADD a checkbox for 'one multilingual ' ... use that as a special value in the API

    return (
      <Closable
        className={styles.selectContainer}
        onClose={() => this.removeLanguage()}
        id={`lang_${idx}`}
      >
        <Details
          idx={idx}
          dispatch={dispatch}
          details={details}
          onChange={this.updateLanguage.bind(this)}
          varieties={varieties}
        />
        <section className={styles.propSection}>
          {Object.keys(langprops).map(key => langprops[key])}
        </section>
      </Closable>
    );
  }
}
