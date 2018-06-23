
const copies = [
  { source: 'src/static/*', dest: 'static' },
  // { source: 'node_modules/bootstrap/dist/css/bootstrap-grid.min.css', dest: 'static/assets' }
]

import {cp, mkdir} from 'shelljs'
mkdir('-p', 'static')
copies.forEach(c=>cp('-rf', c.source, c.dest))