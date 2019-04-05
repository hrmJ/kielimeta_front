import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './datasetitem.scss';
import LanguageBadge from '../languagebadge';

export default class datasetItem extends Component {
  static get propTypes() {
    return {
      title: PropTypes.string.isRequired,
      languages: PropTypes.arrayOf(PropTypes.object).isRequired,
    };
  }

  state = {
    lifted: false,
  };

  render() {
    const { title, languages = [] } = this.props;
    const { lifted } = this.state;

    return (
      <div className={lifted ? styles.liftedItem : styles.datasetItem}>
        <div className={styles.titleLine} onClick={() => this.setState({ lifted: !lifted })}>
          {title}
        </div>
        <div className={styles.quickDetails}>
          {languages.map(language => (
            <LanguageBadge code={language.details.language_code} />
          ))}
        </div>
      </div>
    );
  }
}
