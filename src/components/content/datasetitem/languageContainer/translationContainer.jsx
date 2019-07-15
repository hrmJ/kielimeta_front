import { uid } from 'react-uid';
import { wrapGrid } from 'animate-css-grid';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import LanguageContainer from '.';
import LanguageDetails from '../languageDetails';
import styles from './languageContainer.scss';

class TranslationContainer extends Component {
  componentDidMount() {
    wrapGrid(this.grid, { easing: 'backOut', stagger: 10, duration: 400 });
  }

  render() {
    const { sl, tl } = this.props;
    return (
      <div>
        <div className={styles.translationContainer} ref={el => (this.grid = el)}>
          <LanguageDetails key={uid(sl)} {...sl} additionalClassname={styles.slContainer} />
          <h5>
            <div className={styles.arrow_box}>
              <div className={styles.tlHeading}>
                <div>{tl.length > 1 ? 'Kohdekielet' : 'Kohdekieli'}</div>
              </div>
            </div>
          </h5>
        </div>
        <LanguageContainer languages={tl} />
      </div>
    );
  }
}

TranslationContainer.propTypes = {
  sl: PropTypes.objectOf(PropTypes.any).isRequired,
  tl: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default TranslationContainer;
