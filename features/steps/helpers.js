/* eslint-disable import/prefer-default-export */
import fs from 'fs';

export function saveScreenshot(image, err, fname) {
  fname = fname || 'sc';
  fs.writeFile(`/tmp/${fname}.png`, image, 'base64', (error) => {
    if (error) {
      console.log(error);
    }
  });
}
