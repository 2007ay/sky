/**
 * outer server wrapper
 */
/*jshint esnext: true */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global require, module*/

var fs = require('fs');
var copydir = require('copy-dir');

class TaskRunner {
  constructor() {
    this.root = 'dist';
    this.public = "public";
    this.destConfigFiles = './dist/config/';
    this.destUIBuild = './dist/public';
    console.log('started...');
  }
  run() {
    console.log("old build clear");
    this.copyUIBuild();
  }
  createdDir(dir) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  }
  copyConfig() {
    try {
      this.createdDir(this.destConfigFiles);
      copydir.sync('./config/', this.destConfigFiles);
      console.log('config files copied!');
    } catch (error) {
      console.error('error while copying config: ', error);
    }
  }

  copyUIBuild() {
    try {
      copydir.sync('../client/build/', this.public);
      console.log('ui proj files copied!');
    } catch (error) {
      console.error('error while data files: ', error);
    }
  }
}

let _taskRunner = new TaskRunner();
_taskRunner.run();
