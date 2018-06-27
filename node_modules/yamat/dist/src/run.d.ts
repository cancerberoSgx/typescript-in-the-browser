import { YamatConfig } from ".";
/**
 * Runs given command on each package serially.
 *
 * By default it will run them all no matter if there are errors (some command ends with exit code
 * different than zero) and list each commend errors in a final report. If --breakOnError is passed
 * in which case it will break on first commend error and exit with the same command exit code.
 */
export declare function run(runConfig: RunConfig): void;
export interface RunConfig extends YamatConfig {
    cmd: string;
    breakOnError: boolean;
}
