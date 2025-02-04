import { Location } from "../domain/Location";
import { CalculatePatientScore } from "./CalculatePatientScore";
import { CalculateDistanceInKilometers } from "./CalculateDistanceInKilometers";
import { ScoredPatient } from "../domain/ScoredPatient";
import { PatientRepository } from "../data/PatientRepository";
import { NormalizationFactors } from "../domain/NormalizationFactors";

export class GetTopPatients {
    constructor(private patientRepository: PatientRepository) {}

    execute(hospitalLat: number, hospitalLong: number): ScoredPatient[] {
        const hospitalLocation = new Location(hospitalLat, hospitalLong);
        const patients = this.patientRepository.getAllPatients();

        const normalizationFactors = new NormalizationFactors();

        const patientDistances = patients.map(patient => {
            const distance = CalculateDistanceInKilometers.execute(
                { latitude: patient.location.lat, longitude: patient.location.long },
                { latitude: hospitalLocation.lat, longitude: hospitalLocation.long }
            );
            normalizationFactors.update(patient, distance);
            return { patient, distance };
        });

        return patientDistances
            .map(({ patient, distance }) => {
                const finalScore = CalculatePatientScore.execute(patient, normalizationFactors, distance);
                return new ScoredPatient(patient, finalScore);
            })
            .filter((patient): patient is ScoredPatient => patient !== null)
            .sort((a, b) => b.score - a.score)
            .slice(0, 10);
    }
}
