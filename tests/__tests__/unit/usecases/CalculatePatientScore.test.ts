import { CalculatePatientScore } from "../../../../src/usecases/CalculatePatientScore";
import { Patient } from "../../../../src/domain/Patient";
import { NormalizationFactors } from "../../../../src/domain/NormalizationFactors";

describe("CalculatePatientScore", () => {
    it("should correctly calculate patient score based on the given criteria", () => {
        const patient = new Patient({
            id: "123",
            name: "John Doe",
            age: 60,
            location: { lat: 40.7128, long: -74.0060 },
            acceptedOffers: 66,
            canceledOffers: 66,
            averageReplyTime: 20,
        });

        const normalizationFactors = new NormalizationFactors();
        normalizationFactors.minAge = 18;
        normalizationFactors.maxAge = 80;
        normalizationFactors.minAcceptedOffers = 0;
        normalizationFactors.maxAcceptedOffers = 100;
        normalizationFactors.minCanceledOffers = 0;
        normalizationFactors.maxCanceledOffers = 50;
        normalizationFactors.minReplyTime = 0;
        normalizationFactors.maxReplyTime = 300;
        normalizationFactors.minDistance = 0;
        normalizationFactors.maxDistance = 200;

        const distance = 50;

        const expectedScore = (
            (60 - 18) / (80 - 18) * 0.1 +
            (66 - 0) / (100 - 0) * 0.3 +
            (66 - 0) / (50 - 0) * 0.3 +
            (20 - 0) / (300 - 0) * 0.2 +
            (50 - 0) / (200 - 0) * 0.1
        ) * 10;

        const score = CalculatePatientScore.execute(patient, normalizationFactors, distance); // 🔥 Disable randomness

        expect(score).toBeCloseTo(expectedScore, 2);
    });

    describe("CalculatePatientScore", () => {
        it("should correctly calculate a deterministic score based on the given criteria", () => {
            const patient = new Patient({
                id: "123",
                name: "John Doe",
                age: 60,
                location: { lat: 40.7128, long: -74.0060 },
                acceptedOffers: 66,
                canceledOffers: 66,
                averageReplyTime: 20,
            });

            const normalizationFactors = new NormalizationFactors();
            normalizationFactors.minAge = 18;
            normalizationFactors.maxAge = 80;
            normalizationFactors.minAcceptedOffers = 0;
            normalizationFactors.maxAcceptedOffers = 100;
            normalizationFactors.minCanceledOffers = 0;
            normalizationFactors.maxCanceledOffers = 50;
            normalizationFactors.minReplyTime = 0;
            normalizationFactors.maxReplyTime = 300;
            normalizationFactors.minDistance = 0;
            normalizationFactors.maxDistance = 200;

            const distance = 50;

            const expectedScore = (
                (60 - 18) / (80 - 18) * 0.1 +
                (66 - 0) / (100 - 0) * 0.3 +
                (66 - 0) / (50 - 0) * 0.3 +
                (20 - 0) / (300 - 0) * 0.2 +
                (50 - 0) / (200 - 0) * 0.1
            ) * 10;

            const score = CalculatePatientScore.execute(patient, normalizationFactors, distance);

            expect(score).toBeCloseTo(expectedScore, 2);
        });

        it("should apply a random boost for patients with little data", () => {
            const patient = new Patient({
                id: "456",
                name: "Jane Doe",
                age: 30,
                location: { lat: 34.0522, long: -118.2437 },
                acceptedOffers: 0,
                canceledOffers: 0,
                averageReplyTime: 50,
            });

            const normalizationFactors = new NormalizationFactors();
            normalizationFactors.minAge = 18;
            normalizationFactors.maxAge = 80;
            normalizationFactors.minAcceptedOffers = 0;
            normalizationFactors.maxAcceptedOffers = 100;
            normalizationFactors.minCanceledOffers = 0;
            normalizationFactors.maxCanceledOffers = 50;
            normalizationFactors.minReplyTime = 0;
            normalizationFactors.maxReplyTime = 300;
            normalizationFactors.minDistance = 0;
            normalizationFactors.maxDistance = 200;

            const distance = 100;

            const baseScore = (
                (30 - 18) / (80 - 18) * 0.1 +
                (0 - 0) / (100 - 0) * 0.3 +
                (0 - 0) / (50 - 0) * 0.3 +
                (50 - 0) / (300 - 0) * 0.2 +
                (100 - 0) / (200 - 0) * 0.1
            ) * 10;

            const minExpectedScore = baseScore;
            const maxExpectedScore = baseScore + 3;

            const score = CalculatePatientScore.execute(patient, normalizationFactors, distance);

            expect(score).toBeGreaterThanOrEqual(minExpectedScore);
            expect(score).toBeLessThanOrEqual(maxExpectedScore);
        });
    });
});
