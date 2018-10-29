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

All [Cucumber CLI](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md) options are forwarded to the CLI. If used, an option will override the plugin's default option. For example, if you pass `--format <TYPE[:PATH]>` you'll only override the default formatter.
 
## Installing

```
vue add e2e-nightwatch-cucumber
```
