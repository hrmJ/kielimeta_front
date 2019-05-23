import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';
import styles from './datasetitem.scss';
import LanguageBadge, { printLanguageName } from '../languagebadge';
import 'react-vis/dist/style.css';
import TimelineChart from '../../ui/timeline/chart';
import FoldableBox from '../../ui/foldablebox';

const createLanguageKey = (id, language, langId) => `ds_${id}_lang_condendsed_${language.details.language_code}${language.details.variety}_${langId}`;

export default class datasetItem extends Component {
  static get propTypes() {
    return {
      title: PropTypes.string.isRequired,
      languages: PropTypes.arrayOf(PropTypes.object).isRequired,
    };
  }

  state = { lifted: false };

  printCondensed() {
    const { languages, id } = this.props;
    const languageNames = [];
    const languageBadges = [];
    for (let langId = 0; langId < languages.length; langId++) {
      const language = languages[langId];
      if (!languageNames.includes(language.details.name)) {
        languageNames.push(language.details.name);
        languageBadges.push(
          <LanguageBadge
            key={createLanguageKey(id, language, langId)}
            name={language.details.name}
          />,
        );
      }
    }

    return <div className={styles.quickDetails}>{languageBadges}</div>;
  }

  printExpanded() {
    const {
      languages, id, description, resourcetype, keywords,
    } = this.props;

    return (
      <div>
        <p>
          <em>{resourcetype}</em>
        </p>
        <p>
          <em>{description}</em>
        </p>
        <ul className={styles.kwList}>
          {keywords.map(keyword => (
            <li key={cuid()}>{keyword}</li>
          ))}
        </ul>
        <section className={styles.itemProp}>
          {languages.map((language, langId) => (
            <div key={createLanguageKey(id, language, langId)} className={styles.langOuterCont}>
              <FoldableBox
                launchertype="heading"
                header={`${language.details.name}${
                  language.details.variety ? `: ${language.details.variety}` : ''
                }`}
                headerclass={styles.langHeading}
                useHack
              >
                <div className={styles.langContent}>
                  <ul className={styles.langDetailsList}>
                    <li>
                      <h4>Annotoinnit:</h4>
                      <ul className={styles.sublist}>
                        {language.annotations.map(annotation => (
                          <li>
                            <span>{annotation.level}</span>
                            <span>:</span>
                            <span>{annotation.description}</span>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li>
                      <h4>Koko</h4>
                      <ul className={styles.sublist}>
                        {language.size
                          ? Object.keys(language.size)
                            .filter(
                              key => language.size[key] !== undefined && language.size[key] > 0,
                            )
                            .map(key => (
                              <li>
                                <span>
                                  {key}
                                    :&nbsp;
                                </span>
                                {language.size[key]}
                              </li>
                            ))
                          : null}
                      </ul>
                    </li>
                    <li>
                      <h4>Ajanjakso</h4>
                      <TimelineChart years={language.years_covered} />
                    </li>
                  </ul>
                </div>
              </FoldableBox>
            </div>
          ))}
        </section>
      </div>
    );
  }

  render() {
    const { title } = this.props;
    const { lifted } = this.state;

    return (
      <div className={lifted ? styles.liftedItem : styles.datasetItem}>
        <div
          role="button"
          tabIndex={0}
          className={styles.titleLine}
          onClick={() => this.setState({ lifted: !lifted })}
          onKeyDown={() => this.setState({ lifted: !lifted })}
        >
          {title}
        </div>
        {lifted ? this.printExpanded() : this.printCondensed()}
      </div>
    );
  }
}
