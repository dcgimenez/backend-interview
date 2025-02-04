import { Patient } from "../domain/Patient";
import { NormalizationFactors } from "../domain/NormalizationFactors";

export class CalculatePatientScore {
    static execute(patient: Patient, normalizationFactors: NormalizationFactors, distance: number): number {
        const weight = {
            age: 0.1,
            acceptedOffers: 0.3,
            canceledOffers: 0.3,
            replyTime: 0.2,
            distance: 0.1
        };

        const normalizedAge = (patient.age - normalizationFactors.minAge) / (normalizationFactors.maxAge - normalizationFactors.minAge);
        const normalizedAcceptedOffers = (patient.acceptedOffers - normalizationFactors.minAcceptedOffers) /
            (normalizationFactors.maxAcceptedOffers - normalizationFactors.minAcceptedOffers);
        const normalizedCanceledOffers = (patient.canceledOffers - normalizationFactors.minCanceledOffers) /
            (normalizationFactors.maxCanceledOffers - normalizationFactors.minCanceledOffers);

        const cappedReplyTime = Math.min(patient.averageReplyTime, 300);
        const normalizedReplyTime = (cappedReplyTime - normalizationFactors.minReplyTime) /
            (Math.min(normalizationFactors.maxReplyTime, 300) - normalizationFactors.minReplyTime);

        const cappedDistance = Math.min(distance, 1500);
        const normalizedDistance = (cappedDistance - normalizationFactors.minDistance) /
            (Math.min(normalizationFactors.maxDistance, 1500) - normalizationFactors.minDistance);

        const rawScore = (
            normalizedAge * weight.age +
            normalizedAcceptedOffers * weight.acceptedOffers +
            normalizedCanceledOffers * weight.canceledOffers +
            normalizedReplyTime * weight.replyTime +
            normalizedDistance * weight.distance
        );

        const hasLittleData = patient.acceptedOffers < 65 && patient.canceledOffers < 65;
        const randomBoost = hasLittleData ? Math.random() * 0.3 : 0;
        const finalScore = (rawScore + randomBoost) > 1 ? 1 : (rawScore + randomBoost)

        return finalScore * 10;
    }
}
