
var pkg = require('./package.json');


module.exports = function(grunt) {
  "use strict";
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jsbeautifier : {
      run: {
          src : ["src/**/*.js", "test/**/*.js"]
      },
      test: {
          src : ["src/**/*.js", "test/**/*.js"],
          options : {
              mode:"VERIFY_ONLY"
          }
      }
    },
    simplemocha: {
      options: {
        ui: 'bdd',
        reporter: 'tap'
      },
      all: { src: ['test/*.js'] }
    },
    shell: {
      browserify:{
        command: 'node ./node_modules/browserify/bin/cmd.js --debug -o ./stage/test.js -i domain -i loggly -i ga -i pouchdb  -i "./test.js" -e ./test.js;',
        stdout: true,
        stderr: true,
        failOnError: true
      },
      buildStage:{
        command: 'rm -rf stage; mkdir stage;cp -av web/ stage; rm -rf bin; mkdir bin;',
        stdout: true,
        stderr: true,
        failOnError: true
      }
    },
    karma: {
      local: {
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: ['Safari']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


  grunt.registerTask('test', ['jshint','simplemocha', 'shell:buildStage','shell:browserify', 'karma']);
  grunt.registerTask('development', ['bumpup:prerelease']);
  grunt.registerTask('production', ['bump:patch']);
};