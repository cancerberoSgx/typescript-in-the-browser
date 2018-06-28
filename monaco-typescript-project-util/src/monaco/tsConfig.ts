/**
 * tis file is responsible of inspecting tsconfig.json and package.json if any and to identify the nature of the 
 * project and load tsconfig.lib incase of TS or just lib.d.ts in case of JS (See installTypes.ts and comes later 
 * to add more types - this is just lib.d.ts)
 */

import { AbstractProject } from '../types';
import { getMonaco } from './monacoFacade';
import { buildCompilerOptions, getTs } from '../util/tsUtil';
import { fetchFileText } from '../util/fetchUtil';
import * as ts from 'typescript';
import { PackageJson } from '../util/filesDefinitions';
import { monacoAddExtraLibrary } from './installTypes';


/**
 * set compiled options in monaco defaults from tsconfig.json file in given project
 * also tsconfig lib[] are loaded from https://unpkg.com/typescript@2.9.2/lib/ and added with addExtraLib
 * TODO: wait until getTs() is true
 * @param project
 */
export function installTsConfig(project: AbstractProject): Promise<ProjectNature> {
  return new Promise<ProjectNature>(resolve => {
    const nature: ProjectNature = {
      type: 'unknown',
      extraLibAdded: [],
      tsConfig: {
        libs: []
      },
      packageJson: {
        libs: []
      }
    }
    const tsconfig = project.files.find(f => f.fileName === 'tsconfig.json')
    let options: ts.CompilerOptions
    if (tsconfig && getTs()) {
      try {
        options = buildCompilerOptions(tsconfig.content)
      } catch (error) {
        nature.tsConfig.errorLoadingTsConfigJson = error
      }
    }
    if (options) {
      // assume is a TS project. Now proceed to load libs
      nature.type = 'typescript'
      nature.tsConfig.compilerOptions = options
      const libs: string[] = options.lib || []
      try {
        getMonaco().languages.typescript.typescriptDefaults.setCompilerOptions(options as any)

      } catch (ex) {
        nature.tsConfig.monacoSetCompilerOptionsError = ex
      }
      Promise.all(libs.map(l => fetchFileText(`https://unpkg.com/typescript@2.9.2/lib/${l}`)))
        .then(depsResponses => {
          depsResponses.forEach((content, i) => {
            let libResource: ResourceLoaded = monacoAddExtraLibrary(libs[i], content)
            nature.tsConfig.libs.push(libResource)
          })
          resolve(nature)
        }).catch(ex => {
          nature.tsConfig.libsLoadingError = ex
          resolve(nature)
        })
    }
    else {
      // assume is not a TS project. Try to load a package.json file to see if it at least is JS project
      const packageJson = project.files.find(f => f.fileName === 'package.json')
      if (!packageJson) {
        nature.packageJson.exists = false
        return Promise.resolve(nature)
      }
      let pj: PackageJson
      try {
        pj = JSON.parse(packageJson.content)
      } catch (ex) {
        nature.packageJson.errorLoadingPackageJson = ex
        
        resolve(nature)
      }
      // we want to add a tslib.d.ts - TODO: not sure how to guess which version, we load es6
      fetchFileText(`https://unpkg.com/typescript@2.9.2/lib/es2018.d.ts`).then(content => {
        let libResource: ResourceLoaded = monacoAddExtraLibrary('es6.d.ts', content)
        nature.packageJson.libs.push(libResource)
        resolve(nature)
      }).catch(ex => {
        nature.packageJson.libsLoadingError = ex
        resolve(nature)
      })
    }
  })
}



export interface ProjectNature {
  type: 'typescript' | 'javascript' | 'unknown'
  extraLibAdded: Resource[]
  tsConfig: {
    fileName?: string
    errorLoadingTsConfigJson?: Error
    compilerOptions?: ts.CompilerOptions
    libs: ResourceLoaded[]
    libsLoadingError?: Error
    monacoSetCompilerOptionsError?: Error
  }
  packageJson: {
    exists?: boolean,
    errorLoadingPackageJson?: boolean
    libs: ResourceLoaded[]
    libsLoadingError?: Error
  }
}

export interface Resource {
  fileName: string, url: string, content?: string
}
export interface ResourceLoaded extends Resource {
  error?: Error
}