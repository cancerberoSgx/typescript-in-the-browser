# TODO

* "npm-run command : if users work with npm scipts then would be nice to write "yamat npm-run build" instead of current "yamat
  run npm run install"  
* test cli
* execute configs in order of dependencies - shouldn't be responsibility of the user
* yamat init ./package1, foo/package2   etc etc to create the yamat.json file from given pacakges.
* yamat unlink --version pack --target foo,bar // be able to only modify certain packages, not everyone 
* Alternative `yamat unlink --version npm` will use the latest version found in npmjs.org (so we can test with the actual real thing)
* yamat unlink --version global to point to the version installed globally - 
* yamat unlink --version=pack to point to npm pack generated file so we are sure the publish will go fine. 
* possible issue : yamat run npm run build: what about dependencies - we should build the roots first and then dependants... 
* license
* yamat.json - path nor required - if none use name as value
* npm run test-js
* yamat run spec
* should yamat link set dependencies  with ^ ?
* said we will not but would be nice to be able to  yamat run in parallel if user tells ur to do so, ie: yamat
  --parallel run npm install

## dependencies utilities

* list all versions of given external dependency used by all managed packages
* utilities to make sure all managed projects are using the same version of a given external dependency : ex:
  yamat force-dependency-version "typescript@2.9.1"
* utility similar as before but forcing all packages are using latest version of given external dep - use npm
  show ts-simple-ast version. ie : yamat force-dependency-latest typescript
* same as before but for all dependencies yamat force-dependencies-latest