import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/database.js';

dotenv.config();

const app = express();

// configuração do CORS
const corsOptions = {
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// teste de conexão com o banco de dados
app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    res.json({ message: 'Database connection successful', result: rows[0].result });
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// pega todos os usuários
app.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        id,
        nome,
        email,
        genero,
        telefone,
        endereco,
        filmeFav
      FROM users
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Error fetching users from database' });
  }
});

// pega um usuário específico
app.get('/users/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Error fetching user from database' });
  }
});

// cria um novo usuário
app.post('/users', async (req, res) => {
  try {
    const { nome, email, genero, telefone, endereco, filmeFav } = req.body;
    const [result] = await pool.query(
      'INSERT INTO users (nome, email, genero, telefone, endereco, filmeFav) VALUES (?, ?, ?, ?, ?, ?)',
      [nome, email, genero, telefone, endereco, filmeFav]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user in database' });
  }
});

// atualiza um usuário
app.put('/users/:id', async (req, res) => {
  try {
    const { nome, email, genero, telefone, endereco, filmeFav } = req.body;
    const [result] = await pool.query(
      'UPDATE users SET nome = ?, email = ?, genero = ?, telefone = ?, endereco = ?, filmeFav = ? WHERE id = ?',
      [nome, email, genero, telefone, endereco, filmeFav, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Error updating user in database' });
  }
});

// deleta um usuário
app.delete('/users/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Error deleting user from database' });
  }
});

// inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

