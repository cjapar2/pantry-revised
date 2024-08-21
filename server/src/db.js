const { Pool } = require('pg');

// Set up connection details
const pool = new Pool({
  user: 'postgres',
  password: 'honz24',
  host: 'localhost',
  port: 5432,
  database: 'pantry'
});

module.exports = pool;

// // Function to list tables in the connected database
// const listTables = async () => {
//   try {
//     const res = await pool.query(`
//       SELECT table_name
//       FROM information_schema.tables
//       WHERE table_schema='public'
//       ORDER BY table_name;
//     `);
//     console.log('Tables in the database:');
//     res.rows.forEach(row => console.log(row.table_name));
//   } catch (err) {
//     console.error(err);
//   }
// };

// // Function to close the pool (close the connection)
// const closeConnection = async () => {
//   await pool.end();
// };

// module.exports = { listTables, closeConnection };