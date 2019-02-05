# vue-cli-plugin-e2e-nightwatch-cucumber

> Nightwatch/Cucumber plugin for Vue CLI 3

## Injected Commands

```
vue-cli-service test:e2e [options] [<GLOB|DIR|FILE>]
```

### Options

```
-e, --env specify browser environment to run in (as specified in your `nightwatch.conf.js`)
```

## Configuration

The plugin will generate exemplary feature files and step definitions. Everything is pre-configured for you, you just have to run the `vue-cli-service test:e2e` command. 

### Nightwatch

You can edit `nightwatch.config.js` in your project root. If you want to change only specific parts of the [default configuration](nightwatch.conf.js) you can use any library that recursively merges objects, like `lodash.merge`:

```js
const merge = require('lodash.merge');
const config = require('vue-cli-plugin-e2e-nightwatch-cucumber/nightwatch.conf');

// https://lodash.com/docs/4.17.10#merge
module.exports = merge(config, {
    test_settings: {
        default: {
            desiredCapabilities: {
                chromeOptions: {
                    // Override `['headless', 'disable-gpu']` to show Chrome's UI for debugging
                    args: ['disable-gpu']
                }
            }
        }
    }
});
```

### Cucumber

All [Cucumber CLI](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md) options are forwarded to the CLI. If used, an option will override the plugin's default option. For example, if you pass `--format <TYPE[:PATH]>` you'll only override the default formatter

 If you only want to run specific features you can call the `vue-cli-service test:e2e` command with a [glob](https://github.com/isaacs/node-glob) pattern, directory, feature file, scenario (`--name`) or tag (`--tag`):

* `vue-cli-service test:e2e "tests/**/*.feature"`
* `vue-cli-service test:e2e "tests/features"`
* `vue-cli-service test:e2e "tests/features/duckduckgo-search.feature"`
* `vue-cli-service test:e2e --name "Searching DuckDuckGo"`
 
## Installing

```
vue add e2e-nightwatch-cucumber
```

## Development

The following workaround is necessary to prevent a Cucumber error when symlinking. Please let me know if you have better suggestions!

> You appear to be executing an install of cucumber (most likely a global install)
  that is different from your local install (the one required in your support files).
  For cucumber to work, you need to execute the same install that is required in your support files.
  Please execute the locally installed version to run your tests.
  
```bash
# /path/vue-cli-plugin-e2e-nightwatch-cucumber
npm link
```

```bash
vue create my-project
cd my-project
npm link /path/vue-cli-plugin-e2e-nightwatch-cucumber
vue invoke e2e-nightwatch-cucumber
cp -r /path/vue-cli-plugin-e2e-nightwatch-cucumber/test/support/ ./tests/support
npm install cucumber cucumber-pretty nightwatch nightwatch-api
npm run test:e2e -- --require tests/step-definitions --require tests/support
```
