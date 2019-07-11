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
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';

const icons = {
  faCaretDown,
  faCaretUp,
  faCaretRight,
  faPencilAlt,
  faPlus,
  faTrash,
  faTrash,
  faCopy,
  faCodeBranch,
  faPencilAlt,
  faCaretDown,
  faInfoCircle,
  faCheck,
  faWindowClose,
  faTimesCircle
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
    <Suspense fallback={<div>Ladataan...</div>}>
      <FontAwesomeIconMod icon={icons[iconName]} {...otherProps} />
    </Suspense>
  );
};

Icon.propTypes = {
  iconName: PropTypes.string.isRequired
};

export default Icon;
