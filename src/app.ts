const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { success, getUniqueId } = require('./helper');
let ingredients = require('./config/ingredients.config');

const app = express();
const port: number = 5000;

app
    .use(morgan('dev'))
    .use(bodyParser.json());

app.get('/', (req: any,res: any) => res.send('Hello world ! 🖐️'));

app.get('/api/ingredients', (req: any,res: any) => {
    const message: string = `Liste des ingrédients = ${ingredients.length}`;
    res.json(success(message, ingredients));
});

app.get('/api/ingredients/:id', (req: any,res: any) => {
    const id: number = parseInt(req.params.id);
    const ingredient = ingredients.find((ingredient: any) => ingredient.id === id);
    const message = "Ingrédient";
    res.json(success(message, ingredient));
});

app.post('/api/ingredients', (req: any,res: any) => {
    const id: number = getUniqueId(ingredients);
    const ingredientCreated = { ...{id: id}, ...req.body};
    ingredients.push(ingredientCreated);
    const message = `Ingrédient créé`;
    res.json(success(message, ingredientCreated));
});

app.put('/api/ingredients/:id', (req: any,res: any) => {
    const id: number = parseInt(req.params.id);
    const ingredientUpdated = { ...{id: id}, ...req.body};
    ingredients = ingredients.map((ingredient: any) => {
        return ingredient.id === id ? ingredientUpdated : ingredient;
    });
    const message = `Ingrédient modifié`;
    res.json(success(message, ingredientUpdated));
});

app.delete('/api/ingredients/:id', (req: any,res: any) => {
    const id: number = parseInt(req.params.id);
    const ingredientDeleted = ingredients.find((ingredient: any) => ingredient.id === id);
    ingredients = ingredients.filter((ingredient: any) => ingredient.id !== id);
    const message = `Ingrédient supprimé`;
    res.json(success(message, ingredientDeleted));
});

app.listen(port, () => console.log(`api listen on http://localhost:${port}`));
