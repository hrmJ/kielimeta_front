import React from 'react';
import styles from '../languageprop/languageprop.scss';
import FoldableBox from '../../../../../../ui/foldablebox';

export default props => {
  const { header, children, id } = props;

  return (
    <FoldableBox id={id} launchertype="heading" header={header}>
      <div className={styles.propContent}>{children}</div>
    </FoldableBox>
  );
};
