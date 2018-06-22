import { ProgramProviderVeryDummyImpl } from './programProvider/programProviderVeryDummyImpl';

export function getDefaultBrowserProgramProvider() {
  return new ProgramProviderVeryDummyImpl()
}