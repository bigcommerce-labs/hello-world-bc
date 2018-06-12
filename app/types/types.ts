import { boolean_parser } from './util/parsers/boolean-parser';
import { decimal_parser } from './util/parsers/decimal-parser';
import { string_parser } from './util/parsers/string-parser';

const TypeParsers = {
    "decimal": decimal_parser,
    "string": string_parser,
    "boolean": boolean_parser
}

export { TypeParsers }