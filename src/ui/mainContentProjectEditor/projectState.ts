import { ProgramFile } from '../../programProvider';

let selectedFile:ProgramFile

export function getSelectedFile():ProgramFile{return selectedFile}

export function setSelectedFile(f: ProgramFile){ selectedFile=f}

