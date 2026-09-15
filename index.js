const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json()); // Permite recibir y enviar formato JSON

// 1. GET: Consultar todos los Pokémon
app.get('/pokemons', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM pokemons ORDER BY id ASC');
    res.json(resultado.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los pokemons' });
  }
});

// 2. GET: Consultar un Pokémon por ID
app.get('/pokemons/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await pool.query('SELECT * FROM pokemons WHERE id = $1', [id]);
    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Pokémon no encontrado' });
    }
    res.json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el pokémon' });
  }
});

// 3. POST: Crear un nuevo Pokémon
app.post('/pokemons', async (req, res) => {
  try {
    const { nombre, foto, ps, ataque, defensa, ataque_especial, defensa_especial, velocidad } = req.body;
    const nuevo = await pool.query(
      `INSERT INTO pokemons (nombre, foto, ps, ataque, defensa, ataque_especial, defensa_especial, velocidad)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [nombre, foto, ps, ataque, defensa, ataque_especial, defensa_especial, velocidad]
    );
    res.status(201).json(nuevo.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el pokémon' });
  }
});

// 4. PUT: Actualizar un Pokémon existente
app.put('/pokemons/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, foto, ps, ataque, defensa, ataque_especial, defensa_especial, velocidad } = req.body;
    const actualizado = await pool.query(
      `UPDATE pokemons 
       SET nombre = $1, foto = $2, ps = $3, ataque = $4, defensa = $5, ataque_especial = $6, defensa_especial = $7, velocidad = $8
       WHERE id = $9 RETURNING *`,
      [nombre, foto, ps, ataque, defensa, ataque_especial, defensa_especial, velocidad, id]
    );
    if (actualizado.rows.length === 0) {
      return res.status(404).json({ error: 'Pokémon no encontrado para actualizar' });
    }
    res.json(actualizado.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el pokémon' });
  }
});

// 5. DELETE: Eliminar un Pokémon
app.delete('/pokemons/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await pool.query('DELETE FROM pokemons WHERE id = $1 RETURNING *', [id]);
    if (eliminado.rows.length === 0) {
      return res.status(404).json({ error: 'Pokémon no encontrado para eliminar' });
    }
    res.json({ mensaje: 'Pokémon eliminado correctamente', pokemon: eliminado.rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el pokémon' });
  }
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});