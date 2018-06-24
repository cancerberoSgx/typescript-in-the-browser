import { ProgramProviderVeryDummyImpl } from './dummy1/programProviderVeryDummyImpl';

export function getDefaultBrowserProgramProvider() {
  return new ProgramProviderVeryDummyImpl()
}