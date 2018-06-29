export interface AbstractFile {
  fileName: string
  content: string
  isDirectory?: boolean
}

export interface AbstractProject {
  name: string
  files: AbstractFile[]
}

export interface AbstractState{
  project: AbstractProject, selectedFile?: string
}
