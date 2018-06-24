
import { Example , ExampleExecutionOptions } from '../types';
import { log } from '../ui/uiUtil';
import { getFiles } from './exampleFilesManager';
import * as tsSampleProjectFiles from './projectsJson/ts-sample-project.json'

// console.log(JSON.stringify(tsSampleProjectFiles, null, 2))
export default class implements Example {
  id = 'loadProjectJsonTest1'
  name = 'loadProjectJsonTest1'
  description = 'Loading a whole project folder previously serialized with fs-to-json tool'
  files = (tsSampleProjectFiles as any).files//.filter(f=>!['tsconfig.json', 'package.json'].includes(f.fileName))
  // tsConfigFile = (tsSampleProjectFiles as any).files.find(f=>f.fileName==='tsconfig.json')
  // packageJsonFile = (tsSampleProjectFiles as any).files.find(f=>f.fileName==='tsconfig.json')
  exampleSource = getFiles().find(f => f.fileName.includes(`examples/${this.id}`))
  execute = (options: ExampleExecutionOptions) => {
    // log(JSON.stringify(tsSampleProjectFiles, null, 2))
  }
  
}
