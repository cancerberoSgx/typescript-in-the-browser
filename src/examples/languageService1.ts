
import { Example, ExampleExecutionOptions } from '../types';
import { getFiles } from './exampleFilesManager';
import * as ts from 'typescript'



export default class implements Example {
  id = 'languageService1'
  name = 'Language Service apply built in plugins'
  description = "Apply built in Language Service plugins"
  files = [{fileName: 'file1.ts', content: `const a = 1
const b = a+1+2+3`}]
  exampleSource = getFiles().find(f => f.fileName.includes(`examples/${this.id}`))
  execute = (options: ExampleExecutionOptions) => {
   
    // function createLanguageService(host: LanguageServiceHost, documentRegistry?: DocumentRegistry, syntaxOnly?: boolean): LanguageService;
    options.program.getSourceFile('file1.ts').la
  }
  
}
