/**
 * Simple uid generation
 * https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 */
const uuid = (length = 16) => {
  const cryptoObj = window.crypto || window.msCrypto; // for IE 11
  const full = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (c ^ (cryptoObj.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(length)
  ); /* eslint-disable-line */
  return full.substr(-length, full.length);
};

export default uuid;