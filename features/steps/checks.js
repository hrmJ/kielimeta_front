/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable func-names */
import { Then } from 'cucumber';
import { By, until } from 'selenium-webdriver';
import 'babel-polyfill'; // NOTE: needed for aync await
import chai, { expect } from 'chai';
import ChaiAsPromised from 'chai-as-promised';
import { saveScreenshot } from './helpers';

chai.use(ChaiAsPromised);

Then(
  /within (\d+) milliseconds the selector "([^"]+)" matches (\d+) elements in the dom/,
  async function (milliseconds, selector, elementCount) {
    const elements = await this.driver.wait(until.elementsLocated(By.css(selector)), milliseconds);
    return expect(elements.length).to.equal(elementCount * 1);
  },
);

Then(/within (\d+) milliseconds the selector "([^"]+)" matches an element in the dom/, function (
  milliseconds,
  selector,
) {
  return expect(this.driver.wait(until.elementLocated(By.css(selector)), milliseconds)).to.be
    .fulfilled;
});
