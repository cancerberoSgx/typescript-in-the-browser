
import { Example, ExampleExecutionOptions, ExampleExecutionResult } from '../test';
import { printAllSourceFileAst } from './exampleUtil';
import { getFiles } from './exampleFilesManager';


export default class implements Example {
  id= 'tsTest1'
   name= 'tsSimple1'
    description= 'My first TypeScript API Test in the browser. Just compile a couple of typescript and a tsx file in a small project and visit its chidden printing them -  so far so good'
    execute= (options: ExampleExecutionOptions): ExampleExecutionResult=>{
     
      printAllSourceFileAst(options.program)
      return null
    } 
  files =getFiles().filter(f=>f.fileName.includes('tsTranspilingProject1'))

}
