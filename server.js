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
    const message = `Liste des ingrédients = ${ingredients.length}`;
    res.json(success(message, ingredients));
});

app.get('/api/ingredients/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const ingredient = ingredients.find(ingredient => ingredient.id === id);
    const message = "Ingrédient";
    res.json(success(message, ingredient));
});

app.post('/api/ingredients', (req,res) => {
    const id = getUniqueId(ingredients);
    const ingredientCreated = { ...{id: id}, ...req.body};
    ingredients.push(ingredientCreated);
    const message = `Ingrédient créé`;
    res.json(success(message, ingredientCreated));
});

app.put('/api/ingredients/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const ingredientUpdated = { ...{id: id}, ...req.body};
    ingredients = ingredients.map(ingredient => {
        return ingredient.id === id ? ingredientUpdated : ingredient;
    });
    const message = `Ingrédient modifié`;
    res.json(success(message, ingredientUpdated));
});

app.delete('/api/ingredients/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const ingredientDeleted = ingredients.find(ingredient => ingredient.id === id);
    ingredients.filter(ingredient => ingredient.id !== id);
    const message = `Ingrédient supprimé`;
    res.json(success(message, ingredientDeleted));
});

app.listen(port, () => console.log(`api listen on http://localhost:${port}`));
