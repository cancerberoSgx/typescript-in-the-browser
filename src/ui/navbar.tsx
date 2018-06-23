import React from 'react';
import { getExamples } from '../examples';

export default ()=>
<nav className={"navbar navbar-expand-lg navbar-dark bg-dark"}>
  <button className={"navbar-toggler"} type="button" data-toggle="collapse" data-target="#navbarsExample08" aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation">
    <span className={"navbar-toggler-icon"}></span>
  </button>

  <div className={"collapse navbar-collapse justify-content-md-center"} id="navbarsExample08">
    <ul className={"navbar-nav"}>
      <li className={"nav-item active"}>
        <a className={"nav-link"} href="#">TypeScript compiler in the browser!</a>
      </li>
      <li className={"nav-item dropdown"}>
        <a className={"nav-link dropdown-toggle"} href="https://example.com" id="dropdown08" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Examples</a>
        <div className={"dropdown-menu"} aria-labelledby="dropdown08">
          {getExamples().map(ex=><a className={"dropdown-item"} href={"#example="+ex.id} key={ex.id}>{ex.name}</a>)}
          <a className={"dropdown-item"} href="#">Action</a>
          <a className={"dropdown-item"} href="#">Another action</a>
          <a className={"dropdown-item"} href="#">Something else here</a>
        </div>
      </li>
    </ul>
  </div>
</nav>
