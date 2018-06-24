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
      </div>
      <div className={"modal-footer"}>
        <button type="button" className={"btn btn-secondary"} data-dismiss="modal">Load</button>
      </div>
    </div>
  </div>
</div>


)}