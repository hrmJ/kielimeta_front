import PropTypes from 'prop-types';
import React from 'react';

import TabContent from '../../../ui/TabContent';
import generalStyles from '../../../../general_styles/general_styles.scss';

const Citing = props => {
  const {
    placeOfPublication: { identifier, citation_info: citationInfo }
  } = props;
  return (
    <TabContent>
      {identifier && (
        <div className={generalStyles.labelContainerStacked}>
          <div>Aineiston pysyväisosoite</div>
          <div>
            <a href={identifier}>{identifier}</a>
          </div>
        </div>
      )}
      <div className={generalStyles.labelContainerStacked}>
        <div>{citationInfo && 'Viittausohje'}</div>
        <div>{citationInfo && citationInfo}</div>
      </div>
    </TabContent>
  );
};

Citing.propTypes = {
  placeOfPublication: PropTypes.shape({
    location: PropTypes.string,
    citation_info: PropTypes.string
  })
};

Citing.defaultProps = {
  placeOfPublication: {}
};

export default Citing;
