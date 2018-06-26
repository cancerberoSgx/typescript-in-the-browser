import { EventEmitter } from 'events';
import ReactDOM from 'react-dom';
import { dispatchExamples, executeExample } from './manager';
import layout from './ui/layout';
import { requireMonaco } from '../common/monaco/monacoFacade';
import { createFolderDropManager, FolderDropManagerEvent, FolderDropManagerFileFile, FolderDropManager } from '../common/ui-util/folderDropManager';
import { ProgramFile } from './programProvider';
import { Example } from './types';


export function render() {
  dispatchExamples()
  getRenderEmitter().emit('beforeRender')
  ReactDOM.render(layout(), document.getElementById('typescript-in-the-browser-main'), () => getRenderEmitter().emit('afterRender'))
}

const renderEmitter = new EventEmitter()

export function getRenderEmitter(): EventEmitter {
  return renderEmitter
}
// heads up - monaco-editor is loaded with AMD async from index.html so we need to make sure is already loaded
requireMonaco(initialInstall)

function initialInstall(){
  installTsFolderDropManager()
  window.onhashchange = render
  render()
}



export function installTsFolderDropManager(){
  let files: ProgramFile[] = [] // we collect the files and build a new Example (TODO do it better)
  let folderDDManager: FolderDropManager
  const folderDDListener = function (event: FolderDropManagerEvent) {
    if(event.type==='finish'){
      console.log('finish files : '+files.map(f=>f.fileName));
      debugger;
      const newExample: Example = {
        id: 'dropped_'+performance.now(),
        name: 'A folder just dropped',
        description: 'user\'s local TS project dropped from FS',
        files, 
        exampleSource: files[0],
        execute(){}
      }
      executeExample(newExample)
    }
    //TODO event.type==='error
    else if (event.file.isFile) {
      files.push({fileName: event.file.fullPath, content: event.file.content})
      // console.log('jsjsjsjsj', event.file.fullPath);
    }
  }
getRenderEmitter().on('afterRender', () => {
  folderDDManager = createFolderDropManager().install(document.getElementById('tsProjectFolderDropArea'), folderDDListener)
})

getRenderEmitter().on('beforeRender', () => {
  if (folderDDManager) {
    folderDDManager.uninstall(document.getElementById('tsProjectFolderDropArea'), folderDDListener)
  }
})
}