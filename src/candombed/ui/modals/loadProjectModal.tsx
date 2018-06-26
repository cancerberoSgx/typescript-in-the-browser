import React from 'react';

export default ()=>{
  
  return (

<div className={"modal fade"} id="loadProjectModal" role="dialog" aria-labelledby="loadProjectModalLabel" aria-hidden="true">
  <div className={"modal-dialog modal-lg"} role="document">
    <div className={"modal-content"}>
      <div className={"modal-header"}>
        <h5 className={"modal-title"} id="loadProjectModalLabel">Load Project</h5>
        <button type="button" className={"close"} data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className={"modal-body"}>
        <p>Paste previously saved JSON in the following text area for loading that project:</p>
        <textarea id="loadProjectJsonTextarea">
        </textarea>


          <p>Also You can drag and drop a local project folder into the next drop area and the application will try to load it as a TypeScript project. </p>
          <p>Be careful to clean up the folder before, like removing all unnecessary files like node_modules, dist/ folders etc. </p>

          <p>Make sure the tsconfig.json file is at the root of the folder:</p>

          <div id="tsProjectFolderDropArea"></div>


      </div>
      <div className={"modal-footer"}>
        <button type="button" className={"btn btn-secondary"} data-dismiss="modal">Load</button>
      </div>
    </div>
  </div>
</div>


)}