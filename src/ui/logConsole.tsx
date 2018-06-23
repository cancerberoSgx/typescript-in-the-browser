import React from 'react';
import { getLines } from './log';

export default ()=>
    <div>
      <h3>Example output</h3>
      <pre>{getLines().join('')}</pre>
    </div>