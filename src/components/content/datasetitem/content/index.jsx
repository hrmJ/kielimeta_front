import PropTypes from 'prop-types';
import React from 'react';

import LanguageContainer from '../languageContainer';
import MediaType from './mediatype';
import TabContent from '../../../ui/TabContent';
import TimeLineChart from '../../../ui/timeline/chart';
import TranslationContainer from '../languageContainer/translationContainer';
import generalStyles from '../../../../general_styles/general_styles.scss';
import styles from './content.scss';

const Content = props => {
  const { languages, genre, mediatype, mediaDescription, connections } = props;

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
      {connections.map(con => {
        const { sl, tl } = con;
        return (
          <TranslationContainer
            sl={languages[sl]}
            tl={languages.filter((lang, idx) => tl.includes(idx))}
          />
        );
      })}
      {/*languages.length > 0 && (
        <div className={generalStyles.labelContainerStacked}>
          <div>Kielikohtaiset tiedot</div>
          <LanguageContainer languages={languages} />
        </div>
      )*/}
    </TabContent>
  );
};

Content.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.object),
  genre: PropTypes.arrayOf(PropTypes.string),
  mediatype: PropTypes.arrayOf(PropTypes.string),
  mediaDescription: PropTypes.string,
  connections: PropTypes.arrayOf(
    PropTypes.shape({ sl: PropTypes.number, tl: PropTypes.arrayOf(PropTypes.number) })
  )
};

Content.defaultProps = {
  languages: [],
  genre: [],
  mediatype: [],
  mediaDescription: '',
  connections: []
};

export default Content;
