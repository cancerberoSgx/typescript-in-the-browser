
import * as monacoEditor from 'monaco-editor'

export function monaco(): typeof monacoEditor {
  return (window as any).monaco
}

export const requireMonaco = (window as any).RequireMonaco as (fn: () => void) => void