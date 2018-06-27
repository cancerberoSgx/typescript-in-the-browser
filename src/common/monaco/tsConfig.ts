
import { AbstractProject } from '../types';
import { getMonaco } from '../../common/monaco/monacoFacade';
import { buildCompilerOptions, getTs } from '../../common/util/tsUtil';
import { fetchFileText } from '../../common/util/fetchUtil';
import { getMonacoModelFor } from './register';


/**
 * set compiled options in monaco defaults from tsconfig.json file in given project
 * also tsconfig lib[] are loaded from https://unpkg.com/typescript@2.9.2/lib/ and added with addExtraLib
 * @param project
 */
export function installTsConfig(project: AbstractProject) {
  const tsconfig = project.files.find(f => f.fileName === 'tsconfig.json')
  if (tsconfig && getTs()) {
    const options = buildCompilerOptions(tsconfig.content)
    const libs = options.lib || []
    getMonaco().languages.typescript.typescriptDefaults.setCompilerOptions(options as any)
    Promise.all(libs.map(l => fetchFileText(`https://unpkg.com/typescript@2.9.2/lib/${l}`))).then(depsResponses => {
      depsResponses.forEach((text, i) => {
        const fileName = `node_modules/typescript/lib/${libs[i]}`
        console.log('addExtraLib url:'+`https://unpkg.com/typescript@2.9.2/lib/${libs[i]} Filename:`+fileName);
        getMonaco().languages.typescript.typescriptDefaults.addExtraLib(text, fileName)
        // getMonacoModelFor({ fileName: fname, content: text })
      })
    })
  }
} 