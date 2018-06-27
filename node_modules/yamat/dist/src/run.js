"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const shelljs_1 = require("shelljs");
const util_1 = require("./util");
/**
 * Runs given command on each package serially.
 *
 * By default it will run them all no matter if there are errors (some command ends with exit code
 * different than zero) and list each commend errors in a final report. If --breakOnError is passed
 * in which case it will break on first commend error and exit with the same command exit code.
 */
function run(runConfig) {
    console.log(`Running in all packages command : ${JSON.stringify(runConfig)}`);
    const originalDir = shelljs_1.pwd();
    const config = util_1.getConfig(runConfig);
    const results = [];
    config.forEach(c => {
        shelljs_1.cd(runConfig.rootPath + path_1.sep + c.path);
        const code = shelljs_1.exec(runConfig.cmd).code;
        if (code !== 0) {
            console.error(`ERROR while trying to execute command "${runConfig.cmd}" in ${c.path}`);
            if (runConfig.breakOnError) {
                process.exit(code);
            }
        }
        else {
            console.log(`Command "${runConfig.cmd}" finish successfully in ${c.path}`);
        }
        results.push({ cmd: runConfig.cmd, path: c.path, code });
        shelljs_1.cd(originalDir);
    });
    if (results.length && results.find(r => r.code !== 0)) {
        console.error(`\nERRORs thrown when executing the following commands on some packages: 
${JSON.stringify(results.filter(r => r.code !== 0), null, 2)}
    `);
    }
    else {
        console.log(`Command "${runConfig.cmd}" successfully run in all packages without errors`);
    }
}
exports.run = run;
//# sourceMappingURL=run.js.map