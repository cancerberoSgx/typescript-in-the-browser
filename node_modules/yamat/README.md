# yamat: Yet Another Monorepo Administration Tool

Tired of the complexities of lerna, rush or yarn workspaces ? This tool solves the problem of mono repos (multiple packages in the same repository) with a very straightforward solution. 

 * npm based
 * Don't create links just execute npm commands
 * dumb tool - dependency order in configuration file is user's responsibility (will be improved)
 * Don't mess with node_modules
 * Not involved with the development cycle. 
 * Just a simple transformation back and forward in versions of your monorepo's `package.json` dependencies. Will never modify anything else but that 
 * User is responsible on everything else, publish, versioning, testing
 * User is responsible of setting a **"prepare" script** that builds its project accordingly - if not unlink --version pack
   won't work as well as npm publish 
 * User is responsible of correctly ordering dependencies in yamat.json so build doesn't fail
 * KISS. 
 * Don't try to be fast. 
 * Don't try to save space on your disk. 
 * Don't try solve any npm problem. Reuses as much as it can of already existent npm functionality. 
 * It's user responsibility to execute `yamat link` when starting development and `yamat unlink` before publishing
 * CLI and node.js API


# Commands

## yamat unlink

 * **Execute before publishing**. 
 * **Will point to numbered dependencies**. 
 * `yamat unlink` : will point to the current version number of the local `package.json`. **Ideal for publish all the packages together**.
 * `yamat unlink --version pack` : for each managed dependency will generate a package tarball and point all dependents there. A package tarball (.tgz file) is generated with `npm pack` command and is identical to the result of `npm publish`. **Ideal for testing packages before publishing**


## yamat link
 
 * **Execute before start developing** in mono-repo - mode. Will change dependencies pointing to local folders ("some-package": "file:../some-package"). "Mono-repo development mode". 
  For each managed dependency it will point it to a relative filesystem path. Then executes `npm install` (which creates sym links)

## yamat run

 * **Runs a command on all packages**. For example `yamat run npm test` will execute `npm test` on each package, serially. If one ends with exit code different than 0 then yamat will also. By default yamat won't execute the command on following packages if one fails.Fr preventing this and run the command on all packages and then give a final report execute with ` --break-on-error no` argument like this: `yamat --break-on-error no run npm test`  . 

## yamat forceDependenciesLatest

 * Upgrade all dependencies in al packages to latest version found in npmjs.org

## yamat help

 * prints help on all comand as examples and exit


# Common Publishing workflow 

(for impatiens)

Imagine you made lots of changes, your tests are green and you feel it's time to increment versions and publish to npm. You want to test against packages identical to the ones that are published. If tests pass, increment version and publish:

```sh
yamat run npm test 
# tests are passing with dependencies linked in filesystem
# so now we want to run tests using "npm pack" version of dependencies
# that should be identical to next version of "npm publish"
yamat unlink --version pack
yamat run npm run clean 
yamat run npm install
yamat run npm run build
yamat run npm test
# OK tests passed using "npm pack" version of dependencies
# let's increment version, point to that new version and publish
yamat unlink # point dependencies to version declared in local package.json
yamat run npm version patch # increments version by 0.0.1 of package
yamat unlink # update dependencies version (incremented with previous command)
yamat run npm publish
```
If unsure, you could run `yamat unlink --version pack && yamat run npm run clean && yamat run npm install && yamat run npm run build && yamat run npm test && yamat unlink` commands again before the last `npm publish` but IMO not necessary because we already test everything against packed dependencies... Just make sure you run `yamat unlink` before publishing. 

See more detailed examples below. 

# Tutorial

let's create a new mono-repo with two packages inside, foo and bar, and bar depends on foo:

## Initial setup

```sh
mkdir project1 && cd project1 && npm init -y
mkdir foo && cd foo && npm init -y && echo "module.exports = 'from foo'"> index.js && cd ..
mkdir bar && cd bar && npm init -y && npm install --save ../foo && echo "console.log('foo say: '+require('foo'))"> index.js && cd ..
```

We setup both packages - bar points to ../foo. We haven't used yamat yet. 

Notice that we are ready to work since bar/node_modules/foo is a symbolic link that npm created Install other dependencies on each internal repository, as usual - on this regard they are independent. 

The problem arises when we start publishing. We want to publish both

## Setup yamat

```sh
npm install --save-dev yamat
cat > yamat.json 
[
  {"name": "foo", "path": "./foo"}, 
  {"name": "bar", "path": "./bar"}
]
^D 
```

**Important** I defined project foo before bar in the array because bar depends on foo. Because commands run with yamat will run in order and serially, **I'm responsible of ordering packages in yamat.json** so, for example, build don't fail. 


## First publish

```sh
yamat unlink
yamat run npm publish
```

## Keep developing and publish again

```sh
yamat link
# ready to local development. write test compile install, etc
# now we want to publish all packages again

# make sure tests are green
yamat run npm test 

# build packages with npm pack and point dependencies to them (so is identical to 
# what will happen when we publish)
yamat unlink --version pack 

# run tests again
yamat run "npm install && npm run build && npm run test"

# and if everything is OK increase versions, point dependencies to those new versions and publish

# increment version of each package
yamat run npm version patch

# point dependencies to version declared in local package.json
yamat unlink 

# publish all packages to npmjs.org. If a package is not meant to be published just 
# add "private": false to its package.json. We execute it with  --break-on-error no 
# because private packages will give error if we try to publish them:
yamat --break-on-error no run npm publish

# link packages locally again to keep developing: 
yamat link
```


# TODO - ROADMAP

see TODO.md file next to this