import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import React, { Component, lazy, Suspense } from 'react';

import {
  fetchDataset,
  fetchDatasetForEdit,
  fetchSubVersions
} from '../../../redux/actions/datasets';
import { prepopulateFormSelects } from '../../../redux/actions/formSelectPrepopulation';
import {
  resetFormData,
  resetSubmitStatus,
  setEditedId,
  submitDataset,
  updateField
} from '../../../redux/actions/datasetform';
import Access from './fieldsets/access';
import Administration from './fieldsets/administration';
import Authors from './fieldsets/authors';
import GeneralInfo from './fieldsets/generalinfo/index';
import Loader from '../../ui/loader';
import Splash from '../../layout/splash';
import Stepper from '../../ui/stepper';
import styles from './datasetform.scss';

const Languages = lazy(() =>
  import(/* webpackChunkName: "formLanguages" */ './fieldsets/languages')
);

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

  mainVersion = null;

  isCopy = false;

  componentDidMount() {
    const {
      dispatch,
      routeProps,
      fields: { main_version_id: mainVersion },
      datasets
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
          // Only set the id if not creating a subversion....
          this.id = id;
        } else {
          this.mainVersion = mainVersion;
          this.mainVersionTitle = datasets.find(ds => ds.id === mainVersion).title;
          if (mainVersion !== id) {
            // ...although if editing a subversion, the id must be set
            this.id = id;
          }
        }
      } else {
        dispatch(resetFormData());
      }
    } else {
      dispatch(resetFormData());
    }
  }

  componentDidUpdate() {
    const {
      loadingState,
      dispatch,
      fields: { title },
      history
    } = this.props;
    if (loadingState.SUBMITDATASET === 'success') {
      dispatch(resetSubmitStatus());
      if (this.id || this.mainVersion) {
        dispatch(setEditedId(this.id || this.mainVersion));
      }
      if (this.mainVersion) {
        fetchDataset(this.mainVersion).then(updatedData => {
          return dispatch(
            fetchSubVersions(
              this.mainVersion,
              [this.mainVersion, ...updatedData.subversion],
              this.id
            )
          );
        });
      }
      history.push(`/${this.mainVersion ? this.mainVersionTitle : title}`);
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
      connections,
      isCopy
    } = fields;
    const { annotationLevels, resourceTypes, textGenres } = preloadedSelects;

    if (showSplash) {
      return <Splash />;
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
          <Suspense fallback={<Loader center />}>
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
          </Suspense>
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
        {this.mainVersion && this.id * 1 === this.mainVersion * 1 && (
          <div className={styles.autonomousDescription}>
            Olet lisäämässä uutta aliversiota. Muokkaa tiedot, jotka ovat alkuperäiseen versioon
            nähden erilaisia, ja tallenna osion 5 lopussa olevalla painikkeella.
          </div>
        )}
        {this.mainVersion && this.id && this.id * 1 !== this.mainVersion * 1 && (
          <div className={styles.autonomousDescription}>
            Huom! Olet muokkaamassa varsinaisen aineiston aliversiota.
          </div>
        )}
        {isCopy && (
          <div className={styles.autonomousDescription}>
            Olet lisäämässä uutta itsenäistä aineistoa, jonka pohjaksi on kopioitu tiedot toisesta
            aineistosta.
          </div>
        )}
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
  showSplash: PropTypes.bool,
  datasets: PropTypes.arrayOf(PropTypes.object),
  history: PropTypes.objectOf(PropTypes.any)
};

InsertForm.defaultProps = {
  languageVarieties: {},
  languageVarietyTypes: [],
  languageNames: {},
  preloadedSelects: {},
  routeProps: {},
  showSplash: false,
  datasets: [],
  history: {}
};

export default withRouter(InsertForm);
