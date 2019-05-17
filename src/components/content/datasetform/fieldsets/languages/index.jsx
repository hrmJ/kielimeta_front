/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import styles from '../../datasetform.scss';
import generalStyles from '../../../../../general_styles/general_styles.scss';
import Language from './language';
import { updateField } from '../../../../../redux/actions/datasetform';

export default (props) => {
  const {
    languages, dispatch, mediaTypes, languageVarieties,
  } = props;

  return (
    <fieldset id="languages">
      <legend>Kielet</legend>
      <section>
        <p className={styles.description}>
          Monet ominaisuudet määritellään kieli- tai varianttikohtaisesti. Jos kieliä on vain yksi,
          sellaiset ominaisuudet kuin korpuksen koko ja aikajänne määritellään tämän kielen
          ominaisuuksiksi.
        </p>
        {languages.map((lang, idx) => (
          <Language
            varieties={languageVarieties}
            languages={languages}
            dispatch={dispatch}
            mediaTypes={mediaTypes}
            {...lang}
            key={idx.toString()}
            idx={idx}
          />
        ))}
      </section>
      <section className={generalStyles.someTopMargin}>
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
