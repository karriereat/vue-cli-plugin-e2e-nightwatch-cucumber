/* eslint-disable global-require */
module.exports = (api, projectOptions) => {
  api.registerCommand('test:e2e', {
    description: 'Run end-to-end tests with Nightwatch/Cucumber',
  }, () => {
    // (1) Start Vue CLI dev server
    const serverPromise = api.service.run('serve');
    return serverPromise.then(() => {
      // (2) Start web driver via Nightwatch API
      const execa = require('execa');
      execa(`${__dirname}/test/server.js`);
      // (3) Run cucumber tests
      const CucumberCLI = require('cucumber/lib/cli').default;
      const cucumberCLI = new CucumberCLI({
        argv: [
          '--require-module', 'babel-core/register',
          '--require', 'test/support',
          '--require', 'step-definitions',
          '--format', 'node_modules/cucumber-pretty',
        ],
        cwd: __dirname,
        stdout: process.stdout,
      });
      cucumberCLI.run();
    });
  });
};

module.exports.defaultModes = {
  'test:e2e': 'production',
};
