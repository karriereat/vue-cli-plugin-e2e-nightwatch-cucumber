/* eslint-disable global-require */
module.exports = (api, projectOptions) => {
  api.registerCommand('test:e2e', {
    description: 'Run end-to-end tests with Nightwatch/Cucumber',
  }, () => {
    const server = api.service.run('serve');
    server.then(() => {
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
      cucumberCLI.run().then(({ success }) => {
        const code = !success;
        process.exit(code);
      });
    });
  });
};

module.exports.defaultModes = {
  'test:e2e': 'production',
};
