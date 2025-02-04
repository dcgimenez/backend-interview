import { PatientRepository } from "../../../../src/data/PatientRepository";
import { Patient } from "../../../../src/domain/Patient";
import * as fs from "fs";

jest.mock("fs");

describe("PatientRepository", () => {
    let repository: PatientRepository;

    it("should correctly load and return all patients", () => {
        const mockData = JSON.stringify([
            {
                id: "1",
                name: "John Doe",
                age: 40,
                location: { latitude: "40.5678", longitude: "-74.1234" },
                acceptedOffers: 5,
                canceledOffers: 2,
                averageReplyTime: 30,
            },
            {
                id: "2",
                name: "Jane Doe",
                age: 20,
                location: { latitude: "-21.1234", longitude: "32.5678" },
                acceptedOffers: 1,
                canceledOffers: 0,
                averageReplyTime: 120,
            }
        ]);

        (fs.existsSync as jest.Mock).mockReturnValue(true);
        (fs.readFileSync as jest.Mock).mockReturnValue(mockData);

        repository = new PatientRepository();

        const patients = repository.getAllPatients();

        expect(patients.length).toBe(2);
        expect(patients[0]).toBeInstanceOf(Patient);
        expect(patients[0].location.lat).toBe(40.5678);
        expect(patients[0].location.long).toBe(-74.1234);
        expect(patients[1]).toBeInstanceOf(Patient);
        expect(patients[1].location.lat).toBe(-21.1234);
        expect(patients[1].location.long).toBe(32.5678);
    });
});
