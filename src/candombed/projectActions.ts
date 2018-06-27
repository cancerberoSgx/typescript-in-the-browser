import { getMonacoModelFor } from '../common/monaco/register';
import { getTsWorker } from '../common/monaco/tsWorker';
import { dispatchAddFile } from './actions/addFile';
import { getSelectedFile, State } from './actions/State';

export async function getEmitOutput(state: State) {
  getTsWorker(getMonacoModelFor(getSelectedFile(state)).uri).then(async w => {
    const files = await w.getScriptFileNames()
    files.forEach(async f => {
      const emit = await w.getEmitOutput(f)
      const files = emit.outputFiles
        .filter(f => !f.name.startsWith('inmemory:/'))
        .map(outputFile => ({
          fileName: outputFile.name
            .replace('file:///', ''), content: outputFile.text
        }))
      dispatchAddFile(files)
    })
  })
}