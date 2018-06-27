import { ProgramFile } from '../../programProvider';
import { getCurrentExample } from '../../manager';

let selectedFile:ProgramFile

export function getSelectedFile():ProgramFile{
  return selectedFile || getCurrentExample().exampleSource
}

export function setSelectedFile(f: ProgramFile){ 
  selectedFile=f
}

