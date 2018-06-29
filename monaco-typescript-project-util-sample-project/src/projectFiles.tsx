import { AbstractFile, AbstractProject } from 'monaco-typescript-project-util';
import React, { MouseEvent } from 'react';
import { ourAwesomeEditor } from '.';


export default (project: AbstractProject, selectedFile: AbstractFile) =>
  <div className="files">
    <p>{project.name}'s' files: </p>
    <ul onClick={onFileListClicked}>
      {project.files.map(file =>
        <li key={file.fileName} className={file.fileName === selectedFile.fileName ? 'selected' : ''}>
          <a href="#" data-filename={file.fileName}>{file.fileName}</a>
        </li>
      )}
    </ul>
  </div>


function onFileListClicked(e: MouseEvent<HTMLUListElement>) {
  const clickedLink = e.target as HTMLAnchorElement
  const fileName = clickedLink.getAttribute('data-filename')
  ourAwesomeEditor.selectFile(fileName)
}