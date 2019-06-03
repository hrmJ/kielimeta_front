import React from 'react';

import { updateField } from '../../../../../redux/actions/datasetform';
import AccessType from './accesstype';
import LabelledInput from '../../../../ui/labelledinput';
import License from './license';

export default props => {
  const { dispatch, accessType } = props;
  return (
    <fieldset>
      <legend>Hallinnolliset tiedot </legend>
      <License dispatch={dispatch} />
      <AccessType accessType={accessType} dispatch={dispatch} />
      <LabelledInput label="Aineiston omistaja(t)" />
      <LabelledInput label="Aineiston sensitiivisyys" />
      <LabelledInput
        label="Aineiston tallennuspaikka"
        handleChange={ev => dispatch(updateField('data_location', ev.target.value))}
      />
    </fieldset>
  );
};
