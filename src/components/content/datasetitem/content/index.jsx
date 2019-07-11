import PropTypes from 'prop-types';
import React from 'react';
import { uid } from 'react-uid';

import LanguageDetails from '../languageDetails';
import styles from './content.scss';

const Content = props => {
  const { languages, genre } = props;
  return (
    <div>
      {/*genre.map(g => (
          <li key={g}>{g}</li>
        ))*/}
      <div className={styles.genre}>{genre.join(', ')}</div>
      {languages.map(language => (
        <LanguageDetails key={uid(language)} {...language} />
      ))}
    </div>
  );
};

Content.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.object),
  genre: PropTypes.arrayOf(PropTypes.string)
};

Content.defaultProps = {
  languages: [],
  genre: []
};

export default Content;
