import React from 'react';
import fileNavigator from './fileNavigator'
import { getCurrentExample } from '../../examples';
import sourceFileEditor from './sourceFileEditor';
import exampleOutput from '../mainContentSimple1/exampleOutput';
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
        {fileNavigator()}
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
