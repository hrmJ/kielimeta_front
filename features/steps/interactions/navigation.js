import { Given, When, Then } from "cucumber";
import { By, until } from "selenium-webdriver";
import "babel-polyfill"; // NOTE: needed for aync await
import chai, { expect } from "chai";
import ChaiAsPromised from "chai-as-promised";
import assert from "assert";
import fs from "fs";

chai.use(ChaiAsPromised);

const base_url = `http://${process.env.FRONTEND_HOST}:${
  process.env.FRONTEND_PORT
}`;

When(/the user navigates to ([^s]+)/, function(location) {
  return this.driver.get(base_url + location);
});

Then(
  /within (\d+) seconds the selector "([^"]+)" matches an element in the dom/,
  function(seconds, selector) {
    return expect(
      this.driver.wait(until.elementLocated(By.css(selector)), seconds)
    ).to.be.fulfilled;
  }
);

Then(/he sees (<[^>]+>) identified by ([#\w\W_]+)/, async function(selector) {
  this.target = await this.driver.findElement(By.css(selector));
  assert(this.target, `${id} not available.`);
});
