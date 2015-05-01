'use strict';

module.exports = function configurKarma(config) {
  config.set({
    basePath: '',

    browserify: {
      debug: true,
      watch: true
    },

    browsers: [
      'Chrome',
      'Firefox'
    ],

    colors: true,

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

    reporters: [
      'mocha'
    ],

    singleRun: true
  });
};
