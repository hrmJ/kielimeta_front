import React from 'react';
import PropTypes from 'prop-types';
import { uid } from 'react-uid';

import { updateField } from '../../../../../redux/actions/datasetform';
import Add from '../../../../ui/buttons/add';
import Author from './author';
import generalStyles from '../../../../../general_styles/general_styles.scss';
import styles from '../../datasetform.scss';

const authorsComponent = props => {
  const { dispatch, authors } = props;

  return (
    <div>
      <p className={styles.description}>
        Määrittele tähän tutkimusaineiston tekemiseen osallistuneet henkilöt ilmoittamalla kustakin
        nimi, sähköposti sekä rooli aineiston koonnissa. Sähköpostikenttään voi sähköpostin sijasta
        kirjoittaa myös ORCID-tunnuksen, mikä on suositeltavaa etenkin, jos henkilö ei ole Turun
        yliopistosta.
      </p>
      {authors.map((author, idx) => (
        <Author key={uid(author)} dispatch={dispatch} authors={authors} idx={idx} author={author} />
      ))}
      <section className={generalStyles.someTopMargin}>
        <Add id="addauthor" onClick={() => dispatch(updateField('authors', [...authors, {}]))} />
      </section>
    </div>
  );
};

authorsComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  authors: PropTypes.arrayOf(PropTypes.object)
};

authorsComponent.defaultProps = {
  authors: []
};

export default authorsComponent;
