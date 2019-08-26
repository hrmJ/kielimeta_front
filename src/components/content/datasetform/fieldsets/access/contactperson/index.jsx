import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { PersonInput } from '../../../../../ui/personfield';
import { Select } from '../../../../../ui/localizedSelect';
import { selectStyle } from '../../../../../../general_styles/jsStyles';
import { updateField } from '../../../../../../redux/actions/datasetform';
import AdditionalField from '../../../../../ui/additionalfield';
import BasicButton from '../../../../../ui/buttons/BasicButton';
import LabelledInput from '../../../../../ui/labelledinput';
import UserPicker from '../../../../userPicker';
import formStyles from '../../../datasetform.scss';
import generalStyles from '../../../../../../general_styles/general_styles.scss';
import styles from './contactperson.scss';

class ContactPerson extends Component {
  state = { newPerson: false, modalOpen: true };

  addedPersons = [];

  render() {
    const { dispatch, authors, contactPersons, userNames, loadingState } = this.props;
    const { newPerson, modalOpen } = this.state;

    const options = authors.map(a => ({
      label: a.name,
      value: a.email,
      data: { email: a.id, name: a.name }
    }));
    contactPersons.forEach(p => {
      options.push({ label: p.name, value: p.email, data: p });
    });
    options.push({ label: 'Uusi henkilö', value: 'newperson', data: { email: '', name: '' } });
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
            id="contactpersons"
            value={contactPersons.map(p => ({ label: p.name, value: p.email, data: p }))}
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
                dispatch(updateField('contact_person', selected.map(s => s.data)));
              }
            }}
            isMulti
          />
        </LabelledInput>
        <AdditionalField condition={newPersonCond}>
          {modalOpen ? (
            <section>
              <UserPicker
                userNames={userNames}
                dispatch={dispatch}
                onPick={picked =>
                  this.setState({
                    newPerson: { name: picked.cn, email: `${picked.uid}@utu.fi` },
                    modalOpen: false
                  })
                }
                loadingState={loadingState}
                customCancelText="Syötä henkilötiedot käsin"
                cancel={() => this.setState({ modalOpen: false })}
              />
            </section>
          ) : (
            <section>
              {!newPerson.email && (
                <div className={styles.userPickerLauncher}>
                  <BasicButton
                    text="Etsi UTU:n henkilöhakemistosta"
                    onClick={() => this.setState({ modalOpen: true })}
                    iconName="faSearch"
                  />
                </div>
              )}
              <PersonInput
                emailLabel="email"
                personId={newPerson.email}
                name={newPerson.name}
                handleChange={(key, val) =>
                  this.setState({ newPerson: { ...newPerson, [key]: val } })
                }
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
            </section>
          )}
        </AdditionalField>
      </div>
    );
  }
}

ContactPerson.propTypes = {
  dispatch: PropTypes.func.isRequired,
  authors: PropTypes.arrayOf(PropTypes.object),
  contactPersons: PropTypes.arrayOf(PropTypes.object),
  loadingState: PropTypes.objectOf(PropTypes.any).isRequired,
  userNames: PropTypes.arrayOf(
    PropTypes.shape({ cn: PropTypes.string, mail: PropTypes.string, uid: PropTypes.string })
  ).isRequired
};

ContactPerson.defaultProps = {
  authors: [],
  contactPersons: []
};

export default ContactPerson;
