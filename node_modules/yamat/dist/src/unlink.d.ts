import { YamatConfig } from "./types";
export declare enum UnlinkVersion {
    /** put te version from local package.json. Default */
    local = "local",
    /** build current package with npm pack and point the version to that .tgz */
    pack = "pack",
    /** put the version of latest version of package in npm  */
    npm = "npm"
}
export interface UnlinkConfig extends YamatConfig {
    version?: UnlinkVersion;
}
export declare function unlink(unlinkConfig: UnlinkConfig): void;
