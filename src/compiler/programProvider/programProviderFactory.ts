import { ProgramProviderVeryDummyImpl } from './dummy1/programProviderVeryDummyImpl';

export function getDefaultProgramProvider() {
  return new ProgramProviderVeryDummyImpl()
}