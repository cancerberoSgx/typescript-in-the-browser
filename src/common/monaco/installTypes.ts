import { AbstractFile, AbstractProject } from '../types';
import { fetchFileText } from '../util/fetchUtil';
import { getMonaco } from './monacoFacade';
/**
 * get all @types dependencies from package.json and query https://unpkg.com/@types/... to download its index.d.ts
 * then instruct monaco to add them
 * 
 * TODO: there could be dependencies that dont need @type we should query all by package.json and see its typing property
 */
export function installTypes(project: AbstractProject) {
  let pj: AbstractFile
  if (!project || !project.files || !(pj = project.files.find(f => f.fileName === 'package.json'))) {
    return Promise.resolve()
  }
  const packageJSON = JSON.parse(pj.content)
  let deps: {name: string, version: string}[] = []
  Object.keys(packageJSON.dependencies||{}).filter(k => k.startsWith('@types'))
    .forEach(d => deps.push({ name: d, version: packageJSON.dependencies[d] }))
  Object.keys(packageJSON.devDependencies||{}).filter(k => k.startsWith('@types'))
    .forEach(d => deps.push({ name: d, version: packageJSON.devDependencies[d] }))
  deps = heuristicSort(deps)
  Promise.all(deps.map(d => fetchFileText(`https://unpkg.com/${d.name}@${d.version}/index.d.ts`))).then(depsResponses => {
    depsResponses.forEach((text, i) => {
      const d = deps[i]
      const fname = `node_modules/@types${d.name.substring('@types'.length, d.name.length)}/index.d.ts`
      getMonaco().languages.typescript.typescriptDefaults.addExtraLib(text, fname)
    })
  }).catch(ex => console.log(ex))
}

function heuristicSort(deps: { name: string, version: string }[]) {
  const n = deps.findIndex(d => d.name.startsWith('@types/node'))
  if (n != -1) {
    const aux = deps[0]
    deps[0] = deps[n]
    deps[n] = aux
  }
  return deps
}

