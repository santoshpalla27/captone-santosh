require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const redis = require('./redis');

const app = express();
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

app.get('/users', async (req, res) => {
  const [rows] = await pool.query('SELECT id, name, email FROM users');
  res.json(rows);
});

app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  await pool.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
  res.json({ message: 'User created' });
});

app.get('/cache', async (req, res) => {
  await redis.set('test', 'hello from redis cluster');
  const value = await redis.get('test');
  res.json({ value });
});

app.listen(process.env.PORT, () => {
  console.log(`User service running at :${process.env.PORT}`);
});

// DB bootstrapper (for demo):
(async () => {
  const [rows] = await pool.query("SHOW TABLES LIKE 'users'");
  if (rows.length === 0) {
    await pool.query("CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255))");
    await pool.query("INSERT INTO users (name, email) VALUES ('Alice','alice@mail.com'),('Bob','bob@mail.com')");
  }
})();