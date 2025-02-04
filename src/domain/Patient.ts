import { Location } from "./Location";

export class Patient {
    id: string;
    name: string;
    age: number;
    location: Location;
    acceptedOffers: number;
    canceledOffers: number;
    averageReplyTime: number;

    constructor({
                    id,
                    name,
                    age,
                    location,
                    acceptedOffers,
                    canceledOffers,
                    averageReplyTime,
                }: {
        id: string;
        name: string;
        age: number;
        location: Location;
        acceptedOffers: number;
        canceledOffers: number;
        averageReplyTime: number;
    }) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.location = new Location(location.lat, location.long);
        this.acceptedOffers = acceptedOffers;
        this.canceledOffers = canceledOffers;
        this.averageReplyTime = averageReplyTime;
    }
}
