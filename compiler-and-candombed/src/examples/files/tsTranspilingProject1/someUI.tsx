declare namespace JSX {
  interface IntrinsicElements {
      [elemName: string]: any
  }
}
interface FooProp {
  name: string
  X: number
  Y: number
}
const amorphus = (a:string, arr: string[], b=<uh/>)=> (<seba u={a}/>)
const AnotherComponent =  (params : {name: string}) =>(<hu/>)
function ComponentFoo(prop: FooProp) {
  return <AnotherComponent name={prop.name} />
}
