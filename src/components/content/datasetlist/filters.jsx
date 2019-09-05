import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ArrayFilter from '../filter/arrayFilter';
import BasicButton from '../../ui/buttons/BasicButton';
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

class filtersComponent extends Component {
  state = { allFiltersVisible: false };

  render() {
    const { allFiltersVisible } = this.state;
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
        years,
        group,
        locstatus
      },
      userDetails: { is_staff: isStaff },
      dispatch,
      languageVarieties
    } = this.props;

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
            customClass={!allFiltersVisible ? styles.hideInMobile : ''}
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
            customClass={!allFiltersVisible ? styles.hideInMobile : ''}
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
            customClass={!allFiltersVisible ? styles.hideInMobile : ''}
          />
          <ArrayFilter
            {...commonProps}
            keyName="speaker_status"
            items={speakerStatus}
            allowMulti
            label="Äidinkielisyys"
            customClass={!allFiltersVisible ? styles.hideInMobile : ''}
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
            customClass={!allFiltersVisible ? styles.hideInMobile : ''}
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
            customClass={!allFiltersVisible ? styles.hideInMobile : ''}
          />
          <ArrayFilter
            {...commonProps}
            keyName="genre"
            items={genre}
            allowMulti
            label="Tekstien genre"
            customClass={!allFiltersVisible ? styles.hideInMobile : ''}
          />
          {years && Array.isArray(years) && years.length > 1 && (
            <ScaleFilter
              {...commonProps}
              items={[{ min: years[0], max: years[1], key: 'years' }]}
              label="Aineiston ajankohta"
              customClass={!allFiltersVisible ? styles.hideInMobile : ''}
            />
          )}
          <ScaleFilter
            {...commonProps}
            items={['tokens', 'words', 'sentences', 'texts', 'audiohours', 'videohours'].map(
              cat => ({
                min: 0,
                max:
                  cat in this.props.originalFilterValues
                    ? this.props.originalFilterValues[cat][1]
                    : 0,
                label: formatSizeLabel(cat),
                key: cat
              })
            )}
            label="Aineiston koko"
            customClass={!allFiltersVisible ? styles.hideInMobile : ''}
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
            customClass={!allFiltersVisible ? styles.hideInMobile : ''}
          />
          <ArrayFilter
            {...commonProps}
            keyName="group"
            items={group}
            label="Ryhmät"
            customClass={!allFiltersVisible ? styles.hideInMobile : ''}
          />
          {isStaff && (
            <ArrayFilter
              {...commonProps}
              keyName="locstatus"
              items={locstatus}
              label="tallennustilanne"
              customClass={!allFiltersVisible ? styles.hideInMobile : ''}
            />
          )}
        </section>
        <div className={`${styles.onlyInMobile} ${styles.moreButton}`}>
          <BasicButton
            text={allFiltersVisible ? 'Vähemmän suodattimia' : 'Lisää suodattimia'}
            noBackground
            onClick={() => this.setState({ allFiltersVisible: !allFiltersVisible })}
          />
        </div>
      </div>
    );
  }
}

filtersComponent.propTypes = {
  filters: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array])
  ),
  originalFilterValues: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array])
  ),
  dispatch: PropTypes.func.isRequired,
  languageVarieties: PropTypes.objectOf(PropTypes.any),
  userDetails: PropTypes.shape({
    username: PropTypes.string,
    datasets: PropTypes.arrayOf(PropTypes.any),
    is_staff: PropTypes.bool,
    groups: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};

filtersComponent.defaultProps = {
  originalFilterValues: {},
  filters: {},
  languageVarieties: {}
};

export default filtersComponent;
