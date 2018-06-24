import React from 'react';
import { getLines } from './log';
import { lastExampleExecutionTime } from '../examples';

export default ()=>
    <div>
      <h3>Example output</h3>
      (Execution time: {lastExampleExecutionTime.toLocaleString(undefined, {maximumFractionDigits: 0})}ms)
      <br/> <br/>
      <pre>{getLines().join('')}</pre>
    </div>