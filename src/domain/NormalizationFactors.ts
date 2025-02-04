import { Patient } from "./Patient";

export class NormalizationFactors {
    minAge: number;
    maxAge: number;
    minAcceptedOffers: number;
    maxAcceptedOffers: number;
    minCanceledOffers: number;
    maxCanceledOffers: number;
    minReplyTime: number;
    maxReplyTime: number;
    minDistance: number;
    maxDistance: number;

    constructor() {
        const initialValue = 0;
        this.minAge = initialValue;
        this.maxAge = initialValue;
        this.minAcceptedOffers = initialValue;
        this.maxAcceptedOffers = initialValue;
        this.minCanceledOffers = initialValue;
        this.maxCanceledOffers = initialValue;
        this.minReplyTime = initialValue;
        this.maxReplyTime = initialValue;
        this.minDistance = initialValue;
        this.maxDistance = initialValue;
    }

    update(patient: Patient, distance: number): void {
        this.minAge = Math.min(this.minAge, patient.age);
        this.maxAge = Math.max(this.maxAge, patient.age);

        this.minAcceptedOffers = Math.min(this.minAcceptedOffers, patient.acceptedOffers);
        this.maxAcceptedOffers = Math.max(this.maxAcceptedOffers, patient.acceptedOffers);

        this.minCanceledOffers = Math.min(this.minCanceledOffers, patient.canceledOffers);
        this.maxCanceledOffers = Math.max(this.maxCanceledOffers, patient.canceledOffers);

        this.minReplyTime = Math.min(this.minReplyTime, patient.averageReplyTime);
        this.maxReplyTime = Math.max(this.maxReplyTime, patient.averageReplyTime);

        this.minDistance = Math.min(this.minDistance, distance);
        this.maxDistance = Math.max(this.maxDistance, distance);
    }
}
