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

        <p>This project is about running <a href="">TypeScript compiler</a> in the browser. It contains examples of several TypeScript Compiler APIs and use cases like Transformations, Language Service, parsing, transversing, printing, building, as well as third party libraries based on it like ts-simple-ast, tsquery and more to come.  </p>

        <p>Explore examples using the "Examples" dropdown in the navbar. At the left side you will see the example source code and its sample files source code and at the right you will see the execution result</p> 

        <p>You can <strong>modify</strong> the examples and <strong>execute</strong> them again. Also you can create a <strong>shareable URL</strong> with your changes. </p>

        <p>The editor is monaco-editor (the same that vscode uses), you can ctrl-click on editor references or use the file tree on the left to navigate through files.</p>

        <p>See more in its <a href="https://github.com/cancerberoSgx/typescript-in-the-browser">Project home page</a></p>

      </div>
      <div className={"modal-footer"}>
        <button type="button" className={"btn btn-secondary"} data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

