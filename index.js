const express = require('express');
const fs = require('fs'); // Para leer archivos
const path = require('path'); // Para manejar rutas
const app = express();

// Configuración de EJS como motor de vistas
app.set('view engine', 'ejs');
app.use(express.static('public')); // Archivos estáticos como CSS

// Ruta principal que lee el archivo JSON
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'public','data.json');

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo JSON', err);
            return res.status(500).send('Error al obtener los personajes');
        }

        // Parsear el JSON y extraer los personajes de la propiedad 'data'
        const jsonData = JSON.parse(data);
        const characters = jsonData.data; // Accede al array de personajes dentro de 'data'
        console.log(characters); // Verifica el contenido aquí
        res.render('index', { characters });
    });
});


// Ruta para buscar por ObjectId
app.get('/character/:id', (req, res) => {
    const filePath = path.join(__dirname, 'public','data.json');

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo JSON', err);
            return res.status(500).send('Error al obtener el personaje');
        }

        const jsonData = JSON.parse(data);
        const characters = jsonData.data; // Accede al array de personajes

        // Obtener el ObjectId de la consulta
        const characterId = req.query.id;

        // Buscar el personaje por ObjectId
        const character = characters.find(char => char._id === characterId);

        if (character) {
            res.render('character', { character }); // Renderizar la vista del personaje
        } else {
            res.status(404).send('Personaje no encontrado');
        }
    });
});





// Servidor escuchando en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
