import { AbstractProject, Editor, AbstractFile } from 'monaco-typescript-project-util';
import React from 'react';
import projectFiles from './projectFiles';


export default (project:AbstractProject, file: AbstractFile)=>
<div>
  <div className="wrapper">
    {projectFiles(project, file)}
    <div className="editor">
    {console.log('file: '+file.fileName)||''}
      <Editor file={file} width="100%" height={'800px'} />
    </div>
  </div>
</div> 
