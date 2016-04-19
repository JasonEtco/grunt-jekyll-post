/*
 * grunt-jekyll-post
 * 
 *
 * Copyright (c) 2016 Jason Etcovitch
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
        options: {
        jshintrc: '.jshintrc'
      }
    },

    jekyll_post: {
      options: {
        comment: [
          'single comment',
          'anotha one'
        ]
      },
      questions: [
        {
          config: 'title',
          message: 'Title?',
          default: 'Your Default Title'
        },
        {
          config: 'author',
          type: 'list',
          message: 'Author?',
          choices: ['Jason', 'Daniel'],
          default: 1
        }
      ]
    }
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint', 'jekyll_post']);

};