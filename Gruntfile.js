/*
 * grunt-clientlibify
 * https://github.com/mickleroy/grunt-clientlibify
 *
 * Copyright (c) 2015 Michael Leroy
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    clientlibify: {
      // Default options
      default_options: {
        options: {
            cssDir: 'test/fixtures/css',
            jsDir: 'test/fixtures/js'
        }
      },
      // Custom package options
      custom_package_options: {
        options: {
          cssDir: 'test/fixtures/css',
          jsDir: 'test/fixtures/js',
          categories: ['styleguide'],
          embed: [],
          dependencies: ['cq-jquery'],
          packageName: 'aem-styleguide',
          packageVersion: '2.1',
          packageGroup: 'My Company',
          packageDescription: 'This package contains our mighty styleguide!'
        }
      },
      // No zip file created
      no_zip_options: {
        options: {
          cssDir: 'test/fixtures/css',
          jsDir: 'test/fixtures/js',
          categories: ['styleguide'],
          noZip: true,
          embed: [],
          dependencies: ['cq-jquery'],
          packageName: 'aem-styleguide-no-zip',
          packageVersion: '2.1',
          packageGroup: 'My Company',
          packageDescription: 'This package contains our mighty styleguide!'
        }
      },
      // Generate a CSS only clientlib
      css_only_options: {
        options: {
          cssDir: 'test/fixtures/css',
          packageName: 'css-styleguide'
        }
      },
      // Generate a JS only clientlib
      js_only_options: {
        options: {
          jsDir: 'test/fixtures/js',
          packageName: 'js-styleguide'
        }
      },
      css_js_patterns_options: {
        options: {
          jsDir: 'test/fixtures/js',
          cssDir: 'test/fixtures/css',
          jsFilePatterns: ['*.js', '*.txt'],
          cssFilePatterns: ['*.css', '*.less', '*.txt'],
          packageName: 'css-js-patterns-styleguide'
        }
      },
      // Deploys the CRX package to a local AEM instance
      deploy_options: {
        options: {
          cssDir: 'test/fixtures/css',
          jsDir: 'test/fixtures/js',
          installPackage: true,
          packageName: 'deploy-clientlibify',
          deployScheme: 'http',
          deployHost: 'localhost',
          deployPort: '4502',
          deployUsername: 'admin',
          deployPassword: 'admin'
        }
      },
      // Extra assets options
      extra_assets_options: {
        options: {
          cssDir: 'test/fixtures/css',
          jsDir: 'test/fixtures/js',
          assetsDirs: ['test/fixtures/favico.ico', 'test/fixtures/img'],
          packageName: 'extra-assets'
        }
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  // Note: the "deploy_options" target is not run when testing (only manual testing)
  grunt.registerTask('test', [
    'clean',
    'clientlibify:default_options',
    'clientlibify:custom_package_options',
    'clientlibify:no_zip_options',
    'clientlibify:css_only_options',
    'clientlibify:js_only_options',
    'clientlibify:css_js_patterns_options',
    'clientlibify:extra_assets_options',
    'nodeunit'
  ]);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
