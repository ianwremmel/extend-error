'use strict';

var fs = require('fs');

module.exports = function configurKarma(config) {

  var pkg = require('./package');

  // Use ENV vars on Travis and sauce.json locally to get credentials
  if (!process.env.SAUCE_USERNAME) {
    if (!fs.existsSync('sauce.json')) {
      console.log('Create a sauce.json with your credentials based on the sauce-sample.json file.');
      /* eslint no-process-exit: [0] */
      process.exit(1);
    }
    else {
      process.env.SAUCE_USERNAME = require('./sauce').username;
      process.env.SAUCE_ACCESS_KEY = require('./sauce').accessKey;
    }
  }

  // Browsers to run on Sauce Labs
  var customLaunchers = require('./browsers');

  config.set({
    basePath: '',

    browserify: {
      debug: true,
      watch: true
    },

    browsers: Object.keys(customLaunchers),

    colors: true,

    customLaunchers: customLaunchers,

    files: [
      'test/**/*.js'
    ],

    frameworks: [
      'browserify',
      'mocha'
    ],

    logLevel: config.LOG_DEBUG,

    preprocessors: {
      'test/**/*.js': ['browserify']
    },

    port: 8000,

    reporters: [
      'mocha',
      'saucelabs'
    ],

    sauceLabs: {
      startConnect: false,
      testName: pkg.name
    },

    singleRun: true
  });
};
