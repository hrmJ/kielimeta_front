import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import TooltipStyles from '../../../general_styles/tooltip.scss';

const TooltipLite = lazy(() => import(/* webpackChunkName: "tooltiplite" */ 'react-tooltip-lite'));

const toolTipStyle = {
  background: '#172b4d',
  color: '#fff',
  arrow: false,
  direction: 'down'
};

const Tooltip = props => {
  const { children, content, ...otherProps } = props;
  return content ? (
    <Suspense fallback={<div>Ladataan...</div>}>
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
  content: PropTypes.string
};

Tooltip.defaultProps = {
  content: ''
};

export default Tooltip;
