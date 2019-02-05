/* eslint-disable no-console */
const { setDefaultTimeout, AfterAll, BeforeAll } = require('cucumber');
const {
  startWebDriver,
  stopWebDriver,
  createSession,
  closeSession,
} = require('nightwatch-api');

setDefaultTimeout(60000);

BeforeAll(async () => {
  try {
    await startWebDriver({ env: process.env.NIGHTWATCH_ENVIRONMENT });
  } catch (err) {
    console.error('startWebDriver()', err);
  }
  try {
    await createSession({ env: process.env.NIGHTWATCH_ENVIRONMENT });
  } catch (err) {
    console.error('createSession()', err);
  }
});

AfterAll(async () => {
  try {
    await closeSession();
  } catch (err) {
    console.error('closeSession()', err);
  }
  try {
    await stopWebDriver();
  } catch (err) {
    console.error('stopWebDriver()', err);
  }
});
