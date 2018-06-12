

import { Notification } from "../../../types/util/notifications/notifications"

import { Handler, Context, Callback } from 'aws-lambda';

import { csv, CsvDataChunk, CsvDataChunkValidationResults } from "../../../types/csvs"

/*

 TODO: change this from validate-csv to just validate

 How does this work?

 Validate takes in:

  - CSV type
  - records as JSON

 Then it:

   - validates all the fields
   - applies programmatic business logic validation to the fields if they exist
   - joins all the records
   - validates all the records
   - applies programmatic business logic validation to the records if they exist

  In order for this to be a doable thing, we should make the validator an algorithm
  that looks at the presence of data in a data structure to do the validation.
  There will just be a registry that is looked up.

*/

interface ImportFieldLogicValidator<T> {
    validate<T>(): Notification[]
}

interface ImportCsvColumn {
    readonly name: string;
    readonly typeId: string;
    readonly logicValidators: ImportFieldLogicValidator<ImportCsvColumn>[];
}

interface ImportCsv {
    readonly name: string;
    readonly humanReadableName: String;
}

// TODO: split these separate validations into their own cloud function calls
const validateCsvHandler: Handler = (event: any, context: Context, callback: Callback) => {

    
    // what does this require in order to do its job?
    //    - understanding of the required fields of the CSV
    //    - understanding of record level validations, etc.

    const csvDataChunk = JSON.parse(event.body) as CsvDataChunk

    /*const csvDefinition = csv.getCsvDefinitionById("product")
    var csvValidation: CsvDataChunkValidationResults | {} = {}
    if (csvDefinition) {
        csvValidation = csvDefinition.validate(csvDataChunk)
    }*/

    callback(undefined, {
        statusCode: 200,
        body: JSON.stringify({})
    });

}

export { ImportCsv, ImportCsvColumn, ImportFieldLogicValidator, validateCsvHandler }