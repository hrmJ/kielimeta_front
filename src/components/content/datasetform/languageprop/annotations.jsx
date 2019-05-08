import React from 'react';
import LanguageProp from './index';
import AnnotationSelect from '../annotationselect';

export default props => {
  const { onChange, annotations, dispatch } = props;

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
        onClick={() => this.updateLanguage('annotations', [...annotations, {}])}
      >
        Lisää uusi
      </button>
    </LanguageProp>
  );
};
