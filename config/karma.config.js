"use strict";
const existingKarmaConfig = require('@microsoft/sp-build-web/lib/karma/karma.config');
//const gulp_core_build = require("@microsoft/gulp-core-build");
const path = require('path');


module.exports = function (config) {
    existingKarmaConfig(config);

    config.set({
        reporters: ['test-result', 'mocha-clean',
            'coverage'],
        coverageReporter: {
            includeAllSources: true,
            dir: 'temp\\coverage',
            reporters: [
                { type: 'html', subdir: 'js' },
                { type: 'json', subdir: './', file: 'js-coverage.json' },
                { type: 'text' },
                { type: 'text-summary' }]
        }
    });

};