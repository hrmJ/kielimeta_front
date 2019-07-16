import { uid } from 'react-uid';
import PropTypes from 'prop-types';
import React from 'react';

import LanguageBadge from '../../ui/languagebadge';
import styles from './datasetitem.scss';

const condensedItem = props => {
  const { languages } = props;
  const languageNames = [];
  return (
    <div className={styles.quickDetails}>
      {languages.map(language => {
        const {
          details: { language_name: name }
        } = language;
        const returnValue = !languageNames.includes(name) && (
          <LanguageBadge key={uid(language)} name={name} />
        );
        languageNames.push(name);
        return returnValue;
      })}
    </div>
  );
};

condensedItem.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.object)
};

condensedItem.defaultProps = { languages: [] };

export default condensedItem;
