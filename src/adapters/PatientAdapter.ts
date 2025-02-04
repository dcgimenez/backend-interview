import {Patient} from "../domain/Patient";
import {LocationAdapter} from "./LocationAdapter";

export class PatientAdapter {
    static toDomain(rawPatient: {
        id: string;
        name: string;
        age: number;
        location: { latitude: string; longitude: string };
        acceptedOffers: number;
        canceledOffers: number;
        averageReplyTime: number;
    }): Patient {
        return new Patient({
            id: rawPatient.id,
            name: rawPatient.name,
            age: rawPatient.age,
            location: LocationAdapter.toDomain(rawPatient.location), // Converts correctly
            acceptedOffers: rawPatient.acceptedOffers,
            canceledOffers: rawPatient.canceledOffers,
            averageReplyTime: rawPatient.averageReplyTime,
        });
    }
}
