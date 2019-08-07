import PropTypes from 'prop-types';
import React from 'react';

import ArrayFilter from '../filter/arrayFilter';
import ScaleFilter from '../filter/scaleFilter';
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
        <ArrayFilter
          {...commonProps}
          keyName="keyword"
          items={keyword}
          allowMulti
          label="Avainsanat"
        />
        <ArrayFilter
          {...commonProps}
          keyName="lang"
          items={lang}
          allowMulti
          hasSubMenu
          languageVarieties={languageVarieties}
          label="Kielet"
        />
        <ArrayFilter
          {...commonProps}
          keyName="resourcetype"
          items={resourcetype}
          label="Aineistotyypit"
        />
        <ArrayFilter
          {...commonProps}
          keyName="modality"
          items={modality}
          allowMulti
          label="Kielimuoto"
        />
        <ArrayFilter
          {...commonProps}
          keyName="variety_type"
          items={varietyType}
          allowMulti
          label="Kielivariantin tyyppi"
        />
        <ArrayFilter
          {...commonProps}
          keyName="speaker_status"
          items={speakerStatus}
          allowMulti
          label="Äidinkielisyys"
        />
        <ArrayFilter
          {...commonProps}
          keyName="connections"
          items={[
            { label: 'vain käännöksiä sisältävät', value: 'true' },
            { label: 'vain muut aineistot', value: 'false' }
          ]}
          isBoolean
          label="Käännösaineistot"
        />
        <ArrayFilter
          {...commonProps}
          keyName="mediatype"
          items={mediatype}
          allowMulti
          label="Media"
        />
        <ArrayFilter
          {...commonProps}
          keyName="annotations"
          items={annotations}
          allowMulti
          label="Annotoinnit"
        />
        <ArrayFilter
          {...commonProps}
          keyName="genre"
          items={genre}
          allowMulti
          label="Tekstien genre"
        />
        <ScaleFilter {...commonProps} />
        <ArrayFilter
          {...commonProps}
          keyName="accessibility"
          items={[
            { label: 'vapaasti internetin kautta', value: 'internet' },
            { label: 'ottamalla yhteyttä', value: 'contact' },
            { label: 'muu', value: 'other' }
          ]}
          isBoolean
          label="Saatavuus"
        />
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
