import React, { Component } from 'react';
import { PersonInput } from '../../../../../ui/personfield';

import { updateField } from '../../../../../../redux/actions/datasetform';
import ClosableBox from '../../../../../ui/closablebox';
import LabelledInput from '../../../../../ui/labelledinput';

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
    const { idx, author = {} } = this.props;
    const {
      discipline = '', name = '', id = '', role = '',
    } = author

    return (
      <ClosableBox onClose={() => this.remove()}>
        <PersonInput name={name} personId={id} handleChange={(key, val) => this.update(key, val)} />
        <LabelledInput
          label="Oppiaine"
          handleChange={ev => this.update('discipline', ev.target.value)}
          value={discipline}
        />
        <LabelledInput
          label="Rooli tutkimuksessa"
          handleChange={ev => this.update('role', ev.target.value)}
          value={role}
        />
      </ClosableBox>
    );
  }
}
