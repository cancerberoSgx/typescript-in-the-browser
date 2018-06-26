import { AbstractProject } from '../types';

export function projectToJson(p: AbstractProject): string {
  return JSON.stringify({
    // id: p.id,
    // description: p.description,
    name: p.name,
    flies: p.files
  })
}

export function jsonToProject(s: string): AbstractProject {
  // TODO: do it well , checking each property
  const parsed = JSON.parse(s) as AbstractProject
  // parsed.execute = () => { }
  return parsed
}