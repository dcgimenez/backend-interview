import express from "express";
import patientRoutes from "../routes/PatientRoutes";

const app = express();
const PORT = 3000;

app.use("/api", patientRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
