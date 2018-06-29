// monaco-editor type and hacks "facade"
import * as _monaco from 'monaco-editor';
export function getMonaco(): typeof _monaco {
  return (window as any).monaco
}
export const requireMonaco = function(fn: () => void):void{
  if(!(window as any).RequireMonaco){
    const timer = setInterval(()=>{
      if((window as any).RequireMonaco){
        clearInterval(timer);
        (window as any).RequireMonaco(fn)
      }
    }, 100)
  }
  else{
    (window as any).RequireMonaco(fn)
  }
}
