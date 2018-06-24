
import * as ts from 'typescript';
import { Example , ExampleExecutionOptions } from '../types';
import { log } from '../ui/log';
import { getFiles } from './exampleFilesManager';
import { tsquery } from '@phenomnomnominal/tsquery';


export default class implements Example {
  id = 'tsquery1'
  name = 'tsquery example 1'
  description = 'Example of using tsquery: https://github.com/phenomnomnominal/tsquery'
  files = getFiles().filter(f => f.fileName.includes(`files/${this.id}`))
  exampleSource = getFiles().find(f => f.fileName.includes(`examples/${this.id}`))
  execute = (options: ExampleExecutionOptions) => {
    options.program.getSourceFiles().forEach(sourceFile=>{
      const ast = tsquery.ast(sourceFile.getText())
      const nodes = tsquery(ast, 'Identifier[name="Animal"]')
      log(`Identifier[name="Animal"] count: ${nodes.length}`)
    })
  }
  
}
