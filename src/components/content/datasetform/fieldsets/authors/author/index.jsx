import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { CreatableSelect } from '../../../../../ui/localizedSelect';
import { PersonInput } from '../../../../../ui/personfield';
import { selectStyle } from '../../../../../../general_styles/jsStyles';
import { updateField } from '../../../../../../redux/actions/datasetform';
import AutoCompleteField from '../../../../../ui/autocompletefield';
import ClosableBox from '../../../../../ui/closablebox';
import LabelledInput from '../../../../../ui/labelledinput';

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

  render() {
    const { author = {} } = this.props;
    const { discipline, name, id, role } = author;

    return (
      <ClosableBox onClose={() => this.remove()}>
        <PersonInput name={name} personId={id} handleChange={(key, val) => this.update(key, val)} />
        <LabelledInput label="Oppiaine">
          <CreatableSelect
            styles={selectStyle}
            options={disciplineOptions}
            value={discipline && { label: discipline, value: discipline }}
            onChange={selected => this.update('discipline', selected.value)}
          />
        </LabelledInput>
        <AutoCompleteField
          onChange={selected => this.update('role', selected.value)}
          categoryName="flat"
          path="author_roles"
          tooltipName=""
          value={role && { value: role, label: role }}
        >
          Rooli tutkimuksessa
        </AutoCompleteField>
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
  authors: PropTypes.arrayOf(PropTypes.object).isRequired
};

Author.defaultProps = {
  author: { name: '', id: '', role: '', discipline: '' }
};
