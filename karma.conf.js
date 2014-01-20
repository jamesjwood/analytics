/*global module */
/*global LOG_INFO */

module.exports = function(config) {
	'use strict';
    config.set({
		frameworks: ['mocha'],
		basePath : 'stage/',
		files: [
			'test.js'
		],
    port: 9876
	});
};
