import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { CreatableSelect } from '../../../../../ui/localizedSelect';
import { PersonInput } from '../../../../../ui/personfield';
import { selectStyle } from '../../../../../../general_styles/jsStyles';
import { updateField } from '../../../../../../redux/actions/datasetform';
import AutoCompleteField from '../../../../../ui/autocompletefield';
import BasicButton from '../../../../../ui/buttons/BasicButton';
import ClosableBox from '../../../../../ui/closablebox';
import LabelledInput from '../../../../../ui/labelledinput';
import UserPicker from '../../../../userPicker';
import generalStyles from '../../../../../../general_styles/general_styles.scss';
import styles from './author.scss';

const disciplineOptions = [
  'Pohjoismaiset kielet',
  'Suomen kieli ja suomalais-ugrilainen kielentutkimus',
  'Unkarin kieli ja kulttuuri',
  'Viron kieli ja kulttuuri',
  'Englannin kieli',
  'Italia',
  'Ranska',
  'Saksan kieli',
  'Venäjän kieli',
  'Espanja',
  'Klassiset kielet ja antiikin kulttuuri'
]
  .sort()
  .map(opt => ({ label: opt, value: opt }));

export default class Author extends Component {
  constructor(props) {
    super();
    const {
      author: { name }
    } = props;
    let modalOpen = true;
    if (name) {
      modalOpen = false;
    }
    this.state = {
      modalOpen
    };
  }

  remove() {
    const { idx, authors, dispatch } = this.props;
    const updated = authors;
    updated.splice(idx, 1);
    dispatch(updateField('authors', updated));
  }

  update(key, val) {
    const { idx, authors, dispatch } = this.props;
    const updated = authors;
    updated[idx][key] = val;
    dispatch(updateField('authors', updated));
    return updated;
  }

  insertPeronInfo(person) {
    this.update('name', person.cn);
    this.update('id', `${person.uid}@utu.fi`);
    this.update('discipline', person.ou);
    this.setState({ modalOpen: false });
  }

  render() {
    const { author, idx, userNames, dispatch, loadingState } = this.props;
    const { discipline, name, id, role } = author;

    const { modalOpen } = this.state;

    return (
      <ClosableBox onClose={() => this.remove()} id={`author_${idx}`}>
        {modalOpen ? (
          <section>
            <UserPicker
              userNames={userNames}
              dispatch={dispatch}
              onPick={picked => this.insertPeronInfo(picked)}
              cancel={() => this.setState({ modalOpen: false })}
              loadingState={loadingState}
              customCancelText="Syötä henkilötiedot käsin"
            />
          </section>
        ) : (
          <section>
            {!name && (
              <div className={styles.userPickerLauncher}>
                <BasicButton
                  text="Etsi UTU:n henkilöhakemistosta"
                  onClick={() => this.setState({ modalOpen: true })}
                  iconName="faSearch"
                />
              </div>
            )}
            <PersonInput
              idx={idx}
              name={name}
              personId={id}
              handleChange={(key, val) => this.update(key, val)}
            />
            <LabelledInput label="Oppiaine">
              <CreatableSelect
                id={`discipline_${idx}`}
                styles={selectStyle}
                options={disciplineOptions}
                value={discipline && { label: discipline, value: discipline }}
                onChange={selected => this.update('discipline', selected.value)}
              />
            </LabelledInput>
          </section>
        )}
        <section className={styles.fieldContainer}>
          <AutoCompleteField
            onChange={selected => this.update('role', selected.value)}
            id={`role_${idx}`}
            categoryName="flat"
            path="author_roles"
            tooltipName=""
            value={role && { value: role, label: role }}
            tooltip={`Valitse jokin jo aiemmin lisätyistä rooleista tai 
              luo uusi rooli (tutkija, haastattelija, litteroija, kääntäjä jne.)`}
          >
            Rooli tutkimuksessa
          </AutoCompleteField>
        </section>
      </ClosableBox>
    );
  }
}
Author.propTypes = {
  dispatch: PropTypes.func.isRequired,
  author: PropTypes.shape({
    discipline: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    role: PropTypes.string
  }),
  idx: PropTypes.number.isRequired,
  authors: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadingState: PropTypes.objectOf(PropTypes.any).isRequired,
  userNames: PropTypes.arrayOf(
    PropTypes.shape({ cn: PropTypes.string, mail: PropTypes.string, uid: PropTypes.string })
  ).isRequired
};

Author.defaultProps = {
  author: { name: '', id: '', role: '', discipline: '' }
};
