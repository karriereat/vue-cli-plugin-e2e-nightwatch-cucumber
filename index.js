/* eslint-disable global-require */
module.exports = (api) => {
  api.registerCommand('test:e2e', {
    description: 'Run end-to-end tests with Nightwatch/Cucumber',
    usage: 'vue-cli-service test:e2e [options]',
    options: {
      '-e, --env': 'specify browser environment to run in (as specified in your `nightwatch.conf.js`)',
    },
  }, (args) => {
    process.env.NIGHTWATCH_ENVIRONMENT = args.e || args.env || 'default';
    const server = api.service.run('serve');
    server.then(() => {
      const CucumberCLI = require('cucumber/lib/cli').default;
      const cucumberCLI = new CucumberCLI({
        argv: [
          '--require-module', 'babel-core/register',
          '--require', 'test/support',
          '--require', `${api.getCwd()}/tests/step-definitions`,
          '--format', `${api.getCwd()}/node_modules/cucumber-pretty`,
          `${api.getCwd()}/tests/features/**/*.feature`,
        ],
        cwd: __dirname,
        stdout: process.stdout,
      });
      const cucumber = cucumberCLI.run();
      cucumber.then(({ success }) => {
        const code = !success;
        process.exit(code);
      });
    });
  });
};

module.exports.defaultModes = {
  'test:e2e': 'production',
};
