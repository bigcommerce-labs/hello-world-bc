'use strict';

const csv = require('csvtojson');
const _ = require('lodash');

import { Handler, Context, Callback } from 'aws-lambda';
import { CsvDataRow } from '../../../types/csvs'

interface ExtractCsvRowJson {
    
}

interface ExtractCsvResponse {
    statusCode: number,
    rowCount: number,
    rows: any[]
}

// TODO: make this a handler that calls extractCsv, which is testable independently
const extractCsvHandler: Handler = (event: any, context: Context, callback: Callback) => {

    console.log(event);

    var header: string[] = [];
    var rows: CsvDataRow[] = [];
    var kind: string = event.queryStringParameters.kind;
    var rowCounter: number = 0;
    csv({
        noheader: false,
        output: "csv"
    })
    .on('header', h => {
        header = h;
    })
    .fromString(event.body)
    .then((csvRows) => {
        _(csvRows).forEach(element => {
            rowCounter += 1;
            rows.push(
            <CsvDataRow>{
                rowId: rowCounter,
                columns: element 
            });
        })
        // TODO: error handling
    })
    .then(
        v => callback(undefined, {
            statusCode: 200,
            body: JSON.stringify({
                "kind": kind,
                "header": header,
                "rows": rows
            })
        }),
        callback
    );
};

export { extractCsvHandler }