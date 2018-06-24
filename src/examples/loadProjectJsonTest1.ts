
import { Example , ExampleExecutionOptions } from '../types';
import { log } from '../util/uiUtil';
import { getFiles } from './exampleFilesManager';
import * as tsSampleProjectFiles from './projectsJson/ts-sample-project.json'

export default class implements Example {
  id = 'loadProjectJsonTest1'
  name = 'loadProjectJsonTest1'
  description = 'Loading a whole project folder previously serialized with fs-to-json tool'
  files = (tsSampleProjectFiles as any).files
  exampleSource = getFiles().find(f => f.fileName.includes(`examples/${this.id}`))
  execute = (options: ExampleExecutionOptions) => {
      log('Nothing special, just checking how well monaco-editor handle the files as a project...')
  }
  
}
