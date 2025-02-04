import { Patient } from "./Patient";

export class ScoredPatient {
    constructor(
        public patient: Patient,
        public score: number
    ) {}
}
