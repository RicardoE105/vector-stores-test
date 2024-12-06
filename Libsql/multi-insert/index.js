
import sampleData from "../../sample-data.json" assert { type: "json" };
import { createClient } from "@libsql/client";

const connection = createClient({
    url: "file:./libsql.db",
  });

const preparedSampleData = sampleData.map((row) => {
    return { 
        vector: new Float32Array(row)
    };
})

async function insertMultipleEmbeddings(embeddings) {
    if (!Array.isArray(embeddings)) {
      throw new Error("Embeddings must be an array.");
    }
  
    // Validate that each embedding has a vector (Float32Array)
    for (const { vector } of embeddings) {
      if (!(vector instanceof Float32Array)) {
        throw new Error("Each item must have a Float32Array vector.");
      }
    }
  
    // Build the query dynamically based on the number of embeddings
    const valuesPlaceholder = embeddings
      .map(() => `(?)`) // Each row has 1 placeholder (for the vector)
      .join(", ");
    
    const query = `INSERT INTO embeddings (vector) VALUES ${valuesPlaceholder}`;
  
    // Flatten all the embeddings (just the vector) into a single array for parameters
    const params = embeddings.flatMap(({ vector }) => [
      Buffer.from(vector.buffer), // Convert Float32Array to Buffer
    ]);
  
    await connection.execute(query, params);
    console.log(`${embeddings.length} embeddings inserted successfully.`);
  }

async function main() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS embeddings (
        vector F32_BLOB(1536) NOT NULL -- Fixed length for a 4-element vector
      );
    `;
  
    await connection.execute(createTableQuery);

    await insertMultipleEmbeddings(preparedSampleData);

  }
  
  main().catch(console.error);