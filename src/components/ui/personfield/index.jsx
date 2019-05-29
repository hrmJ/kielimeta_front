import React from 'react';

import LabelledInput from '../labelledinput';
import formstyles from '../../content/datasetform/datasetform.scss';

const PersonSelect = (props) => {
  const { x } = props;

  return <div />;
};

const PersonInput = (props) => {
  const { x } = props;

  return (
    <div className={formstyles.upperContainer}>
      <LabelledInput id="lkj" label="Nimi" />
      <LabelledInput label="Utu-tunnus" />
    </div>
  );
};

export { PersonInput, PersonSelect };
