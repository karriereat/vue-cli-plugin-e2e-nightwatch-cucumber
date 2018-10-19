const { setDefaultTimeout, AfterAll, BeforeAll } = require('cucumber');
const {
  startWebDriver,
  stopWebDriver,
  createSession,
  closeSession,
} = require('nightwatch-api');

setDefaultTimeout(60000);

BeforeAll(async () => {
  await startWebDriver('default');
  await createSession('default');
});

AfterAll(async () => {
  await closeSession();
  await stopWebDriver();
});
