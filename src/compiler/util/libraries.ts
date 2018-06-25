import { readFileSync } from 'fs';
import { resolve } from 'path';
import { ProgramFile } from '../programProvider';

const libraries = [
  {
  fileName: 'node_modules/typescript/lib/lib.d.ts', 
  content: ' '//readFileSync(resolve('.')+'/node_modules/typescript/lib/lib.d.ts').toString()
}
]

export function getLibraries():ProgramFile[]{
  return libraries
}
// const libDTs = readFileSync(resolve('.')+'node_modules/typescript/lib/lib.d.ts').toString()