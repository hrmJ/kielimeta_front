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
import Stepper from '../../ui/stepper';
import styles from '../../../general_styles/general_styles.scss';

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
  state = { invalidFields: [] };

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

  checkErrors() {
    const { fields } = this.props;
    const { title, contact_person } = fields;
    const invalidFields = [];
    if (!title) {
      invalidFields.push({ step: 0, error: 'Aineistolla pitää olla nimi', link: '#datasettitle' });
    }
    if (!contact_person) {
      invalidFields.push({
        step: 3,
        error: 'Ilmoita ainakin yksi yhteyshenkilö',
        link: '#datasettitle'
      });
    }
    return invalidFields;
  }

  submit(event) {
    const { dispatch, fields } = this.props;
    const { invalidFields } = this.state;
    event.preventDefault();
    if (invalidFields.length === 0) {
      dispatch(submitDataset(fields));
    }
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
      authors = [],
      contact_person,
      place_of_publication,
      access_type,
      title,
      project,
      license,
      license_info,
      sensitivity,
      owner,
      data_location,
      access_information,
      genre,
      description,
      keywords,
      media_description,
      data_location_status
    } = fields;
    const { annotationLevels, resourceTypes, textGenres } = preloadedSelects;
    const { invalidFields } = this.state;

    if (loadingState.SUBMITDATASET) {
      if (loadingState.SUBMITDATASET == 'success') {
        return (
          <div id="savedmsg" className={styles.someTopMargin}>
            <p>Tiedot tallennettu.</p>
            <p>
              <button type="button" onClick={() => window.location.reload()}>
                Lisää uusi
              </button>
            </p>
          </div>
        );
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
            description={description}
            title={title}
            textGenres={textGenres}
            genre={genre}
            keywords={keywords}
            media_description={media_description}
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
        isValid: validateLanguageStep(languages),
        doesNotPreventSave: true
      },
      {
        legend: 'Tekijät',
        component: <Authors dispatch={dispatch} authors={authors} />,
        isValid: authors.length > 0 && authors[0].id,
        doesNotPreventSave: true
      },
      {
        legend: 'Saatavuus',
        component: (
          <Access
            dispatch={dispatch}
            authors={authors}
            contactPersons={contact_person}
            placeOfPublication={place_of_publication}
            access_information={access_information}
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
            project={project}
            owner={owner}
            license={license}
            license_info={license_info}
            sensitivity={sensitivity}
            data_location={data_location}
            dataLocationStatus={data_location_status}
          />
        ),
        isValid: data_location && owner,
        doesNotPreventSave: true
      }
    ];

    return (
      <form onSubmit={event => this.submit(event)}>
        <Stepper steps={steps} errors={this.checkErrors()} />
      </form>
    );
  }
}
