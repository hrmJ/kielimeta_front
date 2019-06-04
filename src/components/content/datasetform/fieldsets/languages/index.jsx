/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';

import { updateField } from '../../../../../redux/actions/datasetform';
import Add from '../../../../ui/buttons/add';
import Language from './language';
import generalStyles from '../../../../../general_styles/general_styles.scss';
import styles from '../../datasetform.scss';

export default props => {
  const {
    languages,
    dispatch,
    mediaTypes,
    languageVarieties,
    languageNames,
    languageVarietyTypes,
    annotationLevels = []
  } = props;

  return (
    <div>
      <section>
        <p className={styles.description}>
          Monet ominaisuudet määritellään kieli- tai varianttikohtaisesti. Jos kieliä on vain yksi,
          sellaiset ominaisuudet kuin korpuksen koko ja aikajänne määritellään tämän kielen
          ominaisuuksiksi.
        </p>
        {languages.map((lang, idx) => (
          <Language
            varieties={languageVarieties}
            names={languageNames}
            languages={languages}
            dispatch={dispatch}
            mediaTypes={mediaTypes}
            {...lang}
            key={idx.toString()}
            idx={idx}
            languageVarietyTypes={languageVarietyTypes}
            annotationLevels={annotationLevels}
          />
        ))}
      </section>
      <section className={generalStyles.someTopMargin}>
        <Add
          id="addlanguage"
          onClick={() => dispatch(updateField('languages', [...languages, { annotations: [] }]))}
        />
      </section>
    </div>
  );
};
