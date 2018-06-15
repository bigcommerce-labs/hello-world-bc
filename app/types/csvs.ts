
const CsvDefinitionData = {
    "product": {
        "columns": {
            "sku": {
                "title": "Product SKU",
                "type": "string"
            },
            "upc_ean": {
                "title": "Product UPC/EAN",
                "type": "string"
            },
            "stock_level": {
                "title": "Stock Level",
                "type": "integer"
            },
            "product_width": {
                "title": "Product Width",
                "type": "integer"
            },
            "product_height": {
                "title": "Product Height",
                "type": "decimal"
            },
            "product_depth": {
                "title": "Product Depth",
                "type": "decimal"
            },
            "is_free_shipping": {
                "title": "Free Shipping",
                "type": "decimal"
            }
        },
        "validators": {
            "record": null
        }
    }
}

interface CsvDataChunk {
    kind: string;
    header: string[];
    rows: CsvDataRow[];
}

interface CsvDataRow {
    rowId: number;
    columns: string[];
}

interface CsvDataChunkValidationResults {

}

interface CsvDefinition {

    validate(dataChunk: CsvDataChunk): CsvDataChunkValidationResults

}

class Csv {

    /*getCsvDefinitionById(id: string): CsvDefinition | undefined {
        undefined
    }

    getCsvDefinitionByColumnNames(names: string[]): CsvDefinition | undefined {
        return undefined
    }*/

}

export let csv = new Csv
export { CsvDefinition, CsvDataRow, CsvDataChunk, CsvDataChunkValidationResults }