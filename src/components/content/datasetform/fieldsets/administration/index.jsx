/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import CreatableSelect from 'react-select/lib/Creatable';
import React from 'react';

import { PersonInput } from '../../../../ui/personfield';
import { selectStyle } from '../../../../../general_styles/jsStyles';
import { updateField } from '../../../../../redux/actions/datasetform';
import AdditionalField from '../../../../ui/additionalfield';
import LabelledInput from '../../../../ui/labelledinput';

export default (props) => {
  const {
    handleChange, dispatch, authors = [], contactPerson = '',
  } = props;

  const { name = '', email = '' } = contactPerson;
  const options = authors.map(a => ({ label: a.name, value: { email: a.id, name: a.name } }));
  options.push({ label: 'Uusi henkilö', value: 'Uusi henkilö' });

  return (
    <fieldset>
      <legend>Hallinta ja saatavuus</legend>
      <LabelledInput label="Yhteyshenkilö">
        <CreatableSelect
          styles={selectStyle}
          options={options}
          onChange={selected => dispatch(updateField('contact_person', selected.value))}
        />
      </LabelledInput>
      <AdditionalField
        condition={
          contactPerson !== ''
          && !authors.filter(a => a.id === contactPerson.email || a.name === contactPerson.name).length
        }
      >
        <PersonInput
          emailLabel="email"
          personId={email}
          name={name}
          handleChange={(key, val) => 
            dispatch(updateField('contact_person', typeof contactPerson === 'object'
              ? { ...contactPerson, ...{ [key]: val } }
              : { [key]: val }))
          }
        />
      </AdditionalField>
    </fieldset>
  );
};
