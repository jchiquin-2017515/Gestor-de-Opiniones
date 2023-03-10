const express = require('express');
const { dbConection } = require('./db/config');
const cors = require('cors');
const { response, request } = require('express');
require('dotenv').config();

//Crear el servidor de Express

const app = express();

//Base de datos
dbConection();

// CORS
app.use(cors());

//Directorio publico
app.use( express.static('public') );

// Lectura y parseo del Body
app.use( express.json());

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//Si no encuentra la ruta sirve al archivo index con la original
app.get('*', (req = request, res = response) => {
    res.sendFile( __dirname + '/public/index.html');
});

// Escuchar Peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});