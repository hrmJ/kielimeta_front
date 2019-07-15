import React from 'react';
import PropTypes from 'prop-types';
import { uid } from 'react-uid';
import ExplodableBox from '../../../ui/explodableBox';
import TimelineChart from '../../../ui/timeline/chart';
import styles from './languageDetails.scss';

const languageDetails = props => {
  const { details, annotations, size, years_covered: yearsCovered } = props;
  const { language_name: name, variety } = details;
  return (
    <ExplodableBox
      key={uid(details)}
      title={`${name}${variety && variety !== 'generic' ? `: ${variety}` : ''}`}
      openClassName={styles.openBox}
    >
      <ul className={styles.langDetailsList}>
        <li key="annotations">
          <h4>Annotoinnit:</h4>
          <ul className={styles.sublist}>
            {annotations.map(annotation => (
              <li key={uid(annotation)}>
                <span>{annotation.level}</span>
                <span>:</span>
                <span>{annotation.description}</span>
              </li>
            ))}
          </ul>
        </li>
        <li key="size">
          <h4>Koko</h4>
          <ul className={styles.sublist}>
            {size
              ? Object.keys(size)
                  .filter(key => size[key] !== undefined && size[key] > 0)
                  .map(key => (
                    <li key={uid(key)}>
                      <span>
                        {key}
                        :&nbsp;
                      </span>
                      {size[key]}
                    </li>
                  ))
              : null}
          </ul>
        </li>
        <li key="temporal_coverage">
          <h4>Ajanjakso</h4>
          <TimelineChart years={yearsCovered} whiteText />
        </li>
      </ul>
    </ExplodableBox>
  );
};

languageDetails.propTypes = {
  years_covered: PropTypes.arrayOf(PropTypes.number),
  details: PropTypes.shape({
    language_code: PropTypes.string,
    variety: PropTypes.string,
    variety_type: PropTypes.string
  }).isRequired,
  annotations: PropTypes.arrayOf(
    PropTypes.shape({ level: PropTypes.string, description: PropTypes.string })
  ),
  size: PropTypes.objectOf(PropTypes.any)
};

languageDetails.defaultProps = {
  years_covered: [],
  annotations: [],
  size: {}
};

export default languageDetails;
