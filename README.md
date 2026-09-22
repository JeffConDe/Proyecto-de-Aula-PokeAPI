# Poké API - Proyecto de Aula (Backend)

API REST construida con Node.js, Express y PostgreSQL que gestiona un CRUD completo sobre los 151 Pokémon de la primera generación.

## Tecnologías Utilizadas
- **Node.js** con **Express** (Servidor, API REST y archivos est{aticos)
- **PostgreSQL / pgAdmin** (Base de datos relacional)
- **Axios/CORS** (Consumo de la PokéAPI pública para la carga inicial)
- **HTML5/ CSS3 / JavaScript** (Frontend interactivo con tarjetas y buscador
)
## Instrucciones de Ejecución

1. Clonar el repositorio:

   git clone https://github.com/JeffConDe/Proyecto-de-Aula-PokeAPI.git

2. Instalar las dependencias del proyecto:

   npm install

3. Configurar la conexión a tu base de datos en el archivo db.js   (usuario, contraseña y puerto de PostgreSQL).

4. Ejecutar el script para poblar la base de datos con los 151 Pokémon   (solo la primera vez):

   node seed.js

5. Iniciar el servidor local:

   node index.js

6. Abrir la aplicación:
   Entra a tu navegador y dirígete a http://localhost:3000/ para ver la interfaz visual y el buscador de Pokémon en acción.

7. Endpoints Principales

GET /pokemons - Retorna la lista completa de los Pokémon en formato JSON.

GET /pokemons/:id - Retorna un Pokémon específico por su ID.

POST /pokemons - Crea un nuevo registro.

PUT /pokemons/:id - Actualiza un Pokémon existente.

DELETE /pokemons/:id - Elimina un Pokémon.