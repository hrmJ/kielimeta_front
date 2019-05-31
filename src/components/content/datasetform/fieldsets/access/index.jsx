import React from 'react';

import { updateField } from '../../../../../redux/actions/datasetform';
import AccessInfo from './accessinfo';
import ContactPerson from './contactperson';
import LabelledInput from '../../../../ui/labelledinput';

export default (props) => {
  const { dispatch, placeOfPublication } = props;
  return (
    <fieldset>
      <legend>Aineiston saatavuus</legend>
      <ContactPerson {...props} />
      <AccessInfo dispatch={dispatch} placeOfPublication={placeOfPublication} />
      <LabelledInput
        label="Aineiston pysyväistunniste (esim. URN tai doi)"
        handleChange={ev => dispatch(
          updateField('place_of_publication', {
            ...placeOfPublication,
            ...{ identifier: ev.target.value },
          }),
        )
        }
      />
      <LabelledInput
        label="Viittausohje"
        type="textarea"
        handleChange={ev => dispatch(
          updateField('place_of_publication', {
            ...placeOfPublication,
            ...{ citation_info: ev.target.value },
          }),
        )
        }
      />
    </fieldset>
  );
};
