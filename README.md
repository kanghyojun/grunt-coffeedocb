# grunt-coffdocb

[coffeedoc] plugin

[coffeedoc]: https://github.com/omarkhan/coffeedoc

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-coffdocb --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-coffdocb');
```

## The "coffdocb" task

### Overview
In your project's Gruntfile, add a section named `coffdocb` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  coffdocb: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.output
Type: `String`
Default value: `'docs'`

Set output directory.

#### options.ignore
Type: `Array`

Files or directories to ignore.

#### options.stdout
Type: `String`

Direct all output to stdout instead of files.

#### options.hidePrivate
type: `Boolean`
Default value: `false`

Do not document methods beginning with an underscore.

#### options.parser
type: `String`
Default value: `'commonjs'`

Parser to use. Built-in parsers: commonjs, requirejs

#### options.renderer
Type: `String`
Default value: `'html'`

Renderer to use. Built-in renderers: html, gfm, json

#### options.indexTemplate
Type: `String`

Override the default index template for the selected renderer.

#### options.moduleTemplate
Type: `String`

Override the default module template for the selected renderer

#### options.src
Type: `Array`
Default value: `['.']`

file sources want to generate documents.

### Usage Examples

```js
grunt.initConfig({
  coffeedocb: {
    options: {
      output: 'mydocs',
      src: ['test/fixtures/test.coffee'],
    },
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
