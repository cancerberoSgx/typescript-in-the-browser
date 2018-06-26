import { AbstractFile, AbstractProject } from '../common/types';

export interface Project extends AbstractProject{
  files: AbstractFile[]
}

export interface ProjectFile extends AbstractFile{

}