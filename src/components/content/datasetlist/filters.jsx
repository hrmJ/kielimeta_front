import PropTypes from 'prop-types';
import React from 'react';

import Filter from '../filter';
import styles from './datasetlist.scss';

const filtersComponent = props => {
  const {
    filters,
    originalFilterValues: {
      lang,
      resourcetype,
      annotations,
      modality,
      mediatype,
      variety_type: varietyType,
      speakerStatus,
      keyword,
      genre
    },
    dispatch,
    languageVarieties
  } = props;

  const commonProps = {
    filters,
    dispatch
  };
  return (
    <div>
      <section className={styles.filterContainer}>
        <Filter {...commonProps} keyName="keyword" items={keyword} allowMulti>
          Avainsanat
        </Filter>
        <Filter
          {...commonProps}
          keyName="lang"
          items={lang}
          allowMulti
          hasSubMenu
          languageVarieties={languageVarieties}
        >
          Kielet
        </Filter>
        <Filter {...commonProps} keyName="resourcetype" items={resourcetype}>
          Aineistotyypit
        </Filter>
        <Filter {...commonProps} keyName="modality" items={modality} allowMulti>
          Kielimuoto
        </Filter>
        <Filter {...commonProps} keyName="variety_type" items={varietyType} allowMulti>
          Kielivariantin tyyppi
        </Filter>
        <Filter {...commonProps} keyName="speaker_status" items={speakerStatus} allowMulti>
          Äidinkielisyys
        </Filter>
        <Filter
          {...commonProps}
          keyName="connections"
          items={[
            { label: 'vain käännöksiä sisältävät', value: 'true' },
            { label: 'vain muut aineistot', value: 'false' }
          ]}
          isBoolean
        >
          Käännösaineistot
        </Filter>
        <Filter {...commonProps} keyName="mediatype" items={mediatype} allowMulti>
          Media
        </Filter>
        <Filter {...commonProps} keyName="annotations" items={annotations} allowMulti>
          Annotoinnit
        </Filter>
        <Filter {...commonProps} keyName="genre" items={genre} allowMulti>
          Tekstien genre
        </Filter>
        <Filter
          {...commonProps}
          keyName="accessibility"
          items={[
            { label: 'vapaasti internetin kautta', value: 'internet' },
            { label: 'ottamalla yhteyttä', value: 'contact' },
            { label: 'muu', value: 'other' }
          ]}
          isBoolean
        >
          Saatavuus
        </Filter>
      </section>
    </div>
  );
};

filtersComponent.propTypes = {
  filters: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array])
  ),
  originalFilterValues: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array])
  ),
  dispatch: PropTypes.func.isRequired,
  languageVarieties: PropTypes.objectOf(PropTypes.any)
};

filtersComponent.defaultProps = {
  originalFilterValues: {},
  filters: {},
  languageVarieties: {}
};

export default filtersComponent;
