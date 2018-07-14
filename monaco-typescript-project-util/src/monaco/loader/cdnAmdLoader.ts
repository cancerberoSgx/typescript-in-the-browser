// todo give support to loadScript to print out strings instead of appending els to the dom so two next functions 
// output from the same source

import { loadScript, loadCSS, ResourceLoadDefinition, ScriptLoadDefinition, StyleLoadDefinition, loadSeries, render } from '../../util/loadScript'

const getResourcesToLoad = (baseUrl: string, container: HTMLElement = document.getElementsByTagName("head")[0]): (ScriptLoadDefinition | StyleLoadDefinition)[] => [

  {
    href: `${baseUrl}vs/editor/editor.main.css`
  },

  {
    scriptBody: `window["req"+"ui"+"re"] = { paths: { 'vs': '${baseUrl}vs' } };
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
  },

  {
    src: `${baseUrl}vs/loader.js`,
    crossorigin: true
  },

  {
    src: `${baseUrl}vs/editor/editor.main.nls.js`,
    crossorigin: true
  },

  {
    src: `${baseUrl}vs/editor/editor.main.js`,
    crossorigin: true
  },

  {
    scriptBody: `
    window.Re_quireMonaco = function (fn) {
      delete define.amd 
      if (window.monaco) {
        fn(monaco)
      }
      else {
        window["req"+"ui"+"re"](["vs/editor/editor.main"], function () { fn() })
      }
    }
    window.Re_quireMonaco(function (monaco) {
      __Monaco = monaco
    })
    `,
    crossorigin: true
  }
]

/**
 * This will load scripts and css from given external cdn in the current document dinamically returning a
 * promise resolved when all necessary resources finish loading. It will use monaco-editor's AMD bundle. Usage
 * Example: `loadMonacoAmdFromExternalCdn('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.13.1/min/')`
 */
export const loadMonacoAmdFromExternalCdn = (baseUrl: string, container: HTMLElement = document.getElementsByTagName("head")[0]): Promise<any[][]> => loadSeries(getResourcesToLoad(baseUrl, container))


/**
 * This will return an HTML snippet that will load scripts and css from given external cdn in the current
 * document dinamically returning a promise resolved when all necessary resources finish loading. It will use
 * monaco-editor's AMD bundle. Ideally if we are building our index.html at compile time using a template -
 * just put this string in the head or body. Using this technique monaco-editor will load faster than using
 * `loadMonacoAmdFromExternalCdn` since monaco-editor will start loading earlier. 
 * @param vsRoot is something like `https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.13.1/min/` (one
 * level before 'vs')
 */
export const monacoLoadAmdFromExternalCdnHtmlTemplate = (baseUrl: string): string => render(getResourcesToLoad(baseUrl))