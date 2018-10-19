#!/usr/bin/env node

const { startWebDriver } = require('nightwatch-api');

startWebDriver('default').catch(err => console.log(err));
