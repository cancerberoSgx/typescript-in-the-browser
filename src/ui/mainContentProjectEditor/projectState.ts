import { ProgramFile } from '../../programProvider';
import { getCurrentExample } from '../../examples';

let selectedFile:ProgramFile

export function getSelectedFile():ProgramFile{
  return selectedFile || getCurrentExample().exampleSource
}

export function setSelectedFile(f: ProgramFile){ 
  selectedFile=f
}

