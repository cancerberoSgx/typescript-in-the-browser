


// import { getSelectedFile, State } from '../actions/State';
// import { getMonaco } from '../../common/monaco/monacoFacade';
// import { getTsWorker, getMonacoDefinitionAtPosition } from '../../common/monaco/tsWorker';
// import { getMonacoUriFromFile, getMonacoModelFor } from '../../common/monaco/register';
// import * as ts from "typescript";
// import { getTs } from '../../common/util/tsUtil';
// import { ProjectFile } from '../types';
// import { dispatchAddFile } from '../actions/addFile';

// export async function getEmitOutput(state: State){
//   getTsWorker(getMonacoModelFor(getSelectedFile(state)).uri).then(async w=>{
//   const files = await w.getScriptFileNames()
//   files.forEach(async f=>{
//     const emit = await w.getEmitOutput(f)
//     const files = emit.outputFiles.map(outputFile=>( {fileName: outputFile.name.replace('file:///', ''), content: outputFile.text}))    
//     dispatchAddFile(files)
//   })
// })
// }

// export function testtest(state: State) {
//   getEmitOutput(state)
// // getTsWorker(getMonacoModelFor(getSelectedFile(state)).uri).then(async w=>{
// //   const files = await w.getScriptFileNames()
// //   files.forEach(async f=>{
// //     const emit = await w.getEmitOutput(f)
// //     console.log(emit.outputFiles);
    
// //   })
//   // w.getScriptFileNames().then
//   // w.getEmitOutput('/src/link.ts').then(e=>{
//   //   e.outputFiles.forEach(f=>console.log(f.name, f.text)
//   //   )
//   // })
//   // debugger
//   // const service = getTs().createLanguageService(w as any)
//   // service.getProgram()
//   // debugger
// // })

//   // getMonaco().languages.registerDocumentSymbolProvider('typescript', {

//   //   provideDocumentSymbols(model, token) {
//   //     console.log('provideDocumentSymbols', model.uri.toString(), arguments)
//   //     return []
//   //   }
//   // })

//   // // let lastProvideDefinitionPosition = undefined
//   // // let lastProvideDefinitionLocations= undefined
//   // getMonaco().languages.registerCodeActionProvider('typescript', {
//   //   provideCodeActions(model, range, token, e) {
//   //     // console.log('provideCodeActions', model.uri.toString(), arguments)

//   //     // debugger
//   //     // const isNavigation = lastProvideDefinitionPosition && range.containsPosition(lastProvideDefinitionPosition) &&   model.getDecorationsInRange(range).find(d=>d.options.inlineClassName==='goto-definition-link')

//   //     console.log('provideCodeActions',
//   //       // isNavigation, 
//   //       model.getDecorationsInRange(range).map(d => (d.options as any).metadata), model.uri.toString(), arguments)

//   //     return []//[{id: 'seba1', title: 'seba 1', tooltip: 'seba1'}]
//   //   }
//   // })

//   // // getMonaco().languages.reg('typescript', {
//   // //   provideCodeActions(model, range, token, e){
//   // //     console.log('provideCodeActions', model.uri.toString(), arguments)
//   // //     return [{id: 'seba1', title: 'seba 1', tooltip: 'seba1'}]
//   // //   }
//   // // })
//   // getMonaco().languages.registerLinkProvider('typescript', {
//   //   provideLinks(model, token) {
//   //     console.log('provideLinks', model.uri.toString(), model, arguments)
//   //     return []
//   //   },
//   //   resolveLink(link, token) {
//   //     console.log('resolveLink', link)
//   //     return null
//   //   }
//   // })
//   // getMonaco().languages.registerReferenceProvider('typescript', {
//   //   provideReferences(model, position, context, token) {
//   //     console.log('provideReferences', arguments, arguments);
//   //     return []
//   //   }
//   // })
//   // getMonaco().languages.registerImplementationProvider('typescript', {
//   //   provideImplementation(model, position, token) {
//   //     console.log('provideImplementation', arguments, arguments);
//   //     return []
//   //   }
//   // })


//   // getMonaco().languages.registerTypeDefinitionProvider('typescript', {
//   //   provideTypeDefinition(model, position, token) {
//   //     console.log('provideTypeDefinition', arguments, arguments);
//   //     return null
//   //   }
//   // })

//   // getMonaco().languages.registerDefinitionProvider('typescript', {
//   //   provideDefinition(model, position, token) {
//   //     return new Promise(resolve => {
//   //       console.log('provideDefinition', (model as any)._lastDecorationId, position.toString(), model.uri.toString(), model,
//   //         model.getDecorationsInRange({ startColumn: position.column, startLineNumber: position.lineNumber, endColumn: position.column + 1, endLineNumber: position.lineNumber }))
//   //       const uri = getMonacoUriFromFile(getSelectedFile(state))
//   //       getMonacoDefinitionAtPosition(model, position).then(result => {
//   //         console.log('provideDefinition resolve', result);
//   //       })
//   //     })
//   //   }
//   // })


// }