import React from 'react';

import LabelledInput from '../labelledinput';
import formstyles from '../../content/datasetform/datasetform.scss';

const PersonSelect = props => {
  const { x } = props;

  return <div />;
};

const PersonInput = props => {
  const { handleChange, name = '', personId = '', emailLabel = 'id' } = props;

  return (
    <div className={formstyles.upperContainer}>
      <LabelledInput
        id="lkj"
        label="Nimi"
        tooltip="Henkilön etu- ja sukunimi"
        handleChange={ev => handleChange('name', ev.target.value)}
        value={name}
      />
      <LabelledInput
        label="Sähköposti tai tunnus"
        tooltip={`Mieluiten utu-tunnus lyhyessä muodossa, toissijaisesti
          sähköposti tai esimerkiksi ORCID-tunnus`}
        handleChange={ev => handleChange(emailLabel, ev.target.value)}
        value={personId}
      />
    </div>
  );
};

export { PersonInput, PersonSelect };
