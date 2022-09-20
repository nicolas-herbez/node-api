import supertest from "supertest";
import createServer from './utils/server';

const app = createServer();

describe('ingredient', () => {
    describe('get ingredient route', () => {

        describe('given the ingredient does not exist', () => {
            it("should return a 404", async () => {
                const ingredientId = 0;
                const { statusCode } = await supertest(app).get(`/api/ingredients/${ingredientId}`).expect(404);

                expect(statusCode).toBe(404);
            })
        });

        describe('given the ingredient does exist', () => {
            it("should return a 200 status and the ingredient", async () => {
                const ingredient = {
                    "id": 1,
                    "name": "pomme",
                    "category": "fruit"
                };
                const { body, statusCode } = await supertest(app).get(`/api/ingredients/${ingredient.id}`);

                expect(statusCode).toBe(200);
                expect(body.data).toStrictEqual(ingredient);
            })
        });

    });
});
