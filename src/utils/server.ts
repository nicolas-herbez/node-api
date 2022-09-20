import express from 'express';
import { Request, Response } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { success, getUniqueId } from './helper';
let ingredients = require('../config/ingredients.config');

function createServer() {
    const app = express();

    app
        .use(morgan('dev'))
        .use(bodyParser.json());

    app.get('/', (req: Request,res: Response) => {
        return res.send('Hello world ! 🖐️');
    });

    app.get('/api/ingredients', (req: Request,res: Response) => {
        let message: string = `List of ingredients`;
        return res.json(success(message, ingredients));
    });

    app.get('/api/ingredients/:id', (req: Request,res: Response) => {
        let id: number = parseInt(req.params.id);
        if (isNaN(id)) { id = 0; };
        const ingredient = ingredients.find((ingredient: any) => ingredient.id === id);
        let message = "ingredient";
        if (!ingredient) {
            message = "Not Found";
            res.statusCode = 404;
            return res.json(success(message, ingredient));
        };
        res.statusCode = 200;
        return res.json(success(message, ingredient));
    });

    app.post('/api/ingredients', (req: Request,res: Response) => {
        const id: number = getUniqueId(ingredients);
        const ingredientCreated = { ...{id: id}, ...req.body};
        ingredients.push(ingredientCreated);
        let message = `ingredient created`;
        return res.json(success(message, ingredientCreated));
    });

    app.put('/api/ingredients/:id', (req: Request,res: Response) => {
        const id: number = parseInt(req.params.id);
        const ingredientUpdated = { ...{id: id}, ...req.body};
        ingredients = ingredients.map((ingredient: any) => {
            return ingredient.id === id ? ingredientUpdated : ingredient;
        });
        let message = `ingredient updated`;
        return res.json(success(message, ingredientUpdated));
    });

    app.delete('/api/ingredients/:id', (req: Request,res: Response) => {
        const id: number = parseInt(req.params.id);
        const ingredientDeleted = ingredients.find((ingredient: any) => ingredient.id === id);
        ingredients = ingredients.filter((ingredient: any) => ingredient.id !== id);
        let message = `ingredient deleted`;
        return res.json(success(message, ingredientDeleted));
    });

    return app;
}

export default createServer;
