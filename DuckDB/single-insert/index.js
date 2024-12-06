
import sampleData from "../../sample-data.json" assert { type: "json" };
import duckdb from 'duckdb';
const db = new duckdb.Database('./sample-duckdb'); 

    // Create the embeddings table with a vector of floats
    db.run(`
    CREATE TABLE IF NOT EXISTS embeddings (vector FLOAT[1536]);
    `);
  
    const records = [
      ...sampleData
    ];
  
    // Dynamically generate the VALUES part of the query
    const valuesClause = records
      .map(record => `([${record.join(', ')}])`)
      .join(', ');
  
    const query = `INSERT INTO embeddings (vector) VALUES ${valuesClause}`;
  
    await db.run(query);

