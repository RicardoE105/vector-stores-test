# vector-stores-test

The sample data is the embeddings of the [Bitcoin manifesto](https://bitcoin.org/bitcoin.pdf). A 184 KB pdf.

To create the embeddings the OpenAI embeddings API was used. Specifically the **text-embedding-3-small model**. A n8n workflow was used that you can find [here](/create-embeddings-workflow.json).

Below you can find a comparative table of how much space it took on disk each database.

| VectorDB | Disk used for 184 KB PDF  | Size increase |
|----------|----------------------|---------------|
| DuckDB   | 268KB                | 45.65%        |
| LanceDB  | 240KB                | 30.43%        |
| LibSql   | 320KB                | 73.91%        |