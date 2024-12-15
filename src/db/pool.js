import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
console.log(process.env.PGURI);

const pool = new Pool({
    connectionString: process.env.PGURI,
});

export default pool;
