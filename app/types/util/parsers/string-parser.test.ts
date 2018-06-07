'use strict';

import { ParseCommand, ParseResult, NotificationSeverity } from "./parser"
import { string_parser } from "./string-parser";

// string parsing tests
test('it will give an error if a value is undefined and it is not nullable', () => {
    const givenUndefined = <ParseCommand>{
        // raw: undefined,
        isNullable: false,
        isTruncatable: true,
        truncationLength: 80,
        isFuzzy: false
    };
    const expected = <ParseResult<string>>{
        notifications: [{
            severity: NotificationSeverity.Error,
            message: "Value needs to be defined"
        }]
    };
    expect(string_parser.parse(givenUndefined)).toEqual(expected);
});

test('it can parse an undefined value if a field is nullable', () => {
    const givenUndefined = <ParseCommand>{
        // raw: undefined,
        isNullable: true,
        isTruncatable: true,
        truncationLength: 80,
        isFuzzy: false
    };
    const expected = <ParseResult<string>>{};
    expect(string_parser.parse(givenUndefined)).toEqual(expected);
});

test('it will parse a string if it is less than the max limit', () => {
    const raw = "Abcdefgh123435";
    const given = <ParseCommand>{
        raw: raw,
        isNullable: false,
        isTruncatable: false,
        truncationLength: 80,
        isFuzzy: false
    }
    const expected = <ParseResult<string>>{
        result: raw,
        notifications: []
    };
    expect(string_parser.parse(given)).toEqual(expected);
});

test('it will return an error if the field is not truncatable and the length is over the limit', () => {
    const given = <ParseCommand>{
        raw: 'Abcdefg',
        isNullable: false,
        isTruncatable: false,
        truncationLength: 5,
        isFuzzy: false
    };
    const expected = <ParseResult<string>>{
        notifications: [
            {
                severity: NotificationSeverity.Error,
                message: 'Value is 7 long, but only 5 characters are allowed.'
            }
        ]
    };
    expect(string_parser.parse(given)).toEqual(expected);
});

test('it will return a warning if the field is truncatable and the length is over the limit', () => {
    const given = <ParseCommand>{
        raw: 'Abcdefg',
        isNullable: false,
        isTruncatable: true,
        truncationLength: 5,
        isFuzzy: false
    };
    const expected = <ParseResult<string>>{
        result: 'Abcde',
        notifications: [
            {
                severity: NotificationSeverity.Warn,
                message: 'Value has been truncated to 5 characters'
            }
        ]
    };
    expect(string_parser.parse(given)).toEqual(expected);
});

test('it should support unicode characters under the limit', () => {
    // todo
});

test('it should accurately compute unicode length when evaluating line limit', () => {
    // todo
})
