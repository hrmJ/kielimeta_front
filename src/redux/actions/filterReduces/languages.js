/**
 * annotationReducer
 *
 * Extract all the unique annotation levels
 * in a dataset to be used as possible values
 * in a filter
 *
 * @param annotations
 * @param thisAnnotation
 * @returns {undefined}
 */
const annotationReducer = (annotations, thisAnnotation) => {
  const { level, description } = thisAnnotation;
  // const annotationValue = ['muu', 'other'].includes(level) ? description : level;
  const annotationValue = level;
  if (!annotations.map(thisA => thisA.value).includes(annotationValue)) {
    annotations.push({ label: annotationValue, value: annotationValue });
  }
  return annotations;
};

export { annotationReducer };
