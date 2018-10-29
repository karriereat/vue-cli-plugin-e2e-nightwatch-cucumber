/* eslint-disable global-require, no-use-before-define */
module.exports = (api) => {
  api.registerCommand('test:e2e', {
    description: 'Run end-to-end tests with Nightwatch/Cucumber',
    usage: 'vue-cli-service test:e2e [options] [<GLOB|DIR|FILE>]',
    options: {
      '-e, --env': 'specify browser environment to run in (as specified in your `nightwatch.conf.js`)',
    },
  }, (args, rawArgs) => {
    process.env.NIGHTWATCH_ENVIRONMENT = args.e || args.env || 'default';
    removeArg(rawArgs, '-e');
    removeArg(rawArgs, '--env');

    const cucumberArguments = cucumberArgs(rawArgs, args, api);
    // console.log(cucumberArguments); process.exit();

    const server = api.service.run('serve');
    server.then(() => {
      const CucumberCLI = require('cucumber/lib/cli').default;
      const cucumberCLI = new CucumberCLI({
        argv: cucumberArguments,
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

function cucumberArgs(rawArgs, args, api) {
  function argsLacking(property) {
    return !Object.hasOwnProperty.call(args, property);
  }
  const cucumberArguments = rawArgs;
  if (argsLacking('require-module')) {
    cucumberArguments.push('--require-module', 'babel-core/register');
  }
  if (argsLacking('require') || argsLacking('r')) {
    cucumberArguments.push('--require', 'test/support');
    cucumberArguments.push('--require', `${api.getCwd()}/tests/step-definitions`);
  }
  if (argsLacking('format') || argsLacking('f')) {
    cucumberArguments.push('--format', `${api.getCwd()}/node_modules/cucumber-pretty`);
  }
  if (!args._.length) {
    cucumberArguments.push(`${api.getCwd()}/tests/features/**/*.feature`);
  }
  return cucumberArguments;
}

function removeArg(rawArgs, arg, offset = 1) {
  const matchRegExp = new RegExp(`^${arg}`);
  const equalRegExp = new RegExp(`^${arg}=`);
  const index = rawArgs.findIndex(_arg => matchRegExp.test(_arg));
  if (index > -1) {
    rawArgs.splice(index, offset + (equalRegExp.test(rawArgs[index]) ? 0 : 1));
  }
}
