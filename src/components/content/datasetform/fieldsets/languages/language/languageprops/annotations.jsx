import React from 'react';

import Add from '../../../../../../ui/buttons/add';
import AnnotationSelect from '../annotationselect';
import LanguageProp from '../languageprop';
import generalStyles from '../../../../../../../general_styles/general_styles.scss';

export default props => {
  const { onChange, dispatch, idx, languages, annotationLevels } = props;
  const annotations = languages[idx].annotations || [];

  return (
    <LanguageProp id={`annotations_${idx}`} header="Annotoinnit">
      {annotations.map((annotation, annotationIdx) => (
        <AnnotationSelect
          key={annotationIdx.toString()}
          idx={annotationIdx}
          language_idx={idx}
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
