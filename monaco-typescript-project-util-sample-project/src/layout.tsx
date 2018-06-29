import { AbstractProject, Editor, AbstractFile } from 'monaco-typescript-project-util';
import React from 'react';
import projectFiles from './projectFiles';


export default (project:AbstractProject, file: AbstractFile, height: string='800px')=>
<div>
  <div className="wrapper">
    {projectFiles(project)}
    <div className="editor">
      <Editor file={file} width="100%" height={height} />
    </div>
  </div>
</div> 
