import { AbstractFile, AbstractProject } from 'monaco-typescript-project-util';

export interface Project extends AbstractProject{
  files: ProjectFile[]
}

export interface ProjectFile extends AbstractFile{
  expanded?: boolean
}
