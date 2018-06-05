'use strict';

const csv = require('csvtojson');

import { Handler, Context, Callback } from 'aws-lambda';

interface ExtractCsvRowJson {

}

interface ExtractCsvResponse {
    statusCode: number,
    rowCount: number,
    rows: any[]
}

// TODO: make this a handler that calls extractCsv, which is testable independently
const extractCsv: Handler = (event: any, context: Context, callback: Callback) => {

    console.log(event);

    var header: string[] = [];
    var rows: string[] = [];
    csv({
        noheader: false,
        output: "csv"
    })
    .on('header', h => {
        header = h;
    })
    .fromString(event.body)
    .then((csvRow) => {
        // TODO: error handling
        rows.push(csvRow);
    })
    .then(
        v => callback(undefined, {
            statusCode: 200,
            body: JSON.stringify({
                "header": header,
                "rows": rows
            })
        }),
        callback
    );
};

export { extractCsv }