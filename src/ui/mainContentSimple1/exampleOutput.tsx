import React from 'react';
import { lastExampleExecutionTime } from '../../examples';
import { getLogLines } from '../uiUtil';

export default () =>
  <div>
    <h3>Example output</h3>
    (Execution time: {lastExampleExecutionTime.toLocaleString(undefined, { maximumFractionDigits: 0 })}ms)
      <br /> <br />
    <pre>{getLogLines().join('')}</pre>
  </div>