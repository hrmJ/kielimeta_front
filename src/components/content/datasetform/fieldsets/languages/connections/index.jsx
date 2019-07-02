import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { uid } from 'react-uid';

import { updateField } from '../../../../../../redux/actions/datasetform';
import Add from '../../../../../ui/buttons/add';
import Connection from './connection';
import formStyles from '../../../datasetform.scss';
import generalStyles from '../../../../../../general_styles/general_styles.scss';
import styles from './styles.scss';

class index extends Component {
  state = { hasTranslations: false };

  render() {
    const { languages, dispatch, connections, languageNames } = this.props;
    let { hasTranslations } = this.state;

    if (connections.length > 0) {
      hasTranslations = true;
    }

    return (
      <div className={`${formStyles.upperContainer} ${generalStyles.someTopMargin}`}>
        <div>
          <input
            type="checkbox"
            onChange={ev => this.setState({ hasTranslations: ev.target.checked })}
            checked={hasTranslations}
            id="defineTranslations"
          />
          Määrittele aineiston käännössuunnat
        </div>
        {hasTranslations && (
          <div className={styles.subfield}>
            <p className={formStyles.description}>
              Lisää alle tietoa siitä, mitä käännössuuntia aineistossa esiintyy.
            </p>
            {connections.map((c, idx) => (
              <Connection
                key={uid(c)}
                connections={connections}
                languages={languages}
                onChange={() => null}
                languageNames={languageNames}
                connection={c}
                dispatch={dispatch}
                idx={idx}
              />
            ))}
            <div className={generalStyles.someTopMargin}>
              <Add
                text="Lisää käännössuunta"
                id="add_lang_con"
                onClick={() => dispatch(updateField('connections', [...connections, {}]))}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

index.propTypes = {
  dispatch: PropTypes.func.isRequired,
  languages: PropTypes.arrayOf(PropTypes.shape({ code: PropTypes.string })).isRequired,
  connections: PropTypes.arrayOf(
    PropTypes.shape({ sl: PropTypes.number, tl: PropTypes.arrayOf(PropTypes.number) })
  ),
  languageNames: PropTypes.objectOf(PropTypes.any)
};

index.defaultProps = {
  connections: [],
  languageNames: {}
};

export default index;
