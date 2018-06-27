import { AbstractFile, AbstractProject } from '../common/types';

export interface Project extends AbstractProject{
  files: ProjectFile[]
}

export interface ProjectFile extends AbstractFile{
  expanded?: boolean
}
