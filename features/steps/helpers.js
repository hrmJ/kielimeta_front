import fs from "fs";

export function saveScreenshot(image, err) {
  const fname = "sc";
  fs.writeFile(`/tmp/${fname}.png`, image, "base64", err => {
    if (err) {
      console.log(err);
    }
  });
}
