import { AbstractFile } from '../../common/types';
import { FileTree } from '../../common/ui/FileTree';
import { dispatchSelectFileFromTree } from '../actions/selectFileFromTree';


export class CandomedFileTree extends FileTree  {
   setSelectedFile(selectedFile: AbstractFile){
     dispatchSelectFileFromTree(selectedFile.fileName)
  }
}
