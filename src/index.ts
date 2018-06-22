import { ProgramProviderVeryDummyImpl } from './programProviderVeryDummyImpl';

export function getDefaultBrowserProgramProvider() {
  return new ProgramProviderVeryDummyImpl()
}