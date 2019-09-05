import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import {
  faFileWord,
  faLifeRing,
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
  faMicrophone,
  faVideo,
  faFileAlt,
  faUsers,
  faSort,
  faCheckCircle,
  faCircle,
  faSearch,
  faCaretSquareDown,
  faCaretSquareUp,
  faExclamationCircle,
  faComments,
  faKeyboard,
  faHistory,
  faChevronCircleDown,
  faSignInAlt,
  faFilePdf,
  faFileImage,
  faUser,
  faSave
} from '@fortawesome/free-solid-svg-icons';
import utilityStyles from '../../../general_styles/utilities.scss';

const icons = {
  faUser,
  faLifeRing,
  faSave,
  faFileImage,
  faFileWord,
  faSignInAlt,
  faChevronCircleDown,
  faMicrophone,
  faHistory,
  faExclamationCircle,
  faCaretSquareDown,
  faCaretSquareUp,
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
  faVideo,
  faThLarge,
  faFileAlt,
  faUsers,
  faSort,
  faCheckCircle,
  faCircle,
  faSearch,
  faComments,
  faKeyboard,
  faFilePdf
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
