# Candombed 

A TypeScript Project editor and framework, 100% in the browser, on top of [monaco-editor](https://github.com/Microsoft/monaco-editor).

![candombed](https://upload.wikimedia.org/wikipedia/commons/b/b5/12_candombe.jpg)

# See it in action

 * [Candombed - humble attempt to build a TypeScript Project Editor](https://cancerberosgx.github.io/typescript-in-the-browser/candombed)

# Objectives

Built on top of monaco-typescript-project-util to bring an opinionated TypeScript project editor, very simple to install, 100% browser side as static pages

# Usage

TODO


## Development

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


# TODO

 * remove examples from the source code put in docs and fetch() 
 add a example using tsx