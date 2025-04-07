
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.NEXT_PUBLIC_DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // Required for SSL connections
});

// Test the database connection on startup
pool.connect()
    .then(client => {
        client.release(); // Release the client back to the pool
    })
    .catch(error => {
        console.log('❌ PostgreSQL Connection Error:', error.message);
    });

export const createConnection = async () => pool;

export default createConnection;
