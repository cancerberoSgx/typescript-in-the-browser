import { AbstractProject } from '../types';

export function projectToJson(p: AbstractProject): string {
  return JSON.stringify(p)
}

export function jsonToProject(s: string): AbstractProject {
  // TODO: do it well , checking each property
  const parsed = JSON.parse(s) as AbstractProject
  // parsed.execute = () => { }
  return parsed
}