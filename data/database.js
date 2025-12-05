import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();



const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS;
const dbUser = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_NAME;  // align with workflow


if (!clusterAddress || !dbUser || !dbPassword || !dbName) {
  throw new Error('Missing MongoDB environment variables');
}

const uri = `mongodb+srv://${encodeURIComponent(dbUser)}:${encodeURIComponent(
  dbPassword
)}@${clusterAddress}/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

console.log('Trying to connect to db');

try {
  await client.connect();
  await client.db(dbName).command({ ping: 1 });
  console.log('Connected successfully to server');
} catch (error) {
  console.error('Connection failed.', error);
  await client.close();
  console.log('Connection closed.');
  throw error;  // do NOT continue with a closed client
}

const database = client.db(dbName);

export default database;
