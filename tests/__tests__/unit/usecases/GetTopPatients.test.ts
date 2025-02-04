import { GetTopPatients } from "../../../../src/usecases/GetTopPatients";
import { Patient } from "../../../../src/domain/Patient";
import { PatientRepository } from "../../../../src/data/PatientRepository";
import { CalculatePatientScore } from "../../../../src/usecases/CalculatePatientScore";

jest.mock("../../../../src/data/PatientRepository");
jest.mock("../../../../src/usecases/CalculatePatientScore", () => ({
    CalculatePatientScore: {
        execute: jest.fn()
    }
}));

describe("GetTopPatients", () => {
    let patientRepository: jest.Mocked<PatientRepository>;
    let getTopPatients: GetTopPatients;

    beforeEach(() => {
        patientRepository = new PatientRepository() as jest.Mocked<PatientRepository>;
        getTopPatients = new GetTopPatients(patientRepository);
    });

    it("should correctly rank and limit to 10 patients", () => {
        const patients: Patient[] = [
            new Patient({ id: "1", name: "Alice", age: 40, location: { lat: 1, long: 1 }, acceptedOffers: 15, canceledOffers: 2, averageReplyTime: 5 }),
            new Patient({ id: "2", name: "Bob", age: 50, location: { lat: 5, long: 5 }, acceptedOffers: 10, canceledOffers: 1, averageReplyTime: 10 }),
            new Patient({ id: "3", name: "Charlie", age: 35, location: { lat: 2, long: 2 }, acceptedOffers: 8, canceledOffers: 4, averageReplyTime: 30 }),
            new Patient({ id: "4", name: "Dave", age: 45, location: { lat: 20, long: 20 }, acceptedOffers: 25, canceledOffers: 0, averageReplyTime: 3 }),
            new Patient({ id: "5", name: "Eve", age: 30, location: { lat: 0.5, long: 0.5 }, acceptedOffers: 5, canceledOffers: 2, averageReplyTime: 50 }),
            new Patient({ id: "6", name:  "Frank", age: 55, location: { lat: 10, long: 10 }, acceptedOffers: 20, canceledOffers: 1, averageReplyTime: 7 }),
            new Patient({ id: "7", name:  "Grace", age: 29, location: { lat: 3, long: 3 }, acceptedOffers: 7, canceledOffers: 3, averageReplyTime: 40 }),
            new Patient({ id: "8", name:  "Hank", age: 41, location: { lat: 7, long: 7 }, acceptedOffers: 12, canceledOffers: 2, averageReplyTime: 12 }),
            new Patient({ id: "9", name:  "Ivy", age: 38, location: { lat: 4, long: 4 }, acceptedOffers: 14, canceledOffers: 1, averageReplyTime: 6 }),
            new Patient({ id: "10", name:  "Jake", age: 37, location: { lat: 6, long: 6 }, acceptedOffers: 18, canceledOffers: 1, averageReplyTime: 5 }),
            new Patient({ id: "11", name:  "Kim", age: 42, location: { lat: 8, long: 8 }, acceptedOffers: 6, canceledOffers: 2, averageReplyTime: 30 }),
            new Patient({ id: "12", name:  "Leo", age: 33, location: { lat: 9, long: 9 }, acceptedOffers: 3, canceledOffers: 2, averageReplyTime: 20 }),
            new Patient({ id: "13", name:  "Mia", age: 27, location: { lat: 11, long: 11 }, acceptedOffers: 2, canceledOffers: 1, averageReplyTime: 40 }),
            new Patient({ id: "14", name:  "Nina", age: 46, location: { lat: 12, long: 12 }, acceptedOffers: 1, canceledOffers: 0, averageReplyTime: 50 }),
            new Patient({ id: "15", name:  "Oscar", age: 39, location: { lat: 13, long: 13 }, acceptedOffers: 0, canceledOffers: 0, averageReplyTime: 60 }),
        ];

        patientRepository.getAllPatients.mockReturnValue(patients);

        const mockScores: Record<string, number> = {
            "1": 9.2, "2": 8.9, "3": 8.7, "4": 9.5, "5": 7.8,
            "6": 9.0, "7": 8.5, "8": 8.3, "9": 8.2, "10": 9.1,
            "11": 6.8, "12": 6.5, "13": 6.2, "14": 6.0, "15": 5.8
        };

        (CalculatePatientScore.execute as jest.MockedFunction<typeof CalculatePatientScore.execute>).mockImplementation(
            (patient) => mockScores[patient.id]);

        const topPatients = getTopPatients.execute(0, 0);

        expect(topPatients.length).toBe(10);

        const expectedTop10 = ["4", "1", "10", "6", "2", "3", "7", "8", "9", "5"];

        const rankedIds = topPatients.map(p => p.patient.id);
        expect(rankedIds).toEqual(expectedTop10);

        expect(rankedIds).not.toContain("11");
        expect(rankedIds).not.toContain("12");
        expect(rankedIds).not.toContain("13");
        expect(rankedIds).not.toContain("14");
        expect(rankedIds).not.toContain("15");
    });
});
