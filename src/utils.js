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

export { getCookie, formatNo };
