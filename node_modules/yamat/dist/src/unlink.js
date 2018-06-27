"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const pack_1 = require("./pack");
const path_1 = require("path");
var UnlinkVersion;
(function (UnlinkVersion) {
    /** put te version from local package.json. Default */
    UnlinkVersion["local"] = "local";
    /** build current package with npm pack and point the version to that .tgz */
    UnlinkVersion["pack"] = "pack";
    /** put the version of latest version of package in npm  */
    UnlinkVersion["npm"] = "npm";
})(UnlinkVersion = exports.UnlinkVersion || (exports.UnlinkVersion = {}));
function unlink(unlinkConfig) {
    unlinkConfig.rootPath = unlinkConfig.rootPath || '.';
    unlinkConfig.rootPath = path_1.resolve(unlinkConfig.rootPath);
    unlinkConfig.version = unlinkConfig.version || UnlinkVersion.local;
    const config = util_1.getConfig(unlinkConfig);
    config.forEach(c => {
        const pj = util_1.parsePackageJson(unlinkConfig, c.path);
        modifyJSONDeps(pj, 'dependencies', unlinkConfig);
        modifyJSONDeps(pj, 'devDependencies', unlinkConfig);
        util_1.writePackageJson(unlinkConfig, c.path, pj);
    });
    console.log('Packages successfully un-linked!');
}
exports.unlink = unlink;
function modifyJSONDeps(pj, propertyName, unlinkConfig) {
    const config = util_1.getConfig(unlinkConfig);
    Object.keys(pj[propertyName] || {})
        .filter(d => config.find(c => c.name === d))
        .forEach(d => {
        if (unlinkConfig.version === UnlinkVersion.local) {
            const targetConfig = config.find(c => c.name === d);
            if (targetConfig) {
                pj[propertyName][d] = util_1.parsePackageJson(unlinkConfig, targetConfig.path).version;
            }
        }
        else if (unlinkConfig.version === UnlinkVersion.pack) {
            // TODO: we might be exec npm pack several times for the same package !!! too slow!
            const targetConfig = config.find(c => c.name === d);
            if (targetConfig) {
                const targetTgz = path_1.resolve(pack_1.newone(unlinkConfig, targetConfig));
                // we want absolute urls so dependencies of dependencies inside .tgz work! relative won't work in that case
                pj[propertyName][d] = targetTgz;
            }
        }
        else if (unlinkConfig.version === UnlinkVersion.npm) {
            throw new Error('Not implemented yet');
        }
        else {
            throw new Error('unlink version unknown ' + unlinkConfig.version);
        }
    });
}
//# sourceMappingURL=unlink.js.map