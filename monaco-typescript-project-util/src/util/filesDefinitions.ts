
  export interface PackageJson {
    name: string;
    version: string;
    description: string;
    main: string;
    typings: string;
    scripts: {[k: string]: string};
    keywords: string[];
    author: string;
    license: string;
    dependencies: {[k: string]: string};
    devDependencies: {[k: string]: string};
}


export interface TsConfigJson {
    compilerOptions: CompilerOptions;
    include: string[];
}

export interface CompilerOptions {
  target: string;
  module: string;
  moduleResolution: string;
  jsx: string;
  jsxFactory: string;
  lib: string[];
  outDir: string;
  rootDir: string;
  strict: boolean;
  strictNullChecks: boolean;
  noImplicitAny: boolean;
  sourceMap: boolean;
  esModuleInterop: boolean;
  declaration: boolean;
  skipLibCheck: boolean;
}