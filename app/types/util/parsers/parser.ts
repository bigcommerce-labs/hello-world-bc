import { Notification } from '../notifications/notifications'

interface ParseCommand {
    readonly raw: string | undefined;
    readonly isNullable: boolean;
    readonly isTruncatable: boolean;
    readonly truncationLength: number | undefined;
    readonly isFuzzy: boolean;
}

interface ParseResult<T> {
    readonly result: T | undefined
    readonly notifications: Notification[]
}

interface Parser<T> {
    parse(cmd: ParseCommand): ParseResult<T>
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

export { Parser, ParseCommand, ParseResult }