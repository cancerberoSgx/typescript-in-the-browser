import { getExamples } from './examples';
import { getDefaultBrowserProgramProvider } from './programProvider/programProviderFactory';

const defaultTest = 'tsTest1'
const exampleId = new URL(location.href).searchParams.get("example") || defaultTest
const found = getExamples().find(e => e.id === exampleId)
if (found) {
  const provider = getDefaultBrowserProgramProvider()
  const program = provider.createProgram(found.files)
  found.execute({ program })
}
else {
  alert('cannot execute test ' + exampleId)
}
