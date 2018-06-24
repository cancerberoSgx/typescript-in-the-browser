import { readFileSync } from 'fs';
import { resolve } from 'path';
import { ProgramFile } from '../programProvider';

//TODO: windows build probably will fail 
// heads up - files are read at compile time with brfs - modify this only if you know what you are doing. 

const files = [
  {
    fileName: resolve('.') + '/dist/../src/examples/tsTranspilingProject1.ts',
    content: readFileSync(resolve('.') + '/dist/../src/examples/tsTranspilingProject1.ts').toString()
  },
  {
    fileName: resolve('.') + '/dist/../src/examples/files/tsTranspilingProject1/someImpl.ts',
    content: readFileSync(resolve('.') + '/dist/../src/examples/files/tsTranspilingProject1/someImpl.ts').toString()
  },
  {
    fileName: resolve('.') + '/dist/../src/examples/files/tsTranspilingProject1/someModel.ts',
    content: readFileSync(resolve('.') + '/dist/../src/examples/files/tsTranspilingProject1/someModel.ts').toString()
  },
  {
    fileName: resolve('.') + '/dist/../src/examples/files/tsTranspilingProject1/someUI.tsx',
    content: readFileSync(resolve('.') + '/dist/../src/examples/files/tsTranspilingProject1/someUI.tsx').toString()
  },


  {
    fileName: resolve('.') + '/dist/../src/examples/tsSimple1.ts',
    content: readFileSync(resolve('.') + '/dist/../src/examples/tsSimple1.ts').toString()
  },


  {
    fileName: resolve('.') + '/dist/../src/examples/transformation1.ts',
    content: readFileSync(resolve('.') + '/dist/../src/examples/transformation1.ts').toString()
  },
  {
    fileName: resolve('.') + '/dist/../src/examples/files/transformation1/test1.ts',
    content: readFileSync(resolve('.') + '/dist/../src/examples/files/transformation1/test1.ts').toString()
  },
  
  //   {
  //     fileName: resolve('.') + '/dist/../src/examples/tsSimpleAst1.ts',
  //     content: readFileSync(resolve('.') + '/dist/../src/examples/tsSimpleAst1.ts').toString()
  //   },
  //   {
  //     fileName: resolve('.') + '/dist/../src/examples/files/tsSimpleAst1/toRename.ts',
  //     content: readFileSync(resolve('.') + '/dist/../src/examples/files/tsSimpleAst1/toRename.ts').toString()
  //   },

  {
    fileName: resolve('.') + '/dist/../src/examples/typeChecker1.ts',
    content: readFileSync(resolve('.') + '/dist/../src/examples/typeChecker1.ts').toString()
  },
]
  .map(f => Object.assign(f, { fileName: f.fileName.replace('//dist/../src/', '') }))

export function getFiles(): ProgramFile[] {
  return files
}



