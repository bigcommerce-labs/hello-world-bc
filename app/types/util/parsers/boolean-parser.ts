<<<<<<< HEAD
import { Parser, ParseCommand, ParseResult } from "./parser";
import { NotificationSeverity } from '../notifications/notifications'
=======
import { Parser, ParseCommand, ParseResult, NotificationSeverity } from "./parser";
>>>>>>> origin/master

'use strict';

const _ = require('lodash')

class BooleanParser implements Parser<boolean> {

    truthy: string[];
    falsey: string[];
    undefinedy: string[];

    constructor(truthy, falsey, undefinedy) {
        this.truthy = truthy;
        this.falsey = falsey;
        this.undefinedy = undefinedy;
    }

    parse(cmd: ParseCommand): ParseResult<boolean> {

        if (!cmd.isNullable && (cmd.raw === undefined || cmd.raw.trim() === '')) {
            return <ParseResult<boolean>>{
                notifications: [
                    {
                        severity: NotificationSeverity.Error,
                        message: 'Unable to determine a true or false value from empty (required) input'
                    }
                ]
            }
        }

        if (cmd.raw === undefined) {
            return <ParseResult<boolean>>{};
        }

        const s: string = cmd.raw.toLowerCase().trim();

        if (cmd.isFuzzy) {
            if (_.includes(this.truthy, s)) {
                return <ParseResult<boolean>>{ result: true };
            }
            if (_.includes(this.falsey, s)) {
                return <ParseResult<boolean>>{ result: false };
            }
            if (_.includes(this.undefinedy, s)) {
                return <ParseResult<boolean>>{};
            }
        }

        if (s == '0') {
            return <ParseResult<boolean>>{ result: false };
        }
        if (s == '1') {
            return <ParseResult<boolean>>{ result: true };
        }
        if (s === '') {
            return <ParseResult<boolean>>{};
        }

        return <ParseResult<boolean>>{
            notifications: [
                {
                    severity: NotificationSeverity.Error,
                    message: 'Unable to determine a true or false value from input'
                }
            ]
        };
    }

}

export let boolean_parser = new BooleanParser(
    [
        'true',
        't',
        '1',
        'y',
        'yes'
    ],
    [
        'false',
        'f',
        '0',
        'n',
        'no'
    ],
    [
        'undefined',
        'null',
        'n/a'
    ]
)