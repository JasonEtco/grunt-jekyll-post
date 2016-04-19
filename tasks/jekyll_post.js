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
            options = this.options({
                dist: '_drafts',
                comments: false,
                format: 'md',
                date: false
            }),
            questions = grunt.config(this.name + '.questions'),
            _ = require('lodash');

        if(options.questions) {
            grunt.fail.warn("Please put your `questions` property outside of `options`, as changed in version 0.2.0");
        }

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

                        if(options.date) {
                            content += "date: " + today + "\n";
                        }

                        if(options.comment) {
                            content += "\n";
                            if(typeof(options.comment) === 'object') {
                                _.forEach(options.comment, function(answer){
                                    content += "# " + answer + "\n"; 
                                });
                            } else {
                                content += "# " + options.comment + "\n";
                            }
                        }
                        
                        content += "---";

                    grunt.file.write(options.dist + '/' + today + '-' + formattedTitle + '.' + options.format, content);
                } else {
                    grunt.fail.warn("Your Gruntfile's jekyll_post task needs a `title` question.");
                }

                done();
            });
        }   
    });

};
