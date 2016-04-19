# grunt-jekyll-post

> Prompts questions in command line, then creates a Jekyll post template with the answers..

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-jekyll-post --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-jekyll-post');
```

## The "jekyll_post" task

### Overview
In your project's Gruntfile, add a section named `jekyll_post` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  jekyll_post: {
    questions: [
      {
        config: 'title',
        message: 'What would you like the title to be?',
        default: 'My Default Title'
      }
    ]
  },
});
```

### Options

#### drafts
Type: `Boolean`
Default value: `true`

Define whether to write the output file into `_drafts` or `_posts`  
_writes to `_drafts` by default_

### Question Options

#### config
Type: `String` _required_

The name of the front-matter's variable (not the value).
Example: 
```
config: 'title'

Resulting front matter:

---
title: ANSWER
---
```

#### type
Type: `String`
Default value: input

The type of question you're asking:

* `list`: use arrow keys to pick one choice. Returns a string.
* `checkbox`: use arrow keys and space bar to pick multiple items. Returns an array.
* `confirm`: Yes/no. Returns a boolean.
* `input`: Free text input. Returns a string.
* `password`: Masked input. Returns a string.

Be sure to read the documentation for [Inquiry](https://github.com/SBoudrias/Inquirer.js), the project that enables command-line questions, for more details.

#### message
Type: `String`

The message that you want to see in the command line, prompting you to answer the question.

#### default
Type `String/Array/Boolan`

The default value used when the user just hits enter without typing anything into it.

#### choices
_only for questions that have the type `list` or `checkbox`_  
Type: `Array of Hashes`

* `name` The label that is displayed in the UI.
* `value` _optional_ Value returned. When not used the name is used instead.
* `checked` _optional_ Choose the option by default. Only for checkbox.

### Usage Examples

Add as many questions as you need, and they will be reflected in the output markdown file.

```js
grunt.initConfig({
  jekyll_post: {
    option: {
      drafts: false
    },
    questions: [
      {
        config: 'title',
        message: 'Title?',
        default: 'Your Default Title'
      },
      {
        config: 'author',
        message: 'Author?',
        default: 'Your Default Author'
      }
    ]
  },
});
```

## Release History
* __0.2.0__ - 19 April 2016 - Moved `questions` property out of `options` and added new options.
* __0.1.3__ - 17 April 2016 - Fixed up the docs
* __0.1.2__ - 15 April 2016 - Task now finishes properly
* __0.1.1__ - 15 April 2016 - Removed some unnecessary dependencies
* __0.1.0__ - 15 April 2016 - First version