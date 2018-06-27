"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function helpAndExit(code = 0) {
    help();
    process.exit(code);
}
exports.helpAndExit = helpAndExit;
function help() {
    console.log(`
Usage examples: 

yamat link

yamat unlink [--version pack]

Runs "npm run build" command on all packages. Don't break if there's an error and prints a final report

yamat run npm run build 

Runs "npm run build" command on all packages.  Stop executing in the rest of the packages if there's an error and prints a final report:

yamat --break-on-error no run npm run build 

Upgrade all dependencies in al packages to latest version found in npmjs.org: 

yamat forceDependenciesLatest

`);
}
//# sourceMappingURL=help.js.map