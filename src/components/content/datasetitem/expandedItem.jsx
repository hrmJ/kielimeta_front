import { uid } from 'react-uid';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Select } from '../../ui/localizedSelect';

import LanguageDetails from './languageDetails';
import styles from './datasetitem.scss';
import 'react-tabs/style/react-tabs.css';

class expandedItem extends Component {
  componentDidMount() {
    const { subversion, dispatch } = this.props;
    if (subversion.length > 0) {
      dispatch(() => null);
    }
  }

  render() {
    const { languages, description, resourcetype, keywords, subversion } = this.props;

    return (
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
            <Select placeholder="Valitse versio" isSearchable={false} />
          </div>
        )}
        <Tabs>
          <TabList>
            <Tab>Kuvaus</Tab>
            <Tab>Kielikohtaiset tiedot</Tab>
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
            {languages.map(language => (
              <LanguageDetails key={uid(language)} {...language} />
            ))}
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
  dispatch: PropTypes.func.isRequired
};

expandedItem.defaultProps = {
  languages: [],
  keywords: [],
  resourcetype: '',
  description: '',
  subversion: []
};

export default expandedItem;
