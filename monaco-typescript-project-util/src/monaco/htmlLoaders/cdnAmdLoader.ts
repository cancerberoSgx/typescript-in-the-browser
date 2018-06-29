import { loadScript, loadCSS } from '../../util/loadScript'

export async function cdnAmdLoader(baseUrl: string, container: HTMLElement = document.getElementsByTagName("head")[0]): Promise<any> {
  // function callback(){
  //   console.log('loadScript', arguments);
  // }
  loadCSS(`${baseUrl}vs/editor/editor.main.css`, container)
  // return new Promise((resolve, reject)=>{
  //   debugger
   await  loadScript({
      innerHTML: `var require = { paths: { 'vs': '${baseUrl}vs' } };
      // Before loading vs/editor/editor.main, define a global MonacoEnvironment that overwrites
      // the default worker url location (used when creating WebWorkers). The problem here is that
      // HTML5 does not allow cross-domain web workers, so we need to proxy the instantiation of
      // a web worker through a same-domain script
      window.MonacoEnvironment = {
        getWorkerUrl: function (workerId, label) {
          return \`data:text/javascript;charset=utf-8,\${encodeURIComponent(\`
          self.MonacoEnvironment = {
            baseUrl: '${baseUrl}'
          };
          importScripts('${baseUrl}vs/base/worker/workerMain.js');\`
          )}\`;
        }
      };`, 
      crossorigin: true
    })
    // .then(arg=>
    await    loadScript({
        src: `${baseUrl}vs/loader.js`, 
        crossorigin: true
      })
    // ).then(arg=>
    await   loadScript({
        src: `${baseUrl}vs/editor/editor.main.nls.js`, 
        crossorigin: true
      })
    // ).then(arg=>
    await    loadScript({
        src: `${baseUrl}vs/editor/editor.main.js`, 
        crossorigin: true
      })
    // )
    // .then(arg=>
    await    loadScript({
        innerHTML: `
    var __monacoRequire = require;
    window.RequireMonaco = function (fn) {
      delete define.amd 
      if (window.monaco) {
        fn(monaco)
      }
      else {
        __monacoRequire(["vs/editor/editor.main"], function () { fn() })
      }
    }
    RequireMonaco(function (monaco) {
      __Monaco = monaco
    })
    `, 
        crossorigin: true
      })
    // )
    // .then(resolve)
    // .catch(ex=>{
    //   console.log('ex', ex, ex.stack);
    //   reject(ex)
      
    // })
  // })

  
}
