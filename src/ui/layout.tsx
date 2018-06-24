import React from 'react';
import navbar from './navbar';
import mainContent from './mainContentSimple1';
import forkRibbon from './forkRibbon';
import whatsThisModal from './whatsThisModal';

export default ()=>
<div>
{navbar()}
{mainContent()}
{forkRibbon()}
{whatsThisModal()}
</div>
