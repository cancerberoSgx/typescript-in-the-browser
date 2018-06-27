import React, { ChangeEvent } from 'react';
import { render } from '../../main';
import { getUIConfig, setEditorKind, setMainContentKind } from '../iuSettingsState';

export default () =>
  <form className={"px-4 py-3"}>
    <div className={"form-check"}>
      <input type="checkbox" className={"form-check-input"} id="useMonacoEditorCheckbox" 
        onChange={toggleEditorKindChanged} checked={getUIConfig().editorKind === 'monaco'} />
      <label htmlFor="useMonacoEditorCheckbox" className={"form-check-label"}>Use monaco editor?</label>
    </div>
    <div className={"form-check"}>
      <input type="checkbox" className={"form-check-input"} id="projectViewCheckbox" 
        onChange={toggleMainContentKindChanged} checked={getUIConfig().mainContentKind==='project'} />
      <label htmlFor="projectViewCheckbox" className={"form-check-label"}>Project view?</label>
    </div>
  </form>


function toggleMainContentKindChanged(e: ChangeEvent<HTMLInputElement>) {
  setMainContentKind(e.target.checked ? 'project' : 'simple1')
  render()
}

function toggleEditorKindChanged(e: ChangeEvent<HTMLInputElement>) {
  setEditorKind(e.target.checked ? 'monaco' : 'pre')
  render()
}