import { AbstractProject } from 'monaco-typescript-project-util';
import React from 'react';


export default (project:AbstractProject)=>
<div className="files">
  <p>{project.name}'s' files: </p>
  <ul>
    {project.files.map(file=>
    <li key={file.fileName}>
      <a href="#">{file.fileName}</a>
    </li>
    )}
  </ul>
</div>
