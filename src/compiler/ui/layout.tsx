import React from 'react';
import navbar from './navbar/navbar';
import mainContentSimple1 from './mainContentSimple1/mainContentSimple1';
import forkRibbon from './forkRibbon';
import whatsThisModal from './navbar/whatsThisModal';
import mainContentProjectEditor from './mainContentProjectEditor/mainContentProjectEditor';
import {getUIConfig} from './iuSettingsState'
import dropTsProjectFolder from './navbar/dropTsProjectFolderModal';
import saveProjectModal from './navbar/saveProjectModal';
import loadProjectModal from './navbar/loadProjectModal';

export default ()=>
  <div>
  {navbar()}
  {getUIConfig().mainContentKind==='project' ? mainContentProjectEditor() : mainContentSimple1()}
  {forkRibbon()}
  {whatsThisModal()}
  {dropTsProjectFolder()}
  {saveProjectModal()}
  {loadProjectModal()}
  
  </div>
