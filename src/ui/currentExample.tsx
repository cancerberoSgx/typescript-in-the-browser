import React from 'react';
import { getCurrentExample } from '../examples';

export default () => {
  const example = getCurrentExample()
  return (
  <div>
    <h3>{example.name}</h3>
    <p>{example.description}</p>
    <h4>Example source:</h4>
    <pre className={'example-pre'}>{example.exampleSource.content}</pre>
    <h4>Example project source files: </h4>
      <ul>
    {example.files.map(f=>
      <li key={f.fileName}>
        <h5>{f.fileName.replace('examples/files/', '')}</h5> 
        <pre className={'example-pre'}>{f.content}</pre>
      </li>
    )}
    </ul>
  </div>
  )
}
