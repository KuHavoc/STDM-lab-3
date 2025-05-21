const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = 8001;

app.use(express.json());

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

app.get('/', (req, res) => {
    res.send('Hello from Node.js and PostgreSQL!');
});

app.post('/users', async (req, res) => {
    const { name } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO users(name) VALUES($1) RETURNING *',
            [name]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error inserting user');
    }
});

app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching users');
    }
});

app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
    await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL
    );
  `);
});