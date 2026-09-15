const axios = require('axios');
const pool = require('./db');

async function poblarBD() {
  try {
    console.log('Descargando y guardando los 151 Pokémon...');
    for (let i = 1; i <= 151; i++) {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
      
      const nombre = data.name;
      const foto = data.sprites.front_default;
      const stats = {};
      data.stats.forEach(s => stats[s.stat.name] = s.base_stat);

      await pool.query(
        `INSERT INTO pokemons (nombre, foto, ps, ataque, defensa, ataque_especial, defensa_especial, velocidad)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          nombre, 
          foto, 
          stats['hp'], 
          stats['attack'], 
          stats['defense'], 
          stats['special-attack'], 
          stats['special-defense'], 
          stats['speed']
        ]
      );
    }
    console.log('¡Proceso completado! Los 151 Pokémon están en tu PostgreSQL.');
  } catch (error) {
    console.error('Error al poblar la base de datos:', error);
  } finally {
    pool.end();
  }
}

poblarBD();