import React from 'react';
import { getCurrentExample } from '../../examples';
import sourceFileEditor from './sourceFileEditor';
import exampleOutput from '../mainContentSimple1/exampleOutput';
import { FileTree } from '../editor/FileTree';
export default () => {

  const example = getCurrentExample()
  return (<div className={"container-fluid"}>
    <div className={"row"}>
      <div className={"col-12"}>
        <h3>{example.name}</h3>
        <p>{example.description}</p>
      </div>
    </div>
    <div className={"row"}>
      <div className={"col-3"}>
        {/* {fileNavigator()} */}
        <FileTree example={example}/> 
      </div>
      <div className={"col-9"}>
      {sourceFileEditor()}
      </div>
    </div>
    <div className={"row"}>
      <div className={"col-12"}>
        
        {exampleOutput()}
      </div>
    </div>
  </div>)
}
