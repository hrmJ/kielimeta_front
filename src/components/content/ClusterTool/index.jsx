import React from 'react';
import PropTypes from 'prop-types';
import styles from './clustertool.scss';

const ClusterTool = props => {
  const {
    groupedDatasets: { datasets }
  } = props;
  return (
    <div className={styles.container}>
      <h4>Ryhmittele aineistoja</h4>
      <ul>
        {datasets.map(ds => (
          <li key={ds.dataset}>{ds.title}</li>
        ))}
      </ul>
    </div>
  );
};

ClusterTool.propTypes = {
  groupedDatasets: PropTypes.shape({
    datasets: PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.number, title: PropTypes.string, role: PropTypes.string })
    ),
    name: PropTypes.string
  })
};

ClusterTool.defaultProps = {
  groupedDatasets: { datasets: [], name: '' }
};

export default ClusterTool;
