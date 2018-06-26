const DEBUG = true
export function debugFactory(componentName: string): Debug {
  return function debug(m: string) {
    if (DEBUG) {
      console.log(`${componentName} debug: ${m}`)
    }
  }
}
export type Debug = (m: string) => void


