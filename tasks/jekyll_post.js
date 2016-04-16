/*
 * grunt-jekyll-post
 * 
 *
 * Copyright (c) 2016 Jason Etcovitch
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    grunt.registerTask('jekyll_post', 'Prompts questions in command line, then creates a Jekyll post template with the answers', function() {

        var inquirer = require('inquirer'),
            options = this.options(),
            _ = require('lodash');

        var questions = options.questions;

        if (questions) {
            var done = this.async();

            questions = questions.map(function(question){
                question.name = question.config || question.name;
                return question;
            });

            inquirer.prompt( questions, function( answers ) {
                var delegateAsync = false;
                if (_.isFunction(options.then)) {
                    delegateAsync = options.then(answers, done);
                }
                if (!delegateAsync) {
                    done();
                }
            }).then(function (answers) {
                _.forEach(answers, function(answer, configName){
                    grunt.config(configName, answer);
                });

                var title = grunt.config('title');
                
                if (title) {
                    // Create variables for output file's filename
                    var date = new Date(),
                        today = grunt.template.date(date, 'yyyy-mm-dd'),
                        formattedTitle;

                    // Formats the title to remove spaces or glyphs, then sets to lowercase
                    formattedTitle = title.replace(/[^a-z0-9]|\s+|\r?\n|\r/gmi, '-').toLowerCase();
                    
                    // Define content of the output file
                    var content  = "---\n";
                        
                        _.forEach(answers, function(answer, configName){
                            content += configName +": " + answer + "\n"; 
                        });
                        
                        content += "---";
                    
                    // Creates file
                    // Also checks to see if drafts option is set; default is drafts: true
                    if (options.drafts === false) {
                        grunt.file.write('_posts/' + today + '-' + formattedTitle + '.md', content);
                    } else {
                        grunt.file.write('_drafts/' + today + '-' + formattedTitle + '.md', content);
                    }
                } else {
                    grunt.fail.warn("Your Gruntfile's jekyll_post task needs a `title` question.");
                }

                done();
            });
        }   
    });

};
