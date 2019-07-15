import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Select } from '../../../ui/localizedSelect';
import LanguageContainer from '../languageContainer';
import MediaType from './mediatype';
import TabContent from '../../../ui/TabContent';
import TimeLineChart from '../../../ui/timeline/chart';
import TranslationContainer from '../languageContainer/translationContainer';
import generalStyles from '../../../../general_styles/general_styles.scss';
import styles from './content.scss';

const selectStyle = {
  container: provided => ({
    ...provided,
    width: '10em'
  })
};

class Content extends Component {
  state = { currentSl: 0, showTranslations: false };

  componentDidMount() {}

  componentDidUpdate() {
    //this.setState({ currentSl: 0, showTranslations: false });
  }

  render() {
    const { languages, genre, mediatype, mediaDescription, connections } = this.props;
    const { currentSl, showTranslations } = this.state;
    let actualCurrentsl = currentSl;
    if (connections.length - 1 < currentSl) {
      actualCurrentsl = 0;
    }

    const years = [
      ...new Set(languages.reduce((prev, lang) => [...prev, ...(lang.years_covered || [])], []))
    ];
    const slOptions = connections.map((con, idx) => ({
      label: languages[con.sl].details.language_name,
      value: idx
    }));

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
        <div className={generalStyles.labelContainerStacked}>
          <div>Kielikohtaiset tiedot</div>
          {connections.length > 0 && (
            <div className={`${styles.transSelectContainer}`}>
              <input
                checked={showTranslations}
                type="checkbox"
                onChange={ev => this.setState({ showTranslations: ev.target.checked })}
              />
              Näytä tiedot käännössuunnista
            </div>
          )}
          {showTranslations ? (
            <div className={styles.languageDetailContainer}>
              {connections.length > 1 && (
                <div className={`${generalStyles.labelContainerLight} ${styles.slSelector}`}>
                  <div className={styles.addedIndent}>Valitse näytettävä lähdekieli</div>
                  <div>
                    <Select
                      styles={selectStyle}
                      options={slOptions}
                      onChange={selected => this.setState({ currentSl: selected.value })}
                      isSearchable={false}
                      value={slOptions.find(opt => opt.value === actualCurrentsl)}
                    />
                  </div>
                </div>
              )}
              <TranslationContainer
                sl={languages[actualCurrentsl]}
                tl={languages.filter((lang, idx) => connections[actualCurrentsl].tl.includes(idx))}
              />
            </div>
          ) : (
            languages.length > 0 && <LanguageContainer languages={languages} />
          )}
        </div>
      </TabContent>
    );
  }
}

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
