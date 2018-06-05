'use strict';

const csv=require('csvtojson')

import { Handler, Context, Callback } from 'aws-lambda';

interface ExtractCsvRowJson {

}

interface ExtractCsvResponse {
    statusCode: number,
    rowCount: number,
    rows: ExtractCsvRowJson[]
}


const extractCsv: Handler = (event: any, context: Context, callback: Callback) => {

    console.log(event);

    var rows = [];
    csv({
        noheader:true,
        output: "csv"
    })
    .fromString(event.body)
    .then((csvRow)=>{ 
        console.log(csvRow);
    })
    
    /*const response: ExtractCsvResponse = {
        statusCode: 200,
        rowCount: 0,
        rows: []
    };*/

    //let contentType = event.headers['content-type']

    callback(undefined,         {
        statusCode: 200,
        body: JSON.stringify({
        })
    }
    );
};



export { extractCsv }