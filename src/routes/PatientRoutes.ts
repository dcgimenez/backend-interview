import {Request, Response, Router} from "express";
import {GetTopPatients} from "../usecases/GetTopPatients";
import {PatientRepository} from "../data/PatientRepository";

const router: Router = Router();
const patientRepository = new PatientRepository();
const getTopPatients = new GetTopPatients(patientRepository);

router.get("/patients", (req: Request, res: Response) => {
    const {lat, long} = req.query;

    if (!lat || !long) {
        return res.status(400).json({error: "Latitude and longitude are required"});
    }

    const latitude = parseFloat(lat as string);
    const longitude = parseFloat(long as string);

    if (isNaN(latitude) || isNaN(longitude) || latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
        return res.status(400).json({error: "Invalid latitude or longitude range"});
    }

    const topPatients = getTopPatients.execute(latitude, longitude);
    return res.json(topPatients);
});

export default router;
