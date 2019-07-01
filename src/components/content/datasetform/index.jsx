import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { fetchDatasetForEdit } from '../../../redux/actions/datasets';
import { prepopulateFormSelects } from '../../../redux/actions/formSelectPrepopulation';
import {
  resetSubmitStatus,
  setEditedId,
  submitDataset,
  updateField
} from '../../../redux/actions/datasetform';
import Access from './fieldsets/access';
import Administration from './fieldsets/administration';
import Authors from './fieldsets/authors';
import GeneralInfo from './fieldsets/generalinfo/index';
import Languages from './fieldsets/languages';
import Splash from '../../layout/splash';
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

class InsertForm extends Component {
  state = { invalidFields: [] };

  id = null;

  componentDidMount() {
    const {
      dispatch,
      routeProps,
      fields: { main_version_id: mainVersion }
    } = this.props;
    dispatch(prepopulateFormSelects());
    if (routeProps.match) {
      const {
        match: {
          params: { id }
        }
      } = routeProps;
      if (id) {
        dispatch(fetchDatasetForEdit(id, mainVersion));
        if (!mainVersion) {
          // Only set the id if not creating a subversion
          this.id = id;
        }
      }
    }
  }

  componentDidUpdate() {
    const {
      loadingState,
      dispatch,
      fields: { title }
    } = this.props;
    if (loadingState.SUBMITDATASET) {
      if (loadingState.SUBMITDATASET === 'success' && this.id) {
        dispatch(resetSubmitStatus());
        dispatch(setEditedId(this.id));
        this.props.history.push(`/${title}`);
      }
    }
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
    const { title, contact_person: contactPerson, resourcetype = '', authors = [] } = fields;
    const invalidFields = [];
    if (authors.length === 0) {
      invalidFields.push({
        step: 2,
        msg: 'Aineistolle ei ole merkitty tekijöitä',
        level: 'warning'
      });
    }
    if (!resourcetype) {
      invalidFields.push({ step: 0, msg: 'Valitse aineiston tyyppi', level: 'error' });
    }
    if (!contactPerson || contactPerson.length === 0) {
      invalidFields.push({
        step: 3,
        msg: 'Ilmoita ainakin yksi yhteyshenkilö',
        level: 'error'
      });
    }
    if (!title) {
      invalidFields.push({ step: 0, msg: 'Aineistolla pitää olla nimi', level: 'error' });
    }
    return invalidFields;
  }

  submit(event) {
    const { dispatch, fields } = this.props;
    const { invalidFields } = this.state;
    event.preventDefault();
    if (invalidFields.length === 0) {
      dispatch(submitDataset(fields, this.id));
    }
  }

  render() {
    // PROPS: usertype
    const {
      loadingState,
      dispatch,
      fields,
      languageVarieties,
      languageNames,
      languageVarietyTypes,
      preloadedSelects,
      showSplash
    } = this.props;
    const {
      mediatype,
      languages,
      resourcetype,
      authors = [],
      contact_person: contactPerson,
      place_of_publication: placeOfPublication,
      access_type: accessType,
      title,
      project,
      license,
      license_info: licenseInfo,
      sensitivity,
      owner,
      data_location: dataLocation,
      access_information: accessInformation,
      genre,
      description,
      keywords,
      media_description: mediaDescription,
      data_location_status: dataLocationStatus,
      connections
    } = fields;
    const { annotationLevels, resourceTypes, textGenres } = preloadedSelects;

    if (showSplash) {
      return <Splash />;
    }

    if (loadingState.SUBMITDATASET === 'success' && !this.id) {
      return (
        <div id="savedmsg" className={styles.someTopMargin}>
          <p>Tiedot tallennettu.</p>
          <p>
            <button type="button" onClick={() => window.location.reload()} id="addnewdataset">
              Lisää uusi
            </button>
          </p>
        </div>
      );
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
            mediaDescription={mediaDescription}
          />
        ),
        isValid: title !== '' && (resourcetype !== '' && resourcetype !== undefined)
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
            connections={connections}
          />
        ),
        isValid: validateLanguageStep(languages),
        doesNotPreventSave: true
      },
      {
        legend: 'Tekijät',
        component: <Authors dispatch={dispatch} authors={authors} />,
        isValid: authors.length > 0 && authors[0].id !== '',
        doesNotPreventSave: true
      },
      {
        legend: 'Saatavuus',
        component: (
          <Access
            dispatch={dispatch}
            authors={authors}
            contactPersons={contactPerson}
            placeOfPublication={placeOfPublication}
            accessInformation={accessInformation}
          />
        ),
        isValid: contactPerson !== undefined
      },
      {
        legend: 'Hallinta',
        component: (
          <Administration
            dispatch={dispatch}
            placeOfPublication={placeOfPublication}
            accessType={accessType}
            project={project}
            owner={owner}
            license={license}
            licenseInfo={licenseInfo}
            sensitivity={sensitivity}
            dataLocation={dataLocation}
            dataLocationStatus={dataLocationStatus}
          />
        ),
        isValid:
          dataLocation !== '' &&
          dataLocation !== undefined &&
          (owner !== '' && owner !== undefined),
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

InsertForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fields: PropTypes.objectOf(PropTypes.any).isRequired,
  loadingState: PropTypes.objectOf(PropTypes.any).isRequired,
  languageVarieties: PropTypes.objectOf(PropTypes.any),
  languageVarietyTypes: PropTypes.arrayOf(PropTypes.string),
  languageNames: PropTypes.objectOf(PropTypes.any),
  preloadedSelects: PropTypes.objectOf(PropTypes.any),
  routeProps: PropTypes.objectOf(PropTypes.any),
  showSplash: PropTypes.bool
};

InsertForm.defaultProps = {
  languageVarieties: {},
  languageVarietyTypes: [],
  languageNames: {},
  preloadedSelects: {},
  routeProps: {},
  showSplash: false
};

export default withRouter(InsertForm);
