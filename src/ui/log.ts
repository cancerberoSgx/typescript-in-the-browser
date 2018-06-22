
export function log(...args){
  document.getElementById('logOutput').innerText += args.join(' ') + '\n'
}
export function resetLog(){
}