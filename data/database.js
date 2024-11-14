import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS;
const dbUser = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DB_NAME;

const uri = `mongodb+srv://${dbUser}:${dbPassword}@${clusterAddress}/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDatabase() {
  console.log('Trying to connect to db');

  try {
    await client.connect();
    await client.db(dbName).command({ ping: 1 });
    console.log('Connected successfully to server!');
  } catch (error) {
    console.error('Connection failed:', error);
  } finally {
    await client.close();
    console.log('Connection closed.');
  }
}

connectToDatabase();

const database = client.db(dbName);
export default database;
