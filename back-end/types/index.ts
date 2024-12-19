export enum Role {
    ADMIN = 'admin',
    CUSTOMER = 'customer',
    GUEST = 'guest',
}

export type Address = {
    street: string;
    house: string;
    postalCode: string;
    city: string;
    country: string;
};

export type UserInput = {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    address?: Address; // Marking address as optional
};

export type ProductInput = {
    name: string;
    price: number;
    image: string;
    description: string;
};

export type CartItem = {
    productId: number;
    quantity: number;
};

export type AuthenticationRequest = {
    username: string;
    password: string;
};

export type AuthenticationResponse = {
    token: string;
    username: string;
    fullname: string;
    role: string;
};
