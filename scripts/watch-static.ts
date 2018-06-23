import { watch } from 'fs';
import { copy } from './copy-static';

watch('src/static', ()=>{
  copy()
})