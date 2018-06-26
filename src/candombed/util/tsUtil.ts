import * as ts from 'typescript'

export function getTs(): typeof ts{
  return (window as any).ts
}