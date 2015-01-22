/*
 * grunt-coffeedocb
 * https://github.com/admire93/grunt-coffeedocb
 *
 * Copyright (c) 2015 Kang Hyojun
 * Licensed under the MIT license.
 */

'use strict';


module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('coffeedocb', 'The best Grunt plugin ever.', function() {
    require('coffee-script/register');

    var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
    var fs = require('fs');
    var path = require('path')
    var coffeedocsrc = __dirname + '/../node_modules/coffeedoc/src';
    var coffeedoc = require(coffeedocsrc + '/coffeedoc');
    var parsers = require(coffeedocsrc + '/parsers');
    var renderers = require(coffeedocsrc + '/renderers');


    var cls, clspath, coffeedoc, fs, getSourceFiles, i, idx, ignore, index, module, moduleNames, modulepath, modules, o, opts, parser, parsercls, parsers, path, prefix, rendercls, renderer, rendererOpts, renderers, rm, s, script, source, sources, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
    var argv = this.options({
      output: 'docs',
      ignore: '',
      stdout: '',
      renderer: 'html',
      hidePrivate: false,
      parser: 'commonjs',
      indexTemplate: '',
      moduleTemplate: '',
      src: ['.']
    });

    argv._ = argv.src

    rendercls = renderers[argv.renderer] || require(argv.renderer);
    if (rendercls == null) {
      grunt.fail.warn("Invalid renderer: " + argv.renderer + "\n");
      return false;
    }
    rendererOpts = {
      hideprivate: argv['hidePrivate']
    };
    if (argv.indexTemplate) {
      rendererOpts.indexTemplate = fs.readFileSync(argv.indexTemplate, 'utf-8');
    }
    if (argv.moduleTemplate) {
      rendererOpts.moduleTemplate = fs.readFileSync(argv.moduleTemplate, 'utf-8');
    }
    renderer = new rendercls(rendererOpts);
    parsercls = parsers[argv.parser] || require(argv.parser);
    if (parsercls == null) {
      grunt.fail.warn("Invalid parser: " + argv.parser + "\n");
      return false;
    }
    parser = new parsercls();
    if (argv.stdout) {
      argv.output = null;
    }
    if (argv.ignore != null) {
      if (Array.isArray(argv.ignore)) {
        ignore = argv.ignore;
      } else {
        ignore = [argv.ignore];
      }
    } else {
      ignore = [];
    }
    ignore = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = ignore.length; _i < _len; _i++) {
        i = ignore[_i];
        _results.push(path.resolve(i));
      }
      return _results;
    })();
    sources = [];
    getSourceFiles = function(target) {
      var p, _i, _len, _ref, _ref1, _results;
      if (_ref = path.resolve(target), __indexOf.call(ignore, _ref) >= 0) {
        return;
      }
      if (path.extname(target) === '.coffee') {
        return sources.push(target);
      } else if (fs.statSync(target).isDirectory()) {
        _ref1 = fs.readdirSync(target);
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          p = _ref1[_i];
          _results.push(getSourceFiles(path.join(target, p)));
        }
        return _results;
      }
    };
    _ref = argv._;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      o = _ref[_i];
      getSourceFiles(o);
    }
    sources.sort();
    modules = [];
    moduleNames = (function() {
      var _j, _len1, _results;
      _results = [];
      for (_j = 0, _len1 = sources.length; _j < _len1; _j++) {
        s = sources[_j];
        _results.push(s.replace(/\.coffee$/, ''));
      }
      return _results;
    })();
    for (idx = _j = 0, _len1 = sources.length; _j < _len1; idx = ++_j) {
      source = sources[idx];
      script = fs.readFileSync(source, 'utf-8');
      module = coffeedoc.documentModule(script, parser);
      module.path = source;
      module.basename = path.basename(source);
      _ref1 = module.classes;
      for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
        cls = _ref1[_k];
        if (cls.parent) {
          clspath = cls.parent.split('.');
          if (clspath.length > 1) {
            prefix = clspath.shift();
          } else {
            prefix = clspath[0];
          }
          if (prefix in module.deps) {
            modulepath = module.deps[prefix];
            if (_ref2 = path.join(path.dirname(source), modulepath), __indexOf.call(moduleNames, _ref2) >= 0) {
              cls.parentModule = modulepath;
              cls.parentName = clspath.join('.');
            }
          }
        }
      }
      modules.push(module);
    }
    index = renderer.renderIndex(modules);
    if (!argv.output) {
      process.stdout.write(index);
      process.exit();
    }
    if (fs.existsSync(argv.output)) {
      rm = function(target) {
        var p, _l, _len3, _ref3;
        if (fs.statSync(target).isDirectory()) {
          _ref3 = fs.readdirSync(target);
          for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
            p = _ref3[_l];
            rm(path.join(target, p));
          }
          return fs.rmdirSync(target);
        } else {
          return fs.unlinkSync(target);
        }
      };
      rm(argv.output);
    }
    fs.mkdirSync(argv.output, '755');
    fs.writeFile(path.join(argv.output, renderer.indexFile + renderer.extension), index);
    renderer.writeModules(modules, argv.output);

  });

};
