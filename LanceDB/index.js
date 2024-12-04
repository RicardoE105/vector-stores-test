import * as lancedb from "@lancedb/lancedb";
import sampleData from "../sample-data.json" assert { type: "json" };

const preparedSampleData = sampleData.map((row) => {
    return {    
        vector: row
    };
})


const db = await lancedb.connect("./sample-lancedb");
const table = await db.createTable("sample-db", preparedSampleData, {mode: 'create'});

