import logConsole from './logConsole';

const lines:string[] = []
export function log(...args:any[]){
  const line = args.join(' ') + '\n'
  lines.push(line)
  console.log(line);
  
  // document.getElementById('logOutput').innerText += args.join(' ') + '\n'
}
export function resetLog(){
  lines.length = 0
}
export function getLines():string[]{
  return lines
}