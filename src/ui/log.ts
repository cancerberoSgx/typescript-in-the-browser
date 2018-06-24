
const lines:string[] = []
export function log(...args:any[]){
  const line = args.join(' ') + '\n'
  lines.push(line)
  // console.log(line)
}
export function resetLog(){
  lines.length = 0
}
export function getLines():string[]{
  return lines
}