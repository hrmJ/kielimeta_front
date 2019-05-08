import React from 'react';
import LanguageProp from './index';
import AnnotationSelect from '../annotationselect';
import formstyles from '../datasetform.scss';

export default props => {
  const { onChange, annotations, dispatch, idx, languages } = props;

  return (
    <LanguageProp header="Annotoinnit">
      {annotations.map((annotation, annotationIdx) => (
        <AnnotationSelect
          key={annotationIdx.toString()}
          idx={annotationIdx}
          language_idx={idx}
          languages={languages}
          dispatch={dispatch}
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
