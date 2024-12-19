import { Address as AddressPrisma } from '@prisma/client';

export class Address {
    public id?: number;
    private street: string;
    private house: string;
    private postalCode: string;
    private city: string;
    private country: string;
    private userId: number;

    constructor(address: {
        id?: number;
        street: string;
        house: string;
        postalCode: string;
        city: string;
        country: string;
        userId: number;
    }) {
        this.id = address.id;
        this.street = address.street;
        this.house = address.house;
        this.postalCode = address.postalCode;
        this.city = address.city;
        this.country = address.country;
        this.userId = address.userId;
    }

    getId(): number | undefined {
        return this.id;
    }

    getStreet(): string {
        return this.street;
    }

    getHouse(): string {
        return this.house;
    }

    getPostalCode(): string {
        return this.postalCode;
    }

    getCity(): string {
        return this.city;
    }

    getCountry(): string {
        return this.country;
    }

    getUserId(): number {
        return this.userId;
    }

    static from(address: AddressPrisma): Address {
        return new Address({
            id: address.id,
            street: address.street,
            house: address.house,
            postalCode: address.postalCode,
            city: address.city,
            country: address.country,
            userId: address.userId,
        });
    }
}
