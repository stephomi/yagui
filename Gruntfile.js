module.exports = function (grunt) {
  'use strict';

  var clean = ['build'];

  var jshint = {
    files: ['Gruntfile.js', 'src/**/*.js']
  };

  var requirejs = {
    debug: {
      options: {
        preserveLicenseComments: false,
        wrap: {
          start: '(function() {',
          end: 'return require("yagui");}());'
        },
        optimize: 'none',
        baseUrl: 'src',
        name: '../tools/almond',
        include: 'yagui',
        out: 'build/yagui.js'
      }
    },
    min: {
      options: {
        preserveLicenseComments: false,
        wrap: {
          start: '(function() {',
          end: 'return require("yagui");}());'
        },
        optimize: 'uglify2',
        baseUrl: 'src',
        name: '../tools/almond',
        include: 'yagui',
        out: 'build/yagui.min.js'
      }
    }
  };

  var copy = {
    main: {
      files: [{
        expand: true,
        flatten: true,
        src: ['css/*'],
        dest: 'build/',
        filter: 'isFile'
      }]
    }
  };

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: clean,
    jshint: jshint,
    copy: copy,
    requirejsmin: requirejs,
    requirejs: requirejs
  });

  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('test', 'jshint');
  grunt.registerTask('build', ['clean', 'jshint', 'copy', 'requirejs:debug', 'requirejs:min']);

  grunt.registerTask('default', 'build');
};