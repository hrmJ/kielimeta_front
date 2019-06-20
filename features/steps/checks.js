/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable func-names */
import { Then } from 'cucumber';
import webdriver, { By, until } from 'selenium-webdriver';
import 'babel-polyfill'; // NOTE: needed for aync await
import chai, { expect } from 'chai';
import ChaiAsPromised from 'chai-as-promised';
import { saveScreenshot } from './helpers';

chai.use(ChaiAsPromised);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

Then(
  /within (\d+) milliseconds the (\w+) "([^"]+)" matches (\w+ \w+ )?(\d+) elements in the dom/,
  async function(milliseconds, matcher, selector, limit, elementCount) {
    const bywhat = matcher === 'selector' ? 'css' : matcher;
    const elements = await this.driver.wait(
      until.elementsLocated(By[bywhat](selector)),
      milliseconds
    );
    if (limit === 'at least ') {
      return expect(elements.length).to.be.at.least(elementCount * 1);
    }
    if (limit === 'less than ') {
      return expect(elements.length).to.be.below(elementCount * 1);
    }
    return expect(elements.length).to.equal(elementCount * 1);
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

Then(`the value of the react-select {string} equals {string}`, async function(id, value) {
  const selector = `//div[@id='${id.replace('#', '')}']//div[text()='${value}']`;
  return expect(this.driver.wait(until.elementLocated(By.xpath(selector)), 10)).to.be.fulfilled;
});

Then(`the value of {string} equals {string}`, async function(selector, value) {
  const el = await this.driver.findElement(By.css(selector));
  const attainedValue = await el.getAttribute('value');
  return expect(attainedValue).to.equal(value);
});

Then(`after {int} milliseconds the value of {string} equals {string}`, async function(
  milliseconds,
  selector,
  value
) {
  await sleep(milliseconds);
  const el = await this.driver.findElement(By.css(selector));
  const attainedValue = await el.getAttribute('value');
  return expect(attainedValue).to.equal(value);
});

Then(/within (\d+) milliseconds "([^"]+)" is visible/, function(milliseconds, selector) {
  return expect(
    this.driver.wait(
      until.elementIsVisible(this.driver.findElement(By.css(selector))),
      milliseconds
    )
  ).to.be.fulfilled;
});

Then(/within (\d+) milliseconds xpath "([^"]+)" is visible/, function(milliseconds, selector) {
  return expect(
    this.driver.wait(
      until.elementIsVisible(this.driver.findElement(By.xpath(selector))),
      milliseconds
    )
  ).to.be.fulfilled;
});

Then(/within (\d+) milliseconds xpath "([^"]+)" is not visible/, function(milliseconds, selector) {
  return expect(
    this.driver.wait(
      until.elementIsVisible(this.driver.findElement(By.xpath(selector))),
      milliseconds
    )
  ).not.to.be.fulfilled;
});

Then(/within (\d+) milliseconds "([^"]+)" is not visible/, function(milliseconds, selector) {
  return expect(
    this.driver.wait(
      until.elementIsVisible(this.driver.findElement(By.css(selector))),
      milliseconds
    )
  ).not.to.be.fulfilled;
});

Then(/within (\d+) milliseconds a suggestion "([^"]+)" appears/, function(
  milliseconds,
  suggestion
) {
  return expect(
    this.driver.wait(
      until.elementIsVisible(this.driver.findElement(By.xpath(`//div[text()='${suggestion}']`))),
      milliseconds
    )
  ).to.be.fulfilled;
});

Then(/within (\d+) milliseconds the xpath "([^"]+)" matches an element in the dom/, async function(
  milliseconds,
  selector
) {
  return expect(this.driver.wait(until.elementLocated(By.xpath(selector)), milliseconds)).to.be
    .fulfilled;
});

Then(
  'within {int} DEBUG milliseconds the xpath {string} matches an element in the dom',
  async function(milliseconds, selector) {
    await sleep(4000);
    // const test = await this.driver.wait();
    const el = await this.driver.findElement(By.xpath(selector));
    const text = await el.getText();
    const tag = await el.getTagName();
    const html = await el.getAttribute('innerHTML');
    return expect(this.driver.wait(until.elementLocated(By.xpath(selector)), milliseconds)).to.be
      .fulfilled;
  }
);

Then(
  /within (\d+) milliseconds the xpath "([^"]+)" doesn't match an element in the dom/,
  async function(milliseconds, selector) {
    const existed = await this.driver.findElement(By.xpath(selector)).then(
      () => true, // it was found
      err => {
        if (err instanceof webdriver.error.NoSuchElementError) {
          return false; // element did not exist
        }
        webdriver.promise.rejected(err); // some other error...
      }
    );
    expect(existed).to.be.false;
  }
);
