export interface YamatConfig {
    /** path to root project  by default it is pwd() */
    rootPath?: string;
    /** path to of yamat.json file. by default is pwd()+'yamat.json' */
    yamatJsonFile?: string;
}
/** one entry in the array in yamat.json */
export interface ConfigEntry {
    name: string;
    path: string;
}
