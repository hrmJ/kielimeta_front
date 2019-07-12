import PropTypes from 'prop-types';
import React from 'react';
import { uid } from 'react-uid';
import TabContent from '../../../ui/TabContent';

import LanguageDetails from '../languageDetails';
import styles from './content.scss';
import generalStyles from '../../../../general_styles/general_styles.scss';

const Content = props => {
  const { languages, genre } = props;
  return (
    <TabContent>
      {genre && (
        <div className={generalStyles.labelContainerStacked}>
          <div>Aineiston tekstien edustamat genret</div>
          <div className={styles.genre}>{genre.join(', ')}</div>
        </div>
      )}
      <div className={generalStyles.someTopMargin}>
        {languages.map(language => (
          <LanguageDetails key={uid(language)} {...language} />
        ))}
      </div>
    </TabContent>
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
