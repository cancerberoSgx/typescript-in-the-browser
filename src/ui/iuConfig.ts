const config: UIConfig = {
  editorKind: 'monaco'
}
export function getUIConfig(): UIConfig{
  return config
}
export function set(key: keyof UIConfig, value: any): UIConfig{
  return config
}
export function setEditorKind(value: EditorKind){
  config.editorKind = value
}
export interface UIConfig{
  editorKind: EditorKind
}
export type EditorKind = 'monaco'|'pre'