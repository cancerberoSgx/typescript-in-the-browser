import { getDefaultBrowserProgramProvider } from '..';

 
function main( ) {
  // Build a program using the set of root file names in fileNames
  const files = [
    { 
      fileName: 'file1.ts', content: `
class C {
  constructor(a: string, b: C) { }
}
  `}, 
  {
    fileName: 'file2.ts', content: `
class Dsd extends C {
constructor(a: string, b: Date[]) { 
  super(a, this)
}
}
`}
  ] 

  const provider = getDefaultBrowserProgramProvider()
  const program = provider.createProgram(files)
  program.getSourceFiles().forEach(f=>{
    f.forEachChild(c=>console.log(c.kind+''))
  })
}
main()


