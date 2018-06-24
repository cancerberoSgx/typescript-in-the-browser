import React from 'react';
import navbar from './navbar';
import mainContentSimple1 from './mainContentSimple1';
import forkRibbon from './forkRibbon';
import whatsThisModal from './whatsThisModal';
// import mainContentEditors from './mainContentEditors';
// import { Editor } from './Editor';

export default ()=>
<div>
{navbar()}
{/* {mainContentEditors()} */}
{mainContentSimple1()}
{forkRibbon()}
{whatsThisModal()}
</div>
