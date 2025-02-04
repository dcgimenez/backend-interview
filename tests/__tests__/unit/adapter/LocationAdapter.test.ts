import { LocationAdapter } from "../../../../src/adapters/LocationAdapter";
import { Location } from "../../../../src/domain/Location";

describe("LocationAdapter", () => {
    it("should correctly adapt latitude and longitude to Location model", () => {
        const rawLocation = { latitude: "46.7110", longitude: "-63.1150" };
        const adaptedLocation = LocationAdapter.toDomain(rawLocation);

        expect(adaptedLocation).toBeInstanceOf(Location);
        expect(adaptedLocation.lat).toBe(46.7110);
        expect(adaptedLocation.long).toBe(-63.1150);
    });

    it("should correctly parse negative and decimal values", () => {
        const rawLocation = { latitude: "-81.0341", longitude: "144.9963" };
        const adaptedLocation = LocationAdapter.toDomain(rawLocation);

        expect(adaptedLocation.lat).toBe(-81.0341);
        expect(adaptedLocation.long).toBe(144.9963);
    });
});
