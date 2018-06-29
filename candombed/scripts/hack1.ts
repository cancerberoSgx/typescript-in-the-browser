// https://github.com/tomkp/react-split-pane/issues/284

import {readFileSync, writeFileSync} from 'fs'

const pj = JSON.parse(readFileSync('node_modules/react-split-pane/package.json').toString())
delete pj.browserify
writeFileSync('node_modules/react-split-pane/package.json', JSON.stringify(pj, null, 2))