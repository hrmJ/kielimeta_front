import PropTypes from 'prop-types';
import React from 'react';

import Icon from '../icon';
import styles from './documentLink.scss';

const getIcon = url => {
  if (url.includes('.pdf')) {
    return <Icon iconName="faFilePdf" />;
  }
  if (url.match(/\.(doc|rtf|odt)/)) {
    return <Icon iconName="faFileWord" />;
  }
  if (url.match(/\.(png|jpg|jpeg)/)) {
    return <Icon iconName="faFileImage" />;
  }
  return null;
};

const documentLink = props => {
  const { url, description } = props;
  return (
    <div className={styles.container}>
      <div> {getIcon(url)}</div>
      <div>
        <a href={`media/${url}`}>{description}</a>
      </div>
    </div>
  );
};

documentLink.propTypes = {
  url: PropTypes.string.isRequired,
  description: PropTypes.string
};

documentLink.defaultProps = {
  description: 'Lisätietoja aineistosta'
};

export default documentLink;
