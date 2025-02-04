import { PatientAdapter } from "../../../../src/adapters/PatientAdapter";
import { Patient } from "../../../../src/domain/Patient";

describe("PatientAdapter", () => {
    it("should correctly adapt raw patient data to Patient model", () => {
        const rawPatient = {
            id: "541d25c9-9500-4265-8967-240f44ecf723",
            name: "Samir Pacocha",
            age: 46,
            location: { latitude: "46.7110", longitude: "-63.1150" },
            acceptedOffers: 49,
            canceledOffers: 92,
            averageReplyTime: 2598,
        };

        const adaptedPatient = PatientAdapter.toDomain(rawPatient);

        expect(adaptedPatient).toBeInstanceOf(Patient);
        expect(adaptedPatient.id).toBe(rawPatient.id);
        expect(adaptedPatient.name).toBe(rawPatient.name);
        expect(adaptedPatient.age).toBe(rawPatient.age);
        expect(adaptedPatient.location.lat).toBe(46.7110);
        expect(adaptedPatient.location.long).toBe(-63.1150);
        expect(adaptedPatient.acceptedOffers).toBe(rawPatient.acceptedOffers);
        expect(adaptedPatient.canceledOffers).toBe(rawPatient.canceledOffers);
        expect(adaptedPatient.averageReplyTime).toBe(rawPatient.averageReplyTime);
    });
});
