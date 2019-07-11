import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { uid } from 'react-uid';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loader from '../../ui/loader';
import 'react-tabs/style/react-tabs.css';

import { Select } from '../../ui/localizedSelect';
import { fetchSubVersions, setActiveVersion } from '../../../redux/actions/datasets';
import Access from './access';
import Authors from './authors';
import Citing from './citing';
import Content from './content';
import styles from './datasetitem.scss';

class expandedItem extends Component {
  componentDidMount() {
    const { subversion, dispatch, id } = this.props;
    dispatch(fetchSubVersions(id, subversion));
  }

  /**
   * getVersionLabel
   *
   * Prints a label for each subversion: if the title is the same as in the
   * main version, returns just "Version [NO]"
   *
   * @param versionTitle
   * @param idx
   * @returns {undefined}
   */
  getVersionLabel(versionTitle, idx) {
    const { title } = this.props;
    if (title === versionTitle && idx > 0) {
      return `Versio ${idx + 1}`;
    }
    if (idx === 0) {
      return `${versionTitle} (Pääversio)`;
    }
    return versionTitle;
  }

  render() {
    const {
      languages,
      description,
      resourcetype,
      keywords,
      subversion,
      datasetVersions,
      id,
      dispatch,
      authors,
      access_information: accessInformation,
      place_of_publication: placeOfPublication,
      license,
      contact_person: contactPerson,
      sensitivity,
      genre
    } = this.props;
    const {
      activated: { [id]: activeId },

      all: { [id]: fetchedVersions }
    } = datasetVersions;
    const versionOptions =
      fetchedVersions &&
      Object.keys(fetchedVersions).map((key, idx) => ({
        label: this.getVersionLabel(fetchedVersions[key].title, idx),
        value: key
      }));

    return !fetchedVersions ? (
      <Loader center />
    ) : (
      <div>
        <ul className={styles.kwList}>
          {keywords.map(keyword => (
            <li key={uid(keyword)}>{keyword}</li>
          ))}
        </ul>
        <p>
          <em>{resourcetype}</em>
        </p>
        {subversion.length > 0 && (
          <div className={styles.versionPickerContainer}>
            <Select
              placeholder="Valitse näytettävä versio"
              isSearchable={false}
              options={versionOptions}
              value={fetchedVersions && versionOptions.find(option => option.value === activeId)}
              onChange={selected => dispatch(setActiveVersion(id, selected.value))}
            />
          </div>
        )}
        <Tabs>
          <TabList>
            <Tab>Kuvaus</Tab>
            <Tab>Sisältö</Tab>
            <Tab>Tekijät</Tab>
            <Tab>Saatavuus</Tab>
            <Tab>Viittaaminen</Tab>
          </TabList>
          <TabPanel>
            <p className={styles.description}>
              <em>{description}</em>
            </p>
          </TabPanel>
          <TabPanel>
            <Content {...{ languages, genre }} />
          </TabPanel>
          <TabPanel>
            <Authors authors={authors} />
          </TabPanel>
          <TabPanel>
            <Access
              {...{ placeOfPublication, license, accessInformation, contactPerson, sensitivity }}
            />
          </TabPanel>
          <TabPanel>
            <Citing placeOfPublication={placeOfPublication} />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

expandedItem.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.object),
  resourcetype: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string,
  subversion: PropTypes.arrayOf(PropTypes.number),
  dispatch: PropTypes.func.isRequired,
  datasetVersions: PropTypes.shape({ activated: PropTypes.object, all: PropTypes.object }),
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.string]),
  place_of_publication: PropTypes.shape({
    location: PropTypes.string,
    identifier: PropTypes.string
  }),
  license: PropTypes.string,
  access_information: PropTypes.string,
  contact_person: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, email: PropTypes.string })
  ),
  sensitivity: PropTypes.string,
  genre: PropTypes.arrayOf(PropTypes.string)
};

expandedItem.defaultProps = {
  languages: [],
  keywords: [],
  resourcetype: '',
  description: '',
  subversion: [],
  datasetVersions: { activated: {}, all: {} },
  authors: '',
  place_of_publication: {},
  license: '',
  access_information: '',
  contact_person: [],
  sensitivity: '',
  genre: []
};

export default expandedItem;
