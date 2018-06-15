'use strict';

import { boolean_parser } from './boolean-parser';
import { NotificationSeverity } from '../notifications/notifications'
import { ParseCommand, ParseResult } from './parser';

const _ = require('lodash')

test('should parse variants of false if given fuzzy', () => {
    const falsey = 
    [
        'false',
        'FaLse',
        'f',
        'F',
        '0',
        'n',
        'N',
        'no',
        'No'
    ];

    _.forEach(falsey, (s) => {
        const given = <ParseCommand>{
            raw: s,
            isNullable: true,
            isTruncatable: true,
            isFuzzy: true
        };
        const expected = <ParseResult<boolean>>{ result: false };
        expect(boolean_parser.parse(given)).toEqual(expected)
    });
});

test('should parse variants of true if given fuzzy', () => {
    const truthey = 
    [
        'true',
        'TRUE',
        't',
        'T',
        '1',
        'y',
        'Y',
        'yes'
    ]

    _.forEach(truthey, (s) => {
        const given = <ParseCommand>{
            raw: s,
            isNullable: true,
            isTruncatable: true,
            isFuzzy: true
        };
        const expected = <ParseResult<boolean>>{ result: true };
        expect(boolean_parser.parse(given)).toEqual(expected)
    });
    
});

test('if not fuzzy, should parse 1 as true', () => {
    const given = <ParseCommand>{
        raw: '1',
        isNullable: true,
        isTruncatable: true,
        isFuzzy: false
    };
    const expected = <ParseResult<boolean>>{ result: true };
    expect(boolean_parser.parse(given)).toEqual(expected)
});

test('if not fuzzy, should parse 0 as false', () => {
    const given = <ParseCommand>{
        raw: '0',
        isNullable: true,
        isTruncatable: true,
        isFuzzy: false
    };
    const expected = <ParseResult<boolean>>{ result: false };
    expect(boolean_parser.parse(given)).toEqual(expected)
});

test('should parse empty text as undefined', () => {
    const givenOne = <ParseCommand>{
        raw: '    ',
        isNullable: true,
        isTruncatable: true,
        isFuzzy: false
    };
    const expectedOne = <ParseResult<boolean>>{};
    expect(boolean_parser.parse(givenOne)).toEqual(expectedOne);

    const givenTwo = <ParseCommand>{
        raw: '',
        isNullable: true,
        isTruncatable: true,
        isFuzzy: false
    };
    const expectedTwo = <ParseResult<boolean>>{};
    expect(boolean_parser.parse(givenTwo)).toEqual(expectedTwo);
});

test('should parse N/A as undefined if fuzzy is on', () => {
    const given = <ParseCommand>{
        raw: 'N/A',
        isNullable: true,
        isTruncatable: true,
        isFuzzy: true
    };
    const expected = <ParseResult<boolean>>{};
    expect(boolean_parser.parse(given)).toEqual(expected);
});

test('should have N/A send an error if fuzzy is off', () => {
    const given = <ParseCommand>{
        raw: 'N/A',
        isNullable: true,
        isTruncatable: true,
        isFuzzy: false
    };
    const expected = <ParseResult<boolean>>{
        notifications: [
            {
                severity: NotificationSeverity.Error,
                message: 'Unable to determine a true or false value from input'
            }
        ]
    };
    expect(boolean_parser.parse(given)).toEqual(expected);
});

test('should error if nullable is false and value is empty', () => {
    const given = <ParseCommand>{
        raw: '',
        isNullable: false,
        isTruncatable: true,
        isFuzzy: false
    };
    const expected = <ParseResult<boolean>>{
        notifications: [
            {
                severity: NotificationSeverity.Error,
                message: 'Unable to determine a true or false value from empty (required) input'
            }
        ]
    };
    expect(boolean_parser.parse(given)).toEqual(expected);
});