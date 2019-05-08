/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { updateField, submitDataset } from '../../../redux/actions/datasetform';
import styles from './datasetform.scss';
import LanguageSelect from './languageselect';
import AutoCompleteField from './autocompletefield';
import GeneralInfo from './generalinfo';

export default class InsertForm extends Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
      fields: PropTypes.objectOf(PropTypes.any).isRequired,
      loadingState: PropTypes.objectOf(PropTypes.any).isRequired
    };
  }

  handleChange = name => event => {
    const { dispatch } = this.props;
    if (event.target) {
      dispatch(updateField(name, event.target.value));
    } else if (event.value) {
      dispatch(updateField(name, event.value));
    } else if (Array.isArray(event)) {
      dispatch(updateField(name, event.map(item => item.value)));
    }
  };

  submit(event) {
    const { dispatch, fields } = this.props;
    event.preventDefault();
    dispatch(submitDataset(fields));
  }

  render() {
    // PROPS: usertype
    const { loadingState, dispatch, fields } = this.props;

    if (loadingState.SUBMITDATASET) {
      if (loadingState.SUBMITDATASET === 'success') {
        return <div id="savedmsg">Tallennettu</div>;
      }
    }

    return (
      <form onSubmit={event => this.submit(event)}>
        <GeneralInfo handleChange={this.handleChange.bind(this)} />
        <fieldset>
          <legend>Kielet</legend>
          <section>
            <p className={styles.description}>
              Monet ominaisuudet määritellään kieli- tai varianttikohtaisesti. Jos kieliä on vain
              yksi, sellaiset ominaisuudet kuin korpuksen koko ja aikajänne määritellään tämän
              kielen ominaisuuksiksi.
            </p>
            {fields.languages.map((lang, idx) => (
              <LanguageSelect
                languages={fields.languages}
                dispatch={dispatch}
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
              onClick={() =>
                dispatch(updateField('languages', [...fields.languages, { annotations: [] }]))
              }
            >
              Lisää uusi
            </button>
          </section>
        </fieldset>

        <div>
          <button type="submit" id="datasetsubmit">
            Tallenna
          </button>
        </div>
      </form>
    );
  }
}
