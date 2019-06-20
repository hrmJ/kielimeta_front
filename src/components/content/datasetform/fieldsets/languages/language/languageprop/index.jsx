import React from 'react';
import PropTypes from 'prop-types';
import styles from './languageprop.scss';
import FoldableBox from '../../../../../../ui/foldablebox';

const languageProp = props => {
  const { header, children, id } = props;

  return (
    <FoldableBox id={id} launchertype="heading" header={header}>
      <div className={styles.propContent}>{children}</div>
    </FoldableBox>
  );
};

languageProp.propTypes = {
  header: PropTypes.string,
  children: PropTypes.node,
  id: PropTypes.string
};

languageProp.defaultProps = {
  header: '',
  children: <div />,
  id: ''
};

export default languageProp;
