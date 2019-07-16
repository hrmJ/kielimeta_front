import { annotationReducer } from './languages';
import { addIfUnique } from '../../../utils';

/**
 * langReducer
 *
 * From the languages array of a dataset get the possible values for properties
 * used in filters (this should be used as a target of a Array.reduceA
 * function)
 *
 * @param processed
 * @param thisLang
 * @returns {undefined}
 */
const langReducer = (processed, thisLang) => {
  const {
    details: { language_code: code, language_name: name },
    annotations
  } = thisLang;
  const { lang: prevLangs = [], annotations: prevAnnotations } = processed;
  return {
    lang: addIfUnique(prevLangs, code, name),
    annotations: annotations.reduce(annotationReducer, prevAnnotations)
  };
};

export { langReducer };
