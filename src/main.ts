import { parseValue } from './parse-value';
import { StringReader } from './string-reader';

const input = `
here is a sample json
{ "hello": "world"  , "array": [1, "234", false, {} ]}

Note: this is an example of a json file`;
const sr = new StringReader(input);
sr.seek('{');
console.dir(parseValue(sr), { depth: null });
console.log();
console.log('Leftover string:', sr.slice());
