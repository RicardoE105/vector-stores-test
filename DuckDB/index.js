
import sampleData from "../sample-data.json" assert { type: "json" };
import duckdb from 'duckdb';
const db = new duckdb.Database('./sample-duckdb'); 

const preparedSampleData = sampleData.map((row, index) => {
    return {    
        vector: row
    };
})

db.run(`
    CREATE TABLE embeddings (vector FLOAT[3]);
  `);

  const insertEmbeddings = async () => {
    const stmt = db.prepare('INSERT INTO embeddings (vector) VALUES (?, ?)');
    for (const embedding of preparedSampleData) {
      await stmt.run([embedding.id, embedding.vector]);
    }
    stmt.finalize();
  };

  insertEmbeddings().then(() => console.log('Embeddings inserted.'));


