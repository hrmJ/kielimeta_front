/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable func-names */
import { Then } from 'cucumber';
import { By, until } from 'selenium-webdriver';
import 'babel-polyfill'; // NOTE: needed for aync await
import chai, { expect } from 'chai';
import ChaiAsPromised from 'chai-as-promised';
import { saveScreenshot } from './helpers';

chai.use(ChaiAsPromised);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

Then(
  /within (\d+) milliseconds the selector "([^"]+)" matches (\w+ \w+ )?(\d+) elements in the dom/,
  async function(milliseconds, selector, limit, elementCount) {
    const elements = await this.driver.wait(until.elementsLocated(By.css(selector)), milliseconds);
    if (limit == 'at least ') {
      return expect(elements.length).to.be.at.least(elementCount * 1);
    } else if (limit == 'less than ') {
      return expect(elements.length).to.be.below(elementCount * 1);
    } else {
      return expect(elements.length).to.equal(elementCount * 1);
    }
  }
);

Then(
  /after (\d+) milliseconds the selector "([^"]+)" matches (\w+ \w+ )?(\d+) elements in the dom/,
  async function(milliseconds, selector, limit, elementCount) {
    await sleep(milliseconds);
    const elements = await this.driver.findElements(By.css(selector));
    if (limit == 'at least ') {
      expect(elements.length).to.be.at.least(elementCount * 1);
    } else if (limit == 'less than ') {
      expect(elements.length).to.be.below(elementCount * 1);
    } else {
      expect(elements.length).to.equal(elementCount * 1);
    }
  }
);

Then(/within (\d+) milliseconds the selector "([^"]+)" matches an element in the dom/, function(
  milliseconds,
  selector
) {
  return expect(this.driver.wait(until.elementLocated(By.css(selector)), milliseconds)).to.be
    .fulfilled;
});

Then(/within (\d+) milliseconds "([^"]+)" is visible/, function(milliseconds, selector) {
  return expect(
    this.driver.wait(
      until.elementIsVisible(this.driver.findElement(By.css(selector))),
      milliseconds
    )
  ).to.be.fulfilled;
});

Then(/within (\d+) milliseconds "([^"]+)" is not visible/, function(milliseconds, selector) {
  return expect(
    this.driver.wait(
      until.elementIsVisible(this.driver.findElement(By.css(selector))),
      milliseconds
    )
  ).not.to.be.fulfilled;
});
