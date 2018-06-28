import { watch } from 'fs';
import { copy } from './copy-static';


import { cp, mkdir } from 'shelljs'
// watch('src/static', ()=>{
//   copy()
// })

watch('src/static/candombed', ()=>{
  cp('-r', 'src/static/candombed/*', 'static/candombed')
})
// watch('src/static/examples', ()=>{
//   copy()
// })