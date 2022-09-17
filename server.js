const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { success, getUniqueId } = require('./src/helper');
let ingredients = require('./src/config/ingredients.config');

const app = express();
const port = 5000;

app
    .use(morgan('dev'))
    .use(bodyParser.json());

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

app.post('/api/ingredients', (req,res) => {
    const id = getUniqueId(ingredients);
    const ingredientCreated = { ...{id: id}, ...req.body};
    ingredients.push(ingredientCreated);
    const message = `Ingrédient ${ingredientCreated.name} créé`;
    res.json(success(message, ingredientCreated));
});

app.listen(port, () => console.log(`api listen on http://localhost:${port}`));
