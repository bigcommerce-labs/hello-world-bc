import { Parser, ParseCommand, ParseResult, NotificationSeverity } from "./parser";

'use strict';

import { Decimal } from "decimal.js"

class DecimalParser implements Parser<Decimal> {

    parse(cmd: ParseCommand): ParseResult<Decimal> {
        if (!cmd.isNullable && (cmd.raw === undefined || cmd.raw.trim() === '')) {
            return <ParseResult<Decimal>>{
                notifications: [
                    {
                        severity: NotificationSeverity.Error,
                        message: "Unable to determine a number from required input"
                    }
                ]
            }
        }

        if (cmd.raw === undefined || cmd.raw.trim() === '') {
            return <ParseResult<Decimal>>{}
        }

        var decimal = new Decimal(0.0);
        try {
            decimal = new Decimal(cmd.raw.trim());
        } catch (e) {
            console.log(e)
            return <ParseResult<Decimal>>{
                notifications: [
                    {
                    severity: NotificationSeverity.Error,
                    message: "Invalid decimal value"
                    }
                ]
            }
        }

        // TODO: support truncating digits at some point

        return <ParseResult<Decimal>>{ result: decimal };
    }

}

export let decimal_parser = new DecimalParser