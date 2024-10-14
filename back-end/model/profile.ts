export class Profile {
    // private variable instances
    private id?: number; // id is optional (?)
    private last_name: string;
    private first_name: string;
    private street: string;
    private housenumber: number;
    private gsm_number: string;
    private postal_code: number;
    private email: string;

    // constructor
    constructor(profile: {
        id?: number;
        last_name: string;
        first_name: string;
        street: string;
        housenumber: number;
        gsm_number: string;
        postal_code: number;
        email: string;
    }) {
        this.id = profile.id;
        this.last_name = profile.last_name;
        this.first_name = profile.first_name;
        this.street = profile.street;
        this.housenumber = profile.housenumber;
        this.gsm_number = profile.gsm_number;
        this.postal_code = profile.postal_code;
        this.email = profile.email;
    }

    // getters
    getId(): number | undefined {
        return this.id;
    }

    getLastName(): string {
        return this.last_name;
    }

    getFirstName(): string {
        return this.first_name;
    }

    getStreet(): string {
        return this.street;
    }

    getHousenumber(): number {
        return this.housenumber;
    }

    getGsmNumber(): string {
        return this.gsm_number;
    }

    getPostalCode(): number {
        return this.postal_code;
    }

    getEmail(): string {
        return this.email;
    }
}
