# Running TypeScript compiler in the Browser

Projects: 

# monaco-typescript-project-util

 * API, tools and utilities to leverage 100% browser JavaScript Project editor. See [home page](https://cancerberosgx.github.io/typescript-in-the-browser/monaco-typescript-project-util)

# candombed

 * Built on top of monaco-typescript-project-util to bring an opinionated TypeScript project editor, very simple to install, 100% browser side as static pages [Candombed - demo - WIP](https://cancerberosgx.github.io/typescript-in-the-browser/candombed)

# typescript-compiler-in-the-browser

 * just load typescript.js and start using it in the browser - see how much we can emulate and which amount of its API and related libraries can we use in the browser. Hs nothing to do with project editors, or monaco. [See home](https://cancerberosgx.github.io/typescript-in-the-browser/typescript-compiler-in-the-browser)
 * [Using TypeScript Compiler in the browser demo](https://cancerberosgx.github.io/typescript-in-the-browser/)

# Independent examples - research

These are self contained examples that uses typescript without processing or changing it, just loading the original typescript.ts and perform stuff: 

 * [TypeScript Compiler API very simple example - transpiling code](https://cancerberosgx.github.io/typescript-in-the-browser/examples/ts-browser-transpile-works.html)
 * [I can create individual SourceFile and visit its Nodes](https://cancerberosgx.github.io/typescript-in-the-browser/examples/ts-browser-create-sourcefile-works.html)
 * [Cannot work with ts.Program](https://cancerberosgx.github.io/typescript-in-the-browser/examples/ts-browser-create-program-fails.html)


# build all 

```
npm i 
npm run all
http-server docs
```

for development please go to specify projects. 