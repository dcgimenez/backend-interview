import request from "supertest";
import { app } from "../../../../src";

describe("GET /patients", () => {
    it("should return a list of patients", async () => {
        const res = await request(app).get("/api/patients?lat=33.1234&long=-55.5678");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]).toHaveProperty("score");
    });

    it("should return 400 if latitude or longitude is missing", async () => {
        const res = await request(app).get("/api/patients");
        expect(res.status).toBe(400);
        expect(res.body.error).toBe("Latitude and longitude are required");
    });
});
