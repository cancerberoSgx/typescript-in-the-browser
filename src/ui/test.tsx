// example.tsx
const item = 'item';
const icon = 'icon-add';
// import {log} from './log'
import React from 'react';

export const list33 = (arr: string[]) => 
  (<ul>
    <li>{arr.map(i=>i)}</li>
  </ul>)