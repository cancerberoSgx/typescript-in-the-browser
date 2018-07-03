// monaco-editor type and hacks "facade"
import * as _monaco from 'monaco-editor';
export function getMonaco(): typeof _monaco {
  return (window as any).monaco
}
export const re_quireMonaco = function(fn: () => void):void{
  if(!(window as any).Re_quireMonaco){
    const timer = setInterval(()=>{
      if((window as any).Re_quireMonaco){
        clearInterval(timer);
        (window as any).Re_quireMonaco(fn)
      }
    }, 100)
  }
  else{
    (window as any).Re_quireMonaco(fn)
  }
}

export const monacoLoaded = ():Promise<typeof _monaco> => {
  return new Promise(resolve=>{
    re_quireMonaco(()=>resolve(getMonaco()))
  })
}