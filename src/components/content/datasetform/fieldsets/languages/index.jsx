/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';

import { updateField } from '../../../../../redux/actions/datasetform';
import Add from '../../../../ui/buttons/add';
import Connections from './connections';
import Language from './language';
import generalStyles from '../../../../../general_styles/general_styles.scss';
import styles from '../../datasetform.scss';

const languagesComponent = props => {
  const {
    languages,
    dispatch,
    mediaTypes,
    languageVarieties,
    languageNames,
    languageVarietyTypes,
    annotationLevels,
    connections
  } = props;

  return (
    <div>
      <section>
        <p className={styles.description}>
          Monet ominaisuudet määritellään kieli- tai varianttikohtaisesti. Jos kieliä on vain yksi,
          sellaiset ominaisuudet kuin korpuksen koko ja aikajänne määritellään tämän kielen
          ominaisuuksiksi. Huomaa, että uusi kieli kannattaa lisätä siinäkin tapauksessa, että
          aineistossa on esimerkiksi kahdenlaisia suomenkielisiä ala-aineistoja (osa esimerkiksi
          L1-kielenkäyttäjien ja osa L2-kielenkäyttäjien).
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
      {languages.length > 1 && (
        <Connections
          languages={languages}
          dispatch={dispatch}
          connections={connections}
          languageNames={languageNames}
        />
      )}
    </div>
  );
};

languagesComponent.propTypes = {
  mediaTypes: PropTypes.arrayOf(PropTypes.string),
  languages: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
  languageNames: PropTypes.objectOf(PropTypes.any),
  languageVarietyTypes: PropTypes.arrayOf(PropTypes.string),
  annotationLevels: PropTypes.arrayOf(
    PropTypes.shape({ level: PropTypes.string, definition: PropTypes.string })
  ),
  connections: PropTypes.arrayOf(
    PropTypes.shape({ sl: PropTypes.number, tl: PropTypes.arrayOf(PropTypes.number) })
  ),
  languageVarieties: PropTypes.objectOf(PropTypes.any)
};

languagesComponent.defaultProps = {
  mediaTypes: [],
  languageNames: {},
  languageVarietyTypes: [],
  annotationLevels: [],
  connections: [],
  languageVarieties: {}
};

export default languagesComponent;
