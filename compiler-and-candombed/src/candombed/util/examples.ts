
import * as tsSampleProjectFiles from '../../examples/projectsJson/ts-sample-project.json'
import * as yamatProjectFiles from '../../examples/projectsJson/yamat.json'
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
    }
  ]
}