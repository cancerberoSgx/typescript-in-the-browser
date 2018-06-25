import { LanguageServiceProviderDummy1 } from './dummy1';

export function getDefaultLanguageServiceProvider() {
  return new LanguageServiceProviderDummy1()
}