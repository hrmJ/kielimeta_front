import PropTypes from 'prop-types';
import React from 'react';
import Tooltip from '@atlaskit/tooltip';

import Icon from '../icon';

const fieldInfo = props => {
  const { text } = props;

  return (
    <Tooltip content={text}>
      <div>
        <Icon iconName="faInfoCircle" />
      </div>
    </Tooltip>
  );
};

fieldInfo.propTypes = {
  text: PropTypes.string
};

fieldInfo.defaultProps = {
  text: ''
};

export default fieldInfo;
