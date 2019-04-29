import React, { Component } from 'react';
import PropTypes from 'prop-types';
import langmap from 'langmap';
import styles from './datasetitem.scss';
import formstyles from '../datasetform/datasetform.scss';
import LanguageBadge, { printLanguageName } from '../languagebadge';
import cuid from 'cuid';

const createLanguageKey = (id, language, langId) =>
  `ds_${id}_lang_condendsed_${language.details.language_code}${language.details.variety}_${langId}`;

export default class datasetItem extends Component {
  static get propTypes() {
    return {
      title: PropTypes.string.isRequired,
      languages: PropTypes.arrayOf(PropTypes.object).isRequired
    };
  }

  state = {
    lifted: false
  };

  printCondensed() {
    const { languages, id } = this.props;
    return (
      <div className={styles.quickDetails}>
        {languages.map((language, langId) => (
          <LanguageBadge
            key={createLanguageKey(id, language, langId)}
            code={language.details.language_code}
          />
        ))}
      </div>
    );
  }

  printExpanded() {
    const { languages, id, description, resourcetype, keywords } = this.props;

    return (
      <div>
        <p>
          <em>{resourcetype}</em>
        </p>
        <ul className={styles.kwList}>
          {keywords.map(keyword => (
            <li key={cuid()}>{keyword}</li>
          ))}
        </ul>
        {languages.map((language, langId) => (
          <div key={createLanguageKey(id, language, langId)}>
            <h3>
              {printLanguageName(language.details.language_code)}

              {language.details.variety ? `: ${language.details.variety}` : ''}
            </h3>
            <ul>
              <li>xxx tokens </li>
              <li>some additional statistics</li>
              <li>
                <h4>Annotoinnit:</h4>
                <ul className={styles.sublist}>
                  {language.annotations.map(annotation => (
                    <li>
                      {annotation.type} : {annotation.version}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { title } = this.props;
    const { lifted } = this.state;

    return (
      <div className={lifted ? styles.liftedItem : styles.datasetItem}>
        <div className={styles.titleLine} onClick={() => this.setState({ lifted: !lifted })}>
          {title}
        </div>
        {lifted ? this.printExpanded() : this.printCondensed()}
      </div>
    );
  }
}
