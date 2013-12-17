/*global module */
/*global LOG_INFO */

module.exports = function(config) {
	'use strict';
    config.set({
		frameworks: ['mocha'],
		basePath : 'stage/',
		files: [
			'../node_modules/stacktrace-js/stacktrace.js',
			'test.js'
		],
    port: 9876
	});
};
