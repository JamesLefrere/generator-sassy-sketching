'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var SassySketchingGenerator = module.exports = function SassySketchingGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(SassySketchingGenerator, yeoman.generators.Base);

SassySketchingGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    type: 'input',
    name: 'sketchName',
    message: 'What is the name of the sketch?',
    default: true
  }, {
    type: 'confirm',
    name: 'singularity',
    message: 'Import Singularity grid system?',
    default: true
  }, {
    type: 'input',
    name: 'maxWidth',
    message: 'What should the wrapper max-width be (specify units)?',
    default: '1120px'
  }, {
    // Todo: only ask for this if singularity enabled
    type: 'input',
    name: 'columns',
    message: 'How many grid columns should there be?',
    default: 16
  }
  ];

  this.prompt(prompts, function (props) {
    this.sketchName = props.sketchName;
    this.singularity = props.singularity;
    this.maxWidth = props.maxWidth;
    this.columns = props.columns;
    cb();
  }.bind(this));
};

SassySketchingGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/templates');
  this.mkdir('app/sass');
  this.mkdir('dist');

  this.template('gulpfile.js', 'gulpfile.js');
  this.template('_index.html', 'index.html');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
};

SassySketchingGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
