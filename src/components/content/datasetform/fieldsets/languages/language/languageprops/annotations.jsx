import React from 'react';
import LanguageProp from '../languageprop';
import AnnotationSelect from '../annotationselect';
import formstyles from '../../../../datasetform.scss';

export default (props) => {
  const {
    onChange, dispatch, idx, languages, annotationLevels,
  } = props;
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

      <button
        type="button"
        className={formstyles.someTopMargin}
        onClick={() => onChange('annotations', [...annotations, {}])}
      >
        Lisää uusi
      </button>
    </LanguageProp>
  );
};
