import React from 'react';

import { updateField } from '../../../../../redux/actions/datasetform';
import Author from './author';
import generalStyles from '../../../../../general_styles/general_styles.scss';
import styles from '../../datasetform.scss';

export default props => {
  const { handleChange, dispatch, authors = [] } = props;
  console.log(authors);

  return (
    <fieldset>
      <legend>Tekijät</legend>
      <p className={styles.description}>
        Määrittele tähän tutkimusaineiston tekemiseen osallistuneet henkilöt ilmoittamalla kustakin
        nimi, sähköposti sekä rooli aineiston koonnissa. Sähköpostikenttään voi sähköpostin sijasta
        kirjoittaa myös ORCID-tunnuksen, mikä on suositeltavaa etenkin, jos henkilö ei ole Turun
        yliopistosta.
      </p>
      {authors.map((author, idx) => (
        <Author dispatch={dispatch} authors={authors} idx={idx} author={author} />
      ))}
      <section className={generalStyles.someTopMargin}>
        <button
          type="button"
          id="addauthor"
          onClick={() => dispatch(updateField('authors', [...authors, {}]))}
        >
          Lisää uusi
        </button>
      </section>
    </fieldset>
  );
};
