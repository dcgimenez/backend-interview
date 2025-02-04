import { Patient } from "../domain/Patient";
import { PatientAdapter } from "../adapters/PatientAdapter";
import * as fs from "fs";
import * as path from "path";

export class PatientRepository {
    private readonly patients: Patient[];

    constructor() {
        const filePath = path.resolve(__dirname, "../../resources/patients.json");
        const data = fs.readFileSync(filePath, "utf8");
        const rawPatients = JSON.parse(data);

        this.patients = rawPatients.map((rawPatient: any) => PatientAdapter.toDomain(rawPatient));
    }

    getAllPatients(): Patient[] {
        return this.patients;
    }
}
