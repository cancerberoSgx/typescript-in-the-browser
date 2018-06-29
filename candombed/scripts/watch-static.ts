import { watch } from 'fs';
import { copy } from './copy-static';


import { cp, mkdir } from 'shelljs'
// watch('src/static', ()=>{
//   copy()
// })

watch('src/static', ()=>{
  cp('-r', 'src/static/*', 'static')
})
// watch('src/static/examples', ()=>{
//   copy()
// })