import { uid } from 'react-uid';
import PropTypes from 'prop-types';
import React from 'react';

import LanguageDetails from './languageDetails';
import styles from './datasetitem.scss';

const expandedItem = props => {
  const { languages, description, resourcetype, keywords } = props;

  return (
    <div>
      <p>
        <em>{resourcetype}</em>
      </p>
      <p className={styles.description}>
        <em>{description}</em>
      </p>
      <ul className={styles.kwList}>
        {keywords.map(keyword => (
          <li key={uid(keyword)}>{keyword}</li>
        ))}
      </ul>
      <section className={styles.itemProp}>
        {languages.map(language => (
          <LanguageDetails key={uid(language)} {...language} />
        ))}
      </section>
    </div>
  );
};

expandedItem.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.object),
  resourcetype: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string
};

expandedItem.defaultProps = {
  languages: [],
  keywords: [],
  resourcetype: '',
  description: ''
};

export default expandedItem;
