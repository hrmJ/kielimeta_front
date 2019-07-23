import PropTypes from 'prop-types';
import React from 'react';

import Filter from '../filter';
import styles from './datasetlist.scss';

const filtersComponent = props => {
  const {
    filters,
    originalFilterValues: { lang, resourcetype, annotations, modality, variety },
    dispatch,
    languageVarieties
  } = props;
  return (
    <div>
      <section className={styles.filterContainer}>
        <Filter
          filters={filters}
          id="langfilter"
          keyName="lang"
          items={lang}
          dispatch={dispatch}
          allowMulti
          hasSubMenu
          languageVarieties={languageVarieties}
        >
          Kielet
        </Filter>
        <Filter
          filters={filters}
          id="variantfilter"
          keyName="variety"
          items={variety}
          dispatch={dispatch}
          allowMulti
        >
          Kielivariantit
        </Filter>
        <Filter
          filters={filters}
          id="typefilter"
          keyName="resourcetype"
          items={resourcetype}
          dispatch={dispatch}
        >
          Aineistotyypit
        </Filter>
        <Filter
          filters={filters}
          id="modalityfilter"
          keyName="modality"
          items={modality}
          dispatch={dispatch}
          allowMulti
        >
          Kielimuoto
        </Filter>
        <Filter
          filters={filters}
          id="annotationsFilter"
          keyName="annotations"
          items={annotations}
          dispatch={dispatch}
          allowMulti
          hasSubMenu
        >
          Annotoinnit
        </Filter>
        {/* 
        <Filter>Koko</Filter>
        <Filter>Lisää suodattimia </Filter>
        */}
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
