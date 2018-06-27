# typescript-project-monaco-editor-browser-utils

Utilities and easy to use APIs to quickly implement a TypeScript **project** editor, 100% in the browser using monaco-editor.

Features and objectives: 

 * easy to use , high level API to load a typescript editor into monaco
 * very simple and agnostic Project API (monaco doesn't have)
 * 100% static pages running in the browser. 
 * tools to handle typescript language service API , load tsconfig, libraries, types from nopkg cdn, navigation between files, etc
 * easier monaco-editor- loading both 100% local or from cdn
 * minimal devtools to build production
 * basic widgets to represent file tree, workbench, actions, etc
 * this is not about using/ implementing language services, etc in the browser, but just leveraging monaco-typescript so is easier to implement TypeScript **Project** editors in the browsers
 * objective : move / the things currently on src/common to here. remove non necessary dependencies 
 * very easy to generate a working editor 100% static by just: 

```
npm install typescript-project-monaco-editor-browser-utils
import ProjectEditor from 'typescript-project-monaco-editor-browser-utils'
new ProjectEditor({simple: config, or: nothing})
<script src="bundle.js">
http-server static && firefox localhost:8080
```

2 modalities : we could load everything from cdn (very lightweight html + bundle.js or we coudl havemost of the files in localhost (probably will require n extra step of running a script node companion-script --output static that basically copy files from node_modules to static folder

