
// monaco-editor type and hacks "facade"
import * as _monaco from 'monaco-editor'
export function getMonaco(): typeof _monaco {
  return (window as any).monaco
}
export const requireMonaco = (window as any).RequireMonaco as (fn: () => void) => void;