import React from 'react';
import { render } from '../../main';
import { getUIConfig, setEditorKind } from '../iuConfig';

export default () =>
  <form className={"px-4 py-3"}>
    <div className={"form-check"}>
      <input type="checkbox" className={"form-check-input"} id="useMonacoEditorCheckbox" 
        onChange={toggleEditorKindChanged} checked={getUIConfig().editorKind === 'monaco'} />
      <label htmlFor="useMonacoEditorCheckbox" className={"form-check-label"}>Use monaco editor?</label>
    </div>
  </form>

function toggleEditorKindChanged(e) {
  setEditorKind(e.target.checked ? 'monaco' : 'pre')
  render()
}