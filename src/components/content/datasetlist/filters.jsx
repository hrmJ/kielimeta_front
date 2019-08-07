import PropTypes from 'prop-types';
import React from 'react';

import ArrayFilter from '../filter/arrayFilter';
import ScaleFilter from '../filter/scaleFilter';
import styles from './datasetlist.scss';

const formatSizeLabel = value => {
  switch (value) {
    case 'tokens':
      return 'Saneita';
    case 'words':
      return 'Sanoja';
    case 'sentences':
      return 'virkkeitä';
    case 'texts':
      return 'Tekstejä';
    case 'audiohours':
      return 'Tunteja ääntä';
    case 'videohours':
      return 'Tunteja videota';
    default:
      return value;
  }
};

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
      genre,
      years
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
        {years && Array.isArray(years) && years.length > 1 && (
          <ScaleFilter
            {...commonProps}
            items={[{ min: years[0], max: years[1], key: 'years' }]}
            label="Aineiston ajankohta"
          />
        )}
        <ScaleFilter
          {...commonProps}
          items={['tokens', 'words', 'sentences', 'texts', 'audiohours', 'videohours'].map(cat => ({
            min: 0,
            max: cat in props.originalFilterValues ? props.originalFilterValues[cat][1] : 0,
            label: formatSizeLabel(cat),
            key: cat
          }))}
          label="Aineiston koko"
        />

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
