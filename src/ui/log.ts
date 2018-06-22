
export function log(...args:any[]){
  document.getElementById('logOutput').innerText += args.join(' ') + '\n'
}
export function resetLog(){
}