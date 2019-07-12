import PropTypes from 'prop-types';
import React from 'react';

import LanguageContainer from '../languageContainer';
import MediaType from './mediatype';
import TabContent from '../../../ui/TabContent';
import TimeLineChart from '../../../ui/timeline/chart';
import generalStyles from '../../../../general_styles/general_styles.scss';
import styles from './content.scss';

const Content = props => {
  const { languages, genre, mediatype, mediaDescription } = props;

  const years = [
    ...new Set(languages.reduce((prev, lang) => [...prev, ...(lang.years_covered || [])], []))
  ];

  return (
    <TabContent>
      {genre.length > 0 && (
        <div className={generalStyles.labelContainerStacked}>
          <div>Aineiston tekstien edustamat genret</div>
          <div className={styles.genre}>{genre.join(', ')}</div>
        </div>
      )}
      {mediatype.length > 0 && (
        <div className={generalStyles.labelContainerStacked}>
          <div>Aineisto sisältää:</div>
          <div>
            <ul>
              {mediatype.map(thisType => (
                <li key={thisType}>
                  <MediaType
                    mediaType={thisType}
                    languages={languages}
                    mediaDescription={mediaDescription}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {years.length && years.length > 0 && (
        <div className={generalStyles.labelContainerStacked}>
          <div>Aineisto aikajanalla </div>
          <TimeLineChart years={years} />
        </div>
      )}
      {languages.length > 0 && (
        <div className={generalStyles.labelContainerStacked}>
          <div>Kielikohtaiset tiedot</div>
          <LanguageContainer languages={languages} />
        </div>
      )}
    </TabContent>
  );
};

Content.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.object),
  genre: PropTypes.arrayOf(PropTypes.string),
  mediatype: PropTypes.arrayOf(PropTypes.string),
  mediaDescription: PropTypes.string
};

Content.defaultProps = {
  languages: [],
  genre: [],
  mediatype: [],
  mediaDescription: ''
};

export default Content;
