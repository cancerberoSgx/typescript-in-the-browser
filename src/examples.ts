import tsSimple1 from './examples/tsSimple1';
import tsTranspilingProject1 from './examples/tsTranspilingProject1';
import { Example } from './types';

const examples = [
  new tsSimple1(),
  new tsTranspilingProject1()
]
export function getExamples(): Example[] {
  return examples
}
