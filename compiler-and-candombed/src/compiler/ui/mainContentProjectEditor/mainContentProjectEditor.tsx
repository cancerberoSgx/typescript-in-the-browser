import React from 'react';
import { getCurrentExample } from '../../manager';
// import sourceFileEditor from './sourceFileEditor';
import exampleOutput from '../mainContentSimple1/exampleOutput';
// import { FileTree } from '../../../common/ui/FileTree';
import { CompilerFileTree } from './CompilerFileTree';
import { CompilerEditor } from './CompilerEditor';
import { getSelectedFile } from './projectState';
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
        <CompilerFileTree state={{project: example}}/> 
      </div>
      <div className={"col-9"}>
      <CompilerEditor file={ getSelectedFile()} width="100%" height="300px" id={'selected-file-'} />
      {/* {sourceFileEditor()} */}
      </div>
    </div>
    <div className={"row"}>
      <div className={"col-12"}>
        
        {exampleOutput()}
      </div>
    </div>
  </div>)
}
