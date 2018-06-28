
import * as tsSampleProjectFiles from '../examples/projectsJson/ts-sample-project.json'
import * as yamatProjectFiles from '../examples/projectsJson/yamat.json'
import * as vsCodeInlineTypes from '../examples/projectsJson/vscode-inline-types-master.json'
import * as yo from '../examples/projectsJson/yo-master.json'

import { ProjectFile } from '../types';

export function getExamples(){
  return [
    {
      name: 'yamat', 
      files: (yamatProjectFiles as any).files as ProjectFile[]
    }, 
    {
      name: 'tsSample', 
      files: (tsSampleProjectFiles as any).files as ProjectFile[]      
    }, 
    {
      name: 'vscode-inline-types', 
      files: (vsCodeInlineTypes as any).files as ProjectFile[]      
    }, 
    {
      name: 'yo (JavaScript)', 
      files: (yo as any).files as ProjectFile[]      
    }, 

    
  ]
}