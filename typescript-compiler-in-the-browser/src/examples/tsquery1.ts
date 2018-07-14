import { Example, ExampleExecutionOptions } from '../compiler/types';
import { log } from '../compiler/util/uiUtil';
import { getFiles } from './exampleFilesManager';
import { tsquery } from '@phenomnomnominal/tsquery';


(window as any).__require_before_monaco  = require

export default class implements Example {

  execute = (options: ExampleExecutionOptions) => {
    options.program.getSourceFiles().forEach(sourceFile => {
      const ast = tsquery.ast(sourceFile.getText())
      const nodes = tsquery(ast, 'Identifier[name="Animal"]')
      log(`Identifier[name="Animal"] count: ${nodes.length}`)
    })
  }

  id = 'tsquery1'
  name = 'tsquery example 1'
  description = 'Example of using tsquery: https://github.com/phenomnomnominal/tsquery'
  files = getFiles().filter(f => f.fileName.includes(`files/${this.id}`))
  exampleSource = getFiles().find(f => f.fileName.includes(`examples/${this.id}`))
}
