const config: UIConfig = {
  editorKind: 'monaco',
  mainContentKind: 'project'
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
export function setMainContentKind(value: MainContentKind){
  config.mainContentKind = value
}
export interface UIConfig{
  editorKind: EditorKind
  mainContentKind: MainContentKind
}
export type EditorKind = 'monaco'|'pre'
export type MainContentKind = 'simple1'|'project'