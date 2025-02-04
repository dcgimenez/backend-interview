import { CalculateDistanceInKilometers } from "../../../../src/usecases/CalculateDistanceInKilometers";
import { getDistance } from "geolib";

describe("CalculateDistance", () => {
    it("should correctly calculate the distance between two locations", () => {
        const locationA = { latitude: 46.7110, longitude: -63.1150 };
        const locationB = { latitude: -81.0341, longitude: 144.9963 };
        const expectedDistance = getDistance(locationA, locationB) / 1000;
        const distance = CalculateDistanceInKilometers.execute(locationA, locationB);

        expect(distance).toBeCloseTo(expectedDistance, 2);
    });

    it("should return 0 when calculating the distance between the same location", () => {
        const location = { latitude: 40.7128, longitude: -74.0060 };
        const distance = CalculateDistanceInKilometers.execute(location, location);

        expect(distance).toBe(0);
    });
});
