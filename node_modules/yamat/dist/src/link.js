"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const path_1 = require("path");
function link(yamatConfig) {
    yamatConfig.rootPath = yamatConfig.rootPath || '.';
    yamatConfig.rootPath = path_1.resolve(yamatConfig.rootPath);
    const config = util_1.getConfig(yamatConfig);
    config.forEach(c => {
        const pj = util_1.parsePackageJson(yamatConfig, c.path);
        modifyJSONDeps(pj, 'dependencies', config, c);
        modifyJSONDeps(pj, 'devDependencies', config, c);
        util_1.writePackageJson(yamatConfig, c.path, pj);
    });
    console.log('Packages successfully linked!');
}
exports.link = link;
function modifyJSONDeps(pj, propertyName, config, c) {
    Object.keys(pj[propertyName] || {})
        .filter(d => config.find(c => c.name === d))
        .forEach(d => {
        const found = config.find(c => c.name === d);
        if (found) {
            pj[propertyName][d] = 'file:' + path_1.relative(c.path, found.path);
        }
    });
}
//# sourceMappingURL=link.js.map