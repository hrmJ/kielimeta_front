import React from 'react';

import LabelledInput from '../labelledinput';
import formstyles from '../../content/datasetform/datasetform.scss';

const PersonSelect = (props) => {
  const { x } = props;

  return <div />;
};

const PersonInput = (props) => {
  const { handleChange, name = '', personId = '', emailLabel='id' } = props;

  return (
    <div className={formstyles.upperContainer}>
      <LabelledInput
        id="lkj"
        label="Nimi"
        handleChange={ev => handleChange('name', ev.target.value)}
        value={name}
      />
      <LabelledInput
        label="Sähköposti tai tunnus"
        handleChange={ev => handleChange(emailLabel, ev.target.value)}
        value={personId}
      />
    </div>
  );
};

export { PersonInput, PersonSelect };
