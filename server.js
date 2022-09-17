const express = require('express');
const morgan = require('morgan');
const { success } = require('./src/helper');
let ingredients = require('./src/config/ingredients.config');

const app = express();
const port = 5000;

app.use(morgan('dev'));

app.get('/', (req,res) => res.send('Hello world ! 🖐️'));

app.get('/api/ingredients', (req,res) => {
    const message = `ingrédients = ${ingredients.length}`;
    res.json(success(message, ingredients));
});

app.get('/api/ingredient/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const ingredient = ingredients.find(ingredient => ingredient.id === id);
    const message = "ingrédient";
    res.json(success(message, ingredient));
});

app.listen(port, () => console.log(`api listen on http://localhost:${port}`));
