/*global describe, before, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('gulp-less-jade', function () {

  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        generate: true
      })
      .on('end', done);
  });

  it('creates package files', function () {
    assert.file([
      'bower.json',
      'package.json'
    ]);
  });

  it('creates dot files', function () {
    assert.file([
      '.editorconfig',
      '.jshintrc',
      '.bowerrc',
      '.gitignore',
      '.gitattributes'
    ]);
  });

  it('creates gulp file', function () {
    assert.file('gulpfile.js');
  });

  it('creates app files', function () {
    assert.file([
      'src/views/index.jade',
      'src/views/layout.jade',
      'src/styles/main.less',
      'src/images/github.svg',
      'src/images/github.png'
    ]);
  });
});
