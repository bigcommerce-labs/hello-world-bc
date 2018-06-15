'use strict';

import { decimal_parser } from './decimal-parser';
import { ParseCommand, ParseResult, NotificationSeverity } from './parser';

import { Decimal } from "decimal.js"

test('non-nullable fields that are empty return an error', () => {
    const givenOne = <ParseCommand>{
        raw: undefined,
        isNullable: false,
        isTruncatable: true,
        isFuzzy: true
    };
    const expectedOne = <ParseResult<Decimal>>{
        notifications: [
            {
            severity: NotificationSeverity.Error,
            message: "Unable to determine a number from required input"
            }
        ]
     };
    expect(decimal_parser.parse(givenOne)).toEqual(expectedOne)

    const givenTwo = <ParseCommand>{
        raw: '   ',
        isNullable: false,
        isTruncatable: true,
        isFuzzy: true
    };
    const expectedTwo = <ParseResult<Decimal>>{
        notifications: [
            {
            severity: NotificationSeverity.Error,
            message: "Unable to determine a number from required input"
            }
        ]
     };
    expect(decimal_parser.parse(givenTwo)).toEqual(expectedTwo)
});

test('nullable fields that are empty return', () => {
    const givenOne = <ParseCommand>{
        raw: undefined,
        isNullable: true,
        isTruncatable: true,
        isFuzzy: true
    };
    const expectedOne = <ParseResult<Decimal>>{}
    expect(decimal_parser.parse(givenOne)).toEqual(expectedOne)

    const givenTwo = <ParseCommand>{
        raw: '   ',
        isNullable: true,
        isTruncatable: true,
        isFuzzy: true
    };
    const expectedTwo = <ParseResult<Decimal>>{}
    expect(decimal_parser.parse(givenTwo)).toEqual(expectedTwo)
});

test('decimals with 12 digits of precision parse correctly', () => {
    const s = "123.123456789012"
    const given = <ParseCommand>{
        raw: s,
        isNullable: false,
        isTruncatable: false,
        isFuzzy: false
    }
    const expected = <ParseResult<Decimal>>{
        result: new Decimal(s)
    }
    expect(decimal_parser.parse(given)).toEqual(expected)
});

test('integers parse as decimals correctly', () => {
    const s = "1424323423"
    const given = <ParseCommand>{
        raw: s,
        isNullable: false,
        isTruncatable: false,
        isFuzzy: false
    }
    const expected = <ParseResult<Decimal>>{
        result: new Decimal(s)
    }
    expect(decimal_parser.parse(given)).toEqual(expected)
});