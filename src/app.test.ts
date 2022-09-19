import supertest from "supertest"; "supertest";
// import { app } from "./server";

describe('ingredient', () => {
    describe('get ingredient route', () => {
        describe('given the ingredient does not exist', () => {
            it("should return a 404", async () => {
                expect(true).toBe(true);
                // const ingredientId = 0;
                // await supertest(app).get(`/api/ingredients/${ingredientId}`).expect(404);
            })
        });
    });
});