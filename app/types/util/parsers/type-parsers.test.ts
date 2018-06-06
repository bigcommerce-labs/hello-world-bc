'use strict';

import { string_parser, ParseCommand, ParseResult } from "./type-parsers"

test('blah', () => {

    expect(string_parser.parse(<ParseCommand>{
        raw: 'abc'
    })).toBe(1);

});