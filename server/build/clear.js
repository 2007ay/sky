/**
 * outer server wrapper
 */
/*jshint esnext: true */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global require, module*/

var fs = require('fs');
class BuildClear {
    constructor() {
        this.root = 'dist';
        this.uiFolder = "public";
        console.log('process started...');
    }
    run() {
        this.deleteFolderRecursive(this.root);
        this.deleteFolderRecursive(this.uiFolder);
        console.info('old build cleared...');
    }
    deleteFolderRecursive(path) {
        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach((file, index) => {
                var curPath = path + "/" + file;
                if (fs.lstatSync(curPath).isDirectory()) { // recurse
                    this.deleteFolderRecursive(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    }
}

let _taskRunner = new BuildClear();
_taskRunner.run();