import React from 'react';
import Select from 'react-select';

import { selectStyle } from '../../../../../general_styles/jsStyles';
import { updateField } from '../../../../../redux/actions/datasetform';
import AccessInfo from './accessinfo';
import AccessType from './accesstype';
import AdditionalField from '../../../../ui/additionalfield';
import ContactPerson from './contactperson';
import LabelledInput from '../../../../ui/labelledinput';
import License from './license';

export default (props) => {
  const { dispatch, placeOfPublication, accessType } = props;
  return (
    <fieldset>
      <legend>Hallinta ja saatavuus</legend>
      <ContactPerson {...props} />
      <AccessInfo dispatch={dispatch} placeOfPublication={placeOfPublication} />
      <AccessType accessType={accessType} dispatch={dispatch} />
      <LabelledInput
        label="Aineiston tallennuspaikka"
        handleChange={ev => dispatch(updateField('data_location', ev.target.value))}
      />
      <License dispatch={dispatch} />
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
      <LabelledInput label="Aineiston sensitiivisyys" />
      <LabelledInput label="Aineiston omistaja(t)" />
    </fieldset>
  );
};
