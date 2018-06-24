import React from 'react';
import navbar from './navbar/navbar';
import mainContentSimple1 from './mainContentSimple1/mainContentSimple1';
import forkRibbon from './forkRibbon';
import whatsThisModal from './navbar/whatsThisModal';

export default ()=>
  <div>
  {navbar()}
  {mainContentSimple1()}
  {forkRibbon()}
  {whatsThisModal()}
  </div>
