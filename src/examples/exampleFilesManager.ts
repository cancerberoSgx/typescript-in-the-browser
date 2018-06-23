import {readFileSync, readdir, readdirSync} from 'fs'
import { join, resolve } from 'path';
import { ProgramFile } from '../programProvider';
import { log } from '../ui/log';

// const root = resolve('.')
const a = [
  {fileName: resolve('.')+'/dist/../src/examples/files/tsTranspilingProject1/someImpl.ts', 
  content: readFileSync(resolve('.')+'/dist/../src/examples/files/tsTranspilingProject1/someImpl.ts').toString()},
  {fileName:resolve('.')+'/dist/../src/examples/files/tsTranspilingProject1/someModel.ts', 
  content: readFileSync(resolve('.')+'/dist/../src/examples/files/tsTranspilingProject1/someModel.ts').toString()},
  {fileName:resolve('.')+'/src/examples/files/tsTranspilingProject1/someUI.ts', 
  content:  readFileSync(resolve('.')+'/src/examples/files/tsTranspilingProject1/someUI.tsx').toString()},

]


// , open '/home/sg/git/typescript-in-the-browser/src/examples/files/tsTranspilingProject1/someModel.ts' while parsing file: /home/sg/git/typescript-in-the-browser/dist/src/examples/exampleFilesManager.js


// /home/sg/git/typescript-in-the-browser/src/examples/files/tsTranspilingProject1/someModel.ts
// /home/sg/git/typescript-in-the-browser/src/examples/files/tsTranspilingProject1/someModel .ts
// /home/sg/git/typescript-in-the-browser/src/examples/files/tsTranspilingProject1/someModel.ts
log(JSON.stringify(a))
export const getFileContent = ():any=>{}
// import { resolve } from 'url';



