import { AbstractProject } from '../types';
import { resetMonacoModelsAndEditors, createAllMonacoModelsFor } from './register';
import { installTsConfig } from './tsConfig';
import { installTypes } from './installTypes';

export function setupProject(project: AbstractProject){
  // console.log('create all monaco models for ' + project.files.length)
  resetMonacoModelsAndEditors()
  installTsConfig(project)
  createAllMonacoModelsFor(project)
  installTypes(project)
}