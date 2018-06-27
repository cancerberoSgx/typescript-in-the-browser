# typescript-project-monaco-editor-browser-utils

Utilities and easy to use APIs to quickly implement a TypeScript **project** editor, 100% in the browser using monaco-editor.

Features and objectives: 

 * very simple and agnostic Project API (monaco doesn't have)
 * tools to handle typescript language service API , load tsconfig, libraries, types from nopkg cdn, navigation between files, etc
 * framework to leverage monaco-editor loading, both 100% local or from cdn
 * minimal devtools to build production
 * 100% static pages running in the browser. 
 * basic widgets to represent file tree, workbench, actions, etc
 * this is not about using/ implementing language services, etc in the browser, but just leveraging monaco-typescript so is easier to implement TypeScript **Project** editors in the browsers
 * objective : move / the things currently on src/common to here. remove non necessary dependencies 
 * objective : should be able to use it in typescript-compiler-playground - while I cannot run ts-simple-ast in the browser I can still develop the entire proect in the broser an run it in the server.


# Usage

should be very simple to generate a working project editor like this:

```
npm install typescript-project-monaco-editor-browser-utils
import ProjectEditor from 'typescript-project-monaco-editor-browser-utils'
new ProjectEditor({simple: config, or: nothing})
< script src="bundle.js">
http-server static && firefox localhost:8080
```

## Monaco-editor loading: 

2 modalities : we could load everything from cdn (very lightweight html + bundle.js or we coudl havemost of the files in localhost (probably will require n extra step of running a script node companion-script --output static that basically copy files from node_modules to static folder


# candombed - based on typescript-project-monaco-editor-browser-utils, more end-user product for a "project - editor"

 * the experience should be similar as previous but this time the editor is opinionated and prettier.