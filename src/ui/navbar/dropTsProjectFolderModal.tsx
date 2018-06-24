import React from 'react';
export default () => {
  return (<div className={"modal fade"} id="dropTsProjectFolder" role="dialog" aria-labelledby="dropTsProjectFolderLabel" aria-hidden="true">
    <div className={"modal-dialog modal-lg"} role="document">
      <div className={"modal-content"}>
        <div className={"modal-header"}>
          <h5 className={"modal-title"} id="dropTsProjectFolderLabel">Drop a local TypeScript Project</h5>
          <button type="button" className={"close"} data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className={"modal-body"}>
          <p>You can drag and drop a local project folder into the next drop area and the application will try to load it as a TypeScript project. </p>
          <p>All will happen locally, nothing will be uploaded.</p>

          <p>Be careful to clean up the folder before, like removing all unnecessary files like node_modules, dist/ folders etc. </p>

          <p>Make sure the tsconfig.json file is at the root of the folder</p>

          <div id="tsProjectFolderDropArea"></div>
        </div>
        <div className={"modal-footer"}>
          <button type="button" className={"btn btn-secondary"} data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>)
}

