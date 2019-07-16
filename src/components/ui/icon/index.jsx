import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import {
  faCaretDown,
  faCaretUp,
  faCaretRight,
  faPencilAlt,
  faPlus,
  faTrash,
  faCopy,
  faCodeBranch,
  faInfoCircle,
  faCheck,
  faWindowClose,
  faTimesCircle,
  faThLarge,
  faThList,
  faMusic,
  faVideo,
  faFileAlt,
  faUsers,
  faSort
} from '@fortawesome/free-solid-svg-icons';
import utilityStyles from '../../../general_styles/utilities.scss';

const icons = {
  faCaretDown,
  faCaretUp,
  faCaretRight,
  faPencilAlt,
  faPlus,
  faTrash,
  faCopy,
  faCodeBranch,
  faInfoCircle,
  faCheck,
  faWindowClose,
  faTimesCircle,
  faThList,
  faMusic,
  faVideo,
  faThLarge,
  faFileAlt,
  faUsers,
  faSort
};

const FontAwesomeIconMod = lazy(() => import(/* webpackChunkName: "font-awesome" */ './faBase'));

const Icon = props => {
  const { role, onClick, className, iconName } = props;

  const otherProps = {};
  if (role) {
    otherProps.role = role;
  }
  if (onClick) {
    otherProps.onClick = onClick;
  }
  if (className) {
    otherProps.className = className;
  }
  return (
    <Suspense fallback={<div className={utilityStyles.loading} />}>
      <FontAwesomeIconMod icon={icons[iconName]} {...otherProps} />
    </Suspense>
  );
};

Icon.propTypes = {
  iconName: PropTypes.string.isRequired
};

export default Icon;
