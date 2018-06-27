import React from 'react';
import { State } from '../../actions/State';

export default (state: State)=>

<div className={"modal fade"} id="whatsThisModal" role="dialog" aria-labelledby="whatsThisModalLabel" aria-hidden="true">
  <div className={"modal-dialog modal-lg"} role="document">
    <div className={"modal-content"}>
      <div className={"modal-header"}>
        <h5 className={"modal-title"} id="whatsThisModalLabel">What's this</h5>
        <button type="button" className={"close"} data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className={"modal-body"}>
        <p>This is my try to build a TypeScript project editor using Monaco <a href="">TypeScript compiler</a> in the browser</p>
        <p><a href="https://github.com/cancerberoSgx/typescript-in-the-browser">Project home page</a>. </p>
      </div>
      <div className={"modal-footer"}>
        <button type="button" className={"btn btn-secondary"} data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

