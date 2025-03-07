import { Pool } from 'pg';

const pool = new Pool({
  user: 'hoekming',   // Replace with your PostgreSQL username
  host: 'localhost',
  database: 'employee_tracker',
  password: 'hoekming519',  // Replace with your PostgreSQL password
  port: 5432,
});

export default pool;
