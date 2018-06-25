import { Example } from '../../compiler/types';

export function projectToJson(p: Example): string {
  return JSON.stringify({
    id: p.id,
    description: p.description,
    name: p.name,
    flies: p.files
  })
}

export function jsonToProject(s: string): Example {
  // TODO: do it well , checking each property
  const parsed = JSON.parse(s) as Example
  parsed.execute = () => { }
  return parsed
}