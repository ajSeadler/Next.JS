// pages/api/todos.js
import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  user: process.env.DB_USER,
  host: 'localhost',
  database: 'Next_ToDo',
  password: process.env.DB_PASSWORD,
  port: 5432,
});

client.connect();

export default async (req, res) => {
  try {
    // Query your database, for example, fetching all todos
    const result = await client.query('SELECT * FROM todos');
    const todos = result.rows;

    res.status(200).json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    // Close the database connection after the query
    client.end();
  }
};
