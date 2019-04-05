import React from 'react';
import langmap from 'langmap';
import styles from './languagebadge.scss';

const printLanguageName = (code) => {
  let name = code;

  if (langmap[code]) {
    name = langmap[code].englishName;
  }
  if (name === 'en-EN') {
    name = 'English';
  }

  return name;
};

const LanguageBadge = (props) => {
  const { code } = props;
  const name = printLanguageName(code);

  return <div className={styles.badge}>{name}</div>;
};

export default LanguageBadge;
export { printLanguageName };
