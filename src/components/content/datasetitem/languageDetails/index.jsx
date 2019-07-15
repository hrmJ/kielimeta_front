import { uid } from 'react-uid';
import PropTypes from 'prop-types';
import React from 'react';

import AnnotationInfo from './annotationInfo';
import ExplodableBox from '../../../ui/explodableBox';
import SizeInfo from './sizeInfo';
import TimelineChart from '../../../ui/timeline/chart';
import styles from './languageDetails.scss';
import generalStyles from '../../../../general_styles/general_styles.scss';

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
        <li key="size">
          <SizeInfo {...size} />
        </li>
        <li key="annotations">
          <h4>Annotoinnit:</h4>
          <ul className={`${generalStyles.bulletlist}`}>
            {annotations.map(annotation => (
              <AnnotationInfo {...annotation} key={uid(annotation)} />
            ))}
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
