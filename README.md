# Running TypeScript compiler in the Browser

# See it in action

[Using TypeScript Compiler in the browser demo](https://cancerberosgx.github.io/typescript-in-the-browser/)

# Objectives

 * Bring TypeScript compiler to the browser in the smoothest and straightforward way I can. un the compiler, TypeScript Language Service
 * Plugins, transformations and related tools 100% in the browser, can you imagine?
 * Find out TypeScript limitations while running in other environments than node.js - particularly in the browser. Is it too large ? is it too slow ?  is it too difficult / impossible to support something in the browser ? something
 * can we run third party tools around TypeScript compiler like ts-simple-ast or tsquery ? 

## Use

```sh
npm install
```

Development environment: 

```sh
npm run dev-prepare # just once
npm run dev
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
 * [Monaco TypeScript Project](https://cancerberosgx.github.io/typescript-in-the-browser/examples/monaco-project.html)

## Status

 * Successfully and Straightforwardly compiling and running TypeScript in the browser with browserify  didn't had to make any magic - tsc and browserify did the trick.

 * ts.createProjectHost doesn't work in the browser because there is no ts.sys - we need to create the host manually. See src/dummyUtils.ts#createDummyCompilerHost.ts

 * with that we oad a couple of files and query the source documents fine

 * have a dummy very basic implementation of compiler host in memory. will work on improve it but first want to make sure is viable to run compiler and limitation
  
 * loading the big typescript.js file, perhaps it could be more suitable distro ?

 * ts-simple-ast - not possible to run in the browser - is to tight to filesystem - gracefulfs etc - ... report issue and ask if it's possible to decouple from fs - at least the compiler part.


## TODO: 

 * this file https://cdnjs.cloudflare.com/ajax/libs/typescript/2.9.2/typescript.min.js works when transpiling and weight only 400kb. Let's try with that one instead of with the big one we are currently using 
 * JS api so I can easily use this "project" in my own - for example, I want to compile typescript in my project that runs in the browser and easily require this one using browserify. - I think is already done we should test if it works
 * development - sourcemaps
 * specs / test - would be interesting to have the plugin development experience in the browser. seems to be fast.
 * when we implement js API for plugins like proactive we will lcan apply it to monaco web no matter if it supports tls plugins or not
 * plugins ? 
 * monaco + plugins + compiler 100% in client would be awesome
 * large projects ? support .zip file with ts project drag and drop
 * since this is not a plugin maybe we want to move it to a separate project or put it together with typescript-compiler-playground both in the same repo
 * first implementation in memory but then implement it using browserfs both using a fast/synch techology and then using  a slow / request-based one.
 * OOT: small framework around monaco with * tree view at the right side and a "comsole / webtools" in the bottom - that wl help us to present these kind of examples. 

## Dones

 * idea: for each project in example files add a tsconfig.json and show all files as a project and use that tsconfig when creating the ts.Program
 * monaco editor and 100% client side typescript experience
 * move out typescript.js from compilation chain so its faster
 * browsersync - watchify and tsc -w for development is great.
 * ts-simple-ast ?  - not possible to run in the browser. 
 * Language service ? 
 * typechecker? 
 * tsquery