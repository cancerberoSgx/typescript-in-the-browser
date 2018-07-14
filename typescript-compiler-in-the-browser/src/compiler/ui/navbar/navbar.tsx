import React from 'react';
import { dispatchExampleExecute, dispatchShareableUrl, getExamples } from '../../manager';
import uiSettings from './uiSettings';

export default () =>
  <nav className={"navbar navbar-expand-lg navbar-dark bg-dark"}>
    <button className={"navbar-toggler"} type="button" data-toggle="collapse" data-target="#navbarsExample08" aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation">
      <span className={"navbar-toggler-icon"}></span>
    </button>

    <div className={"collapse navbar-collapse justify-content-md-center"} id="navbarsExample08">
      <ul className={"navbar-nav"}>
        <li className={"nav-item"}>
          <a className={"nav-link"} href="#">TypeScript APIs 100% client side!</a>
        </li>

        <li className={"nav-item dropdown"}>
          <a className={"nav-link dropdown-toggle"} href="#" id="dropdown07" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</a>
          <div className={"dropdown-menu"} aria-labelledby="dropdown06">
            <button className={"dropdown-item btn-link"} onClick={() => dispatchExampleExecute()}>Execute!</button>
            <a className={"dropdown-item"} href="#" onClick={e => dispatchShareableUrl()}>Create Shareable URL</a>
            <a className={"dropdown-item"} href="#" data-toggle="modal" data-target="#dropTsProjectFolder">Drop a TypeScript Project Folder</a>
            <a className={"dropdown-item"} href="#saveProject" data-toggle="modal" data-target="#saveProjectModal">Save Project</a>
            <a className={"dropdown-item"} href="#loadProject" data-toggle="modal" data-target="#loadProjectModal">Load Project</a>
          </div>
        </li>

        <li className={"nav-item dropdown"}>
          <a className={"nav-link dropdown-toggle examples-menu-item"} href="#" id="dropdown08" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Examples</a>
          <div className={"dropdown-menu"} aria-labelledby="dropdown08">
            {getExamples().map(ex => <a className={"dropdown-item"} href={"#example=" + ex.id} key={ex.id}>{ex.name}</a>)}
          </div>
        </li>

        <li className={"nav-item dropdown"}>
          <a className={"nav-link dropdown-toggle"} href="#" id="dropdown09" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">About</a>
          <div className={"dropdown-menu"} aria-labelledby="dropdown09">
            <a className={"dropdown-item"} data-toggle="modal" data-target="#whatsThisModal">What's this?</a>
            <a className={"dropdown-item"} href="https://github.com/cancerberoSgx/typescript-in-the-browser">Project home</a>
          </div>
        </li>

        <li className={"nav-item dropdown"}>
          <a className={"nav-link dropdown-toggle"} href="#" id="dropdown10" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">UI Settings</a>
          <div className={"dropdown-menu"}>
            {uiSettings()}
          </div>
        </li>

      </ul>
    </div>
  </nav>

