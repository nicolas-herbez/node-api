import supertest from "supertest";
import createServer from './utils/server';

const app = createServer();

describe('ingredient', () => {
    describe('get ingredient route', () => {

        describe('given the ingredient does not exist', () => {
            it("should return a 404", async () => {
                // expect(true).toBe(true);
                const ingredientId = 0;
                await supertest(app).get(`/api/ingredients/${ingredientId}`).expect(404);
            })
        });

        // describe('given the ingredient does exist', () => {
        //     it("should return a 200 status and the ingredient", async () => {
        //         const ingredientPayload = {
        //             "message": "Ingrédient",
        //             "data": {
        //                 "id": 1,
        //                 "name": "pomme",
        //                 "category": "fruit"
        //             }
        //         };
        //         const { body, statusCode } = await supertest(app).get(`/api/ingredients/${ingredientPayload.data.id}`);
        //         expect(statusCode).toBe(200);
        //     })
        // });

    });
});
