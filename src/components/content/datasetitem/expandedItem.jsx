import { uid } from 'react-uid';
import PropTypes from 'prop-types';
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import LanguageDetails from './languageDetails';
import styles from './datasetitem.scss';
import 'react-tabs/style/react-tabs.css';

const expandedItem = props => {
  const { languages, description, resourcetype, keywords } = props;

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
};

expandedItem.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.object),
  resourcetype: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string
};

expandedItem.defaultProps = {
  languages: [],
  keywords: [],
  resourcetype: '',
  description: ''
};

export default expandedItem;
