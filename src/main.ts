import { parseValue } from './parse-value';
import { StringReader } from './string-reader';

const input = `
{ "hello": "world"  , "array": [1, "234", false ]}

Note: this is an example of a json file`;
const sr = new StringReader(input);
sr.skipWhitespaces();
console.log(parseValue(sr));
console.log('Left:', sr.slice());
