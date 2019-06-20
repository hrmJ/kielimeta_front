/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable func-names */
import { After, Before } from 'cucumber';
import webdriver from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import firefox from 'selenium-webdriver/firefox';

const screen = {
  width: 1920,
  height: 1080
};

// TODO: mobile based on env variables or just a separate mobile browser?

Before(function() {
  this.driver = new webdriver.Builder()
    .forBrowser(process.env.TEST_BROWSER || 'chrome')
    .setChromeOptions(new chrome.Options().headless().windowSize(screen))
    .setFirefoxOptions(new firefox.Options().headless().windowSize(screen))
    .build();
  return this.driver;
});

After(function() {
  this.driver.quit();
});
