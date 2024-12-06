import * as lancedb from "@lancedb/lancedb";
import sampleData from "../../sample-data.json" assert { type: "json" };
import { Schema, Field, Float32, FixedSizeList, Utf8 } from "apache-arrow";

const preparedSampleData = sampleData.map((row) => {
    return {    
        vector: row
    };
})

const db = await lancedb.connect("./sample-lancedb");


const table = await db.createTable('sample-db', [preparedSampleData.pop()], {mode: 'create', existOk: true});

for (const sampleRow of preparedSampleData) {
     await table.add([sampleRow]);
}