import React from 'react';
import PropTypes from 'prop-types';
import styles from './clustertool.scss';

const ClusterTool = props => {
  const { datasets } = props;
  return (
    <div className={styles.container}>
      <h4>Ryhmittele aineistoja</h4>
      <ul>
        {datasets.map(ds => (
          <li key={ds.id}>{ds.title}</li>
        ))}
      </ul>
    </div>
  );
};

ClusterTool.propTypes = {
  datasets: PropTypes.arrayOf(PropTypes.object)
};

ClusterTool.defaultProps = {
  datasets: []
};

export default ClusterTool;
