import { uid } from 'react-uid';
import PropTypes from 'prop-types';
import React from 'react';

import AnnotationInfo from './annotationInfo';
import ExplodableBox from '../../../ui/explodableBox';
import ModalityInfo from './modalityInfo';
import SizeInfo from './sizeInfo';
import SpeakerInfo from './speakerInfo';
import TimelineChart from '../../../ui/timeline/chart';
import generalStyles from '../../../../general_styles/general_styles.scss';
import styles from './languageDetails.scss';

const languageDetails = props => {
  const {
    details,
    annotations,
    size,
    years_covered: yearsCovered,
    speaker,
    additionalClassname,
    additionalClassnameClosed,
    isSl,
    modality
  } = props;
  const { language_name: name, variety } = details;
  return (
    <ExplodableBox
      key={uid(details)}
      title={`${name}${variety && variety !== 'generic' ? `: ${variety}` : ''} ${
        isSl ? ' (lähdekieli)' : ''
      }`}
      openClassName={styles.openBox}
      additionalClassname={additionalClassname}
      additionalClassnameClosed={additionalClassnameClosed}
    >
      <ul className={styles.langDetailsList}>
        <li key="speakers">
          <SpeakerInfo {...speaker} />
        </li>
        <li key="modality">
          <ModalityInfo modality={modality} />
        </li>
        <li key="size">
          <SizeInfo {...size} />
        </li>
        {annotations.length > 0 && (
          <li key="annotations">
            <h4>Annotoinnit:</h4>
            <ul className={`${generalStyles.bulletlist}`}>
              {annotations.map(annotation => (
                <AnnotationInfo {...annotation} key={uid(annotation)} />
              ))}
            </ul>
          </li>
        )}
        {yearsCovered.length > 0 && (
          <li key="temporal_coverage">
            <h4>Ajanjakso</h4>
            <TimelineChart years={yearsCovered} whiteText />
          </li>
        )}
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
  size: PropTypes.objectOf(PropTypes.any),
  speaker: PropTypes.objectOf(PropTypes.any),
  additionalClassname: PropTypes.string,
  additionalClassnameClosed: PropTypes.string,
  isSl: PropTypes.bool,
  modality: PropTypes.arrayOf(PropTypes.string)
};

languageDetails.defaultProps = {
  years_covered: [],
  annotations: [],
  size: {},
  speaker: {},
  additionalClassname: '',
  additionalClassnameClosed: '',
  isSl: false,
  modality: []
};

export default languageDetails;
