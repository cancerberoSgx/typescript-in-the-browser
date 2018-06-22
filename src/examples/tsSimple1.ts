
import { Example, ExampleExecutionOptions, ExampleExecutionResult } from '../test';
import { printAllSourceFileAst } from './exampleUtil';


export default class implements Example {
  id= 'tsTest1'
   name= 'tsSimple1'
    description= 'My first TypeScript API Test in the browser. Just compile a couple of typescript and a tsx file in a small project and visit its chidden printing them -  so far so good'
    execute= (options: ExampleExecutionOptions): ExampleExecutionResult=>{
     
      printAllSourceFileAst(options.program)
      return null
    } 
  files = [
    {
  fileName: 'list66.tsx', content: `
import React from 'react';
export const list33 = (arr: string[]) => 
(<ul>
  <li>{arr.map(i=>i)}</li>
</ul>)  `
    },
    {
      fileName: 'file1.ts', content: `
class C {
  constructor(a: string, b: C) { }
} `},
    {
      fileName: 'file2.ts', content: `
class Dsd extends C {
constructor(a: string, b: Date[]) { 
  super(a, this)
}}`}, 
  ]

}
