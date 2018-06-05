'use strict';

const csvtojson=require("csvtojson");

import { Handler, Context, Callback } from 'aws-lambda';

interface ExtractCsvRowJson {

}

interface ExtractCsvResponse {
    statusCode: number,
    rowCount: number,
    rows: ExtractCsvRowJson[]
}


const extractCsv: Handler = (event: any, context: Context, callback: Callback) => {
    /*const response: ExtractCsvResponse = {
        statusCode: 200,
        rowCount: 0,
        rows: []
    };*/1

    //let contentType = event.headers['content-type']

    callback(undefined, {});
};



export { extractCsv }