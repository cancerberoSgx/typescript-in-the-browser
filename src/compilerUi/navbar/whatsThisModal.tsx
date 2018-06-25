import React from 'react';

export default ()=>

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
        <p>This project is about running <a href="">TypeScript compiler</a> in the browser</p>
        <p>Explore examples using the "Examples" dropdown in the navbar. At the left side you will see the example source code and its sample files source code and at the right you will see the execution result</p> 
        <p>See more in its <a href="https://github.com/cancerberoSgx/typescript-in-the-browser">Project home page</a></p>
      </div>
      <div className={"modal-footer"}>
        <button type="button" className={"btn btn-secondary"} data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

