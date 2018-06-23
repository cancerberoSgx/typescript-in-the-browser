
const copies = [
  { source: 'src/static/*', dest: 'static' },
  { source: 'node_modules/bootstrap/dist/css/bootstrap.min.css', dest: 'static' },
  { source: 'node_modules/jquery/dist/jquery.slim.min.js', dest: 'static' },
  { source: 'node_modules/bootstrap/dist/js/bootstrap.min.js', dest: 'static' }
]


import {cp, mkdir} from 'shelljs'
export function copy (){
  copies.forEach(c=>cp('-rf', c.source, c.dest))
}
mkdir('-p', 'static')
copy()