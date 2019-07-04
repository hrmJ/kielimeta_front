import PropTypes from 'prop-types';
import React from 'react';
import { uid } from 'react-uid';

import LanguageDetails from '../languageDetails';

const Content = props => {
  const { languages } = props;
  return (
    <div>
      {languages.map(language => (
        <LanguageDetails key={uid(language)} {...language} />
      ))}
    </div>
  );
};

Content.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.object)
};

Content.defaultProps = {
  languages: []
};

export default Content;
