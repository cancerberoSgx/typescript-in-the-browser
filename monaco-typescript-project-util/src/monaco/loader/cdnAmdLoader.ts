// todo give support to loadScript to print out strings instead of appending els to the dom so two next functions 
// output from the same source

import { loadScript, loadCSS } from '../../util/loadScript'

export async function cdnAmdLoader(baseUrl: string, container: HTMLElement = document.getElementsByTagName("head")[0]): Promise<any> {

  loadCSS({href: `${baseUrl}vs/editor/editor.main.css`, container})

  await loadScript({
    scriptBody: `var require = { paths: { 'vs': '${baseUrl}vs' } };
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
  await loadScript({
    src: `${baseUrl}vs/loader.js`,
    crossorigin: true
  })
  await loadScript({
    src: `${baseUrl}vs/editor/editor.main.nls.js`,
    crossorigin: true
  })
  await loadScript({
    src: `${baseUrl}vs/editor/editor.main.js`,
    crossorigin: true
  })
  await loadScript({
    scriptBody: `
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
}


/**
 * This loads monaco-editor from a external CDN using AMD bundle.
 * @param vsRoot is something like `https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.13.1/min/` (one level before 'vs')
 */
export const cdnAmdLoaderAsString = (baseUrl: string) => 
`
<link rel="stylesheet" type="text/css" href="${baseUrl}vs/editor/editor.main.css"
/>

<!-- Monaco editor loading scripts - we need to perform the following custom loading - hooking into the web worked because we are loading from another domain (external CDN) -->
<script crossorigin> var require = { paths: { 'vs': '${baseUrl}vs' } };
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
  };
</script>
<script crossorigin src="${baseUrl}vs/loader.js"></script>
<script crossorigin src="${baseUrl}vs/editor/editor.main.nls.js"></script>
<script crossorigin src="${baseUrl}vs/editor/editor.main.js"></script>

<script crossorigin>
/* Heads up ! 
Monaco redefines global require function as AMD. If you are working with other libraries packaged 
as UMD or commonsjs this will break them. This is why we hack "delete module.amd". In my experience 
this doesn't cause problems and allow UMD libraries to be recognized as commons so they will load. 
IMO, the fault is monaco's - it should provide a 100% commonsjs / UMD distribution. */

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
</script>
`
;
