/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  updateField,
  submitDataset,
  fetchOriginalFieldValues,
} from '../../../redux/actions/datasetform';
import styles from './datasetform.scss';
import GeneralInfo from './fieldsets/generalinfo/index';
import Languages from './fieldsets/languages';

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

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchOriginalFieldValues('resourcetypes'));
  }

  render() {
    // PROPS: usertype
    const {
      loadingState, dispatch, fields, originalFormValues, languageVarieties, languageNames
    } = this.props;
    const { mediatype, languages, resourcetype } = fields;

    if (loadingState.SUBMITDATASET) {
      if (loadingState.SUBMITDATASET === 'success') {
        return <div id="savedmsg">Tallennettu</div>;
      }
    }

    return (
      <form onSubmit={event => this.submit(event)}>
        <GeneralInfo
          mediaTypes={mediatype}
          dispatch={dispatch}
          handleChange={this.handleChange.bind(this)}
          originalFormValues={originalFormValues}
          resourcetype={resourcetype}
        />
        <Languages
          languages={languages}
          dispatch={dispatch}
          mediaTypes={mediatype}
          languageVarieties={languageVarieties}
          languageNames={languageNames}
        />
        <fieldset>
          <legend>Ylläpito ja saatavuus</legend>
          <div className={styles.upperContainer}>
            <h4>Projektin yhteyshenkilöt</h4>
            <div className={styles.fieldContainer}>
              <label>nimi</label>
            </div>
            <div className={styles.fieldContainer}>
              <label>sähköposti</label>
            </div>
            <div className={styles.fieldContainer}>
              <label>rooli</label>
            </div>
          </div>
          <div className={styles.fieldContainer}>
            <label>URL-osoite</label>
          </div>
          <div className={styles.fieldContainer}>
            <label>Muu saatavuustieto</label>
          </div>
          <div className={styles.fieldContainer}>
            <label>Käyttöoikeus</label>
          </div>
          <div className={styles.fieldContainer}>
            <label>Viittausohje</label>
          </div>
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
