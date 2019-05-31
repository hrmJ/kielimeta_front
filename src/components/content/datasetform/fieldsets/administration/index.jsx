import React from 'react';
import Select from 'react-select';

import AccessInfo from './accessinfo';
import ContactPerson from './contactperson';
import LabelledInput from '../../../../ui/labelledinput';

export default (props) => {
  const { dispatch, placeOfPublication } = props;
  return (
    <fieldset>
      <legend>Hallinta ja saatavuus</legend>
      <ContactPerson {...props} />
      <AccessInfo dispatch={dispatch} placeOfPublication={placeOfPublication} />
      <LabelledInput label="Aineiston tallennuspaikka" />
      <LabelledInput label="Aineiston avoimuus" />
      <LabelledInput label="Käyttölisenssi" />
      <LabelledInput label="Aineiston pysyväistunniste (esim. URN tai doi)" />
      <LabelledInput label="Viittausohje" />
      <LabelledInput label="Aineiston sensitiivisyys" />
      <LabelledInput label="Aineiston omistaja(t)" />
    </fieldset>
  );
};
