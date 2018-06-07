'use strict';

const _ = require('lodash')

interface ParseCommand {
    readonly raw: string | undefined;
    readonly isNullable: boolean;
    readonly isTruncatable: boolean;
    readonly truncationLength: number;
    readonly isFuzzy: boolean;
}

interface ParseResult<T> {
    readonly result: T | undefined
    readonly notifications: Notification[]
}

interface Parser<T> {
    parse(cmd: ParseCommand): ParseResult<T>
}

enum NotificationSeverity {
    Unknown = 0,
    Debug = 1,
    Info = 2,
    Warn = 3,
    Error = 4
}

interface Notification {
    readonly severity: NotificationSeverity,
    readonly message: string
    readonly notificationData: object | undefined
}

/*

  type parsers

 - boolean
 - int
 - decimal (do not support float)
 - currency with precision
 - string with length
 - row separated by characters
 - character
 - currency code

  undefined = there is no row
  null      = they want to null out the field

   - trim operations should maybe occur prior to parse?
   - assert certain invariants of parsers at construction
     - truncationLength > 0

*/

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
        if (!cmd.isTruncatable && cmd.raw && cmd.raw.length > cmd.truncationLength) {
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
        if (cmd.isTruncatable && cmd.raw && cmd.raw.length > cmd.truncationLength) {
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

export { ParseCommand, ParseResult, NotificationSeverity, Notification }
export let string_parser = new StringParser