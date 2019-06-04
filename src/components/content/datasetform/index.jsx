import Stepper from '../../ui/stepper';

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
import Step from '../../ui/step';

/**
 * validateLanguageStep
 *
 * Checks wether or not there is valid data in the languages step
 *
 * @param languages
 * @returns {boolean}
 */
const validateLanguageStep = languages => {
  try {
    if (languages[0].details.language_code) {
      return true;
    }
  } catch (err) {
    return false;
  }
  return false;
};

export default class InsertForm extends Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
      fields: PropTypes.objectOf(PropTypes.any).isRequired,
      loadingState: PropTypes.objectOf(PropTypes.any).isRequired
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(prepopulateFormSelects());
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
    const {
      loadingState,
      dispatch,
      fields,
      originalFormValues,
      languageVarieties,
      languageNames,
      languageVarietyTypes,
      preloadedSelects
    } = this.props;
    const {
      mediatype,
      languages,
      resourcetype,
      authors,
      contact_person,
      place_of_publication,
      access_type,
      title
    } = fields;
    const { annotationLevels, resourceTypes } = preloadedSelects;

    if (loadingState.SUBMITDATASET) {
      if (loadingState.SUBMITDATASET == 'success') {
        return <div id="savedmsg">Tallennettu</div>;
      }
    }

    const steps = [
      {
        legend: 'Yleistiedot',
        component: (
          <GeneralInfo
            mediaTypes={mediatype}
            dispatch={dispatch}
            handleChange={this.handleChange.bind(this)}
            resourceTypes={resourceTypes}
            resourcetype={resourcetype}
            title={title}
          />
        ),
        isValid: title !== '' && resourcetype
      },
      {
        legend: 'Kielet',
        component: (
          <Languages
            languages={languages}
            dispatch={dispatch}
            mediaTypes={mediatype}
            languageVarieties={languageVarieties}
            languageVarietyTypes={languageVarietyTypes}
            languageNames={languageNames}
            annotationLevels={annotationLevels}
          />
        ),
        isValid: validateLanguageStep(languages)
      },
      {
        legend: 'Tekijät',
        component: <Authors dispatch={dispatch} authors={authors} />,
        isValid: false
      },
      {
        legend: 'Saatavuus',
        component: (
          <Access
            dispatch={dispatch}
            authors={authors}
            contactPersons={contact_person}
            placeOfPublication={place_of_publication}
          />
        ),
        isValid: contact_person !== undefined
      },
      {
        legend: 'Hallinta',
        component: (
          <Administration
            dispatch={dispatch}
            placeOfPublication={place_of_publication}
            accessType={access_type}
          />
        ),
        isValid: false
      }
    ];

    return (
      <form onSubmit={event => this.submit(event)}>
        <Stepper steps={steps} />
        <div>
          <button type="submit" id="datasetsubmit">
            Tallenna
          </button>
        </div>
      </form>
    );
  }
}
