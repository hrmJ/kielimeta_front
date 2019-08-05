import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import TooltipStyles from '../../../general_styles/tooltip.scss';
import utilityStyles from '../../../general_styles/utilities.scss';

const TooltipLite = lazy(() => import(/* webpackChunkName: "tooltiplite" */ 'react-tooltip-lite'));

const Tooltip = props => {
  const { children, content, direction, ...otherProps } = props;

  const toolTipStyle = {
    background: '#172b4d',
    color: '#fff',
    arrow: false,
    direction: direction || 'down'
  };

  return content ? (
    <Suspense fallback={<div className={utilityStyles.loading} />}>
      <TooltipLite
        content={<div className={TooltipStyles.tooltipContent}>{content}</div>}
        {...otherProps}
        {...toolTipStyle}
      >
        {children}
      </TooltipLite>
    </Suspense>
  ) : (
    <div>{children}</div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.string,
  direction: PropTypes.oneOf(['down', 'up', 'left', 'right'])
};

Tooltip.defaultProps = {
  content: '',
  direction: null
};

export default Tooltip;
