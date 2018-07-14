# Running TypeScript compiler in the Browser

# See it in action

 * [Demo](https://cancerberosgx.github.io/typescript-in-the-browser/typescript-compiler)

# Objectives

 * Bring TypeScript compiler to the browser in the smoothest and straightforward way I can. un the compiler, TypeScript Language Service
 * Plugins, transformations and related tools 100% in the browser, can you imagine?
 * Find out TypeScript limitations while running in other environments than node.js - particularly in the browser. Is it too large ? is it too slow ?  is it too difficult / impossible to support something in the browser ? something
 * can we run third party tools around TypeScript compiler like ts-simple-ast or tsquery ? (YES! -tsquery run out the box - ts-simple-ast needed a small PR now is OK)

# Use

```sh
npm install
```

Development environment: 

```sh
npm run dev-prepare # just once
npm run dev # http://localhost:3000/
```

or for candombed: 

```sh
npm run dev-candombed-prepare # just once
npm run dev-candombed # http://localhost:3000/candombed/
```

Production build: 
```sh
npm run all
```

That last one will generate a production ready distribution in ./docs

# Independent examples

These are self contained examples that uses typescript without processing or changing it, just loading the original typescript.ts and perform stuff: 

 * [TypeScript Compiler API very simple example - transpiling code](https://cancerberosgx.github.io/typescript-in-the-browser/examples/ts-browser-transpile-works.html)
 * [I can create individual SourceFile and visit its Nodes](https://cancerberosgx.github.io/typescript-in-the-browser/examples/ts-browser-create-sourcefile-works.html)
 * [Cannot work with ts.Program](https://cancerberosgx.github.io/typescript-in-the-browser/examples/ts-browser-create-program-fails.html)
 * [Using TypeScript Compiler in the browser demo](https://cancerberosgx.github.io/typescript-in-the-browser/)

# Status

 * Successfully and straightforwardly compiling and running TypeScript in the browser with browserify  didn't had to make any magic - tsc and browserify did the trick - all the API seems to work after we emulated compiler host / language service host. Even libraries like ts-simpleast and tsquery 

 * ts.createProjectHost didn't work in the browser because there is no ts.sys - we needed to create the host manually. See src/dummyUtils.ts#createDummyCompilerHost.ts

 * with that we oad a couple of files and query the source documents fine

 * have a dummy very basic implementation of compiler host and languageServiceHost in memory. will work on improve it but first want to make sure is viable to run compiler and limitation
  



# TODO: 
 * add a Execute button
 * make a new implementation of CompilerHost and LanguageServiceHost based on ts-simple-ast - just create a tsa program and use the compilerNodes 1
 * development - sourcemaps
 * try webpack ? 
 * specs / test - would be interesting to have the plugin development experience in the browser. seems to be fast.
 * when we implement js API for plugins like proactive we will be able to apply it to monaco web no matter if it supports tls plugins or not
 * plugins ? 
 * monaco + plugins + compiler 100% in client would be awesome
 * large projects ? support .zip file with ts project drag and drop
 * loading the big typescript.js file, perhaps typeScriptServices.js is better ?

## DONE

 * idea: for each project in example files add a tsconfig.json and show all files as a project and use that tsconfig when creating the ts.Program
 * monaco editor and 100% client side typescript experience
 * move out typescript.js from compilation chain so its faster
 * browsersync - watchify and tsc -w for development is great.
 * ts-simple-ast ?  - not possible to run in the browser. 
 * Language service ? 
 * typechecker? 
 * tsquery
 * ts-simple-ast - not possible to run in the browser - is to tight to filesystem - gracefulfs etc - ... report issue and ask if it's possible to decouple from fs - at least the compiler part.