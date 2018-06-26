
import { Project } from '../types';
import { getMonaco } from '../../common/util/monacoFacade';
import { buildCompilerOptions, getTs } from '../../common/util/util';
import { fetchFileText } from '../../common/util/fetchUtil';


/**
 * set compiled options in monaco defaults from tsconfig.json file in given project
 * also tsconfig lib[] are loaded from https://unpkg.com/typescript@2.9.2/lib/ and added with addExtraLib
 * @param project
 */
export function installTsConfig(project: Project){
  const tsconfig = project.files.find(f=>f.fileName==='tsconfig.json')
  if(tsconfig && getTs()){
    const options = buildCompilerOptions(tsconfig.content)
    const libs = options.lib||[]
    Promise.all(libs.map(l=>fetchFileText(`https://unpkg.com/typescript@2.9.2/lib/lib.${l}.d.ts`))).then(depsResponses=>{
      depsResponses.forEach((text,i)=>{
        const fname  = `node_modules/typescript/lib/lib.${libs[i]}.d.ts`
        // console.log('addExtraLib - tsconfig lib', fname)      
        getMonaco().languages.typescript.typescriptDefaults.addExtraLib(text, fname)
        getMonacoModelFor({fileName: fname, content: text})
      })
    })
    getMonaco().languages.typescript.typescriptDefaults.setCompilerOptions(options as any)
  }
} 


import { Uri } from 'monaco-editor';
import { getMonacoUriFromFile, getMonacoModelFor } from '../../common/util/monacoUtil';
import { getSelectedFile, State } from '../actions/State';

import * as ts from "typescript";
export function getTsWorker(uri: Uri): Promise<ITypeScriptWorker>{
  return new Promise(resolve=>{
    getMonaco().languages.typescript.getTypeScriptWorker().then(_worker=>{
      // debugger
      _worker(uri).then(worker=>{
        // debugger
        resolve(worker)
      })
     })
  })
}

interface ITypeScriptWorker {
	getCompilationSettings(): ts.CompilerOptions;
	getScriptFileNames(): Promise<string[]>;
	getScriptVersion(fileName: string): string;
	getScriptSnapshot(fileName: string): ts.IScriptSnapshot;
	getScriptKind(fileName: string): ts.ScriptKind;
	getCurrentDirectory(): string;
	getDefaultLibFileName(options: ts.CompilerOptions): string;
	isDefaultLibFileName(fileName: string): boolean;
	getSyntacticDiagnostics(fileName: string): Promise<ts.Diagnostic[]>;
	getSemanticDiagnostics(fileName: string): Promise<ts.Diagnostic[]>;
	getCompilerOptionsDiagnostics(fileName: string): Promise<ts.Diagnostic[]>;
	getCompletionsAtPosition(fileName: string, position: number): Promise<ts.CompletionInfo>;
	getCompletionEntryDetails(fileName: string, position: number, entry: string): Promise<ts.CompletionEntryDetails>;
	getSignatureHelpItems(fileName: string, position: number): Promise<ts.SignatureHelpItems>;
	getQuickInfoAtPosition(fileName: string, position: number): Promise<ts.QuickInfo>;
	getOccurrencesAtPosition(fileName: string, position: number): Promise<ts.ReferenceEntry[]>;
	getDefinitionAtPosition(fileName: string, position: number): Promise<ts.DefinitionInfo[]>;
	getReferencesAtPosition(fileName: string, position: number): Promise<ts.ReferenceEntry[]>;
	getNavigationBarItems(fileName: string): Promise<ts.NavigationBarItem[]>;
	getFormattingEditsForDocument(fileName: string, options: ts.FormatCodeOptions): Promise<ts.TextChange[]>;
	getFormattingEditsForRange(fileName: string, start: number, end: number, options: ts.FormatCodeOptions): Promise<ts.TextChange[]>;
	getFormattingEditsAfterKeystroke(fileName: string, postion: number, ch: string, options: ts.FormatCodeOptions): Promise<ts.TextChange[]>;
  getEmitOutput(fileName: string): Promise<ts.EmitOutput>;
  // _languageService: ts.LanguageService
}



export function testtest(state: State){

  
  
  getMonaco().languages.registerDocumentSymbolProvider('typescript', {
    
    provideDocumentSymbols(model, token) {
      console.log('provideDocumentSymbols', model.uri.toString(), arguments)
      return []
    }
  })

  // let lastProvideDefinitionPosition = undefined
  // let lastProvideDefinitionLocations= undefined
  getMonaco().languages.registerCodeActionProvider('typescript', {
    provideCodeActions(model, range, token, e){
      // console.log('provideCodeActions', model.uri.toString(), arguments)

      // debugger
      // const isNavigation = lastProvideDefinitionPosition && range.containsPosition(lastProvideDefinitionPosition) &&   model.getDecorationsInRange(range).find(d=>d.options.inlineClassName==='goto-definition-link')
      
      console.log('provideCodeActions',
      // isNavigation, 
      model.getDecorationsInRange(range).map(d=>(d.options as any).metadata), model.uri.toString(),  arguments)

      return []//[{id: 'seba1', title: 'seba 1', tooltip: 'seba1'}]
    }
  })
  
  // getMonaco().languages.reg('typescript', {
  //   provideCodeActions(model, range, token, e){
  //     console.log('provideCodeActions', model.uri.toString(), arguments)
  //     return [{id: 'seba1', title: 'seba 1', tooltip: 'seba1'}]
  //   }
  // })
  getMonaco().languages.registerLinkProvider('typescript', {
    provideLinks(model, token){
      console.log('provideLinks', model.uri.toString(), model, arguments)
      return []
    },
    resolveLink (link, token){
      console.log('resolveLink', link)
      return null 
    }
  })
  getMonaco().languages.registerReferenceProvider('typescript', {
    provideReferences(model, position, context, token){
      console.log('provideReferences',   arguments, arguments);
      return []
    }
  })
  getMonaco().languages.registerImplementationProvider('typescript', {
    provideImplementation(model, position, token){
      console.log('provideImplementation',   arguments, arguments);
      return []
    }
  })


  getMonaco().languages.registerTypeDefinitionProvider('typescript', {
    provideTypeDefinition(model, position, token){
      console.log('provideTypeDefinition',   arguments, arguments);
      return null
    }
  })

  getMonaco().languages.registerDefinitionProvider('typescript', {
    provideDefinition(model, position, token){
      // lastProvideDefinitionPosition = position
    
      console.log('provideDefinition', (model as any)._lastDecorationId, position.toString(), model.uri.toString(), model, 
      model.getDecorationsInRange({startColumn: position.column, startLineNumber: position.lineNumber, endColumn: position.column+1, endLineNumber: position.lineNumber}))

      return new Promise(resolve=>{
        const uri = getMonacoUriFromFile(getSelectedFile(state))
        getTsWorker(uri).then(worker=>{
          // debugger
          // (worker as any)._getModel().then(m=>{
          //   debugger
          // })
          worker.getDefinitionAtPosition(model.uri.toString(),  model.getOffsetAt(position)).then(defs=>{
            if(defs){
              const locations = defs.map(def=>{
                const uri = getMonaco().Uri.parse(def.fileName)
                const targetModel= getMonaco().editor.getModel(uri)
                const range = getMonaco().Range.fromPositions(targetModel.getPositionAt(def.textSpan.start), targetModel.getPositionAt(def.textSpan.start+def.textSpan.length))
                return {
                  uri, 
                  range
                }
              })
              console.log('provideDefinition resolve' , locations);
              // lastProvideDefinitionLocations = locations
              resolve(locations)
            }
          })
        })
      })      
    }
  })
  // const uri = getMonacoUriFromFile(getSelectedFile(state))
  // getTsWorker(uri).then(worker=>{
  //   // worker._languageService.getProgram().getSourceFiles().forEach(sf=>console.log(sf.fileName)    )
  //   worker.getScriptFileNames().then(ff=>{
  //     ff.forEach(sf=>{
  //       worker.getSemanticDiagnostics(sf).then(dd=>{          
  //       console.log('\n\n____----___ DIAGS: '+sf)
  //         console.log(dd.map(d=>d.messageText))})
  //       })

  //   })
  //   // debugger
  //   // console.log(worker.getSemanticDiagnostics(getSelectedFile(state).fileName))
  // })
}