import React from 'react';
import PropTypes from 'prop-types';
import TooltipLite from 'react-tooltip-lite';
import TooltipStyles from '../../../general_styles/tooltip.scss';

const toolTipStyle = {
  background: '#172b4d',
  color: '#fff',
  arrow: false,
  direction: 'down'
};

const Tooltip = props => {
  const { children, content, ...otherProps } = props;
  return content ? (
    <TooltipLite
      content={<div className={TooltipStyles.tooltipContent}>{content}</div>}
      {...otherProps}
      {...toolTipStyle}
    >
      {children}
    </TooltipLite>
  ) : (
    <div>{children}</div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.string
};

Tooltip.defaultProps = {
  content: ''
};

export default Tooltip;
