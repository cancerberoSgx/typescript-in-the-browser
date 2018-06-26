import { FileTree } from '../../common/ui/FileTree';
import { AbstractFile } from '../../common/types';
import { getState } from '../State';
import { render } from '../main';


export class CandomedFileTree extends FileTree  {
   setSelectedFile(selectedFile: AbstractFile){
     //TODO: redux reducers & actions
     getState().selectedFile=selectedFile
     render()
  }
}
