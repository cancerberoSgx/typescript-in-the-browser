import React from 'react';
import { getLogLines } from './uiUtil';
import { lastExampleExecutionTime } from '../examples';
import { Editor } from './editor/Editor';

export default ()=>
    <div>
      <h3>Example output</h3>
      (Execution time: {lastExampleExecutionTime.toLocaleString(undefined, {maximumFractionDigits: 0})}ms)
      <br/> <br/>
      <pre>{getLogLines().join('')}</pre>

      {/* <Editor code={getLines().join('')} width="100%" height="300px" id="exampleOutput"/> */}
    </div>