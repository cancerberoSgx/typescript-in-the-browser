


// import { getSelectedFile, State } from '../actions/State';
// import { getMonaco } from '../../common/monaco/monacoFacade';
// import { getTsWorker, getMonacoDefinitionAtPosition } from '../../common/monaco/tsWorker';
// import { getMonacoUriFromFile } from '../../common/monaco/register';




// export function testtest(state: State) {



//   getMonaco().languages.registerDocumentSymbolProvider('typescript', {

//     provideDocumentSymbols(model, token) {
//       console.log('provideDocumentSymbols', model.uri.toString(), arguments)
//       return []
//     }
//   })

//   // let lastProvideDefinitionPosition = undefined
//   // let lastProvideDefinitionLocations= undefined
//   getMonaco().languages.registerCodeActionProvider('typescript', {
//     provideCodeActions(model, range, token, e) {
//       // console.log('provideCodeActions', model.uri.toString(), arguments)

//       // debugger
//       // const isNavigation = lastProvideDefinitionPosition && range.containsPosition(lastProvideDefinitionPosition) &&   model.getDecorationsInRange(range).find(d=>d.options.inlineClassName==='goto-definition-link')

//       console.log('provideCodeActions',
//         // isNavigation, 
//         model.getDecorationsInRange(range).map(d => (d.options as any).metadata), model.uri.toString(), arguments)

//       return []//[{id: 'seba1', title: 'seba 1', tooltip: 'seba1'}]
//     }
//   })

//   // getMonaco().languages.reg('typescript', {
//   //   provideCodeActions(model, range, token, e){
//   //     console.log('provideCodeActions', model.uri.toString(), arguments)
//   //     return [{id: 'seba1', title: 'seba 1', tooltip: 'seba1'}]
//   //   }
//   // })
//   getMonaco().languages.registerLinkProvider('typescript', {
//     provideLinks(model, token) {
//       console.log('provideLinks', model.uri.toString(), model, arguments)
//       return []
//     },
//     resolveLink(link, token) {
//       console.log('resolveLink', link)
//       return null
//     }
//   })
//   getMonaco().languages.registerReferenceProvider('typescript', {
//     provideReferences(model, position, context, token) {
//       console.log('provideReferences', arguments, arguments);
//       return []
//     }
//   })
//   getMonaco().languages.registerImplementationProvider('typescript', {
//     provideImplementation(model, position, token) {
//       console.log('provideImplementation', arguments, arguments);
//       return []
//     }
//   })


//   getMonaco().languages.registerTypeDefinitionProvider('typescript', {
//     provideTypeDefinition(model, position, token) {
//       console.log('provideTypeDefinition', arguments, arguments);
//       return null
//     }
//   })

//   getMonaco().languages.registerDefinitionProvider('typescript', {
//     provideDefinition(model, position, token) {
//       return new Promise(resolve => {
//         console.log('provideDefinition', (model as any)._lastDecorationId, position.toString(), model.uri.toString(), model,
//           model.getDecorationsInRange({ startColumn: position.column, startLineNumber: position.lineNumber, endColumn: position.column + 1, endLineNumber: position.lineNumber }))
//         const uri = getMonacoUriFromFile(getSelectedFile(state))
//         getMonacoDefinitionAtPosition(model, position).then(result => {
//           console.log('provideDefinition resolve', result);
//         })
//       })
//     }
//   })


// }