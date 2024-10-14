import { Role } from '../types';

export class Profile {
    // private variable instances
    private id?: number; // id is optional (?)
    private firstname: string;
    private lastname: string;
    private email: string;
    private street: string;
    private housenumber: number;
    private phonenumber: string;
    private postalcode: number;
    private role: Role;

    // constructor
    constructor(profile: {
        id?: number;
        firstname: string;
        lastname: string;
        email: string;
        street: string;
        housenumber: number;
        phonenumber: string;
        postalcode: number;
        role: Role;
    }) {
        this.id = profile.id;
        this.firstname = profile.firstname;
        this.lastname = profile.lastname;
        this.email = profile.email;
        this.street = profile.street;
        this.housenumber = profile.housenumber;
        this.phonenumber = profile.phonenumber;
        this.postalcode = profile.postalcode;
        this.role = profile.role;
    }

    // getters
    getId(): number | undefined {
        return this.id;
    }

    getFirstName(): string {
        return this.firstname;
    }

    getLastName(): string {
        return this.lastname;
    }

    getEmail(): string {
        return this.email;
    }

    getStreet(): string {
        return this.street;
    }

    getHouseNumber(): number {
        return this.housenumber;
    }

    getPhoneNumber(): string {
        return this.phonenumber;
    }

    getPostalCode(): number {
        return this.postalcode;
    }

    getRole(): Role {
        return this.role;
    }
}
