import React from 'react';
import exampleOutput from './exampleOutput'
import currentExample from './currentExample';
export default ()=>
<div className={"container-fluid"}>
  <div className={"row"}>
    <div className={"col-6"}>
    {currentExample()}
    </div>
    <div className={"col-6"}>
      {exampleOutput()}
    </div>
  </div>
</div>
