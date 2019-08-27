import 'react-tabs/style/react-tabs.css';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { uid } from 'react-uid';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

import { Select } from '../../ui/localizedSelect';
import { fetchSubVersions, setActiveVersion } from '../../../redux/actions/datasets';
import { updateAndFilter } from '../../../redux/actions/filters';
import Access from './access';
import Authors from './authors';
import BasicButton from '../../ui/buttons/BasicButton';
import Citing from './citing';
import Content from './content';
import DocumentLink from '../../ui/documentLink';
import Loader from '../../ui/loader';
import generalStyles from '../../../general_styles/general_styles.scss';
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
      genre,
      mediatype,
      media_description: mediaDescription,
      connections,
      related_datasets: relatedDatasets,
      documents,
      groups,
      setGroupView,
      userDetails,
      data_location: dataLocation
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
        <Tabs defaultIndex={0}>
          <TabList>
            <Tab>Kuvaus</Tab>
            <Tab>Sisältö</Tab>
            <Tab>Tekijät</Tab>
            <Tab>Saatavuus</Tab>
            <Tab>Viittaaminen</Tab>
          </TabList>
          <TabPanel>
            <div className={styles.description}>
              <ReactMarkdown source={description} />
              {groups.length > 0 && (
                <div className={generalStyles.someTopMargin}>
                  <div>
                    <ul className={generalStyles.responsiveList}>
                      {groups.map(group => (
                        <li key={group}>
                          <BasicButton
                            text={group}
                            onClick={() => {
                              setGroupView();
                              dispatch(updateAndFilter('group', group, true, {}));
                            }}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <ul className={styles.documentList}>
              {documents.map(doc => (
                <li key={doc.url}>
                  <DocumentLink
                    url={`media/${doc.url}`}
                    description={doc.description || 'Lisätietoja aineistosta'}
                  />
                </li>
              ))}
            </ul>
          </TabPanel>
          <TabPanel>
            <Content {...{ languages, connections, genre, mediatype, mediaDescription }} />
          </TabPanel>
          <TabPanel>
            <Authors authors={authors} />
          </TabPanel>
          <TabPanel>
            <Access
              {...{
                placeOfPublication,
                license,
                accessInformation,
                contactPerson,
                sensitivity,
                dataLocation,
                userDetails
              }}
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
  related_datasets: PropTypes.arrayOf(PropTypes.string),
  contact_person: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, email: PropTypes.string })
  ),
  sensitivity: PropTypes.string,
  genre: PropTypes.arrayOf(PropTypes.string),
  mediatype: PropTypes.arrayOf(PropTypes.string),
  media_description: PropTypes.string,
  connections: PropTypes.arrayOf(
    PropTypes.shape({ sl: PropTypes.number, tl: PropTypes.arrayOf(PropTypes.number) })
  ),
  documents: PropTypes.arrayOf(PropTypes.object).isRequired,
  setGroupView: PropTypes.func.isRequired,
  groups: PropTypes.arrayOf(PropTypes.string),
  userDetails: PropTypes.shape({
    username: PropTypes.string,
    datasets: PropTypes.arrayOf(PropTypes.any),
    is_staff: PropTypes.bool,
    groups: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};

expandedItem.defaultProps = {
  languages: [],
  connections: [],
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
  genre: [],
  mediatype: [],
  media_description: '',
  related_datasets: [],
  groups: []
};

export default expandedItem;
