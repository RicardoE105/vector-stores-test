
import sampleData from "../../sample-data.json" assert { type: "json" };
import { Database } from "duckdb-async";
// const db = await Database.create('./sample-duckdb'); 

const preparedSampleData = sampleData.map((row, index) => {
    return {    
        vector: row
    };
})

  const db = await Database.create('./sample-duckdb'); 
  
db.run(`
    CREATE TABLE IF NOT EXISTS embeddings (vector FLOAT[1536]);
  `);


  for (const data of preparedSampleData) {

    const query = `INSERT INTO embeddings (vector) VALUES (?)`;
    (await db.prepare(query)).run([JSON.stringify(data.vector)]);
  }

  console.log(await db.all('SELECT count(*) FROM embeddings'))



