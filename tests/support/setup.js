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
  await startWebDriver({ env: process.env.NIGHTWATCH_ENVIRONMENT });
  await createSession({ env: process.env.NIGHTWATCH_ENVIRONMENT });
});

AfterAll(async () => {
  await closeSession();
  await stopWebDriver();
});
