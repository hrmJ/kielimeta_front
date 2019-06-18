import React, { Component } from 'react';
import Tooltip from '@atlaskit/tooltip';

import { updateField } from '../../../../../../redux/actions/datasetform';
import Add from '../../../../../ui/buttons/add';
import Annotations from './languageprops/annotations';
import Closable from '../../../../../ui/closablebox';
import Details from './languageprops/details';
import FieldInfo from '../../../../../ui/fieldInfo';
import LabelledInput from '../../../../../ui/labelledinput';
import LanguageProp from './languageprop';
import Size from './languageprops/size/index';
import TemporalCoverage from './languageprops/temporalcoverage';
import styles from './language.scss';

export default class LanguageSelect extends Component {
  updateLanguage(key, val) {
    const { dispatch, languages, idx } = this.props;
    const updated = languages;
    if (!languages[idx] && (languages.length - 1 >= idx || languages.length === 0)) {
      languages[idx] = {};
    }
    if (key === 'new_language_code') {
      if (!updated[idx].details.language_name) {
        updated[idx].details.language_name = updated[idx].details.language_code;
      }
      updated[idx].details = { ...updated[idx].details, language_code: val };
    } else {
      if (key === 'language_code') {
        updated[idx].details = { ...updated[idx].details, language_code: val.value };
        updated[idx].details.variety = 'generic';
        updated[idx].details.variety_type = 'generic';
        delete updated[idx].details.language_name;
        dispatch(updateField('languages', updated, val));
        return updated;
      }
      if (['variety', 'variety_type'].includes(key)) {
        updated[idx].details = { ...updated[idx].details, [key]: val };
      } else {
        updated[idx][key] = val;
      }
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
      details,
      mediaTypes = [],
      languages,
      dispatch,
      varieties,
      idx,
      names,
      languageVarietyTypes,
      annotationLevels,
      modality,
      speaker_status,
      notes
    } = this.props;
    const langprops = {
      annotations: null,
      size: [],
      temporalCoverage: (
        <TemporalCoverage {...this.props} updateLanguage={this.updateLanguage.bind(this)} />
      )
    };

    // Conditionally hiding language-specific props based on madia types
    // if (mediaTypes.includes('text')) {
    langprops.annotations = (
      <Annotations {...this.props} onChange={this.updateLanguage.bind(this)} />
    );
    if (mediaTypes.includes('text')) {
      langprops.size.push(
        <Size
          {...this.props}
          header="Tekstiaineistojen laajuus"
          updateLanguage={this.updateLanguage.bind(this)}
          fields={[
            { key: 'words', label: 'Sanoja' },
            { key: 'tokens', label: 'Saneita' },
            { key: 'sentences', label: 'Virkkeitä' },
            { key: 'texts', label: 'Tekstejä' }
          ]}
          notincludedname="tekstiaineistoja"
          languagetotal={languages.length}
        />
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
        />
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
        />
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
          names={names}
          idx={idx}
          dispatch={dispatch}
          details={details}
          onChange={this.updateLanguage.bind(this)}
          varieties={varieties}
          varietyTypes={languageVarietyTypes}
          modality={modality}
          speakerStatus={speaker_status}
        />
        <section className={styles.propSection}>
          {Object.keys(langprops).map(key => langprops[key])}
        </section>
        <LanguageProp id={`additional_language_notes_${idx}`} header="Lisätiedot">
          <section className={`${styles.propSection} ${styles.additionalinfo}`}>
            <LabelledInput
              handleChange={ev => this.updateLanguage('notes', ev.target.value)}
              value={notes}
              type="textarea"
              label="Muita huomioita tästä kielestä / variantista"
              tooltip={`Lisää tähän kaikki sellaiset tiedot, joihin ei yllä
                ollut erikseen kenttää mutta jotka aineiston käyttäjän olisi
                olennaista tietää.`}
            />
          </section>
        </LanguageProp>
        <section className={styles.propSectionRight}>
          <Tooltip
            content={`Käytä tätä painiketta, jos haluat hyödyntää tähän
            syöttämiäsi tietoja pohjana uudelle kielelle / kielimuodolle /
            variantille, joka koostuu pitkälti samoista tiedoista, mutta jossa
            esimerkiksi muuttuu vain puhujien status tai kielen variantti`}
          >
            <Add
              type="button"
              onClick={() => dispatch(updateField('languages', [...languages, languages[idx]]))}
              text="Luo toinen kieli samoilla ominaisuuksilla"
            />
          </Tooltip>
        </section>
      </Closable>
    );
  }
}
