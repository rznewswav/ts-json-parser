import { createKeywordParser } from './create-keyword-parser';

export const parseKeywordTrue = createKeywordParser('true');
export const parseKeywordFalse = createKeywordParser('false');
export const parseKeywordNull = createKeywordParser('null');
