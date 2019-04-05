import React from 'react';
import langmap from 'langmap';
import styles from './languagebadge.scss';

const LanguageBadge = (props) => {
  const { code } = props;
  let name = code;

  if (langmap[code]) {
    name = langmap[code].englishName;
  }
  if (name === 'en-EN') {
    name = 'English';
  }

  return <div className={styles.badge}>{name}</div>;
};

export default LanguageBadge;
