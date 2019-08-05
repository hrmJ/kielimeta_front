/**
 * formatNo
 *
 * Formats a number by adding thousands' separator
 * TODO: intl lib?
 *
 * @param n a number to be formatted
 * @returns {string} a formatted versino of the number
 */
const formatNo = n => {
  return String(n).replace(/(.)(?=(\d{3})+$)/g, '$1 ');
};

/**
 * cf. https://stackoverflow.com/questions/10730362/get-cookie-by-name
 *
 * @param {string} name the name of the cookie
 * @returns the value of the cookie
 */
function getCookie(name) {
  function escape(s) {
    return s.replace(/([.*+?\^${}()|\[\]\/\\])/g, '\\$1');
  }
  var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
  return match ? match[1] : null;
}

/**
 * getVal
 *
 * A shorthand to get a flat array out of a one that includes objects of
 * the shape {value:xxxx, ....}
 *
 * @param item
 * @returns {undefined}
 */
const getVal = item => item.value;

/**
 * addIfUnique
 *
 * Checks whether a filter value of the shape {value:x, label:x} already exists
 * in a provided array. If not, adds to the arrayand returns the whole thing.
 * Also checks that the new value is not undefined
 *
 * @param {Array} allValues the array of already existing values
 * @param {any} thisVal new value to be added
 * @param {any} thisLabel if provided, will be used as the label
 * @param {Function} labelFormatter if provided, will be used to format the labels
 * @returns {undefined}
 */
const addIfUnique = (allValues, thisVal, thisLabel, labelFormatter) => {
  if (Array.isArray(thisVal)) {
    const newVals = thisVal.filter(val => !allValues.map(oldVal => oldVal.value).includes(val));
    return newVals.length > 0
      ? [
          ...allValues,
          ...newVals.map(newVal => ({
            label: (labelFormatter && labelFormatter(newVal)) || newVal,
            value: newVal
          }))
        ]
      : allValues;
  }
  return thisVal !== undefined && !allValues.map(getVal).includes(thisVal)
    ? [...allValues, { label: thisLabel || thisVal, value: thisVal }]
    : allValues;
};

export { getCookie, formatNo, getVal, addIfUnique };
