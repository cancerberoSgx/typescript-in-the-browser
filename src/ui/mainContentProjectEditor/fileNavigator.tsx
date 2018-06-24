import React, { ChangeEvent } from 'react';
import { getCurrentExample } from '../../examples';
import { render } from '../../main';
import { getSelectedFile, setSelectedFile } from './projectState';

export default () => {
  const example = getCurrentExample()
  const selectedFile = getSelectedFile() || { fileName: '' }
  return (
    <div>
      <ul>
        <li key={example.exampleSource.fileName}>
          <label className="btn btn-link" key={example.exampleSource.fileName}>
            <input type="checkbox" autoComplete="off" checked={selectedFile.fileName === example.exampleSource.fileName} onChange={selectedFileChanged} data-file={example.exampleSource.fileName} /> (example source) {example.exampleSource.fileName.replace('examples/', '')}
          </label>
        </li>
        {example.files.sort((a, b) => a.fileName.localeCompare(b.fileName)).map((f, i) =>
          <li key={f.fileName}>
            <label className="btn btn-link" key={f.fileName}>
              <input type="checkbox" autoComplete="off" checked={selectedFile.fileName === f.fileName} onChange={selectedFileChanged} data-file={f.fileName} /> {f.fileName.replace('examples/files/', '')}
            </label>
          </li>
        )}
      </ul>
    </div>
  )
}


function selectedFileChanged(e: ChangeEvent<HTMLInputElement>) {
  const selectedFile = getCurrentExample().files.find(f => e.currentTarget.getAttribute('data-file') === f.fileName) ||
    getCurrentExample().exampleSource
  setSelectedFile(selectedFile)
  render()
}

