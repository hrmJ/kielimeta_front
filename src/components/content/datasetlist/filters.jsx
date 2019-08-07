import PropTypes from 'prop-types';
import React from 'react';

import ArrayFilter from '../filter/arrayFilter';
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
        <ArrayFilter {...commonProps} keyName="keyword" items={keyword} allowMulti>
          Avainsanat
        </ArrayFilter>
        <ArrayFilter
          {...commonProps}
          keyName="lang"
          items={lang}
          allowMulti
          hasSubMenu
          languageVarieties={languageVarieties}
        >
          Kielet
        </ArrayFilter>
        <ArrayFilter {...commonProps} keyName="resourcetype" items={resourcetype}>
          Aineistotyypit
        </ArrayFilter>
        <ArrayFilter {...commonProps} keyName="modality" items={modality} allowMulti>
          Kielimuoto
        </ArrayFilter>
        <ArrayFilter {...commonProps} keyName="variety_type" items={varietyType} allowMulti>
          Kielivariantin tyyppi
        </ArrayFilter>
        <ArrayFilter {...commonProps} keyName="speaker_status" items={speakerStatus} allowMulti>
          Äidinkielisyys
        </ArrayFilter>
        <ArrayFilter
          {...commonProps}
          keyName="connections"
          items={[
            { label: 'vain käännöksiä sisältävät', value: 'true' },
            { label: 'vain muut aineistot', value: 'false' }
          ]}
          isBoolean
        >
          Käännösaineistot
        </ArrayFilter>
        <ArrayFilter {...commonProps} keyName="mediatype" items={mediatype} allowMulti>
          Media
        </ArrayFilter>
        <ArrayFilter {...commonProps} keyName="annotations" items={annotations} allowMulti>
          Annotoinnit
        </ArrayFilter>
        <ArrayFilter {...commonProps} keyName="genre" items={genre} allowMulti>
          Tekstien genre
        </ArrayFilter>
        <ArrayFilter
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
        </ArrayFilter>
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
