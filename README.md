# Running TypeScript compiler in the Browser

Objectives: Bring TypeScript compiler to the browser in the smoothest and straightforward way I can. un the compiler, TypeScript Language Service
Plugins, transformations and related tools 100% in the browser, can you imagine?

## Getting started: 
```sh
npm install
npm run dev-prepare # just once
npm run dev

npm run build-production
```

## Status

 * Successfully and Straightforwardly compiling and running TypeScript in the browser with browserify  didn't had to make any magic - tsc and browserify did the trick.

 * ts.createProjectHost doesn't work in the browser because there is no ts.sys - we need to create the host manually. See src/dummyUtils.ts#createDummyCompilerHost.ts

 * with that we oad a couple of files and query the source doucments fine

  * have a dummy very basic implementation of compiler host in memory. will work on improve it but first want to make sure is viable to run compiler and limitation
  
  * loading the big typescript.js file, perhaps it could be more suitable distro ?


## TODO: 
 * monaco editor and 100% client side typescript experience
 * specs / test - would be interesting to have the plugin development experience in the browser. seems to be fast.
 * when we implement js API for plugins like proactive we will lcan apply it to monaco web no matter if it supports tls plugins or not
 * Langauge service ? 
 * typechecker? 
 * plugins ? 
 * ts-simple-ast ? 
 * qstypes
 * monaco + plugins + compiler 100% in client would be awesome
 * large projects ?
 * since this is not a plugin maybe we want to move it to a separate project or put it toguether with typescript-compiler-playground both in the same repo
 * first implementation in memory but then implement it using browserfs both using a fast/synch techology and then using  a slow / request-based one.
 * OOT: small framework around monaco with * tree view at the right side and a "comsole / webtools" in the bottom - that wl lhelp us to present these kind of examples. 

## Dones

 *  "optimized typescript.js and development experience - Uses : 

  "separate typecript.js fil from the rest since is too big(20mb)
  * using tsc and browserify only (no tsify)
  browsersync - watchify and tsc -w for development is great.


 * move out typescript.js from compilation chain so its faster