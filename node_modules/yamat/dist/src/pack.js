"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shelljs_1 = require("shelljs");
const util_1 = require("./util");
const assert_1 = require("assert");
const path_1 = require("path");
/**
 * creates the pack file  for given targetConfig and return the path to the tgz
 */
function newone(config, targetConfig) {
    const cwd = shelljs_1.pwd();
    shelljs_1.cd(util_1.getInternalFolder(config));
    shelljs_1.rm('-rf', targetConfig.name + '-*.tgz');
    const p = shelljs_1.exec('npm pack ' + util_1.getPackagePath(config, targetConfig.path));
    assert_1.ok(p.code === 0);
    const tgzs = shelljs_1.ls(targetConfig.name + '-*.tgz');
    assert_1.ok(tgzs.length === 1);
    shelljs_1.cd(cwd);
    return path_1.join(util_1.getInternalFolder(config), tgzs[0]);
}
exports.newone = newone;
//# sourceMappingURL=pack.js.map