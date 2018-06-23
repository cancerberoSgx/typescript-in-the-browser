import { readFileSync, readdir, readdirSync } from 'fs'
import { join, resolve } from 'path';
import { ProgramFile } from '../programProvider';
import { log } from '../ui/log';

//TODO: windows build probably will fail 
// heads up - files are read at compile time with brfs - modify this only if you know what you are doing. 
const files = [
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
]
.map(f=>Object.assign(f, {fileName: f.fileName.replace('//dist/../src/examples/files/', '')}))

export function getFiles(): ProgramFile[]{
  // debugger;
  return files
}
// log(JSON.stringify(files, null, 2))
export function getFileContent(fileName: string): string|undefined {
  const f = files.find(f=>f.fileName===fileName)
  return f ? f.content : undefined
}



