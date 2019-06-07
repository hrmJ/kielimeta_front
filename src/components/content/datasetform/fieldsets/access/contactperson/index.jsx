import React, { Component } from 'react';
import { Select } from '../../../../../ui/localizedSelect';

import { PersonInput } from '../../../../../ui/personfield';
import { selectStyle } from '../../../../../../general_styles/jsStyles';
import { updateField } from '../../../../../../redux/actions/datasetform';
import AdditionalField from '../../../../../ui/additionalfield';
import LabelledInput from '../../../../../ui/labelledinput';
import generalStyles from '../../../../../../general_styles/general_styles.scss';
import formStyles from '../../../datasetform.scss';

export default class ContactPerson extends Component {
  state = { newPerson: false };

  addedPersons = [];

  render() {
    const { dispatch, authors = [], contactPersons = [] } = this.props;
    const { newPerson } = this.state;

    const options = authors.map(a => ({ label: a.name, value: { email: a.id, name: a.name } }));
    contactPersons.forEach(p => {
      options.push({ label: p.name, value: p });
    });
    options.push({ label: 'Uusi henkilö', value: { email: '', name: '' } });
    const newPersonCond =
      (contactPersons.length > 0 &&
        !this.addedPersons.includes(JSON.stringify(newPerson)) &&
        newPerson !== {} &&
        newPerson !== false) ||
      (this.addedPersons.length === 0 && newPerson !== false);
    return (
      <div className={formStyles.upperContainer}>
        <LabelledInput label="Yhteyshenkilö(t)">
          <Select
            value={contactPersons.map(p => ({ label: p.name, value: p }))}
            styles={selectStyle}
            options={options}
            onChange={selected => {
              let doDispatch = true;
              if (selected.length) {
                if (selected[selected.length - 1].label === 'Uusi henkilö') {
                  doDispatch = false;
                  this.setState({ newPerson: {} });
                }
              } else {
                this.addedPersons = [];
                this.setState({ newPerson: false });
              }
              if (doDispatch) {
                dispatch(updateField('contact_person', selected.map(s => s.value)));
              }
            }}
            isMulti
          />
        </LabelledInput>
        <AdditionalField condition={newPersonCond}>
          <PersonInput
            emailLabel="email"
            personId={newPerson.email}
            name={newPerson.name}
            handleChange={(key, val) => this.setState({ newPerson: { ...newPerson, [key]: val } })}
          />
          <button
            className={generalStyles.someTopMargin}
            type="button"
            onClick={() => {
              this.addedPersons.push(JSON.stringify(newPerson));
              dispatch(
                updateField('contact_person', [
                  ...contactPersons.filter(p => p.name || p.email),
                  newPerson
                ])
              );
            }}
          >
            Tallenna uusi henkilö
          </button>
        </AdditionalField>
      </div>
    );
  }
}
