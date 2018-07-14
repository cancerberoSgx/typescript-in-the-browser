export function debugFactory(componentName: string): Debug {
  return function debug(m: string) {
    if (debugFlags[componentName]) {
      console.log(`${componentName} debug: ${m}`)
    }
  }
}
const debugFlags: {[k: string]: boolean} = {}
export function setDebugEnabledFor(componentName: string, enabled: boolean){
  debugFlags[componentName] = enabled
}
export type Debug = (m: string) => void


