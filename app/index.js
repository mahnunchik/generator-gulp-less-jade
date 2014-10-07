'use strict';

var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var GulpLessJadeGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the amazing GulpLessJade generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'generate',
      message: 'Would you like to generate Gulp Less Jade app?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      if (!props.generate) {
        return;
      }
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.dest.mkdir('src');
      this.dest.mkdir('src/views');
      this.dest.mkdir('src/styles');
      this.dest.mkdir('src/images');

      this.src.copy('views/layout.jade', 'src/views/layout.jade');
      this.src.copy('views/index.jade', 'src/views/index.jade');

      this.src.copy('images/github.svg', 'src/images/github.svg');
      this.src.copy('images/github.png', 'src/images/github.png');

      this.src.copy('styles/main.less', 'src/styles/main.less');

      this.template('_package.json', 'package.json');
      this.template('_bower.json', 'bower.json');

      this.template('_gulpfile.js', 'gulpfile.js');
    },

    dotfiles: function () {
      this.src.copy('gitignore', '.gitignore');
      this.src.copy('gitattributes', '.gitattributes');
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
      this.src.copy('bowerrc', '.bowerrc');
    }
  },

  end: function () {
    var howToInstall = '\nInstall dependencies by running `npm install & bower install`';
    if (this.options['skip-install']) {
      this.log(howToInstall);
      return;
    }

    this.installDependencies();
  }
});

module.exports = GulpLessJadeGenerator;
