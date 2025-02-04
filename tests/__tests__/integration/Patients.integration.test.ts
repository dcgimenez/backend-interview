import request from "supertest";
import { app } from "../../../src";
import * as fs from "fs";
import * as path from "path";

describe("Patients API Integration Test", () => {
    let server: any;
    const originalFilePath = path.resolve(__dirname, "../../../resources/patients.json");
    const tempFilePath = path.resolve(__dirname, "../../../resources/patients_test.json");

    beforeAll(async () => {
        server = app.listen(0);

        if (fs.existsSync(originalFilePath)) {
            fs.copyFileSync(originalFilePath, tempFilePath);
        }
    });

    afterAll(async () => {
        if (fs.existsSync(tempFilePath)) {
            fs.unlinkSync(tempFilePath);
        }
        server.close();
    });

    it("should return a list of patients sorted by priority", async () => {
        const response = await request(server).get("/api/patients?lat=40.7128&long=-74.0060");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBe(10);

        response.body.forEach((entry: any) => {
            expect(entry).toHaveProperty("patient");
            expect(entry).toHaveProperty("score");
            expect(entry.patient).toHaveProperty("id");
            expect(entry.patient).toHaveProperty("name");
            expect(entry.patient).toHaveProperty("age");
            expect(entry.patient).toHaveProperty("location");
            expect(entry.patient).toHaveProperty("acceptedOffers");
            expect(entry.patient).toHaveProperty("canceledOffers");
            expect(entry.patient).toHaveProperty("averageReplyTime");
        });

        expect(response.body[0].score).toBeGreaterThanOrEqual(response.body[response.body.length - 1].score);
    });


    it("should return 400 when latitude and longitude are missing", async () => {
        const response = await request(server).get("/api/patients");

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Latitude and longitude are required");
    });

    it("should return 400 for invalid latitude and longitude values", async () => {
        const response = await request(server).get("/api/patients?lat=invalid&long=invalid");

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Invalid latitude or longitude range");
    });
});
