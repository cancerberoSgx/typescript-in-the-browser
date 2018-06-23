import React from 'react';
import navbar from './navbar';
import mainContent from './mainContent';
import forkRibbon from './forkRibbon';

export default ()=>
<div>
{navbar()}
{mainContent()}
{forkRibbon()}
</div>
