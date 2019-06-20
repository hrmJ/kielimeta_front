import React from 'react';
import PropTypes from 'prop-types';

import Add from '../../../../../../ui/buttons/add';
import AnnotationSelect from '../annotationselect';
import LanguageProp from '../languageprop';
import generalStyles from '../../../../../../../general_styles/general_styles.scss';

const annotationsComponent = props => {
  const { onChange, dispatch, idx, languages, annotationLevels } = props;
  const annotations = languages[idx].annotations || [];

  return (
    <LanguageProp id={`annotations_${idx}`} header="Annotoinnit">
      {annotations.map((annotation, annotationIdx) => (
        <AnnotationSelect
          key={annotationIdx.toString()}
          idx={annotationIdx}
          languageIdx={idx}
          languages={languages}
          dispatch={dispatch}
          annotationLevels={annotationLevels}
          {...annotation}
        />
      ))}
      <div className={generalStyles.someTopMargin}>
        <Add
          id={`addAnnotation_${idx}`}
          onClick={() => onChange('annotations', [...annotations, {}])}
        />
      </div>
    </LanguageProp>
  );
};

annotationsComponent.propTypes = {
  onChange: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  idx: PropTypes.number.isRequired,
  languages: PropTypes.arrayOf(PropTypes.object).isRequired,
  annotationLevels: PropTypes.arrayOf(
    PropTypes.shape({ level: PropTypes.string, definition: PropTypes.string })
  )
};

annotationsComponent.defaultProps = {
  annotationLevels: []
};

export default annotationsComponent;
