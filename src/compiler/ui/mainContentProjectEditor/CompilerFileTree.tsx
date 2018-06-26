import { setSelectedFile } from './../mainContentProjectEditor/projectState';
import { render } from '../../main';
import { AbstractProject, AbstractFile } from '../../../common/types';
import { FileTree } from '../../../common/ui/FileTree';

export class CompilerFileTree extends FileTree  {
   setSelectedFile(selectedFile: AbstractFile){
    setSelectedFile(selectedFile)
      render()
  }

}
