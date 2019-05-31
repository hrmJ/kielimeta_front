/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { prepopulateFormSelects } from '../../../redux/actions/formSelectPrepopulation';
import { updateField, submitDataset } from '../../../redux/actions/datasetform';
import Access from './fieldsets/access';
import Administration from './fieldsets/administration';
import Authors from './fieldsets/authors';
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

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(prepopulateFormSelects());
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

  render() {
    // PROPS: usertype
    const {
      loadingState,
      dispatch,
      fields,
      originalFormValues,
      languageVarieties,
      languageNames,
      languageVarietyTypes,
      preloadedSelects,
    } = this.props;
    const {
      mediatype,
      languages,
      resourcetype,
      authors,
      contact_person,
      place_of_publication,
      access_type,
    } = fields;
    const { annotationLevels, resourceTypes } = preloadedSelects;

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
          resourceTypes={resourceTypes}
          resourcetype={resourcetype}
        />
        <Languages
          languages={languages}
          dispatch={dispatch}
          mediaTypes={mediatype}
          languageVarieties={languageVarieties}
          languageVarietyTypes={languageVarietyTypes}
          languageNames={languageNames}
          annotationLevels={annotationLevels}
        />
        <Authors dispatch={dispatch} authors={authors} />
        <Access
          dispatch={dispatch}
          authors={authors}
          contactPersons={contact_person}
          placeOfPublication={place_of_publication}
        />
        <Administration
          dispatch={dispatch}
          placeOfPublication={place_of_publication}
          accessType={access_type}
        />
        <div>
          <button type="submit" id="datasetsubmit">
            Tallenna
          </button>
        </div>
      </form>
    );
  }
}
