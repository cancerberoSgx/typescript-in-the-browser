# Running TypeScript compiler in the Browser

# Projects: 

## monaco-typescript-project-util

 * Provide a easy to use API and tools to implement a monaco-editor 100% in the browser. APIs and tools are particularly focussed to support TypeScript projects. Supports loading monaco-editor from local server or from external CDN. See [project home page](https://github.com/cancerberoSgx/typescript-in-the-browser/tree/master/monaco-typescript-project-util). 

## candombed

 * Built on top of monaco-typescript-project-util to bring an opinionated TypeScript project editor, very simple to install, 100% browser side as static pages 
 * [Project Home](https://github.com/cancerberoSgx/typescript-in-the-browser/tree/master/candombed)
 * [Demo](https://cancerberosgx.github.io/typescript-in-the-browser/typescript-compiler) Load one of the examples. Test how types and tsconfig.json are loaded accordingly. Navigate through files using ctrl-click. Try to Actions->emit file. Drop your local projects using File->Load. Test monaco-editor built-in tools such as find references, peek definition, format code, etc. 



## typescript-compiler-in-the-browser

 * just load typescript.js and start using it in the browser - see how much we can emulate and which amount of its API and related libraries can we use in the browser. Hs nothing to do with project editors, or monaco. 
 * [Project home](https://github.com/cancerberoSgx/typescript-in-the-browser/tree/master/typescript-compiler-in-the-browser)
 * [Using TypeScript Compiler in the browser DEMO](https://cancerberosgx.github.io/typescript-in-the-browser/typescript-compiler) - Select an example and it will be run **100% in the browser** showing the output. Among others, examples use TypeScript APIs: create program, language service, transformations & code printing, compilation and AST transversing, and even third party libraries.  



# Build all 

```
npm i 
npm run all
http-server docs
```

For development, in general is `npm run dev` but please, go to specify projects just in case. 