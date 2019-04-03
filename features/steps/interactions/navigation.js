/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable func-names */
import { When, Then } from 'cucumber';
import { By, until } from 'selenium-webdriver';
import 'babel-polyfill'; // NOTE: needed for aync await
import chai, { expect } from 'chai';
import ChaiAsPromised from 'chai-as-promised';
// import { saveScreenshot } from '../helpers';

chai.use(ChaiAsPromised);

const baseUrl = `http://${process.env.FRONTEND_HOST}:${process.env.FRONTEND_PORT_TEST}`;

When(/the user navigates to ([^\s]+)/, function (location) {
  return this.driver.get(baseUrl + location);
});

When(/the user clicks "([^"]+)"/, function (selector) {
  return this.driver.findElement(By.css(selector)).click();
});

When(/the user types "([^"]+)" in "([^"]+)"/, function (text, selector) {
  const field = this.driver.findElement(By.css(selector));
  return field.sendKeys(text);
});

Then(/within (\d+) seconds the selector "([^"]+)" matches an element in the dom/, function (
  milliseconds,
  selector,
) {
  return expect(this.driver.wait(until.elementLocated(By.css(selector)), milliseconds * 1000)).to.be
    .fulfilled;
});

Then(/within (\d+) seconds the selector "([^"]+)" does not match an element in the dom/, function (
  milliseconds,
  selector,
) {
  return expect(this.driver.wait(until.elementLocated(By.css(selector)), milliseconds * 1000)).not
    .to.be.fulfilled;
});
