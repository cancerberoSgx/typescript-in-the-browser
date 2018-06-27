import React from 'react';
import { projectToJson } from '../../../common/util/projectSerialization';
import { State } from '../../actions/State';

export default (state: State)=>{
  
  return (

<div className={"modal fade"} id="saveProjectModal" role="dialog" aria-labelledby="saveProjectModalLabel" aria-hidden="true">
  <div className={"modal-dialog modal-lg"} role="document">
    <div className={"modal-content"}>
      <div className={"modal-header"}>
        <h5 className={"modal-title"} id="saveProjectModalLabel">Save Project</h5>
        <button type="button" className={"close"} data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className={"modal-body"}>

      <p>The following is the current TypeScript project serialized into JSON format. You can copy &amp; paste and save it in your system and load it in the future: </p>
        
      <textarea id="saveProjectJsonTextarea">
        {projectToJson(state.project)}
      </textarea>
      </div>
      <div className={"modal-footer"}>
        <button type="button" className={"btn btn-secondary"} data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>


)}