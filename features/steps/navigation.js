/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable func-names */
import { When } from 'cucumber';
import { By, Key } from 'selenium-webdriver';
import 'babel-polyfill'; // NOTE: needed for aync await
import chai, { expect } from 'chai';
import ChaiAsPromised from 'chai-as-promised';
import { saveScreenshot } from './helpers';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

chai.use(ChaiAsPromised);

const baseUrl = `http://${process.env.FRONTEND_HOST}:${process.env.FRONTEND_PORT_TEST}?istest=true`;

When(/the user navigates to ([^\s]+)/, function(location) {
  return this.driver.get(baseUrl + location);
});

When(/the user clicks "([^"]+)"/, async function(selector) {
  const element = await this.driver.findElement(By.css(selector));
  return element.click();
});

When(/^the user clicks the xpath "([^"]+)"$/, async function(selector) {
  const element = await this.driver.findElement(By.xpath(selector));
  return element.click();
});

When(/^after (\d+) milliseconds the user clicks the xpath "([^"]+)"$/, async function(
  milliseconds,
  selector
) {
  await sleep(milliseconds);
  const element = this.driver.findElement(By.xpath(selector));
  return element.click();
});

When(/^after (\d+) milliseconds the user types "([^"]+)" in "([^"]+)"$/, async function(
  milliseconds,
  text,
  selector
) {
  await sleep(milliseconds);
  const field = this.driver.findElement(By.css(selector));
  if (text === 'BACKSPACE') {
    return field.sendKeys(Key.BACK_SPACE);
  }
  if (text === 'ENTER') {
    return field.sendKeys(Key.ENTER);
  }
  return field.sendKeys(text);
});

When(/^the user types "([^"]+)" in "([^"]+)"$/, function(text, selector) {
  const field = this.driver.findElement(By.css(selector));
  if (text === 'BACKSPACE') {
    return field.sendKeys(Key.BACK_SPACE);
  }
  if (text === 'ENTER') {
    console.log('ENTERPRESSS!!!!');
    return field.sendKeys(Key.ENTER);
  }
  return field.sendKeys(text);
});

When(/the user clears "([^"]+)"/, async function(selector) {
  const field = this.driver.findElement(By.css(selector));
  await field.clear();
  console.log(field);
});
