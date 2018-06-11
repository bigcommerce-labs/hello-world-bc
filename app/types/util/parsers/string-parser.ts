'use strict';

const _ = require('lodash')

import { Parser, ParseCommand, ParseResult, Notification, NotificationSeverity } from "./parser"

class StringParser implements Parser<string> {

    parse(cmd: ParseCommand): ParseResult<string> {

        // Ensure non-nullable fields are defined
        if (!cmd.raw && !cmd.isNullable) {
            return <ParseResult<string>> {
                notifications: [{
                    severity: NotificationSeverity.Error,
                    message: "Value needs to be defined"
                }]
            }
        }

        var notifications: Notification[] = [];
        // Ensure that string not over the size limit
        if (!cmd.isTruncatable && cmd.raw && cmd.truncationLength && cmd.raw.length > cmd.truncationLength) {
            notifications.push(<Notification>{
                severity: NotificationSeverity.Error,
                message: `Value is ${cmd.raw.length} long, but only ${cmd.truncationLength} characters are allowed.`
            });
        }

        // If errors, return
        if (_.findIndex(notifications, (n: Notification) => { return n.severity == NotificationSeverity.Error }) >= 0) {
            return <ParseResult<string>> {
                notifications: notifications
            }
        }

        // if undefined and valid, return empty parse result
        if (!cmd.raw) {
            return <ParseResult<string>>{};
        }

        // Allow truncation but warn
        var parsed = cmd.raw
        if (cmd.isTruncatable && cmd.raw && cmd.truncationLength && cmd.raw.length > cmd.truncationLength) {
            parsed = cmd.raw.substring(0, cmd.truncationLength);
            const warning = `Value has been truncated to ${cmd.truncationLength} characters`;
            notifications.push(<Notification>{
                severity: NotificationSeverity.Warn,
                message: warning
            });
        }

        return <ParseResult<string>> {
            result: parsed,
            notifications: notifications
        }
    }
}

export let string_parser = new StringParser