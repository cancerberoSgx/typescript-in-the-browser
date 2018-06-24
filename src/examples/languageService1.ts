import { Example, ExampleExecutionOptions } from '../types';
import { log } from '../util/uiUtil';
import { getFiles } from './exampleFilesManager';



export default class implements Example {
  id = 'languageService1'
  name = 'Language Service getApplicableRefactors'
  description = "Calling getApplicableRefactors from the Language Service"
  files = [{
    fileName: 'file1.ts', content: `const a = 1
const b = a+1+2+3`}]
  exampleSource = getFiles().find(f => f.fileName.includes(`examples/${this.id}`))
  execute = (options: ExampleExecutionOptions) => {

    const range = { pos: 0, end: 11 }
    const applicableRefactors = options.languageService.getApplicableRefactors('file1.ts', range, { allowTextChangesInNewFiles: true, disableSuggestions: false, includeCompletionsForModuleExports: true, includeCompletionsWithInsertText: true })
    log(`applicableRefactors descriptions in range ${range.pos},${range.end} (substring: ${options.program.getSourceFile('file1.ts').getText().substring(range.pos, range.end)}) : 

"${applicableRefactors.map(r => r.description).join(', ')}"
`)

    log('All applicable Refactors found: \n')
    const text = options.program.getSourceFile('file1.ts').getText()
    for (let i = 0; i < text.length; i++) {
      for (let j = i; j < text.length; j++) {
        const applicableRefactors = options.languageService.getApplicableRefactors('file1.ts', { pos: i, end: j }, { allowTextChangesInNewFiles: true, disableSuggestions: false, includeCompletionsForModuleExports: true, includeCompletionsWithInsertText: true })
        if (applicableRefactors && applicableRefactors.length) {
          log(`${i},${j} "${text.substring(i, j)}" ${applicableRefactors.map(r => r.description).join(', ')}`)
        }

      }
    }
  }

}
