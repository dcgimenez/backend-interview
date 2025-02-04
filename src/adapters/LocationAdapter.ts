import {Location} from "../domain/Location";

export class LocationAdapter {
    static toDomain(rawLocation: { latitude: string; longitude: string }): Location {
        return new Location(parseFloat(rawLocation.latitude), parseFloat(rawLocation.longitude));
    }
}
