/* eslint-disable global-require, no-use-before-define */
module.exports = (api) => {
  api.registerCommand('test:e2e', {
    description: 'Run end-to-end tests with Nightwatch/Cucumber',
    usage: 'vue-cli-service test:e2e [options] [<GLOB|DIR|FILE>]',
    options: {
      '--url': 'run the tests against given url instead of auto-starting dev server',
      '-e, --env': 'specify browser environment to run in (as specified in your `nightwatch.conf.js`)',
    },
  }, (args, rawArgs) => {
    const url = args.url;
    const cwd = api.getCwd();
    process.env.NIGHTWATCH_ENVIRONMENT = args.e || args.env || 'default';
    
    removeArg(rawArgs, '--url');
    removeArg(rawArgs, '-e');
    removeArg(rawArgs, '--env');

    const cucumberArguments = cucumberArgs(rawArgs, args);

    if (url) {
      runCucumber(cucumberArguments, cwd, url);
    } else {
      const server = api.service.run('serve');
      server.then(({ url }) => { 
        runCucumber(cucumberArguments, cwd, url);
      });  
    }
  });
};

module.exports.defaultModes = {
  'test:e2e': 'production',
};

function cucumberArgs(rawArgs, args) {
  function argsLacking(property) {
    return !Object.hasOwnProperty.call(args, property);
  }
  const cucumberArguments = rawArgs;
  // TODO Refactoring
  // The order `--require-module`, `--require`, `--format` and `[<GLOB|DIR|FILE>]` is important!
  if (argsLacking('format') && argsLacking('f')) {
    cucumberArguments.unshift('--format', 'node_modules/cucumber-pretty');
  }
  if (argsLacking('require') && argsLacking('r')) {
    cucumberArguments.unshift('--require', 'tests/step-definitions');
    cucumberArguments.unshift('--require', `${__dirname}/tests/support`);
  }
  if (argsLacking('require-module')) {
    cucumberArguments.unshift('--require-module', 'babel-core/register');
  }
  if (!args._.length) {
    cucumberArguments.push('tests/features/**/*.feature');
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

function runCucumber(cucumberArguments, cwd, url) {
  process.env.VUE_DEV_SERVER_URL = url;

  // eslint-disable-next-line import/no-dynamic-require
  const CucumberCLI = require(`${cwd}/node_modules/cucumber/lib/cli`).default;
  const cucumberCLI = new CucumberCLI({
    argv: cucumberArguments,
    cwd,
    stdout: process.stdout,
  });
  const cucumber = cucumberCLI.run();
  cucumber.then(({ success }) => {
    const code = !success;
    process.exit(code);
  });
}