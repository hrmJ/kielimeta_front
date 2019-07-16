import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loaders';
import './unmodifiedSass_loader.scss';
import styles from './loader.scss';

const CustomLoader = props => {
  const { center } = props;
  const renderedProps = {
    style: { transform: 'scale(0.5)' },
    active: true,
    type: 'ball-pulse',
    color: 'grey'
  };

  if (center) {
    return (
      <div className={styles.container}>
        <Loader {...renderedProps} />
      </div>
    );
  }
  return <Loader {...renderedProps} />;
};

CustomLoader.propTypes = {
  center: PropTypes.bool
};

CustomLoader.defaultProps = {
  center: false
};

export default CustomLoader;
