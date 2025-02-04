import {getDistance} from "geolib";

export class CalculateDistanceInKilometers {
    static execute(
        locationA: { latitude: number; longitude: number },
        locationB: { latitude: number; longitude: number }): number {

        return getDistance(
            {latitude: locationA.latitude, longitude: locationA.longitude},
            {latitude: locationB.latitude, longitude: locationB.longitude}
        ) / 1000;
    }
}
