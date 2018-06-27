import React from 'react';
import { getCurrentExample } from '../../manager';
import { CompilerEditor } from '../mainContentProjectEditor/CompilerEditor';

export default () => {
  const example = getCurrentExample()
  return (
    <div>
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      <h4>Example source:</h4>
      <CompilerEditor file={example.exampleSource} width="100%" height="300px" id="exampleSource" />
      <h4>Example project source files: </h4>
      <ul>
        {example.files.map((f, i) =>
          <li key={f.fileName}>
            <h5>{f.fileName.replace('examples/files/', '')}</h5>
            <CompilerEditor file={f} width="100%" height="300px" id={'example-file-' + i} />
          </li>
        )}
      </ul>
    </div>
  )
}
