import PropTypes from 'prop-types';
import { uid } from 'react-uid';
import React, { Component } from 'react';
import { wrapGrid } from 'animate-css-grid';

import LanguageDetails from '../languageDetails';
import styles from './languageContainer.scss';

class LanguageContainer extends Component {
  componentDidMount() {
    wrapGrid(this.grid, { easing: 'backOut', stagger: 10, duration: 400 });
  }

  render() {
    const { languages } = this.props;
    return (
      <div className={styles.languageContainer} ref={el => (this.grid = el)}>
        {languages.map(language => (
          <LanguageDetails key={uid(language)} {...language} />
        ))}
      </div>
    );
  }
}

LanguageContainer.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default LanguageContainer;
