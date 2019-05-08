/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import styles from '../../datasetform.scss';
import Language from './language';
import { updateField } from '../../../../../redux/actions/datasetform';

export default props => {
  const { languages, dispatch, mediaTypes } = props;

  return (
    <fieldset>
      <legend>Kielet</legend>
      <section>
        <p className={styles.description}>
          Monet ominaisuudet määritellään kieli- tai varianttikohtaisesti. Jos kieliä on vain yksi,
          sellaiset ominaisuudet kuin korpuksen koko ja aikajänne määritellään tämän kielen
          ominaisuuksiksi.
        </p>
        {languages.map((lang, idx) => (
          <Language
            languages={languages}
            dispatch={dispatch}
            mediaTypes={mediaTypes}
            {...lang}
            key={idx.toString()}
            idx={idx}
          />
        ))}
      </section>
      <section className={styles.someTopMargin}>
        <button
          type="button"
          id="addlanguage"
          onClick={() => dispatch(updateField('languages', [...languages, { annotations: [] }]))}
        >
          Lisää uusi
        </button>
      </section>
    </fieldset>
  );
};
