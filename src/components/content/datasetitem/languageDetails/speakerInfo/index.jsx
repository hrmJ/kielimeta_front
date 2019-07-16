import PropTypes from 'prop-types';
import React from 'react';

import Icon from '../../../../ui/icon';
import L2details from './L2details';
import styles from './speakerInfo.scss';

const speakerInfo = props => {
  const { speaker_status: status, speaker_l1: l1 } = props;
  return !status || status === 'ei tiedossa' ? null : (
    <div className={styles.outerContainer}>
      <Icon iconName="faUsers" />
      <div>{status}-puhujien tuottamaa aineistoa</div>
      {status === 'L2' && <L2details l1={l1} />}
    </div>
  );
};

speakerInfo.propTypes = {
  speaker_status: PropTypes.string,
  speaker_l1: PropTypes.arrayOf(
    PropTypes.shape({ language_name: PropTypes.string, language_code: PropTypes.string })
  )
};

speakerInfo.defaultProps = {
  speaker_status: null,
  speaker_l1: null
};

export default speakerInfo;
