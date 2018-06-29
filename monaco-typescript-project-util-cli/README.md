# monaco-typescript-project-util-cli 

Auxiliary build-time tool  for [monaco-typescript-project-util](https://github.com/cancerberoSgx/typescript-in-the-browser/tree/master/monaco-typescript-project-util) to 
set up the folder that will host the monaco-editor.

Mostly will copy files required by monaco-editor. 

Users call this at build time. 

# Motivation

To be sincere, the copy script is pretty simple and there aren't too much files to copy in general
(particularly true if using external CDN). But since monaco-typescript-project-util is about simplifying
monaco-editor typescript projects implementations and since there are lots of configurations and variations
regarding which languages / features to support, this project seems to be a good idea to put that
responsibility (the knowledge of which files to copy where and when) here.  


# Install

```sh
npm install --save-dev monaco-typescript-project-util-cli 
```

# Usage

Imagine you are hosting your monaco's editor index.html in folder ./static/cool-editor/index.html and you are
loading monaco-editor using an external CDN as sown in monaco-typescript-project-sample-project. To copy the
necessary files you use this tool by command line or by node.js API like shown next: 

## CLI

npx monaco-typescript-project-util-cli --folder "./static/cool-editor" --external-cdn true --base-url "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.13.1/min/"

## node.js API

```typescript
import {build, BuildConfig} from 'monaco-typescript-project-util-cli'

const config: BuildConfig  = {
  folder: './static/cool-editor/',
  externalCdn: true,
  baseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.13.1/min/',
}

build(config).then((result) => console.log(`
Your project's folder is ready! Report: 

${JSON.stringify(result, null, 2)}
`)
)
```