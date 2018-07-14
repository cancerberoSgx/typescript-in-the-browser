# Running TypeScript compiler in the Browser

Libraries, playgrounds, documentation, examples, experiments to see how well TypeScript Compiler behaves in the browser and how much work is required to build an acceptable TypeScript project editor 100% client side using monaco-editor from scratch.

# Demos

 * [TypeScript Compiler API 100% in the browser](https://cancerberosgx.github.io/typescript-in-the-browser/typescript-compiler). Collection of examples that runs 100% in the browser loading the original typescript.js file. Among others, examples use TypeScript APIs: create program, language service, transformations & code printing, compilation and AST transversing, and even third party libraries like ts-simple-ast or tsquery. Research to know limitations and work required to support TypeScript compiler APIs in the browser

 * [Prototype of TypeScript Project editor based on monaco-editor](https://cancerberosgx.github.io/typescript-in-the-browser/candombed) a proof of concept using [monaco-typescript-project-util](https://github.com/cancerberoSgx/typescript-in-the-browser/tree/master/monaco-typescript-project-util) (see below) to build a TypeScript Project editor.

# Projects: 

## monaco-typescript-project-util

 * Provide a easy to use API and tools to implement a monaco-editor 100% in the browser. APIs and tools are particularly focussed to support TypeScript projects. Supports loading monaco-editor from local server or from external CDN. See [project home page](https://github.com/cancerberoSgx/typescript-in-the-browser/tree/master/monaco-typescript-project-util). 

## candombed

 * Built on top of monaco-typescript-project-util to bring an opinionated TypeScript project editor, very simple to install, 100% browser side as static pages 
 * [Project Home](https://github.com/cancerberoSgx/typescript-in-the-browser/tree/master/candombed)
 * [Demo](https://cancerberosgx.github.io/typescript-in-the-browser/candombed) Load one of the examples. Test how types and tsconfig.json are loaded accordingly. Navigate through files using ctrl-click. Try to Actions->emit file. Drop your local projects using File->Load. Test monaco-editor built-in tools such as find references, peek definition, format code, etc. 

## typescript-compiler-in-the-browser

 * just load typescript.js and start using it in the browser - see how much we can emulate and which amount of its API and related libraries can we use in the browser. Hs nothing to do with project editors, or monaco. 
 * [Project home](https://github.com/cancerberoSgx/typescript-in-the-browser/tree/master/typescript-compiler-in-the-browser)
 * [Using TypeScript Compiler in the browser DEMO](https://cancerberosgx.github.io/typescript-in-the-browser/typescript-compiler) - Select an example and it will be run **100% in the browser** showing the output. Among others, examples use TypeScript APIs: create program, language service, transformations & code printing, compilation and AST transversing, and even third party libraries like ts-simple-ast or tsquery.  


# Build all 

```
npm i 
npm run all
http-server docs
```

For development, in general is `npm run dev` but please, go to specify projects just in case. 