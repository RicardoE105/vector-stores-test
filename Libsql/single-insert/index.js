
import sampleData from "../../sample-data.json" assert { type: "json" };
import { createClient } from "@libsql/client";

const connection = createClient({
    url: "file:./libsql.db",
  });

const preparedSampleData = sampleData.map((row) => {
    return new Float32Array(row)
})


async function main() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS embeddings (
        vector F32_BLOB(1536) NOT NULL -- Fixed length for a 1536-element vector
      );
    `;
  
    await connection.execute(createTableQuery);


    const records = [
      ...preparedSampleData
    ];
  
    const valuesClause = records
    .map(
      record =>
        `(vector32('[${record.join(", ")}]'))`
    )
    .join(", ");
  
    const query = `INSERT INTO embeddings (vector) VALUES ${valuesClause}`;

    console.log(valuesClause);

    
    // Flatten the records into a single array for the parameterized query
    const parameters = records.map(record => [record]);
  
    // Execute the query with all the values
    await connection.execute(query, parameters);

  }
  
  main().catch(console.error);