'use strict';

import { Handler, Context, Callback } from 'aws-lambda';

interface HelloResponse {
    statusCode: number;
    body: string;
}

const test: Handler = (event: any, context: Context, callback: Callback) => {
    var name = "something";
    if (event.queryStringParameters && event.queryStringParameters.name) {
        name = event.queryStringParameters.name;
    }
    const response: HelloResponse = {
        statusCode: 200,
        body: JSON.stringify({
        message: name
        })
    };

    callback(undefined, response);
};

export { test }