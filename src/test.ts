import { test } from './examples/tsSimple1'
import { toEditorSettings } from 'typescript';
import { list33 } from './ui/test';
import { log } from './ui/log';
import React from 'react';

const defaultTest = 'tsTest1'
export const examples = [
  { id: 'tsTest1', name: 'tsSimple1', description: 'My first TypeScript API Test in the browser -  so far so good', execute: test }
]

const exampleId = new URL(location.href).searchParams.get("example") || defaultTest
const found = examples.find(e => e.id === exampleId)
import ReactDOM from 'react-dom'
if (found) {
  found.execute()
}
else {
  alert('cannot execute test '+ exampleId)
}

log(list33(['asdasdd', 'fasdasd']).toString())

const container = document.body.appendChild(document.createElement('div'))
ReactDOM.render(list33(['asdasdd', 'fasdasd']),  container);  