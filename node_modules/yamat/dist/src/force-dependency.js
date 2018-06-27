"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { pwd } from "shelljs";
const path_1 = require("path");
const util_1 = require("./util");
const exec = require('executive');
async function forceLatestDependencies(forceConfig) {
    const results = [];
    const config = util_1.getConfig(forceConfig);
    config.forEach(async (c) => {
        const pj = util_1.parsePackageJson(forceConfig, c.path);
        if (forceConfig.exclude !== 'dependencies') {
            const result = await modifyJSONDeps(pj, 'dependencies', forceConfig, c);
            results.push(result);
        }
        if (forceConfig.exclude !== 'dev-dependencies') {
            const result = await modifyJSONDeps(pj, 'devDependencies', forceConfig, c);
            results.push(result);
        }
        util_1.writePackageJson(forceConfig, c.path, pj);
    });
    // console.log(`Results of forceLatestDependencies command:\n${JSON.stringify(results, null, 2)}`) // TODO: console.log should be responsibility of cli
    return results;
}
exports.forceLatestDependencies = forceLatestDependencies;
async function modifyJSONDeps(pj, propertyName, forceConfig, c) {
    const config = util_1.getConfig(forceConfig);
    const result = [];
    Object.keys(pj[propertyName] || {})
        .filter(d => !config.find(c => c.name === d))
        .forEach(async (d) => {
        const cmd = `npm show ${d} version --json`;
        console.log(`dependency ${d} executing command ${cmd}`);
        const p = await exec(cmd);
        console.log(`dependency ${d} command ${cmd} ended with status ${p.status}`);
        if (p.status) {
            result.push({ cmd, package: d, errorCause: `Command "${cmd}" failed with return status ${p.status}` });
            return;
        }
        const parsed = util_1.parseJSON(p.stdout.toString());
        if (parsed instanceof Error) {
            result.push({ cmd, package: d, errorCause: `Cannot parse response of "${cmd}" command: ${p.stdout.toString()}` });
            return;
        }
        const currentVersion = pj[propertyName][d] + '';
        const parsedVersion = parsed + '';
        if (!currentVersion.endsWith(parsedVersion)) { // cause current could have tildes, etc
            const prefix = path_1.resolve(util_1.getPackagePath(forceConfig, c.path));
            const cmd2 = `npm install --no-color --no-progress --prefix "${prefix}" ${propertyName === 'dependencies' ? '--save' : '--save-dev'} ${d}@${parsedVersion}`;
            console.log(`dependency ${d} executing command ${cmd2}`);
            const p2 = await exec(cmd2);
            console.log(`dependency ${d} command ${cmd2} ended with status ${p2.status}`);
            if (p2.status) {
                result.push({ cmd: cmd2, package: d, errorCause: `Command "${cmd2}" failed with return status ${p2.status}` });
                return;
            }
            result.push({ cmd: cmd2, package: d, newVersion: parsedVersion, oldVersion: currentVersion });
        }
    });
    return result;
}
//# sourceMappingURL=force-dependency.js.map