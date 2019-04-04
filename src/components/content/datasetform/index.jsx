/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { updateField, submitDataset } from '../../../redux/actions/datasetform';
import styles from './datasetform.scss';
import LanguageSelect from './languageselect';

export default class InsertForm extends Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
      fields: PropTypes.objectOf(PropTypes.any).isRequired,
      loadingState: PropTypes.objectOf(PropTypes.any).isRequired,
    };
  }

  handleChange = name => (event) => {
    const { dispatch } = this.props;
    dispatch(updateField(name, event.target.value));
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
        <fieldset>
          <legend>Yleistiedot</legend>

          <div className={styles.fieldContainer}>
            <label htmlFor="datasettitle">Nimi</label>
            <input
              type="text"
              defaultValue=""
              id="datasettitle"
              onChange={this.handleChange('title')}
            />
          </div>
          <div className={styles.fieldContainer}>
            <label htmlFor="datasetdescription">Kuvaus</label>
            <textarea
              defaultValue=""
              id="datasetdescription"
              onChange={this.handleChange('description')}
            />
          </div>

          <div className={styles.fieldContainer}>
            <label htmlFor="resourcetype">Aineiston tyyppi</label>
            <input
              type="text"
              defaultValue=""
              id="resourcetype"
              onChange={this.handleChange('title')}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Kielet</legend>
          <section>
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
              onClick={() => dispatch(updateField('languages', [...fields.languages, {}]))}
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
