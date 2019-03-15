import { Given, When, Then } from "cucumber";
import { By } from "selenium-webdriver";
import "babel-polyfill"; // NOTE: needed for aync await
import assert from "assert";

const base_url = `http://${process.env.FRONTEND_HOST}:${
  process.env.FRONTEND_HOST
}`;

When(/the user navigates to ([^s]+)/, function(location) {
  return this.driver.get(base_url + location);
});

Then(/the ([^\s]+) element should have a ([^s]+) as a child/, async function(
  parent,
  child
) {
  if (parent == "previous") {
    this.target = await this.target.findElement(By.css(`${child}`));
  } else {
    this.target = await this.driver.findElement(By.css(`${parent} ${child}`));
  }
  assert(this.target, `${child} not available.`);
});
