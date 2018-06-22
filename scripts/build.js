var browserfsPath = require.resolve('browserfs');
var browserify = require('browserify');
var tsify = require('tsify');
var fs = require('fs')
var path = require('path')
// const fs = require('fs')
// const uglifyify = require('uglifyify')
// const exorcist = require('exorcist')


function production1(main, bundle, out){
const config = {debug: false}
  browserify()
  .add(main)
  .plugin(tsify, config)
  .bundle()
  .transform('uglifyify') 
  .on('error', function (error) { console.error(error.toString()); })
  .pipe(fs.createWriteStream(path.join(bundle)))
  .on('end', ()=>{console.log('END')})
}
production1('src/test1.ts', 'dist/bundle.js')


// var browserifyConfig = {
//   // Override Browserify's builtins for buffer/fs/path.
//   builtins: Object.assign({}, require('browserify/lib/builtins'), {
//     "buffer": require.resolve('browserfs/dist/shims/buffer.js'),
//     "fs": require.resolve("browserfs/dist/shims/fs.js"),
//     "path": require.resolve("browserfs/dist/shims/path.js")
//   }),
//   insertGlobalVars: {
//     // process, Buffer, and BrowserFS globals.
//     // BrowserFS global is not required if you include browserfs.js
//     // in a script tag.
//     "process": function () { return "require('browserfs/dist/shims/process.js')" },
//     'Buffer': function () { return "require('buffer').Buffer" },
//     "BrowserFS": function() { return "require('" + browserfsPath + "')" }
//   }
// };

