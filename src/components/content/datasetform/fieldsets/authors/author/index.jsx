import React, { Component } from 'react';
import { PersonInput } from '../../../../../ui/personfield';


import { updateField } from '../../../../../../redux/actions/datasetform';
import ClosableBox from '../../../../../ui/closablebox';
import LabelledInput from '../../../../../ui/labelledinput';

export default class Author extends Component {
  removeAuthor() {
    const { idx, authors, dispatch } = this.props;
    const updated = authors;
    updated.splice(idx, 1);
    dispatch(updateField('authors', updated));
  }

  render() {
    const { idx } = this.props;

    return (
      <ClosableBox onClose={() => this.removeAuthor()}>
        <PersonInput />
        <LabelledInput label="Oppiaine" />
        <LabelledInput label="Rooli tutkimuksessa" />
      </ClosableBox>
    );
  }
}
