import { annotationReducer } from './languages';
import { addIfUnique } from '../../../utils';

const formatModality = cat => {
  switch (cat) {
    case 'written':
      return 'kirjoitettu kieli';
    case 'spoken':
      return 'puhuttu kieli';
    case 'internet':
      return 'internetkieli';
    default:
      return cat;
  }
};

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
    annotations,
    modality
  } = thisLang;
  const { lang: prevLangs = [], annotations: prevAnnotations, modality: prevModality } = processed;
  return {
    lang: addIfUnique(prevLangs, code, name),
    modality: addIfUnique(prevModality, modality, undefined, formatModality),
    annotations: annotations.reduce(annotationReducer, prevAnnotations)
  };
};

export { langReducer };
