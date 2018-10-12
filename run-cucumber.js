const CucumberCLI = require('cucumber/lib/cli').default;

const cucumberCLI = new CucumberCLI({
  argv: [
    '--require', 'test/support',
    '--require', 'step-definitions',
    '--format', 'node_modules/cucumber-pretty',
  ],
  cwd: process.cwd(),
  stdout: process.stdout,
});

cucumberCLI.run();
