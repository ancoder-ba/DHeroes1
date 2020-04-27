const express = require('express');
const fs = require('fs');

const app = express();

app.listen(3030, () => console.log('Server running in 3030 port'));

const heroes = JSON.parse(fs.readFileSync(__dirname + '/data/heroes.json', 'utf-8'));

app.get('/', function(req,res) {
	res.send('Ni Superman, Iron Man o La Mujer Maravilla son tan importantes cómo las y los Heroes de carne y hueso que encontrarás en este sitio. Esperamos que ellas y ellos te sirvan como inspiración para poder cumplir tus objetivos. Recuerda: ¡nunca pares de creer en ti!.');
});

app.get('/heroes', (req,res) => {
	res.send(heroes);
});

app.get('/heroes/detalle/:id', (req, res) => {
	let heroe = heroes.find(heroe => heroe.id == req.params.id);
	if(heroe != undefined) {
		res.send("Hola, mi nombre es " + heroe.nombre + " y soy " + heroe.profesion);
	} else {
		res.send("No hay heroe con ese id");
	}
});

app.get('/heroes/bio/:id/:ok?', (req, res) => {

	let heroe = heroes.find(heroe => heroe.id == req.params.id);
	if (heroe == undefined) {
		res.send("No encontramos un héroe para mostrarte su biografía");
	} else {
		if (req.params.ok != undefined && req.params.ok == 'ok') {
			res.send("Hola, mi nombre es " + heroe.nombre + "y esto esta es mi reseña: " + heroe.resenia);
		} else {
			res.send("Hola, mi nombre es " + heroe.nombre +  "Lamento que no desees saber más de mi :(");
		}
	}
});

 app.get('/creditos', (req, res) => {
	res.send('Ancoder Developer');
});

app.get('*', (req, res) => {
	res.status(404).send('404 not found. <br> ¡Houston, poseemos problemas!');
});